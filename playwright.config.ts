// playwright.config.ts の基本コード
import { defineConfig, devices } from '@playwright/test';
import path from 'path';
/*
// 1. レポート用のタイムスタンプを作成 (MDレポーターと合わせる)
const now = new Date();
const timestamp = now.getFullYear() +
  String(now.getMonth() + 1).padStart(2, '0') +
  String(now.getDate()).padStart(2, '0') + '-' +
  String(now.getHours()).padStart(2, '0') +
  String(now.getMinutes()).padStart(2, '0') +
  String(now.getSeconds()).padStart(2, '0');
*/
// 2. 出力ディレクトリの定義
/*
// 1. 共通のタイムスタンプ付きフォルダ名を生成  
const now = new Date();
const timestamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
const reportFolder = path.join('test-reports', `run-${timestamp}`);
const reportBaseDir = path.join(process.cwd(), 'test-reports', `run-${timestamp}`);
*/
//↑空のフォルダが出るためコメントアウト↓のスクリプトを追加

const now = new Date();
const timestamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
const reportBaseDir = path.join(process.cwd(), 'test-reports', `run-${timestamp}`);

// 2. 環境変数にセット（これでレポーター側から読み取れるようになる）
process.env.MY_REPORT_DIR = reportBaseDir;

export default defineConfig({
  testDir: './tests', // テストファイルの場所（必要なら変更）
  fullyParallel: true,
  //reporter: 'html',
  //以下MD形式での保存のために追加
    
  reporter: [
    ['list'],                 // これを入れると、今まで通りコンソールにも結果が出ます
    ['html', { 
      outputFolder: path.join(reportBaseDir , 'html-report'), // MDと同じフォルダ内の'html-report'に保存
      open: 'never' 
    }],
    ['./my-md-reporter.ts']    // my-md-reporter.tsファイルを指定
  ],
  
  timeout: 200 * 1000, // 200秒にする
  
  use: {
    // 画面サイズを指定（例: 幅1249, 高さ882）
    viewport: { width: 1249, height: 882 },
    offline: false,
    /* レポートにスクリーンショットを含める設定 */
    //screenshot: 'only-on-failure', // 'on' (常に), 'off' (なし), 'only-on-failure' (失敗時のみ)
    // ★ここを 'on' に変更！
    screenshot: 'on', // 成功・失敗に関わらず常にスクリーンショットを撮る
    trace: 'on-first-retry',
    /* ビデオも録画したい場合 */
    //video: 'retain-on-failure', // 失敗した時だけ動画を残す
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  

});

