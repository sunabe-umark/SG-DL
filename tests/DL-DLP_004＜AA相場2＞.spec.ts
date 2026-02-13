import { test, expect } from '@playwright/test';

//DLP回帰テスト-AA相場検索-グレード検索＞AA相場検索
//ログイン画面

test('test', async ({ page }) => {
// ▼ この行を追加（テストの制限時間を120秒に変更）
  test.setTimeout(120000);

  //ログイン画面へ遷移
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
  await page.locator('select[name="maker"]').selectOption('1015');
  await page.goto('https://devdlpro.proto-dataline.com/aa/aa.php#19c55c7b3931609d');
  await page.locator('select[name="car"]').selectOption('10152029');
  await page.goto('https://devdlpro.proto-dataline.com/aa/aa.php#19c55c7e1883035');
  await page.waitForTimeout(1000);
//await page.getByText('上記条件から検索 該当件数13,981件').click();
  await page.getByText('上記条件から検索 該当件数').click();
  const targetTextprice = (await page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_price_num > b').first().textContent())?.trim();  

  console.log('ソート前、取得した１件目の金額の値の中身は:', targetTextprice);
//金額でソート（昇順）
  await page.locator('.col_price_num > a').first().click();
  await page.waitForTimeout(5000);
  const targetTextprice2 = (await page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_price_num').first().textContent())?.trim();  

  console.log('ソート（昇順）後、取得した１件目の金額の値の中身は:', targetTextprice2);
// ▼▼▼ ここに追加：値が一致していない（変更された）ことを確認する ▼▼▼
expect(targetTextprice).not.toBe(targetTextprice2);

//金額でソート（昇順）
await page.locator('.col_price_num > a:nth-child(3)').click();
  await page.waitForTimeout(5000);
  const targetTextprice3 = (await page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_price_num').first().textContent())?.trim();  

  console.log('ソート（降順）後、取得した１件目の金額の値の中身は:', targetTextprice3);
  expect(targetTextprice2).not.toBe(targetTextprice3);

  //金額でソートクリア
await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(5000);
  const targetTextprice4 = (await page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_price_num').first().textContent())?.trim();  
  console.log('ソート（クリア後）取得した１件目の金額の値の中身は:', targetTextprice4);
  expect(targetTextprice).toBe(targetTextprice4);

//内装評価フィルタリング
  const targetTextnaisou1 = (await page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_i_value').first().textContent())?.trim();  
  console.log('内装フィルタなし１件目の値の中身は:', targetTextnaisou1);
//内装Bでフィルタリング
  await page.locator('select[name="filter_i_value"]').selectOption('B');
  await page.goto('https://devdlpro.proto-dataline.com/aa/aa.php#19c562c6ae4a7ab');
  await page.waitForTimeout(5000);
  const targetTextnaisou2 = (await page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_i_value').first().textContent())?.trim();  
  console.log('内装「B」フィルタ１件目の値の中身は:', targetTextnaisou2);
// ▼▼▼ ここに追加：値が「B」であることを確認する ▼▼▼
  expect(targetTextnaisou2).toBe('B');

//内装評価フィルタクリア
  await page.getByRole('link', { name: 'フィルタ解除' }).click();
  await page.waitForTimeout(5000);
  const targetTextnaisou3 = (await page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_i_value').first().textContent())?.trim();  
  console.log('内装フィルタ解除後、１件目の値の中身は:', targetTextnaisou3);
// ▼▼▼ ここに追加：値が一致していることを確認する ▼▼▼
  expect(targetTextnaisou3).toBe(targetTextnaisou1);

  //MCフィルタリング
  const targetTextMc1 = (await page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_atype_nm.aa_font_size > p').first().textContent())?.trim();  
  console.log('MCフィルタなし１件目の値の中身は:', targetTextMc1);
//MC 前でフィルタリング

await page.locator('select[name="filter_atype_nm"]').selectOption('前');
await page.goto('https://devdlpro.proto-dataline.com/aa/aa.php#19c5647d3e1d3e5');

await page.waitForTimeout(5000);
  const targetTextMc2 = (await page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_atype_nm.aa_font_size > p').first().textContent())?.trim();  
  console.log('MC「前」フィルタ１件目の値の中身は:', targetTextMc2);
// ▼▼▼ ここに追加：値が「前」であることを確認する ▼▼▼
  expect(targetTextMc2).toBe('前');

//MCフィルタ解除
await page.getByRole('link', { name: 'フィルタ解除' }).click();
await page.waitForTimeout(5000);
  const targetTextMc3 = (await page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_atype_nm.aa_font_size > p').first().textContent())?.trim();  
  console.log('MCフィルタ解除後、１件目の値の中身は:', targetTextMc3);
// ▼▼▼ ここに追加：値が一致していることを確認する ▼▼▼
  expect(targetTextMc1).toBe(targetTextMc3);

});