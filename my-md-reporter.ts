import { Reporter, FullConfig, Suite, TestCase, TestResult, FullResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

class MyMarkdownReporter implements Reporter {
  private markdownLines: string[] = [];
  private reportDir: string;
  private stats = { total: 0, passed: 0, failed: 0, skipped: 0 };
/*
  constructor() {
    const now = new Date();
    const timestamp = now.getFullYear() +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0') + '-' +
      String(now.getHours()).padStart(2, '0') +
      String(now.getMinutes()).padStart(2, '0') +
      String(now.getSeconds()).padStart(2, '0');

    this.reportDir = path.join(process.cwd(), 'test-reports', `run-${timestamp}`);
    if (!fs.existsSync(this.reportDir)) fs.mkdirSync(this.reportDir, { recursive: true });
  }
*/
  constructor() {
    // ★ 修正箇所：環境変数からパスを取得する。設定されていなければデフォルト値
    const envPath = process.env.MY_REPORT_DIR;
    
    if (envPath) {
      this.reportDir = envPath;
    } else {
      // 万が一、環境変数が取れなかった時のためのバックアップ
      this.reportDir = path.join(process.cwd(), 'test-reports', 'latest-run');
    }

    // フォルダ作成（既にconfig側やHTMLレポーター側で作られている可能性もあるが、安全のため）
    if (!fs.existsSync(this.reportDir)) {
      fs.mkdirSync(this.reportDir, { recursive: true });
    }
  }


  onBegin(config: FullConfig, suite: Suite) {
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
          // ★ここが変わりました： image/png ではなく image/jpeg にしています
          const src = `data:image/jpeg;base64,${base64}`;
          
          let displayName = img.name;
          if (img.name.includes('__')) {
            const parts = img.name.split('__');
            const prefix = parts[0]; 
            const description = parts[1];
            const stepNum = parseInt(prefix.split('-')[0]);
            displayName = `${stepNum}. (${description})`; 
          }

          this.markdownLines.push(`\n**${displayName}**`); 
          
          // 中央寄せ用の div タグ
          this.markdownLines.push(`<div align="center">`);
          this.markdownLines.push(`<img src="${src}" width="600" alt="${displayName}" style="border:1px solid #ddd; margin-bottom: 20px;">`);
          this.markdownLines.push(`</div>`);
        }
      }
      
      if (images.length === 0) {
        this.markdownLines.push(`\n(スクリーンショットはありません)`);
      }
    }
    this.markdownLines.push(`\n---`);
  }

  onEnd(result: FullResult) {
    this.markdownLines.unshift(`## 📊 サマリー (計${this.stats.total}件: ✅${this.stats.passed} ❌${this.stats.failed})`);
    const reportPath = path.join(this.reportDir, 'report.md');
    fs.writeFileSync(reportPath, this.markdownLines.join('\n'));
    console.log(`\n✅ レポート作成完了: ${reportPath}`);
  }
}

export default MyMarkdownReporter;