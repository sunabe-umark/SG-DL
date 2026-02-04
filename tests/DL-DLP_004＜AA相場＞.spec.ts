import { test, expect } from '@playwright/test';

//古堅編集有22222ｓ

test('test', async ({ page }) => {
  await page.goto('https://devdlpro.proto-dataline.com/top/top.php');
  await page.getByRole('textbox', { name: 'ログインID' }).click();
  await page.getByRole('textbox', { name: 'ログインID' }).fill('tst0002');
  
  // パスワードにtst0002を入力
  await page.getByRole('textbox', { name: 'ログインID' }).press('Tab');
  await page.getByRole('textbox', { name: 'パスワード' }).fill('tst0002');
  await page.getByRole('button', { name: 'ログイン' }).click();
  await page.waitForLoadState('networkidle');
  
  // 「グレード検索」の右横にある「ＡＡ相場」を押下
  await page.getByRole('link', { name: 'ＡＡ相場' }).click();
  await page.waitForLoadState('networkidle');
  
  // メーカー「トヨタ」を選択
  const makerSelect = page.locator('select').first();
  await makerSelect.selectOption({ label: 'トヨタ' });
  await page.waitForTimeout(500);
  // 車種「アクア」を選択
await page.locator('select[name="car"]').selectOption('10101073');
await page.goto('https://devdlpro.proto-dataline.com/aa/aa.php#19c1ca72e9c4e1c');

await page.locator('#Model').selectOption('13');
await page.locator('#Model').selectOption([]);
await page.goto('https://devdlpro.proto-dataline.com/aa/aa.php#19c1cb572c31573f');
await page.locator('#Grade').selectOption('15');
await page.goto('https://devdlpro.proto-dataline.com/aa/aa.php#19c1cb5c0bb9552');
await page.locator('select[name="s_year"]').selectOption('2011');
await page.locator('select[name="s_tmonth"]').selectOption('1');

await page.locator('select[name="e_year"]').selectOption('2018');
await page.locator('select[name="e_year2"]').selectOption('3');

await page.locator('select[name="s_running"]').selectOption('1');
await page.locator('select[name="e_running"]').selectOption('150');
await page.locator('#Shift').selectOption('1');
await page.locator('#Color').selectOption('10');
await page.locator('select[name="s_out_kantei_aa"]').selectOption('200');
await page.locator('select[name="e_out_kantei_aa"]').selectOption('2000');
await page.locator('select[name="s_in_kantei_aa"]').selectOption('C');
await page.locator('select[name="e_in_kantei_aa"]').selectOption('S');
await page.getByText('＋ 詳細検索').click();
await page.getByText('有').first().click();
await page.locator('#Exhaust').selectOption('24');
await page.locator('#Drive').selectOption('0');
await page.locator('#Door').selectOption('5');
await page.getByText('無').nth(3).click();
await page.getByText('有').nth(3).click();
await page.getByText('無', { exact: true }).nth(4).click();
await page.getByText('無', { exact: true }).nth(5).click();
await page.getByText('無').nth(4).click();
await page.getByText('右').click();
await page.locator('.left.checked').first().click();
await page.getByRole('link', { name: '会場選択' }).click();
await page.getByRole('cell', { name: 'ＵＳＳ', exact: true }).locator('input[name="series[]"]').check();
await page.getByRole('link', { name: 'ＯＫ' }).click();
await page.locator('input[name="s_price"]').click();
await page.locator('input[name="s_price"]').fill('50');
await page.locator('input[name="s_price"]').press('Enter');
await page.locator('input[name="e_price"]').click();
await page.locator('input[name="e_price"]').fill('2000');
await page.locator('tr:nth-child(7) > td:nth-child(6) > .aa_radio > .right').click();
await page.getByText('落札', { exact: true }).click();
await page.getByText('上記条件から検索 該当件数288件').click();

});
