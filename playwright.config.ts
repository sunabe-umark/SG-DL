// playwright.config.ts の基本コード
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // テストファイルの場所（必要なら変更）
  fullyParallel: true,
  reporter: 'html',
  timeout: 60 * 1000, // 60秒にする
  use: {
    trace: 'on-first-retry',
    // 画面サイズを指定（例: 幅1920, 高さ1080）
    viewport: { width: 1920, height: 1080 },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  

});

