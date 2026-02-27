//custom-test.tsを使用
import { test, expect } from '../custom-test';
//import { test, expect } from '@playwright/test';
//DLP回帰テスト-AA相場検索-グレード検索＞AA相場検索
//ログイン画面
test('test', async ({ page }) => {
// ▼ この行を追加（テストの制限時間を180秒に変更）
  test.setTimeout(240000);

  //ログイン画面へ遷移
  await page.goto('https://devdlpro.proto-dataline.com/top/top.php');
  await page.getByRole('textbox', { name: 'ログインID' }).click();
  await page.getByRole('textbox', { name: 'ログインID' }).fill('tst0002');
  
  // パスワードにtst0002を入力
  await page.getByRole('textbox', { name: 'ログインID' }).press('Tab');
  await page.getByRole('textbox', { name: 'パスワード' }).fill('tst0002');
  await page.getByRole('button', { name: 'ログイン' }).click();
  await page.waitForLoadState('networkidle');

  // アイコン「仕入リサーチ」を押下
  await page.getByRole('link', { name: '仕入リサーチ' }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500);

  // 仕入リサーチへ遷移＞タブ名完全一致で確認する場合
  await expect(page).toHaveTitle('仕入リサーチ');

  //車両検索条件を設定する
  //メーカー：トヨタ
  await page.locator('select[name="maker"]').selectOption('1010');
  await page.goto('https://devdlpro.proto-dataline.com/stock/stock.php#19c93c05ab2be2a');
  //車種：アクア
  await page.locator('select[name="car"]').selectOption('10101073');
  await page.goto('https://devdlpro.proto-dataline.com/stock/stock.php#19c93c06dcac7cf');
  //型式：NHP10
  await page.locator('select[name="type[]"]').selectOption('13');
  await page.goto('https://devdlpro.proto-dataline.com/stock/stock.php#19c93c09acd3fde');
  //グレード：G
  await page.locator('select[name="grade[]"]').selectOption('10');
  await page.goto('https://devdlpro.proto-dataline.com/stock/stock.php#19c93c0af1eef92');
  //年式：2012年から
  await page.locator('select[name="s_year"]').selectOption('2012');
  //年式：2022年まで
  await page.locator('select[name="e_year"]').selectOption('2022');
  //修復歴：無
  await page.locator('select[name="accident"]').selectOption('1');

  //仕入リサーチ＞検索条件を全項目設定する
  //平均AA価格：300千円から
  await page.locator('#any_input > tbody > tr:nth-child(1) > td.input_field01.b_top input').first().fill('300');
  //平均AA価格：9000千円まで
  await page.locator('#any_input > tbody > tr:nth-child(1) > td:nth-child(4) > span > label').first().fill('9000');
  //AA落札率：50％から
  await page.locator('#any_input > tbody > tr:nth-child(2) > td.input_field01.b_bottom > span > label').first().fill('50');
  //AA落札率：80％まで
  await page.locator('#any_input > tbody > tr:nth-child(2) > td:nth-child(4) > span > label').first().fill('80');
  //AA出品台数：1台から
  await page.locator('#any_input > tbody > tr:nth-child(2) > td.input_field02.b_bottom.b_right > span > label').first().fill('1');
  //AA出品台数：500台まで
  await page.locator('#any_input > tbody > tr:nth-child(2) > td:nth-child(8) > span > label').first().fill('500');
  //平均小売本体価格：10千円から
  await page.locator('#any_input > tbody > tr:nth-child(4) > td.input_field01.b_top > span > label').first().fill('10');
  //平均小売本体価格：9000千円まで
  await page.locator('#any_input > tbody > tr:nth-child(4) > td:nth-child(4) > span > label').first().fill('9000');
  //平均小売支払価格：10千円から
  await page.locator('#any_input > tbody > tr:nth-child(5) > td.input_field01.b_top > span > label').first().fill('10');
  //平均小売支払価格：9900千円まで
  await page.locator('#any_input > tbody > tr:nth-child(5) > td:nth-child(4) > span > label').first().fill('9900');
  //在庫期間：1日から
  await page.locator('#any_input > tbody > tr:nth-child(6) > td.input_field01.b_center > span > label').first().fill('1');
  //在庫期間：300日まで
  await page.locator('#any_input > tbody > tr:nth-child(6) > td:nth-child(4) > span > label').first().fill('300');
  //小売成約率：50％
  await page.locator('#any_input > tbody > tr:nth-child(7) > td.input_field01.b_bottom > span > label').first().fill('50');
  //小売成約率：90％
  await page.locator('#any_input > tbody > tr:nth-child(7) > td:nth-child(4) > span > label').first().fill('90');
  //小売掲載台数：1台から
  await page.locator('#any_input > tbody > tr:nth-child(7) > td.input_field02.b_bottom.b_right > span > label').first().fill('1');
  //小売掲載台数：2000台まで
  await page.locator('#any_input > tbody > tr:nth-child(7) > td:nth-child(8) > span > label').first().fill('2000');
  //粗利（本体）：100千円から
  await page.locator('#any_input > tbody > tr:nth-child(9) > td.input_field01 > span > label').first().fill('100');
  //粗利（本体）：500千円まで
  await page.locator('#any_input > tbody > tr:nth-child(9) > td:nth-child(4) > span > label').first().fill('500');
  //粗利（総額）：100千円から
  await page.locator('#any_input > tbody > tr:nth-child(10) > td.input_field01 > span > label').first().fill('100');
  //粗利（総額）：500千円まで
  await page.locator('#any_input > tbody > tr:nth-child(10) > td:nth-child(4) > span > label').first().fill('500');
   
//検索押下
await page.getByRole('link', { name: '検 索' }).click();

//仕入リサーチ＞検索条件が一致していることを確認する
// 1. 表のデータ部分（tbodyの中のtr）の「1件目」を狙い撃ちする
let firstRow = page.locator('tbody tr').first();
// 2. その1件目の行の中に、必要な文字がすべて含まれていることを確認する
await expect(firstRow).toContainText('トヨタ');
await expect(firstRow).toContainText('アクア');
await expect(firstRow).toContainText('NHP10');
await expect(firstRow).toContainText('Ｇ');
console.log('仕入リサーチ＞車両検索条件「メーカー：トヨタ　車種：アクア　型式：NHP10　グレード：G」が一致していることを確認');

console.log('仕入リサーチ＞詳細検索条件が一致していることを確認');
//検索結果一覧1件目が検索条件に一致していることを確認
// 1. （1件目の平均AA価格など）から、文字（例: "300,000"）を取得する
let priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_aa_avg > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
let priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した平均AA価格（300<=>9000）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(300);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(9000);

// 1. （1件目のAA落札率など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_aa_raku_rate > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得したAA落札率（50<=>80）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(50);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(80);

// 1. （1件目のAA台数など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_aa_number > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得したAA台数（1<=>500）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(1);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(500);

// 1. （1件目の平均小売本体価格など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_goo_avg > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した平均小売本体価格（10<=>9000）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(10);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(9000);

// 1. （1件目の平均小売支払総額など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_goo_total_avg > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した平均小売支払総額（10<=>9900）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(10);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(9900);

// 1. （1件目の在庫期間など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_goo_zaiko > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した在庫期間（1<=>300）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(1);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(300);

// 1. （1件目の小売成約率など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_goo_sold_rate > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した小売成約率（50<=>90）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(50);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(90);

// 1. （1件目の小売掲載台数など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_goo_number > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した小売掲載台数（1<=>2000）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(1);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(2000);

// 1. （1件目の粗利（本体）など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_gross_profit > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した粗利（本体）（100<=>500）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(100);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(500);

// 1. （1件目の粗利（総額）など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_gross_profit_total > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した粗利（総額）（100<=>500）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(100);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(500);

  //印刷プレビュー表示
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '印刷' }).click();
  const page1 = await page1Promise;

  // 指定したセル（4行目の3列目）の中に「検索条件」文字が含まれていることを確認する！
  await expect(page1.locator('#print_search > table > tbody > tr:nth-child(4) > td:nth-child(3)')).toContainText('本体価格：10 千円〜 9000千円');
  await expect(page1.locator('#print_search > table > tbody > tr:nth-child(4) > td:nth-child(3)')).toContainText('支払総額：10 千円〜 9900千円');
console.log('仕入リサーチ＞印刷プレビュー表示＞検索条件：平均小売価格が一致することを確認');

  //印刷プレビューを閉じる
  await page1.getByRole('button', { name: '閉じる' }).click();

// 「表の中にある col_s_aa のリンク」をすべて探し、その中の「1件目（first）」「AA」をクリックする
await page.locator('#result_body tbody tr td.col_s_aa a').first().click();

// AA相場へ遷移＞タブ名完全一致で確認する場合
await expect(page).toHaveTitle('AA相場');
console.log('仕入リサーチ＞検索結果一覧＞AAリンクを押下＞AA相場へ遷移することを確認');

//AA相場へ遷移後、検索条件を保持し結果一覧を表示していることを確認
// 1. グレードの1件目が「Ｇ（全角）」であることを確認する
await expect(page.locator('td.col_grade_nm').first()).toHaveText('Ｇ');
// 2. 型式の1件目が「NHP10（半角）」であることを確認する
await expect(page.locator('td.col_type_nm').first()).toHaveText('NHP10');
console.log('AA相場へ遷移＞検索結果一覧＞型式：NHP10、グレード：G、検索条件が引き継がれていることを確認');

//AA相場からブラウザバック＞仕入リサーチへ遷移することを確認
// ブラウザの「戻る（←）」ボタンを押す
await page.goBack();
// 仕入リサーチへ遷移＞タブ名完全一致で確認する場合
await expect(page).toHaveTitle('仕入リサーチ');
console.log('AA相場からブラウザバック＞遷移前画面である仕入リサーチへ遷移することを確認');

// 「表の中にある col_s_小売 のリンク」をすべて探し、その中の「1件目（first）」「小売」をクリックする
await page.locator('#result_body > table > tbody > tr > td.col_s_retail > a').first().click();

// 小売相場へ遷移＞タブ名完全一致で確認する場合
await expect(page).toHaveTitle('小売相場');
console.log('仕入リサーチ＞検索結果一覧＞小売リンクを押下＞小売相場へ遷移することを確認');

//小売相場へ遷移後、検索条件を保持し結果一覧を表示していることを確認
// 1. グレードの1件目が「Ｇ（全角）」であることを確認する
await expect(page.locator('td.col_p_grade_nm_n').first()).toHaveText('Ｇ');
// 2. 型式の1件目が「NHP10（半角）」であることを確認する
await expect(page.locator('td.col_p_katashiki_nm').first()).toHaveText('NHP10');
console.log('小売相場へ遷移＞検索結果一覧＞型式：NHP10、グレード：G、検索条件が引き継がれていることを確認');

//小売相場からブラウザバック＞仕入リサーチへ遷移することを確認
// ブラウザの「戻る（←）」ボタンを押す
await page.goBack();
// 仕入リサーチへ遷移＞タブ名完全一致で確認する場合
await expect(page).toHaveTitle('仕入リサーチ');
console.log('小売相場からブラウザバック＞遷移前画面である仕入リサーチへ遷移することを確認');

// お気に入り登録、削除の確認
await page.getByRole('link', { name: 'お気に入り' }).click();
await page.waitForTimeout(1000);
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
await page.locator('#favorite').getByRole('link', { name: 'お気に入り' }).click();
await expect(page.getByRole('cell', { name: 'トヨタ' }).nth(1)).toBeVisible();
await expect(page.getByRole('cell', { name: 'アクア' }).nth(1)).toBeVisible();

//全てクリアを押下する
// 1. 「全てクリア」ボタンをクリック
await page.getByRole('link', { name: '全てクリア' }).click();
// 2. 検索条件の型式テキストボックスが空になるまで待つ
await expect(page.locator('#F2_1 > select')).toHaveValue('');

await page.getByRole('link', { name: 'お気に入り' }).first().click({ timeout: 15000 });
await page.waitForTimeout(1000);
await page.getByRole('link', { name: '選択', exact: true }).first().click();
await page.waitForTimeout(1000);

//仕入リサーチ＞お気に入り＞「選択」後、検索結果一覧＞車両検索条件が一致することを確認
// 1. 表のデータ部分（tbodyの中のtr）の「1件目」を狙い撃ちする
firstRow = page.locator('tbody tr').first();
// 2. その1件目の行の中に、必要な文字がすべて含まれていることを確認する
await expect(firstRow).toContainText('トヨタ');
await expect(firstRow).toContainText('アクア');
await expect(firstRow).toContainText('NHP10');
await expect(firstRow).toContainText('Ｇ');
console.log('仕入リサーチ＞お気に入り＞車両検索条件「メーカー：トヨタ　車種：アクア　型式：NHP10　グレード：G」が一致していることを確認');

//仕入リサーチ＞お気に入り＞「選択」後、検索結果一覧＞詳細検索条件が一致することを確認
console.log('仕入リサーチ＞お気に入り＞詳細検索条件が一致していることを確認');
//検索結果一覧1件目が検索条件に一致していることを確認
// 1. （1件目の平均AA価格など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_aa_avg > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した平均AA価格（300<=>9000）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(300);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(9000);

// 1. （1件目のAA落札率など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_aa_raku_rate > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得したAA落札率（50<=>80）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(50);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(80);

// 1. （1件目のAA台数など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_aa_number > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得したAA台数（1<=>500）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(1);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(500);

// 1. （1件目の平均小売本体価格など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_goo_avg > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した平均小売本体価格（10<=>9000）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(10);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(9000);

// 1. （1件目の平均小売支払総額など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_goo_total_avg > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した平均小売支払総額（10<=>9900）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(10);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(9900);

// 1. （1件目の在庫期間など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_goo_zaiko > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した在庫期間（1<=>300）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(1);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(300);

// 1. （1件目の小売成約率など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_goo_sold_rate > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した小売成約率（50<=>90）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(50);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(90);

// 1. （1件目の小売掲載台数など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_goo_number > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した小売掲載台数（1<=>2000）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(1);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(2000);

// 1. （1件目の粗利（本体）など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_gross_profit > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した粗利（本体）（100<=>500）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(100);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(500);

// 1. （1件目の粗利（総額）など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_gross_profit_total > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した粗利（総額）（100<=>500）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(100);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(500);


// 仕入リサーチ＞検索履歴の確認
await page.waitForTimeout(1000);
await page.getByRole('link', { name: '検索履歴' }).first().click({ timeout: 15000 });

// '登録した検索条件は' という文字が見えるようになるまで待つ（デフォルト30秒）
await expect(page.getByText('検索履歴から条件を')).toBeVisible({ timeout: 30000 });
//検索履歴一覧を表示
await expect(page.getByRole('heading', { name: '検索履歴' })).toBeVisible({ timeout: 15000 });
await page.waitForTimeout(1000);
//検索履歴＞1件目データ＞メーカー：トヨタ、車種：アクアであることを確認
await expect(page.getByRole('cell', { name: 'トヨタ' }).first()).toBeVisible({ timeout: 15000 });
await expect(page.getByRole('cell', { name: 'アクア' }).first()).toBeVisible();
//検索履歴＞1件目データを選択する
await page.getByRole('link', { name: '選択', exact: true }).first().click();

//仕入リサーチ＞検索履歴＞「選択」後、検索結果一覧＞車両検索条件が一致することを確認
// 1. 表のデータ部分（tbodyの中のtr）の「1件目」を狙い撃ちする
firstRow = page.locator('tbody tr').first();
// 2. その1件目の行の中に、必要な文字がすべて含まれていることを確認する
await expect(firstRow).toContainText('トヨタ');
await expect(firstRow).toContainText('アクア');
await expect(firstRow).toContainText('NHP10');
await expect(firstRow).toContainText('Ｇ');
console.log('仕入リサーチ＞検索履歴＞車両検索条件「メーカー：トヨタ　車種：アクア　型式：NHP10　グレード：G」が一致していることを確認');

//仕入リサーチ＞検索履歴＞「選択」後、検索結果一覧＞詳細検索条件が一致することを確認
console.log('仕入リサーチ＞検索履歴＞詳細検索条件が一致していることを確認');
//検索結果一覧1件目が検索条件に一致していることを確認
// 1. （1件目の平均AA価格など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_aa_avg > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した平均AA価格（300<=>9000）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(300);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(9000);

// 1. （1件目のAA落札率など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_aa_raku_rate > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得したAA落札率（50<=>80）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(50);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(80);

// 1. （1件目のAA台数など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_aa_number > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得したAA台数（1<=>500）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(1);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(500);

// 1. （1件目の平均小売本体価格など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_goo_avg > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した平均小売本体価格（10<=>9000）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(10);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(9000);

// 1. （1件目の平均小売支払総額など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_goo_total_avg > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した平均小売支払総額（10<=>9900）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(10);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(9900);

// 1. （1件目の在庫期間など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_goo_zaiko > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した在庫期間（1<=>300）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(1);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(300);

// 1. （1件目の小売成約率など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_goo_sold_rate > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した小売成約率（50<=>90）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(50);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(90);

// 1. （1件目の小売掲載台数など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_goo_number > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した小売掲載台数（1<=>2000）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(1);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(2000);

// 1. （1件目の粗利（本体）など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_gross_profit > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した粗利（本体）（100<=>500）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(100);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(500);

// 1. （1件目の粗利（総額）など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_gross_profit_total > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した粗利（総額）（100<=>500）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(100);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(500);

await page.waitForTimeout(1000);
//await page.getByRole('link', { name: '検索履歴' }).first().click({ timeout: 15000 });

// 1. ボタン（またはリンク）を定義
let historyButton = page.getByRole('link', { name: '検索履歴' });
// 2. ボタンが操作可能（VisibleかつEnabled）になるまで待つ
await historyButton.waitFor({ state: 'visible', timeout: 30000 });
// 3. クリックする
await historyButton.click();

// '登録した検索条件は' という文字が見えるようになるまで待つ（デフォルト30秒）
await expect(page.getByText('検索履歴から条件を')).toBeVisible({ timeout: 30000 });

await page.waitForTimeout(1000);
await expect(page.getByRole('heading', { name: '検索履歴' })).toBeVisible();

await page.waitForTimeout(1000);
// 検索履歴ページングの確認
await page.getByRole('link', { name: '次へ>>' }).click();
await page.getByText('件中 51 -').waitFor();
await page.getByRole('link', { name: '<<前へ' }).click();
await page.getByText('件中 1 -').waitFor();
//await page.getByRole('link', { name: '2' }).click();
await page.locator('#btnarea > tbody > tr > td > ul > li:nth-child(3) > a').click();
await page.getByText('件中 51 -').waitFor();
//await page.getByRole('link', { name: '1' }).click();
await page.locator('#btnarea > tbody > tr > td > ul > li:nth-child(2)').click();
await page.getByText('件中 1 -').waitFor();

// すべてクリアの確認
await page.getByRole('link', { name: '全てクリア' }).click();
await expect(page.locator('select[name="maker"]')).toBeVisible();
await expect(page.locator('select[name="car"]')).toBeVisible();
await page.waitForTimeout(3000);

  //検索条件指定＞全てがデフォルト設定であることを確認
  await expect(page.getByText('全て', { exact: true })).toBeVisible();
  //国産を指定する
  await page.getByText('国産').click();
  
  //ボディタイプ＞クーペ・スポーツ・スペシャリティを選択する
  await page.locator('select[name="body_type"]').selectOption('1');
  //修復歴：無を選択する
  await page.locator('select[name="accident"]').selectOption('1');
console.log('国産＞クーペ・スポーツ・スペシャリティ＞修復歴：無＞を設定');

//仕入リサーチ＞検索条件を全項目設定する
  //平均AA価格：300千円から
  await page.locator('#any_input > tbody > tr:nth-child(1) > td.input_field01.b_top input').first().fill('300');
  //平均AA価格：9000千円まで
  await page.locator('#any_input > tbody > tr:nth-child(1) > td:nth-child(4) > span > label').first().fill('9000');
  //AA落札率：50％から
  await page.locator('#any_input > tbody > tr:nth-child(2) > td.input_field01.b_bottom > span > label').first().fill('50');
  //AA落札率：80％まで
  await page.locator('#any_input > tbody > tr:nth-child(2) > td:nth-child(4) > span > label').first().fill('80');
  //AA出品台数：1台から
  await page.locator('#any_input > tbody > tr:nth-child(2) > td.input_field02.b_bottom.b_right > span > label').first().fill('1');
  //AA出品台数：500台まで
  await page.locator('#any_input > tbody > tr:nth-child(2) > td:nth-child(8) > span > label').first().fill('500');
  //平均小売本体価格：10千円から
  await page.locator('#any_input > tbody > tr:nth-child(4) > td.input_field01.b_top > span > label').first().fill('10');
  //平均小売本体価格：9000千円まで
  await page.locator('#any_input > tbody > tr:nth-child(4) > td:nth-child(4) > span > label').first().fill('9000');
  //平均小売支払価格：10千円から
  await page.locator('#any_input > tbody > tr:nth-child(5) > td.input_field01.b_top > span > label').first().fill('10');
  //平均小売支払価格：9900千円まで
  await page.locator('#any_input > tbody > tr:nth-child(5) > td:nth-child(4) > span > label').first().fill('9900');
  //在庫期間：1日から
  await page.locator('#any_input > tbody > tr:nth-child(6) > td.input_field01.b_center > span > label').first().fill('1');
  //在庫期間：300日まで
  await page.locator('#any_input > tbody > tr:nth-child(6) > td:nth-child(4) > span > label').first().fill('300');
  //小売成約率：50％
  await page.locator('#any_input > tbody > tr:nth-child(7) > td.input_field01.b_bottom > span > label').first().fill('50');
  //小売成約率：90％
  await page.locator('#any_input > tbody > tr:nth-child(7) > td:nth-child(4) > span > label').first().fill('90');
  //小売掲載台数：1台から
  await page.locator('#any_input > tbody > tr:nth-child(7) > td.input_field02.b_bottom.b_right > span > label').first().fill('1');
  //小売掲載台数：2000台まで
  await page.locator('#any_input > tbody > tr:nth-child(7) > td:nth-child(8) > span > label').first().fill('2000');
  //粗利（本体）：100千円から
  await page.locator('#any_input > tbody > tr:nth-child(9) > td.input_field01 > span > label').first().fill('100');
  //粗利（本体）：500千円まで
  await page.locator('#any_input > tbody > tr:nth-child(9) > td:nth-child(4) > span > label').first().fill('500');
  //粗利（総額）：100千円から
  await page.locator('#any_input > tbody > tr:nth-child(10) > td.input_field01 > span > label').first().fill('100');
  //粗利（総額）：500千円まで
  await page.locator('#any_input > tbody > tr:nth-child(10) > td:nth-child(4) > span > label').first().fill('500');
   
//検索押下
await page.getByRole('link', { name: '検 索' }).click();

//仕入リサーチ＞検索条件が一致していることを確認する
// 1. 表のデータ部分（tbodyの中のtr）の「1件目」を狙い撃ちする
firstRow = page.locator('tbody tr').first();
// 2. その1件目の行の中に、必要な文字がすべて含まれていることを確認する
await expect(firstRow).toContainText('トヨタ');
await expect(firstRow).toContainText('クーペ');
console.log('仕入リサーチ＞車両検索条件「メーカー：トヨタ　ドア：クーペ」が一致していることを確認');

console.log('仕入リサーチ＞詳細検索条件が一致していることを確認');
//検索結果一覧1件目が検索条件に一致していることを確認
// 1. （1件目の平均AA価格など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_aa_avg > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した平均AA価格（300<=>9000）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(300);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(9000);

// 1. （1件目のAA落札率など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_aa_raku_rate > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得したAA落札率（50<=>80）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(50);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(80);

// 1. （1件目のAA台数など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_aa_number > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得したAA台数（1<=>500）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(1);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(500);

// 1. （1件目の平均小売本体価格など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_goo_avg > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した平均小売本体価格（10<=>9000）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(10);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(9000);

// 1. （1件目の平均小売支払総額など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_goo_total_avg > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した平均小売支払総額（10<=>9900）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(10);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(9900);

// 1. （1件目の在庫期間など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_goo_zaiko > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した在庫期間（1<=>300）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(1);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(300);

// 1. （1件目の小売成約率など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_goo_sold_rate > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した小売成約率（50<=>90）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(50);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(90);

// 1. （1件目の小売掲載台数など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_goo_number > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した小売掲載台数（1<=>2000）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(1);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(2000);

// 1. （1件目の粗利（本体）など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_gross_profit > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した粗利（本体）（100<=>500）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(100);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(500);

// 1. （1件目の粗利（総額）など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_gross_profit_total > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した粗利（総額）（100<=>500）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(100);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(500);

// お気に入り登録、削除の確認
await page.getByRole('link', { name: 'お気に入り' }).click();
await page.waitForTimeout(1000);
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
await page.locator('#favorite').getByRole('link', { name: 'お気に入り' }).click();
console.log('「お気に入り」ボタン押下で検索条件をお気に入り登録できることを確認');

await expect(page.getByRole('cell', { name: '国産' }).first()).toBeVisible();
await expect(page.getByRole('cell', { name: 'クーペ・スポーツ・スペシャリティ' }).first()).toBeVisible();
// 1. 「300千円」が含まれる1件目のセルを探し、表示を確認する
await expect(page.getByRole('cell', { name: '300千円' }).first()).toBeVisible();
// 2. 「9000千円」が含まれる1件目のセルを探し、表示を確認する
await expect(page.getByRole('cell', { name: '9000千円' }).first()).toBeVisible();

//全てクリアを押下する
// 1. 「全てクリア」ボタンをクリック
await page.getByRole('link', { name: '全てクリア' }).click();
// 2. 検索条件の型式テキストボックスが空になるまで待つ
await expect(page.locator('#F2_1 > select')).toHaveValue('');

await page.getByRole('link', { name: 'お気に入り' }).first().click({ timeout: 15000 });
await page.waitForTimeout(1000);
await page.getByRole('link', { name: '選択', exact: true }).first().click();
await page.waitForTimeout(1000);

//仕入リサーチ＞国産から検索後＞お気に入り＞「選択」後、検索結果一覧＞車両検索条件が一致することを確認
// 1. 表のデータ部分（tbodyの中のtr）の「1件目」を狙い撃ちする
firstRow = page.locator('tbody tr').first();
// 2. その1件目の行の中に、必要な文字がすべて含まれていることを確認する
await expect(firstRow).toContainText('トヨタ');
await expect(firstRow).toContainText('クーペ');
console.log('仕入リサーチ＞国産から検索後＞お気に入り＞選択＞車両検索条件「メーカー：トヨタ　ドア：クーペ」が一致していることを確認');

//仕入リサーチ＞お気に入り＞「選択」後、検索結果一覧＞詳細検索条件が一致することを確認
console.log('仕入リサーチ＞国産から検索後＞お気に入り＞選択＞詳細検索条件が一致していることを確認');
//検索結果一覧1件目が検索条件に一致していることを確認
// 1. （1件目の平均AA価格など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_aa_avg > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した平均AA価格（300<=>9000）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(300);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(9000);

// 1. （1件目のAA落札率など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_aa_raku_rate > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得したAA落札率（50<=>80）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(50);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(80);

// 1. （1件目のAA台数など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_aa_number > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得したAA台数（1<=>500）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(1);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(500);

// 1. （1件目の平均小売本体価格など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_goo_avg > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した平均小売本体価格（10<=>9000）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(10);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(9000);

// 1. （1件目の平均小売支払総額など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_goo_total_avg > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した平均小売支払総額（10<=>9900）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(10);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(9900);

// 1. （1件目の在庫期間など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_goo_zaiko > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した在庫期間（1<=>300）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(1);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(300);

// 1. （1件目の小売成約率など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_goo_sold_rate > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した小売成約率（50<=>90）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(50);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(90);

// 1. （1件目の小売掲載台数など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_goo_number > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した小売掲載台数（1<=>2000）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(1);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(2000);

// 1. （1件目の粗利（本体）など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_gross_profit > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した粗利（本体）（100<=>500）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(100);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(500);

// 1. （1件目の粗利（総額）など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_gross_profit_total > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した粗利（総額）（100<=>500）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(100);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(500);

// 仕入リサーチ＞国産から検索後＞検索履歴の確認
await page.waitForTimeout(1000);
await page.getByRole('link', { name: '検索履歴' }).first().click({ timeout: 15000 });

// '登録した検索条件は' という文字が見えるようになるまで待つ（デフォルト30秒）
await expect(page.getByText('検索履歴から条件を')).toBeVisible({ timeout: 30000 });
//検索履歴一覧を表示
await expect(page.getByRole('heading', { name: '検索履歴' })).toBeVisible({ timeout: 15000 });
await page.waitForTimeout(1000);
//検索履歴＞1件目データ＞国産、クーペ・スポーツ・スペシャリティであることを確認
await expect(page.getByRole('cell', { name: '国産' }).nth(1)).toBeVisible();
await expect(page.getByRole('cell', { name: 'クーペ・スポーツ・スペシャリティ' }).nth(1)).toBeVisible();
// 1. 「300千円」が含まれる1件目のセルを探し、表示を確認する
await expect(page.getByRole('cell', { name: '300千円' }).first()).toBeVisible();
// 2. 「9000千円」が含まれる1件目のセルを探し、表示を確認する
await expect(page.getByRole('cell', { name: '9000千円' }).first()).toBeVisible();

//検索履歴＞1件目データを選択する
await page.getByRole('link', { name: '選択', exact: true }).first().click();

//仕入リサーチ＞国産から検索後＞検索履歴＞「選択」後、検索結果一覧＞車両検索条件が一致することを確認
// 1. 表のデータ部分（tbodyの中のtr）の「1件目」を狙い撃ちする
firstRow = page.locator('tbody tr').first();
// 2. その1件目の行の中に、必要な文字がすべて含まれていることを確認する
await expect(firstRow).toContainText('トヨタ');
await expect(firstRow).toContainText('クーペ');
console.log('仕入リサーチ＞国産から検索後＞検索履歴＞選択＞車両検索条件「メーカー：トヨタ　ドア：クーペ」が一致していることを確認');

//仕入リサーチ＞検索履歴＞「選択」後、検索結果一覧＞詳細検索条件が一致することを確認
console.log('仕入リサーチ＞国産から検索後＞検索履歴＞詳細検索条件が一致していることを確認');
//検索結果一覧1件目が検索条件に一致していることを確認
// 1. （1件目の平均AA価格など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_aa_avg > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した平均AA価格（300<=>9000）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(300);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(9000);

// 1. （1件目のAA落札率など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_aa_raku_rate > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得したAA落札率（50<=>80）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(50);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(80);

// 1. （1件目のAA台数など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_aa_number > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得したAA台数（1<=>500）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(1);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(500);

// 1. （1件目の平均小売本体価格など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_goo_avg > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した平均小売本体価格（10<=>9000）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(10);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(9000);

// 1. （1件目の平均小売支払総額など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_goo_total_avg > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した平均小売支払総額（10<=>9900）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(10);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(9900);

// 1. （1件目の在庫期間など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_goo_zaiko > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した在庫期間（1<=>300）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(1);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(300);

// 1. （1件目の小売成約率など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_goo_sold_rate > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した小売成約率（50<=>90）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(50);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(90);

// 1. （1件目の小売掲載台数など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_goo_number > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した小売掲載台数（1<=>2000）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(1);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(2000);

// 1. （1件目の粗利（本体）など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_gross_profit > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した粗利（本体）（100<=>500）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(100);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(500);

// 1. （1件目の粗利（総額）など）から、文字（例: "300,000"）を取得する
priceText = await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_gross_profit_total > b').innerText();
// 2. カンマや円などの余計な文字をすべて消して、純粋な数値（Number）に変換する
priceNum = Number(priceText.replace(/[^\d.-]/g, '')) || 0;
// （確認用：変換された数値がいくつだったかログに出しておくと安心です）
console.log('取得した粗利（総額）（100<=>500）:', priceNum);
// 3. 値が 300,000 「以上（>=）」であることを確認する
expect(priceNum).toBeGreaterThanOrEqual(100);
// 4. 値が 9,000,000 「以下（<=）」であることを確認する
expect(priceNum).toBeLessThanOrEqual(500);

await page.waitForTimeout(1000);
//await page.getByRole('link', { name: '検索履歴' }).first().click({ timeout: 15000 });

// 1. ボタン（またはリンク）を定義
historyButton = page.getByRole('link', { name: '検索履歴' });
// 2. ボタンが操作可能（VisibleかつEnabled）になるまで待つ
await historyButton.waitFor({ state: 'visible', timeout: 30000 });
// 3. クリックする
await historyButton.click();

// '登録した検索条件は' という文字が見えるようになるまで待つ（デフォルト30秒）
await expect(page.getByText('検索履歴から条件を')).toBeVisible({ timeout: 30000 });

await page.waitForTimeout(1000);
await expect(page.getByRole('heading', { name: '検索履歴' })).toBeVisible();

await page.waitForTimeout(1000);
// 検索履歴ページングの確認
await page.getByRole('link', { name: '次へ>>' }).click();
await page.getByText('件中 51 -').waitFor();
await page.getByRole('link', { name: '<<前へ' }).click();
await page.getByText('件中 1 -').waitFor();
//await page.getByRole('link', { name: '2' }).click();
await page.locator('#btnarea > tbody > tr > td > ul > li:nth-child(3) > a').click();
await page.getByText('件中 51 -').waitFor();
//await page.getByRole('link', { name: '1' }).click();
await page.locator('#btnarea > tbody > tr > td > ul > li:nth-child(2)').click();
await page.getByText('件中 1 -').waitFor();

// すべてクリアの確認
await page.getByRole('link', { name: '全てクリア' }).click();
await expect(page.locator('select[name="maker"]')).toBeVisible();
await expect(page.locator('select[name="car"]')).toBeVisible();
await page.waitForTimeout(3000);


  //車両検索条件を設定する
  //メーカー：トヨタ
  await page.locator('select[name="maker"]').selectOption('1010');
  await page.goto('https://devdlpro.proto-dataline.com/stock/stock.php#19c93c05ab2be2a');
  //車種：アクア
  await page.locator('select[name="car"]').selectOption('10101073');
  await page.goto('https://devdlpro.proto-dataline.com/stock/stock.php#19c93c06dcac7cf');

  //検索押下＞検索結果を表示
  await page.getByRole('link', { name: '検 索' }).click();

  //仕入リサーチ＞平均AA価格１件目の値を格納
  let targetTextprice1 = (await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_aa_avg > b').first().textContent())?.trim();  
  console.log('ソート前、取得した１件目の仕入リサーチ＞平均AA価格の値の中身は:', targetTextprice1);
  //平均AA価格でソート（昇順）
  await page.locator('#result_head > table > thead > tr > th.col_s_aa_avg > a:nth-child(3)').first().click();
  await page.waitForTimeout(4000);
  let targetTextprice2 = (await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_aa_avg > b').first().textContent())?.trim();  
  console.log('ソート（昇順）後、取得した１件目の仕入リサーチ＞平均AA価格の値の中身は:', targetTextprice2);
  // ▼▼▼ ここに追加：値が一致していない（変更された）ことを確認する ▼▼▼
  expect(targetTextprice1).not.toBe(targetTextprice2);

//平均AA価格でソート（降順）
  //降順ボタン押下
  await page.locator('.col_s_aa_avg > a:nth-child(5)').click();
  await page.waitForTimeout(5000);
  let targetTextprice3 = (await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_aa_avg > b').first().textContent())?.trim();  
  console.log('ソート（降順）後、取得した１件目の仕入リサーチ＞平均AA価格の値の中身は:', targetTextprice3);
  expect(targetTextprice2).not.toBe(targetTextprice3);

//平均AA価格でソートクリア＞ソート操作前の値であることを確認
 await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(5000);
  let targetTextprice4 = (await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_s_aa_avg > b').first().textContent())?.trim();  
  console.log('ソート（クリア後）取得した１件目の仕入リサーチ＞平均AA価格の値の中身は:', targetTextprice4);
  expect(targetTextprice1).toBe(targetTextprice4);

  await page.waitForTimeout(2000);
// ページングの確認
await page.getByRole('link', { name: '次へ>>' }).click();
await page.getByText(/件中 51 -/).waitFor();
await page.getByRole('link', { name: '<<前へ' }).click();
await page.getByText(/件中 1 -/).waitFor();
await page.getByRole('link', { name: '2' }).click();
await page.getByText(/件中 51 -/).waitFor();
await page.getByRole('link', { name: '1' }).click();
await page.getByText(/件中 1 -/).waitFor();

  // 🌟 1. グレードが「Ｇ」の1件目を見つけてチェックを入れる
  await page.locator('#result_body tbody tr')
  .filter({ has: page.locator('.col_s_grade').getByText('Ｇ', { exact: true }) })
  .first()
  .locator('.col_s_compare input')
  .check();
  console.log('仕入リサーチ＞検索結果一覧＞グレード：Gに対して比較✅を入れいる');

  // 🌟 2. グレードが「Ｘ」の1件目を見つけてチェックを入れる
  await page.locator('#result_body tbody tr')
  .filter({ has: page.locator('.col_s_grade').getByText('Ｘ', { exact: true }) })
  .first()
  .locator('.col_s_compare input')
  .check();
  console.log('仕入リサーチ＞検索結果一覧＞グレード：Xに対して比較✅を入れいる');

  // 🌟 3. グレードが「Ｚ」の1件目を見つけてチェックを入れる
  await page.locator('#result_body tbody tr')
  .filter({ has: page.locator('.col_s_grade').getByText('Ｚ', { exact: true }) })
  .first()
  .locator('.col_s_compare input')
  .check();
  console.log('仕入リサーチ＞検索結果一覧＞グレード：Zに対して比較✅を入れいる');

  //「基準価格を表示」ボタンを押下する
  await page.getByRole('link', { name: '基準価格を表示' }).click();
  //「価格比較」リスト一覧が表示されること
  await page.getByText('価格比較').waitFor();
  console.log('「基準価格を表示」ボタン押下＞価格比較リストが表示されることを確認');

  //仕入リサーチ＞下取基準価格１件目の値を格納
  // 「td（データのマス目）を持っている最初の行」を指定して、その17番目を取得する！
  targetTextprice1 = (await page.locator('#price_compare > table > tbody > tr:has(td)').first().locator('td:nth-child(17) > b').textContent())?.trim();
  console.log('ソート前、取得した１件目の下取基準価格の値の中身は:', targetTextprice1);
  //下取基準価格でソート（降順）
  //降順ボタン押下
  await page.locator('#price_compare > table > tbody > tr.pc_tr > th:nth-child(17) > a:nth-child(3)').click();
  await page.waitForTimeout(5000);
  //仕入リサーチ＞下取基準価格１件目の値を格納
  // 「td（データのマス目）を持っている最初の行」を指定して、その17番目を取得する！
  targetTextprice2 = (await page.locator('#price_compare > table > tbody > tr:has(td)').first().locator('td:nth-child(17) > b').textContent())?.trim();
  console.log('ソート（降順）後、取得した１件目の下取基準価格の値の中身は:', targetTextprice2);
  // ▼▼▼ ここに追加：値が一致していない（変更された）ことを確認する ▼▼▼
  expect(targetTextprice1).not.toBe(targetTextprice2);

  //下取基準価格でソート（昇順）
  await page.locator('#price_compare > table > tbody > tr.pc_tr > th:nth-child(17) > a:nth-child(3)').first().click();
  await page.waitForTimeout(5000);
  //仕入リサーチ＞下取基準価格１件目の値を格納
  // 「td（データのマス目）を持っている最初の行」を指定して、その17番目を取得する！
  targetTextprice3 = (await page.locator('#price_compare > table > tbody > tr:has(td)').first().locator('td:nth-child(17) > b').textContent())?.trim();
  console.log('ソート（昇順）後、取得した１件目の下取基準価格の値の中身は:', targetTextprice3);
  expect(targetTextprice2).not.toBe(targetTextprice3);

  //下取基準価格でソートクリア＞ソート操作前の値であることを確認
  // クラス名「btn_clear_sort」がついている要素を探し、その2個目をクリックする！
  await page.locator('.btn_clear_sort').nth(1).click();
  await page.waitForTimeout(5000);
  //仕入リサーチ＞下取基準価格１件目の値を格納
  // 「td（データのマス目）を持っている最初の行」を指定して、その17番目を取得する！
  targetTextprice4 = (await page.locator('#price_compare > table > tbody > tr:has(td)').first().locator('td:nth-child(17) > b').textContent())?.trim();
  console.log('ソート（クリア後）取得した１件目の下取基準価格の値の中身は:', targetTextprice4);
  expect(targetTextprice1).toBe(targetTextprice4);

  // （もし特定のマス目、例えば1番左のマスをクリックしたい場合はこちら）
  //「価格比較」リスト、１件目を押下する
  await page.locator('#price_compare tbody tr:has(td)').first().locator('td').first().click();
  await page.waitForTimeout(3000);
  //価格推移予測グラフが表示されること、また横軸日付が今月または来月から始まること
  console.log('一覧データを押下で価格推移予測グラフが表示されることを確認');
  
  // 1. 今日の日付を取得
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
   console.log('today:', today);
   console.log('currentYear:', currentYear);
   console.log('currentMonth:', currentMonth);
  // 2. 「今月」の文字列を作る（例: 2026/02）
  const thisMonthStr = `${currentYear}/${String(currentMonth).padStart(2, '0')}`;
  console.log('thisMonthStr:', thisMonthStr);
  // 3. 「来月」の計算（年またぎ対応）
  let nextYear = currentYear;
  let nextMonth = currentMonth + 1;
  if (nextMonth > 12) {
  nextYear += 1;
  nextMonth = 1;
  }
  // 🌟 ここが消えてしまっていた大事な行です！来月の文字列を作る（例: 2026/03）
  const nextMonthStr = `${nextYear}/${String(nextMonth).padStart(2, '0')}`;
  console.log('nextMonthStr:', nextMonthStr);
  // 4. 正規表現で「今月 または 来月」というルールを作る（^ と $ は外して優しく）
  const monthRegex = new RegExp(`(${thisMonthStr}|${nextMonthStr})`);
  console.log('monthRegex:', monthRegex);
  // 5. 「fancybox-frame」というIDの小窓（iframe）の中に侵入する魔法！
  const graphFrame = page.frameLocator('#fancybox-frame');
  // 6. 小窓の中にあるグラフの目盛りが、計算した年月と一致するか確認！
  await expect(
  graphFrame.locator('#chart .xAxis .tickLabel').first()
  ).toHaveText(monthRegex, { timeout: 15000 });
  console.log('グラフ横軸の日付が今月から始まること！ですがdev,stgでは来月となることもあるので自動化では今月または来月としている⇒2/27確認済み');
  await page.waitForTimeout(5000);
  console.log('グラフ表＞✕ボタンを押下＞グラフを閉じる');
    await page.locator('#fancybox-close').click();

  //全てクリアを押下する
  // 1. 「全てクリア」ボタンをクリック
  await page.getByRole('link', { name: '全てクリア' }).click();
  // 2. 検索条件の型式テキストボックスが空になるまで待つ
  await expect(page.locator('#F2_1 > select')).toHaveValue('');

  //車両検索条件を設定する
  //メーカー：トヨタ
  await page.locator('select[name="maker"]').selectOption('1010');
  await page.goto('https://devdlpro.proto-dataline.com/stock/stock.php#19c93c05ab2be2a');
  //車種：アクア
  await page.locator('select[name="car"]').selectOption('10101073');
  await page.goto('https://devdlpro.proto-dataline.com/stock/stock.php#19c93c06dcac7cf');
  //型式：NHP10
  await page.locator('select[name="type[]"]').selectOption('13');
  await page.goto('https://devdlpro.proto-dataline.com/stock/stock.php#19c93c09acd3fde');
  //グレード：G
  await page.locator('select[name="grade[]"]').selectOption('10');
  await page.goto('https://devdlpro.proto-dataline.com/stock/stock.php#19c93c0af1eef92');
  //年式：2012年から
  await page.locator('select[name="s_year"]').selectOption('2012');
  //年式：2022年まで
  await page.locator('select[name="e_year"]').selectOption('2022');
  //修復歴：無
  await page.locator('select[name="accident"]').selectOption('1');

  //仕入リサーチ＞検索条件を全項目設定する
  //平均AA価格：300千円から
  await page.locator('#any_input > tbody > tr:nth-child(1) > td.input_field01.b_top input').first().fill('300');
  //平均AA価格：9000千円まで
  await page.locator('#any_input > tbody > tr:nth-child(1) > td:nth-child(4) > span > label').first().fill('9000');
  //AA落札率：50％から
  await page.locator('#any_input > tbody > tr:nth-child(2) > td.input_field01.b_bottom > span > label').first().fill('50');
  //AA落札率：80％まで
  await page.locator('#any_input > tbody > tr:nth-child(2) > td:nth-child(4) > span > label').first().fill('80');
  //AA出品台数：1台から
  await page.locator('#any_input > tbody > tr:nth-child(2) > td.input_field02.b_bottom.b_right > span > label').first().fill('1');
  //AA出品台数：500台まで
  await page.locator('#any_input > tbody > tr:nth-child(2) > td:nth-child(8) > span > label').first().fill('500');
  //平均小売本体価格：10千円から
  await page.locator('#any_input > tbody > tr:nth-child(4) > td.input_field01.b_top > span > label').first().fill('10');
  //平均小売本体価格：9000千円まで
  await page.locator('#any_input > tbody > tr:nth-child(4) > td:nth-child(4) > span > label').first().fill('9000');
  //平均小売支払価格：10千円から
  await page.locator('#any_input > tbody > tr:nth-child(5) > td.input_field01.b_top > span > label').first().fill('10');
  //平均小売支払価格：9900千円まで
  await page.locator('#any_input > tbody > tr:nth-child(5) > td:nth-child(4) > span > label').first().fill('9900');
  //在庫期間：1日から
  await page.locator('#any_input > tbody > tr:nth-child(6) > td.input_field01.b_center > span > label').first().fill('1');
  //在庫期間：300日まで
  await page.locator('#any_input > tbody > tr:nth-child(6) > td:nth-child(4) > span > label').first().fill('300');
  //小売成約率：50％
  await page.locator('#any_input > tbody > tr:nth-child(7) > td.input_field01.b_bottom > span > label').first().fill('50');
  //小売成約率：90％
  await page.locator('#any_input > tbody > tr:nth-child(7) > td:nth-child(4) > span > label').first().fill('90');
  //小売掲載台数：1台から
  await page.locator('#any_input > tbody > tr:nth-child(7) > td.input_field02.b_bottom.b_right > span > label').first().fill('1');
  //小売掲載台数：2000台まで
  await page.locator('#any_input > tbody > tr:nth-child(7) > td:nth-child(8) > span > label').first().fill('2000');
  //粗利（本体）：100千円から
  await page.locator('#any_input > tbody > tr:nth-child(9) > td.input_field01 > span > label').first().fill('100');
  //粗利（本体）：500千円まで
  await page.locator('#any_input > tbody > tr:nth-child(9) > td:nth-child(4) > span > label').first().fill('500');
  //粗利（総額）：100千円から
  await page.locator('#any_input > tbody > tr:nth-child(10) > td.input_field01 > span > label').first().fill('100');
  //粗利（総額）：500千円まで
  await page.locator('#any_input > tbody > tr:nth-child(10) > td:nth-child(4) > span > label').first().fill('500');
   
  await page.getByRole('link', { name: '型式・類別から検索' }).click();
  await expect(page).toHaveTitle('グレード検索');
  console.log('型式・類別から検索押下＞グレード検索画面へ遷移＞検索条件＞型式：NHP10、車種：アクアが引き継がれていることを確認');
  //検索履歴＞1件目データ＞メーカー：トヨタ、車種：アクアであることを確認
  await expect(page.getByRole('cell', { name: 'NHP10' }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: 'アクア' }).first()).toBeVisible();

  //AA相場からブラウザバック＞仕入リサーチへ遷移することを確認
  // ブラウザの「戻る（←）」ボタンを押す
  await page.goBack();
  // 仕入リサーチへ遷移＞タブ名完全一致で確認する場合
  await expect(page).toHaveTitle('仕入リサーチ');
  console.log('グレード検索画面からブラウザバック＞遷移前画面である仕入リサーチへ遷移することを確認');

  //検索履歴＞1件目データ＞メーカー：トヨタ、車種：アクアであることを確認
  await expect(page.getByRole('cell', { name: 'トヨタ' }).first()).toBeVisible({ timeout: 15000 });
  await expect(page.getByRole('cell', { name: 'アクア' }).first()).toBeVisible();
  console.log('ブラウザバック後＞検索条件が保持されていることを確認');
});