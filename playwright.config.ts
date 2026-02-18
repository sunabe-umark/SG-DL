// playwright.config.ts の基本コード
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // テストファイルの場所（必要なら変更）
  fullyParallel: true,
  //reporter: 'html',
  //以下MD形式での保存のために追加
  
  reporter: [
    ['list'],                 // これを入れると、今まで通りコンソールにも結果が出ます
    ['html', { open: 'never' }] ,// 標準のHTMLレポート（自動で開かない設定）
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

