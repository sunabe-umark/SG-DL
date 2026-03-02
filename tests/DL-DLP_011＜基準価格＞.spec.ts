import { test, expect } from  '../custom-test';
test('基準価格@console', async ({ page }, testInfo) => {
  test.setTimeout(300000);
  await page.goto('https://devdlpro.proto-dataline.com/');
    await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'ログインID' }).fill('tst0001');
  await page.getByRole('textbox', { name: 'パスワード' }).fill('tst0001');
    await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'ログイン' }).click();
  await expect.soft(page).toHaveURL('https://devdlpro.proto-dataline.com/top/top.php'); 
//No.1
  await page.getByRole('link', { name: '基準価格' }).click();
    await page.waitForTimeout(2000);
  await expect.soft(page).toHaveURL(/.*spg.php/);
  await expect(page).toHaveTitle('基準価格'); 
//No.2
// 1. 取得した値（例: "202603"）
  const selectedValue = await page.inputValue('#bb_ym');
// 2. 現在の日付から「当月」と「翌月」の文字列を作る
  const now = new Date();
// 当月 (YYYYMM)
  const currentMonth = now.getFullYear().toString() + 
                       (now.getMonth() + 1).toString().padStart(2, '0');
// 翌月 (YYYYMM)
  const nextMonthDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const nextMonth = nextMonthDate.getFullYear().toString() + 
                     (nextMonthDate.getMonth() + 1).toString().padStart(2, '0');
// 3. 期待する値の配列を作る
  const expectedMonths = [currentMonth, nextMonth];
// 4. アサーション（確認）
// 取得した値が、配列 [当月, 翌月] のどちらかに含まれているか
  expect(expectedMonths).toContain(selectedValue);
  console.log(`取得した値: ${selectedValue}, 期待値: ${expectedMonths}`);
//No.3「簡易表示（行）」が選択されていることを確認
  await expect.soft(page.locator('#list_type')).toHaveValue('0');
//No.4「卸売基準価格」が選択されていることを確認
  await expect.soft(page.locator('#output_price')).toHaveValue('0');
//No.5
  await page.locator('#Maker').selectOption('1005');
  await page.goto('https://devdlpro.proto-dataline.com/spg/spg.php#19c9e219688c7eb');
    await page.waitForTimeout(2000);
//No.6
  await page.locator('#carType').selectOption('10052004');
  await page.goto('https://devdlpro.proto-dataline.com/spg/spg.php#19c9e22351c17258');
    await page.waitForTimeout(2000);
//No.7
  await page.locator('select[name="type[]"]').selectOption('19');
  await page.goto('https://devdlpro.proto-dataline.com/spg/spg.php#19c9e2253cb3b0d');
    await page.waitForTimeout(2000);
//No.8
  await page.locator('select[name="grade[]"]').selectOption('36');
    await page.waitForTimeout(2000);
//No.9
  await page.locator('#age_type1').selectOption('2020');
    await page.waitForTimeout(2000);
//No.10
  await page.locator('#age_type2').selectOption('2024');
    await page.waitForTimeout(2000);
//No.11
  await page.locator('select[name="model"]').selectOption('1_2018_11');
    await page.waitForTimeout(2000);
//No.12
  await page.locator('select[name="shift"]').selectOption('CVT');
    await page.waitForTimeout(2000);
//No.13
  await page.locator('select[name="door"]').selectOption('5');
    await page.waitForTimeout(2000);
//No.14
  await page.locator('select[name="handle"]').selectOption('1');
    await page.waitForTimeout(2000);
//No.15
  await page.locator('select[name="drive"]').selectOption('0');
    await page.waitForTimeout(2000);
//No.16
  await page.locator('select[name="exhaust"]').selectOption('32');
    await page.waitForTimeout(2000);
//No.17
  await page.locator('select[name="teiin"]').selectOption('5');
    await page.waitForTimeout(2000);
//No.18
  await page.locator('#search_maker_btn').click();
// 要素が表示され、その中に「検索結果」が含まれるまで待機
  await expect(page.locator('#btnarea > tbody > tr:nth-child(1) > td > p > span:nth-child(2)')).toContainText('検索結果');
//No.19
   await expect(page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_sb_katashiki')).toHaveText('6BA-MZAA10');
//No.20
   await expect(page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_sb_grade')).toHaveText('ＵＸ２００');
//No.21
   await expect(page.locator('#result_head > table > thead > tr > th.col_sb_a_iro_k0')).toContainText('下取基準価格');
//No.22
  await page.getByRole('link', { name: 'お気に入り' }).click();
    await page.waitForTimeout(3000); 
  await expect(page.locator('#favorite > div > div.fav_group > span.favorite_title')).toContainText('お気に入り');
//No.23
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('link', { name: '削除' }).first().click();

});
