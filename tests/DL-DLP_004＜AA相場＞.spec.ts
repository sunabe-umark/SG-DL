import { test, expect } from '@playwright/test';

//DLP回帰テスト-AA相場検索-グレード検索＞AA相場検索
//ログイン画面

test('test', async ({ page }) => {
// ▼ この行を追加（テストの制限時間を120秒に変更）
  test.setTimeout(360000);

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
//await page.getByText('上記条件から検索 該当件数288件').click();
await page.getByText('上記条件から検索').click();

//検索結果の確認　型式＝NHP10、内装評価＝Ｓが表示されていること0205
await expect(page.getByRole('cell', { name: 'NHP10' }).first()).toBeVisible({ timeout: 15000 });
await expect(page.getByRole('cell', { name: 'Ｓ' }).nth(1)).toBeVisible({ timeout: 15000 });

//印刷画面の確認　トヨタ、アクアが表示されていること
const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '印刷' }).click();
  const page1 = await page1Promise;
await expect(page1.getByText('トヨタ', { exact: true })).toBeVisible();
await expect(page1.getByText('アクア')).toBeVisible();
await page1.getByRole('button', { name: '閉じる' }).click();

//カスタマイズ表示　非表示の確認
await page.getByText('カスタマイズ').click({ timeout: 15000 });
await expect(page.locator('._btn').first()).toBeVisible();
await expect(page.locator('._btn.js_soat_switch.is-off')).toBeVisible();
await page.locator('.soat_pop_close').click();

// お気に入り登録、削除の確認
await page.getByRole('link', { name: 'お気に入り' }).click();
page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
// ① 邪魔をしている既存のダイアログ設定（共通設定など）を一度リセットする
page.removeAllListeners('dialog');
// ① ダイアログが表示されたら「OK」を押す設定をあらかじめ行う
page.once('dialog', async dialog => {
    console.log(`ダイアログ内容: ${dialog.message()}`); // ログにメッセージを出力（確認用）
    await dialog.accept(); // ★ここで「OK」ボタンを押下します
});
  // await page.getByRole('link', { name: '削除' }).first().click();
await page.getByRole('link', { name: '削除' }).first().click();
await page.waitForTimeout(1000);

await page.locator('#favorite').getByRole('link', { name: 'お気に入り' }).click();

await expect(page.getByRole('cell', { name: 'トヨタ' }).nth(1)).toBeVisible();
await expect(page.getByRole('cell', { name: 'アクア' }).nth(1)).toBeVisible();
await page.waitForTimeout(1000);
await page.getByRole('link', { name: '全てクリア' }).click({ timeout: 15000 });
await page.waitForTimeout(1000);
await page.getByRole('link', { name: 'お気に入り' }).first().click({ timeout: 15000 });
await page.waitForTimeout(1000);
await page.getByRole('link', { name: '選択', exact: true }).first().click();

await page.waitForTimeout(10000);

//await expect(page.locator('select[name="maker"]')).toBeVisible();
//await expect(page.locator('select[name="car"]')).toBeVisible();
//お気に入り「選択」で結果一覧を表示
await expect(page.getByRole('cell', { name: 'NHP10' }).first()).toBeVisible();
await expect(page.getByRole('cell', { name: 'Ｓ' }).nth(1)).toBeVisible();

// 1. 「全てクリア」ボタンをクリック
await page.getByRole('link', { name: '全てクリア' }).click();
// 2. 検索条件の型式テキストボックスが空になるまで待つ
await expect(page.locator('#Model')).toHaveValue('');

// AA相場検索－検索履歴の確認
await page.waitForTimeout(1000);
await page.getByRole('link', { name: '検索履歴' }).first().click({ timeout: 15000 });
await page.waitForTimeout(1000);

// '登録した検索条件は' という文字が見えるようになるまで待つ（デフォルト30秒）
await expect(page.getByText('登録した検索条件を')).toBeVisible({ timeout: 30000 });

await expect(page.getByRole('heading', { name: '検索履歴' })).toBeVisible({ timeout: 15000 });

await page.waitForTimeout(1000);
// await page.evaluate(() => window.scrollTo(0, 0));

await expect(page.getByRole('cell', { name: 'トヨタ' }).first()).toBeVisible({ timeout: 15000 });
await expect(page.getByRole('cell', { name: 'アクア' }).first()).toBeVisible();

await page.getByRole('link', { name: '選択', exact: true }).first().click();
await expect(page.locator('select[name="maker"]')).toBeVisible();
await expect(page.locator('select[name="car"]')).toBeVisible();

await page.waitForTimeout(10000);
//await page.getByRole('link', { name: '検索履歴' }).first().click({ timeout: 15000 });

// 1. ボタン（またはリンク）を定義
const historyButton = page.getByRole('link', { name: '検索履歴' });
// 2. ボタンが操作可能（VisibleかつEnabled）になるまで待つ
await historyButton.waitFor({ state: 'visible', timeout: 30000 });
// 3. クリックする
await historyButton.click();

// '登録した検索条件は' という文字が見えるようになるまで待つ（デフォルト30秒）
await expect(page.getByText('登録した検索条件を')).toBeVisible({ timeout: 30000 });

await page.waitForTimeout(1000);
await expect(page.getByRole('heading', { name: '検索履歴' })).toBeVisible();

await page.waitForTimeout(1000);
// 検索履歴ページングの確認
await page.getByRole('link', { name: '次へ>>' }).click();
await expect(page.getByRole('cell', { name: '51', exact: true })).toBeVisible();
await page.getByRole('link', { name: '<<前へ' }).click();
await expect(page.getByRole('cell', { name: '1', exact: true })).toBeVisible();
await page.getByRole('link', { name: '2' }).click();
await expect(page.getByRole('cell', { name: '51', exact: true })).toBeVisible();

// すべてクリアの確認
await page.getByRole('link', { name: '全てクリア' }).click();
await expect(page.locator('select[name="maker"]')).toBeVisible();
await expect(page.locator('select[name="car"]')).toBeVisible();
await page.waitForTimeout(3000);

//1と2マージ
//日産、キューブを検索
  await page.locator('select[name="maker"]').selectOption('1015');
  await page.goto('https://devdlpro.proto-dataline.com/aa/aa.php#19c55c7b3931609d');
  await page.locator('select[name="car"]').selectOption('10152029');
  await page.goto('https://devdlpro.proto-dataline.com/aa/aa.php#19c55c7e1883035');
  await page.waitForTimeout(1000);
//await page.getByText('上記条件から検索 該当件数13,981件').click();
  await page.getByText('上記条件から検索 該当件数').click();
 await page.waitForTimeout(3000);

const targetTextprice1 = (await page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_price_num > b').first().textContent())?.trim();  
  console.log('ソート前、取得した１件目の金額の値の中身は:', targetTextprice1);
//金額でソート（昇順）
  await page.locator('.col_price_num > a').first().click();

// 1. 監視する要素を定義
const targetElement1 = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_price_num > b');
// 2. 【重要】更新処理で一瞬消えた要素が、再び画面に現れるのを待つ
await targetElement1.waitFor({ state: 'visible', timeout: 30000 });
// 3. テキストが「値1（古い値）」ではなくなるまで待機する
await expect(targetElement1).not.toHaveText(targetTextprice1, { timeout: 30000 });

const targetTextprice2 = (await page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_price_num').first().textContent())?.trim();  

// ▼▼▼ ここに追加：値が一致していない（変更された）ことを確認する ▼▼▼
console.log('ソート（昇順）後、取得した１件目の金額の値の中身は:', targetTextprice2);

expect(targetTextprice1).not.toBe(targetTextprice2);

// 金額でソート（降順）
await page.locator('.col_price_num > a:nth-child(3)').click();
await page.waitForTimeout(1000);

// 1. 監視する要素を定義
const targetElement2 = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_price_num');
// 2. 【重要】更新処理で一瞬消えた要素が、再び画面に現れるのを待つ
await targetElement2.waitFor({ state: 'visible', timeout: 30000 });
// 3. テキストが「値1（古い値）」ではなくなるまで待機する
await expect(targetElement2).not.toHaveText(targetTextprice2, { timeout: 30000 });

const targetTextprice3 = (await page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_price_num').first().textContent())?.trim();  

  console.log('ソート（降順）後、取得した１件目の金額の値の中身は:', targetTextprice3);
  expect(targetTextprice2).not.toBe(targetTextprice3);

  //金額でソートクリア
await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(1000);

// 1. 監視する要素を定義
const targetElement3 = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_price_num');
// 2. 【重要】更新処理で一瞬消えた要素が、再び画面に現れるのを待つ
await targetElement3.waitFor({ state: 'visible', timeout: 30000 });
// 3. テキストが「値1（古い値）」ではなくなるまで待機する
await expect(targetElement3).not.toHaveText(targetTextprice3, { timeout: 30000 });

  const targetTextprice4 = (await page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_price_num').first().textContent())?.trim();  
  console.log('ソート（クリア後）取得した１件目の金額の値の中身は:', targetTextprice4);
  expect(targetTextprice1).toBe(targetTextprice4);

//内装評価フィルタリング
  const targetTextnaisou1 = (await page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_i_value').first().textContent())?.trim();  
  console.log('内装フィルタなし１件目の値の中身は:', targetTextnaisou1);
//内装Bでフィルタリング
  await page.locator('select[name="filter_i_value"]').selectOption('B');
  await page.goto('https://devdlpro.proto-dataline.com/aa/aa.php#19c562c6ae4a7ab');
  await page.waitForTimeout(1000);
  const targetTextnaisou2 = (await page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_i_value').first().textContent())?.trim();  
  console.log('内装「B」フィルタ１件目の値の中身は:', targetTextnaisou2);
// ▼▼▼ ここに追加：値が「B」であることを確認する ▼▼▼
  expect(targetTextnaisou2).toBe('B');

//内装評価フィルタクリア
  await page.getByRole('link', { name: 'フィルタ解除' }).click();
  await page.waitForTimeout(1000);
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

await page.waitForTimeout(1000);
// 1. 監視する要素を定義
const targetElementMc1 = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_atype_nm.aa_font_size > p');
// 2. 【重要】更新処理で一瞬消えた要素が、再び画面に現れるのを待つ
await targetElementMc1.waitFor({ state: 'visible', timeout: 30000 });
// 3. テキストが「値1（古い値）」ではなくなるまで待機する
await expect(targetElementMc1).not.toHaveText(targetTextMc1, { timeout: 30000 });

  const targetTextMc2 = (await page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_atype_nm.aa_font_size > p').first().textContent())?.trim();  
  console.log('MC「前」フィルタ１件目の値の中身は:', targetTextMc2);
// ▼▼▼ ここに追加：値が「前」であることを確認する ▼▼▼
  expect(targetTextMc2).toBe('前');

//MCフィルタ解除
await page.getByRole('link', { name: 'フィルタ解除' }).click();
await page.waitForTimeout(1000);

// 1. 監視する要素を定義
const targetElementMc2 = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_atype_nm.aa_font_size > p');
// 2. 【重要】更新処理で一瞬消えた要素が、再び画面に現れるのを待つ
await targetElementMc2.waitFor({ state: 'visible', timeout: 30000 });
// 3. テキストが「値1（古い値）」ではなくなるまで待機する
await expect(targetElementMc2).not.toHaveText(targetTextMc2, { timeout: 30000 });

const targetTextMc3 = (await page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_atype_nm.aa_font_size > p').first().textContent())?.trim();  
  console.log('MCフィルタ解除後、１件目の値の中身は:', targetTextMc3);
// ▼▼▼ ここに追加：値が一致していることを確認する ▼▼▼
  expect(targetTextMc1).toBe(targetTextMc3);

//検索結果のページング
await page.getByRole('link', { name: '次へ>>' }).click();
await expect(page.getByText('件中 51 - 100件')).toBeVisible();
await page.getByRole('link', { name: '<<前へ' }).click();
await expect(page.getByText('件中 1 - 50件')).toBeVisible();
await page.getByRole('link', { name: '2', exact: true }).click();
await expect(page.getByText('件中 51 - 100件')).toBeVisible();
await page.getByRole('link', { name: '1', exact: true }).click();
await expect(page.getByText('件中 1 - 50件')).toBeVisible();
await page.getByRole('link', { name: '次のページを続けて表示する' }).click();
await expect(page.getByText('件中 51 - 100件')).toBeVisible();
await page.getByRole('link', { name: '1', exact: true }).click();
await expect(page.getByText('件中 1 - 50件')).toBeVisible();

//カスタマイズの確認　画像表示βにするため表示数を２つ非表示する
await page.getByText('カスタマイズ').click();
await page.locator('li:nth-child(4) > ._switch > ._btn').click();
await page.getByText('設定を保存').click();

await page.getByText('画像表示β').click();
await expect(page.getByText('画像').nth(3)).toBeVisible();
await page.getByText('画像非表示').click();
await expect(page.getByText('画像').nth(4)).toBeVisible();
//カスタマイズの確認　画像表示βにするため表示数を１つ非表示する　再度表示するための操作
await page.getByText('カスタマイズ').click();
await page.locator('._btn.js_soat_switch.is-off').first().click();
await page.getByText('設定を保存').click();
await page.getByText('カスタマイズ').click();
await expect(page.locator('li:nth-child(4) > ._switch > ._btn')).toBeVisible();
await page.locator('.soat_pop_close').click();

//メモ登録の確認
await page.getByRole('link', { name: 'メモ' }).click();
await expect(page.getByText('ＡＡ相場 日産_キューブ')).toBeVisible();
//メモ削除の確認
await page.locator('#xxx02').getByRole('link', { name: '×' }).click();
await expect(page.getByText('ＡＡ相場 日産_キューブ')).not.toBeVisible();

//グラフの確認
await page.getByRole('link', { name: 'グラフ' }).click();
await expect(page.locator('iframe[name^="fancybox-frame"]').contentFrame().getByRole('link', { name: 'クロス集計' })).toBeVisible({ timeout: 15000 });
await expect(page.locator('iframe[name^="fancybox-frame"]').contentFrame().locator('#aac-ct').contentFrame().getByRole('cell', { name: 'ヒット数に対する比率(％)：' })).toBeVisible();
//グラフの確認　AA落札率、卸売基準価格、クロス集計のタブを押下して内容が表示されること
await page.locator('iframe[name^="fancybox-frame"]').contentFrame().getByRole('link', { name: 'AA落札率' }).click();
await expect(page.locator('iframe[name^="fancybox-frame"]').contentFrame().locator('#aac-r').contentFrame().getByRole('cell', { name: 'AA落札率    ※赤文字は台数です' })).toBeVisible();
//グラフの確認　クロス集計のタブを押下して内容が表示されること
await page.locator('iframe[name^="fancybox-frame"]').contentFrame().getByRole('link', { name: '卸売基準価格' }).click();
await expect(page.locator('iframe[name^="fancybox-frame"]').contentFrame().locator('#aac-bp').contentFrame().getByRole('cell', { name: '卸売基準価格' })).toBeVisible();
await page.locator('iframe[name^="fancybox-frame"]').contentFrame().getByRole('link', { name: 'クロス集計' }).click();
await expect(page.locator('iframe[name^="fancybox-frame"]').contentFrame().locator('#aac-ct').contentFrame().getByRole('cell', { name: 'ヒット数に対する比率(％)：' })).toBeVisible();
await page.locator('iframe[name^="fancybox-frame"]').contentFrame().locator('#aac-ct-yaxis').selectOption('grade');
//グラフの確認　クロス集計のタブで、X軸を「色」に変更してグラフが表示されること
await page.locator('iframe[name^="fancybox-frame"]').contentFrame().locator('#aac-ct-show-btn').click();
await expect(page.locator('iframe[name^="fancybox-frame"]').contentFrame().getByText('グレ｜ド')).toBeVisible();
await page.locator('iframe[name^="fancybox-frame"]').contentFrame().locator('#aac-ct-xaxis').selectOption('color');
await page.locator('iframe[name^="fancybox-frame"]').contentFrame().locator('#aac-ct-show-btn').click();
await expect(page.locator('iframe[name^="fancybox-frame"]').contentFrame().locator('#aac-ct-xaxis-title')).toBeVisible();
//グラフの確認　クロス集計のタブで、X軸を「色」に変更してグラフが表示されること
const page2Promise = page.waitForEvent('popup');
  await page.locator('iframe[name^="fancybox-frame"]').contentFrame().getByRole('link', { name: '印刷' }).click();
  const page2 = await page2Promise;
await expect(page2.getByRole('cell', { name: '日産' })).toBeVisible();
await page2.getByText('キューブ').click();
await expect(page2.getByRole('cell', { name: 'ヒット数に対する比率(％)：' })).toBeVisible();
await page2.getByRole('button', { name: '閉じる' }).click();
await page.locator('#fancybox-close').click();

await page.getByRole('link', { name: '相場 分析' }).click();
// 完全一致で確認する場合
await expect(page).toHaveTitle('仕入リサーチ');
// ブラウザの「戻る」ボタンを押すのと同じ動作
//await page.goBack();
//ブラウザバックでは車種情報がとれないためAA相場ボタンを押下で調整
await page.getByRole('link', { name: 'AA相場' }).click();
// 完全一致で確認する場合
await expect(page).toHaveTitle('AA相場');

await page.getByRole('link', { name: '小売 相場' }).click();
// 完全一致で確認する場合
await expect(page).toHaveTitle('小売相場');
// ブラウザの「戻る」ボタンを押すのと同じ動作
//await page.goBack();
//ブラウザバックでは車種情報がとれないためAA相場小ボタンを押下で調整

await page.getByRole('link', { name: 'ＡＡ 相場' }).click();
// 完全一致で確認する場合
await expect(page).toHaveTitle('AA相場');

//修復歴詳細を表示
await page.getByRole('link', { name: '修復歴詳細' }).click();
await expect(page.getByRole('link', { name: '通常データに戻る' })).toBeVisible();

//評価（外）が無効化されていることを確認
// クラス名に "disabled" が含まれているか確認する
// 1つ目（開始側: s_out_kantei_aa）が無効か確認
await expect(page.locator('select[name="s_out_kantei_aa"]')).toBeDisabled();

// 2つ目（終了側: e_out_kantei_aa）も無効か確認（必要であれば）
await expect(page.locator('select[name="e_out_kantei_aa"]')).toBeDisabled();

await page.getByText('＋ 詳細検索').click();

//修復歴エリアの設定が無効であることを確認
// 修復歴の「不問」を特定するために .nth(1) を追加
await expect(page.locator('tr').filter({ hasText: '修復歴' }).getByText('不問').nth(1)).toHaveClass(/disabled/);
// 修復歴の「有」を特定するために .nth(1) を追加
await expect(page.locator('tr').filter({ hasText: '修復歴' }).getByText('有').nth(1)).toHaveClass(/disabled/);
// 修復歴の「無」を特定するために .nth(1) を追加
await expect(page.locator('tr').filter({ hasText: '修復歴' }).getByText('無').nth(1)).toHaveClass(/disabled/);

//出品画像エリアの設定が無効であることを確認
// 修復歴の「不問」を特定するために .nth(1) を追加
await expect(page.locator('tr').filter({ hasText: '出品画像' }).getByText('不問').first()).toHaveClass(/disabled/);
// 修復歴の「有」を特定するために .nth(1) を追加
await expect(page.locator('tr').filter({ hasText: '出品画像' }).getByText('有').first()).toHaveClass(/disabled/);
// 修復歴の「無」を特定するために .nth(1) を追加
await expect(page.locator('tr').filter({ hasText: '出品画像' }).getByText('無').first()).toHaveClass(/disabled/);

//カスタマイズボタンが非表示であることを確認
await expect(page.getByRole('button', { name: 'カスタマイズ' })).not.toBeVisible();

//画像表示βボタンが非表示であることを確認
await expect(page.getByRole('button', { name: '画像表示β' })).not.toBeVisible();

// お気に入り登録、削除の確認
await page.getByRole('link', { name: 'お気に入り' }).click();
page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
// ① 邪魔をしている既存のダイアログ設定（共通設定など）を一度リセットする
page.removeAllListeners('dialog');
// ① ダイアログが表示されたら「OK」を押す設定をあらかじめ行う
page.once('dialog', async dialog => {
    console.log(`ダイアログ内容: ${dialog.message()}`); // ログにメッセージを出力（確認用）
    await dialog.accept(); // ★ここで「OK」ボタンを押下します
});
  // await page.getByRole('link', { name: '削除' }).first().click();
await page.getByRole('link', { name: '削除' }).first().click();
await page.waitForTimeout(1000);

await page.locator('#favorite').getByRole('link', { name: 'お気に入り' }).click();

await expect(page.getByRole('cell', { name: '日産' }).nth(1)).toBeVisible();
await expect(page.getByRole('cell', { name: 'キューブ' }).nth(1)).toBeVisible();
await page.waitForTimeout(1000);
await page.getByRole('link', { name: '全てクリア' }).click({ timeout: 15000 });
await page.waitForTimeout(1000);
await page.getByRole('link', { name: 'お気に入り' }).first().click({ timeout: 15000 });
await page.waitForTimeout(1000);
await page.getByRole('link', { name: '選択', exact: true }).first().click();
await expect(page.locator('select[name="maker"]')).toBeVisible();
await expect(page.locator('select[name="car"]')).toBeVisible();
await page.getByRole('link', { name: '全てクリア' }).click();

// AA相場検索－検索履歴の確認
await page.waitForTimeout(3000);
await page.getByRole('link', { name: '検索履歴' }).first().click({ timeout: 15000 });
await page.waitForTimeout(3000);

await expect(page.getByRole('heading', { name: '検索履歴' })).toBeVisible({ timeout: 15000 });

await page.waitForTimeout(1000);
// await page.evaluate(() => window.scrollTo(0, 0));

await expect(page.getByRole('cell', { name: '日産' }).first()).toBeVisible({ timeout: 15000 });
await expect(page.getByRole('cell', { name: 'キューブ' }).first()).toBeVisible();

await page.getByRole('link', { name: '選択', exact: true }).first().click();
await expect(page.locator('select[name="maker"]')).toBeVisible();
await expect(page.locator('select[name="car"]')).toBeVisible();

// await page.evaluate(() => window.scrollTo(0, 0));

await page.waitForTimeout(3000);
await page.getByRole('link', { name: '検索履歴' }).first().click({ timeout: 15000 });
await page.waitForTimeout(3000);
await expect(page.getByRole('heading', { name: '検索履歴' })).toBeVisible();

await page.waitForTimeout(3000);
// ページングの確認
await page.getByRole('link', { name: '次へ>>' }).click();
await expect(page.getByRole('cell', { name: '51', exact: true })).toBeVisible();
await page.getByRole('link', { name: '<<前へ' }).click();
await expect(page.getByRole('cell', { name: '1', exact: true })).toBeVisible();
await page.getByRole('link', { name: '2' }).click();
await expect(page.getByRole('cell', { name: '51', exact: true })).toBeVisible();
await page.getByRole('link', { name: '1' }).click();
await expect(page.getByRole('cell', { name: '1', exact: true })).toBeVisible();

// AA相場検索－検索履歴の確認
await page.waitForTimeout(2000);
await page.getByRole('link', { name: '選択', exact: true }).first().click();

//印刷プレビュー表示
const page3Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '印刷' }).click();
  const page3 = await page3Promise;
//メーカー・車種で確認
await expect(page3.getByRole('cell', { name: '日産' })).toBeVisible();
await expect(page3.getByText('キューブ')).toBeVisible();
await page3.getByRole('button', { name: '閉じる' }).click();
//修復歴詳細から通常データに戻る
await page.getByRole('link', { name: '通常データに戻る' }).click();
await expect(page.getByRole('link', { name: '修復歴詳細' })).toBeVisible();

await expect(page.locator('select[name="s_out_kantei_aa"]')).toBeVisible();
await expect(page.locator('select[name="e_out_kantei_aa"]')).toBeVisible();

// 1. 「詳細を閉じる」ボタンが現在見えているか確認する（true か false が返ります）
// ※もしボタンが複数ある可能性があるなら .first() をつけておくと安全です
const isDetailsOpen = await page.getByText('詳細を閉じる').first().isVisible();

// 2. もし見えていなければ（falseなら）、詳細が開いていないので「詳細検索」をクリックする
if (!isDetailsOpen) {
  console.log('詳細が開いていないため、ボタンを押します');
  await page.getByText('詳細検索').click();
} else {
  console.log('すでに詳細が開いているため、何もしません');
}

// label[for="accident"] が修復歴の「不問」です
await expect(page.locator('label[for="accident"]')).toHaveClass(/checked/);
//出品画像が「不問」を選択
await expect(page.locator('tr:nth-child(7) > td:nth-child(6) > .aa_radio > .left')).toBeVisible();

//全てクリア押下
await page.getByRole('link', { name: '全てクリア' }).click({ timeout: 30000 });
await page.waitForTimeout(5000);

//修復歴詳細ボタン押下
await page.getByRole('link', { name: '修復歴詳細' }).click({ timeout: 30000 });
//「通常データに戻る」を表示
await expect(page.getByRole('link', { name: '通常データに戻る' })).toBeVisible({ timeout: 30000 });
//メーカー・車種選択：日産、キューブ
await page.locator('select[name="maker"]').selectOption('1015');
await page.goto('https://devdlpro.proto-dataline.com/aa/aa.php#19c69d1f30f152f7');
await page.locator('select[name="car"]').selectOption('10152029');
await page.goto('https://devdlpro.proto-dataline.com/aa/aa.php#19c69d206c0554d');

await page.waitForTimeout(3000);
//上記条件から検索ボタン押下
await page.getByText('上記条件から検索 該当件数').click();

//修復歴詳細＞金額１件目の値を格納
  const targetTextprice11 = (await page.locator('#result_body_r > table > tbody > tr:nth-child(1) > td.col_price_r.pad_r2').first().textContent())?.trim();  
  console.log('ソート前、取得した１件目の金額の値の中身は:', targetTextprice11);
//金額でソート（昇順）

await page.locator('th:nth-child(24) > a').first().click();
  await page.waitForTimeout(3000);
  const targetTextprice22 = (await page.locator('#result_body_r > table > tbody > tr:nth-child(1) > td.col_price_r.pad_r2').first().textContent())?.trim();  
  console.log('ソート（昇順）後、取得した１件目の金額の値の中身は:', targetTextprice22);
// ▼▼▼ ここに追加：値が一致していない（変更された）ことを確認する ▼▼▼
expect(targetTextprice11).not.toBe(targetTextprice22);

//金額でソート（降順）

await page.locator('th:nth-child(24) > a:nth-child(3)').click();
  await page.waitForTimeout(2000);
  const targetTextprice33 = (await page.locator('#result_body_r > table > tbody > tr:nth-child(1) > td.col_price_r.pad_r2 > b').first().textContent())?.trim();  

  console.log('ソート（降順）後、取得した１件目の金額の値の中身は:', targetTextprice33);
  expect(targetTextprice22).not.toBe(targetTextprice33);

  //金額でソートクリア

  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(2000);
  const targetTextprice44 = (await page.locator('#result_body_r > table > tbody > tr:nth-child(1) > td.col_price_r.pad_r2 > b').first().textContent())?.trim();  
  console.log('ソート（クリア後）取得した１件目の金額の値の中身は:', targetTextprice44);
  expect(targetTextprice11).toBe(targetTextprice44);

//車体色フィルタリング
  const targetTextshataishoku1 = (await page.locator('#result_body_r > table > tbody > tr:nth-child(1) > td.col_color_nm_r').first().textContent())?.trim();  
  console.log('内装フィルタなし1件目の値の中身は:', targetTextshataishoku1);

  //車体色シルバーでフィルタリング
await page.locator('select[name="filter_color_nm"]').selectOption('シルバー');
await page.goto('https://devdlpro.proto-dataline.com/aa/aa.php#19c69fa44dc3512');
await page.waitForTimeout(2000);
  const targetTextshataishoku2 = (await page.locator('#result_body_r > table > tbody > tr:nth-child(1) > td.col_color_nm_r').first().textContent())?.trim();  
  console.log('車体色「シルバー」フィルタ１件目の値の中身は:', targetTextshataishoku2);
// ▼▼▼ ここに追加：値が「シルバー」であることを確認する ▼▼▼
  expect(targetTextshataishoku2).toBe('シルバー');

//車体色フィルタクリア
  await page.getByRole('link', { name: 'フィルタ解除' }).click();

// ▼【追加】ターゲットの行が「表示（visible）」されるまで最大30秒待つ
const targetLocator = page.locator('#result_body_r > table > tbody > tr:nth-child(1) > td.col_color_nm_r').first();
await targetLocator.waitFor({ state: 'visible', timeout: 30000 });

// targetLocator の中身が targetTextshataishoku1（パール）になるまで、最大30秒間リトライしながら待つ
await expect(targetLocator).toHaveText(targetTextshataishoku1, { timeout: 30000 });

// ※変数 targetTextshataishoku3 を作る必要はなくなります
console.log('内装フィルタ解除後、１件目の値の中身は:', targetLocator);
  
  //MCフィルタリング
  const targetTextMc11 = (await page.locator('#result_body_r > table > tbody > tr:nth-child(1) > td.col_atype_nm_r').first().textContent())?.trim();  
  console.log('MCフィルタなし１件目の値の中身は:', targetTextMc11);
//MC 前でフィルタリング

await page.locator('select[name="filter_atype_nm"]').selectOption('後');
await page.goto('https://devdlpro.proto-dataline.com/aa/aa.php#19c6a273af014e68');

await page.waitForTimeout(5000);
  const targetTextMc22 = (await page.locator('#result_body_r > table > tbody > tr:nth-child(1) > td.col_atype_nm_r').first().textContent())?.trim();  
  console.log('MC「後」フィルタ１件目の値の中身は:', targetTextMc22);
// ▼▼▼ ここに追加：値が「後」であることを確認する ▼▼▼
  expect(targetTextMc22).toBe('後');

//MCフィルタ解除
await page.getByRole('link', { name: 'フィルタ解除' }).click();
await page.waitForTimeout(5000);
  const targetTextMc33 = (await page.locator('#result_body_r > table > tbody > tr:nth-child(1) > td.col_atype_nm_r').first().textContent())?.trim();  
  console.log('MCフィルタ解除後、１件目の値の中身は:', targetTextMc33);
// ▼▼▼ ここに追加：値が一致していることを確認する ▼▼▼
  expect(targetTextMc11).toBe(targetTextMc33);

//検索結果のページング
await page.getByRole('link', { name: '次へ>>' }).click();
await expect(page.getByText('件中 51 - 100件')).toBeVisible();
await page.getByRole('link', { name: '<<前へ' }).click();
await expect(page.getByText('件中 1 - 50件')).toBeVisible();
await page.getByRole('link', { name: '2', exact: true }).click();
await expect(page.getByText('件中 51 - 100件')).toBeVisible();
await page.getByRole('link', { name: '1', exact: true }).click();
await expect(page.getByText('件中 1 - 50件')).toBeVisible();
await page.getByRole('link', { name: '次のページを続けて表示する' }).click();
await expect(page.getByText('件中 51 - 100件')).toBeVisible();
await page.getByRole('link', { name: '1', exact: true }).click();
await expect(page.getByText('件中 1 - 50件')).toBeVisible();

//外装条件「ポイント」1～99を選択
await page.locator('select[name="s_out_point"]').selectOption('1');
await page.locator('select[name="e_out_point"]').selectOption('99');
//外装条件「レベル」小～小を選択
await page.locator('select[name="s_level"]').selectOption('1');
await page.locator('select[name="e_level"]').selectOption('1');
//「この条件で絞り込む」を押下する
await page.getByRole('link', { name: 'この条件で絞り込む' }).click();
//レベルに”小”が選択されていることを確認
await expect(page.locator('#result_body_r > table > tbody > tr:nth-child(1) > td.col_level_r')).toHaveText('小');

//「クリア」ボタンを押下する
await page.getByRole('link', { name: 'クリア', exact: true }).click();
//ポイント項目が空白であることを確認
await expect(page.locator('#Condition > table > tbody > tr > td:nth-child(3) > select:nth-child(1)')).toHaveValue('');
//「通常データに戻る」を押下する
await page.getByRole('link', { name: '通常データに戻る' }).click();
//修復歴詳細が表示されることを確認
await page.waitForTimeout(2000);
await expect(page.getByRole('link', { name: '修復歴詳細' })).toBeVisible();
//「型式・類別から検索」ボタンを押下する
await page.getByRole('link', { name: '型式・類別から検索' }).click();
// グレード検索へ遷移＞完全一致で確認する場合
await expect(page).toHaveTitle('グレード検索');

//ブラウザバックする⇒自動化ではAA相場を押下する
await page.getByRole('link', { name: 'AA相場' }).click();
await page.goto('https://devdlpro.proto-dataline.com/aa/aa.php');
// AA相場へ遷移＞完全一致で確認する場合
await expect(page).toHaveTitle('AA相場');

});
