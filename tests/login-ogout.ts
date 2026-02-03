import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://devdlpro.proto-dataline.com/');

  // タイトルが「Example Domain」であることを確認
  await expect(page).toHaveTitle('Example Domain');

  await page.getByRole('textbox', { name: 'ログインID' }).click();
  await page.getByRole('textbox', { name: 'ログインID' }).fill('tst0004');

  await expect(page.getByRole('textbox', { name: 'ログインID' })).toHaveValue('tst0004');
  await page.getByRole('textbox', { name: 'パスワード' }).click();
  await page.getByRole('textbox', { name: 'パスワード' }).fill('tst0004');
  await expect(page.getByRole('textbox', { name: 'パスワード' })).toHaveValue('tst0004');

  await expect(page.getByRole('checkbox')).not.toBeChecked();

  await page.getByRole('checkbox').check();
  await expect(page.getByRole('checkbox')).toBeChecked();


  await page.getByRole('button', { name: 'ログイン' }).click();
  //5秒まつ
  await page.waitForTimeout(5000);
  await page.getByRole('link', { name: 'ログアウト' }).click();

   //5秒まつ
  await page.waitForTimeout(6000);
  await page.getByRole('button', { name: 'ログイン' }).click();
});