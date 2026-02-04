import { test, expect } from '@playwright/test';

test.setTimeout(60000); // タイムアウトを60秒に延長（60000ms）

test('test', async ({ page }) => {
  await page.goto('https://devdlpro.proto-dataline.com/');

   //5秒まつ
  await page.waitForTimeout(3000);

  // タイトルが「DataLinePRO（データラインプロ）法人向け中古車データ検索」であることを確認
  await expect.soft(page).toHaveTitle('DataLine-PRO（データラインプロ）法人向け中古車データ検索');

  // ログインIDとパスワードが未入力であることを確認
  
  await expect.soft(page.getByRole('textbox', { name: 'ログインID' })).toHaveValue('');
  await expect.soft(page.getByRole('textbox', { name: 'パスワード' })).toHaveValue('');

  //ログインIDとパスワードにaut001を入力して、画面に正しく表示されているか確認
  await page.getByRole('textbox', { name: 'ログインID' }).click();
  await page.getByRole('textbox', { name: 'ログインID' }).fill('tst0001');
  await expect.soft(page.getByRole('textbox', { name: 'ログインID' })).toHaveValue('tst0001');

  await page.getByRole('textbox', { name: 'パスワード' }).click();
  await page.getByRole('textbox', { name: 'パスワード' }).fill('tst0001');
  await expect.soft(page.getByRole('textbox', { name: 'パスワード' })).toHaveValue('tst0001');

  await page.waitForTimeout(5000);

  await page.getByRole('button', { name: 'ログイン' }).click();

  await page.waitForTimeout(5000);
  await expect.soft(page.locator('#header')).toContainText('ようこそ テスト0001 フルパック 様');

  await page.waitForTimeout(5000);
  await page.getByRole('link', { name: 'ログアウト' }).click();
  
  await expect.soft(page.getByRole('checkbox')).not.toBeChecked();

  await page.getByRole('textbox', { name: 'ログインID' }).fill('tst0001');
  await page.getByRole('textbox', { name: 'パスワード' }).fill('tst0001');
  await page.getByRole('checkbox').check();
  await page.waitForTimeout(10000);
  await page.getByRole('button', { name: 'ログイン' }).click();  

  await page.waitForTimeout(10000);
  await expect.soft(page.locator('#header')).toContainText('ようこそ テスト0001 フルパック 様');
  await page.getByRole('link', { name: 'ログアウト' }).click();

  await expect.soft(page.getByRole('textbox', { name: 'ログインID' })).toHaveValue('tst0001');
  await expect.soft(page.getByRole('textbox', { name: 'パスワード' })).toHaveValue('tst0001');
  await expect.soft(page.getByRole('checkbox')).toBeChecked();
//マージ後コミット
});