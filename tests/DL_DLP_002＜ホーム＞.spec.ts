import { test, expect } from '@playwright/test';


test('test', async ({ page }) => {
  await page.goto('https://devdlpro.proto-dataline.com/');

  await page.getByRole('textbox', { name: 'ログインID' }).fill('tst0001');
  await page.getByRole('textbox', { name: 'パスワード' }).fill('tst0001');
  
  await page.waitForTimeout(3000);

  await page.getByRole('button', { name: 'ログイン' }).click();


  await expect.soft(page.getByRole('link', { name: 'グレード検索' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: 'ＡＡ相場' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: '小売相場' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: '商談ツール' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: '仕入リサーチ' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: '注文販売' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: '流通レポート' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: '業界ニュース' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: '陸送', exact: true })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: '陸送' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: '販促・事務用品' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: '基準価格' })).toBeVisible();
  
});