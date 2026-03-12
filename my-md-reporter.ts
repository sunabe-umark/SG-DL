import { Reporter, FullConfig, Suite, TestCase, TestResult, FullResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

class MyMarkdownReporter implements Reporter {
  private markdownLines: string[] = [];
  private reportDir: string;
  private stats = { total: 0, passed: 0, failed: 0, skipped: 0 };

  constructor() {
    // ★ 常に latest フォルダを作業場所とする
    this.reportDir = path.join(process.cwd(), 'test-reports', 'latest');
  }

  onBegin(config: FullConfig, suite: Suite) {
    if (!fs.existsSync(this.reportDir)) {
      fs.mkdirSync(this.reportDir, { recursive: true });
    }
    
    this.markdownLines.push(`# 🎭 Playwright テスト手順レポート`);
    this.markdownLines.push(`実行日時: ${new Date().toLocaleString('ja-JP')}\n`);
    this.markdownLines.push(`---`);
  }

  async onTestEnd(test: TestCase, result: TestResult) {
    this.stats.total++;
    let icon = '❓';
    if (result.status === 'passed') { icon = '✅'; this.stats.passed++; }
    else if (result.status === 'failed' || result.status === 'timedOut') { icon = '❌'; this.stats.failed++; }
    else if (result.status === 'skipped') { icon = '⏭️'; this.stats.skipped++; }

    this.markdownLines.push(`### ${icon} ${test.title} (${result.duration}ms)`);

    if (result.errors.length > 0) {
      this.markdownLines.push(`\n**⚠️ エラー内容:**`);
      result.errors.forEach(err => {
        const cleanMessage = (err.message || '').replace(/\u001b\[.*?m/g, '');
        this.markdownLines.push(`> ${cleanMessage.split('\n')[0]}`);
      });
    }

    if (result.attachments) {
      const images = result.attachments.filter(a => a.contentType.startsWith('image'));
      images.sort((a, b) => {
        const numA = parseInt(a.name.split('-')[0] || '0');
        const numB = parseInt(b.name.split('-')[0] || '0');
        return numA - numB;
      });

      for (const img of images) {
        let buffer: Buffer | null = null;
        if (img.body) buffer = img.body;
        else if (img.path && fs.existsSync(img.path)) buffer = fs.readFileSync(img.path);

        if (buffer) {
          const base64 = buffer.toString('base64');
          const src = `data:${img.contentType};base64,${base64}`;
          
          let displayName = img.name;
          if (img.name.includes('__')) {
            const parts = img.name.split('__');
            displayName = `${parseInt(parts[0].split('-')[0])}. (${parts[1]})`; 
          }

          this.markdownLines.push(`\n**${displayName}**`); 
          this.markdownLines.push(`<div align="center">`);
          this.markdownLines.push(`<img src="${src}" width="600" alt="${displayName}" style="border:1px solid #ddd; margin-bottom: 20px;">`);
          this.markdownLines.push(`</div>`);
        }
      }
      if (images.length === 0) this.markdownLines.push(`\n(スクリーンショットはありません)`);
    }
    this.markdownLines.push(`\n---`);

    // 途中で停止しても latest には残るように都度保存
    fs.writeFileSync(path.join(this.reportDir, 'report.md'), this.markdownLines.join('\n'));
  }

  onEnd(result: FullResult) {
    // 1. latest フォルダに最終レポートを保存
    this.markdownLines.unshift(`## 📊 サマリー (計${this.stats.total}件: ✅${this.stats.passed} ❌${this.stats.failed})`);
    const reportPath = path.join(this.reportDir, 'report.md');
    fs.writeFileSync(reportPath, this.markdownLines.join('\n'));
    
    // 2. ★ ここが最重要：テスト完了時の「今の時刻」で履歴フォルダを作り、コピーする
    try {
      const now = new Date();
      const timestamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
      
      const archiveDir = path.join(process.cwd(), 'test-reports', `run-${timestamp}`);
      
      // latest フォルダの中身（MDとHTML）を、新しい時刻のフォルダに丸ごとコピー
      fs.cpSync(this.reportDir, archiveDir, { recursive: true });
      // --- ★ ここから自動削除ロジックを追加 ---
      const maxHistory = 20; // 残したいフォルダの数
      const parentDir = path.dirname(this.reportDir); // 'test-reports' フォルダ

      // 'run-' で始まるフォルダを抽出して、作成日時順（新しい順）に並べる
      const folders = fs.readdirSync(parentDir)
        .filter(name => name.startsWith('run-'))
        .map(name => ({
          name,
          path: path.join(parentDir, name),
          ctime: fs.statSync(path.join(parentDir, name)).ctime.getTime()
        }))
        .sort((a, b) => b.ctime - a.ctime);

      // 上限を超えている場合、古いフォルダを削除
      if (folders.length > maxHistory) {
        const toDelete = folders.slice(maxHistory);
        toDelete.forEach(folder => {
          fs.rmSync(folder.path, { recursive: true, force: true });
          console.log(`🗑️ 古いレポートを削除しました: ${folder.name}`);
        });
      }
      // --- ★ ここまで ---
      console.log(`\n✅ レポート作成完了:`);
      console.log(`  📂 最新版: ${this.reportDir}`);
      console.log(`  📂 履歴保存: ${archiveDir}`);
    } catch (e) {
      console.error('⚠️ 履歴フォルダへのコピーに失敗しました:', e);
    }
  }
}

export default MyMarkdownReporter;
//コミット用コメント