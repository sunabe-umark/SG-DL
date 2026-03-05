//custom-test.tsを使用
import fs from 'fs';
import { test, expect } from '../custom-test';
//import { test, expect } from '@playwright/test';
//DLP回帰テスト-006＜商談ツール＞先に実行済み
test('test', async ({ page }) => {
// ▼ この行を追加（テストの制限時間を180秒に変更）
  test.setTimeout(300000);

  //ログイン画面へ遷移
  await page.goto('https://devdlpro.proto-dataline.com/top/top.php');
  await page.getByRole('textbox', { name: 'ログインID' }).click();
  await page.getByRole('textbox', { name: 'ログインID' }).fill('tst0005');
  
  // パスワードにtst0002を入力
  await page.getByRole('textbox', { name: 'ログインID' }).press('Tab');
  await page.getByRole('textbox', { name: 'パスワード' }).fill('tst0005');
  await page.getByRole('button', { name: 'ログイン' }).click();
  await page.waitForLoadState('networkidle');

  // アイコン「商談ツール」を押下
  await page.getByRole('link', { name: '商談ツール' }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);


// 商談ツールへ遷移＞タブ名完全一致で確認する場合
  await expect(page).toHaveTitle('買取・下取');
//商談ツール＞商談履歴ボタンを押下する
await page.getByRole('link', { name: '商談履歴' }).click();
//商談ツール＞商談履歴＞商談種類＞買取下取を選択する
await page.locator('select[name="sales_for_history"]').selectOption('0');
//await page.goto('https://devdlpro.proto-dataline.com/syoudan_his/syoudan_his.php?action=change_select_history&key=sales_for_history');
//検索ボタンを押下する
await page.getByRole('link', { name: '検 索' }).click();

//検索結果一覧＞商談種類＞買取下取が表示されていることを確認
await expect(page.getByRole('cell', { name: '買取' }).nth(1)).toBeVisible();

//検索結果＞お客様氏名＞選択肢＞鈴木一郎を選択する
await page.locator('select[name="cmb_user_name"]').selectOption('鈴木一郎');
//この条件で絞り込むボタンを押下する
await page.getByRole('link', { name: 'この条件で絞り込む' }).click();
//検索結果一覧＞お客様名＞鈴木一郎が表示されていることを確認
await expect(page.getByRole('cell', { name: '鈴木一郎' }).nth(2)).toBeVisible();

// IDが「txt_salesman_name_」から始まる入力欄のうち、1番目（first）の中身をクリアして入力する最強の書き方！
await page.locator('[id^="txt_salesman_name_"]').first().fill('テスト更新');
//結果一覧＞データ１件目の担当者名を「テスト更新」に書き換える
await page.getByRole('button', { name: '更新' }).first().click();

//商談ツール＞検索結果一覧＞1件目データを押下する
await page.getByRole('cell', { name: '鈴木一郎' }).nth(2).click();
await page.waitForTimeout(3000);

// 買取・下取価格タブへ遷移
// 買取・下取価格＞タブが選択状態（クラス名に "on" が付いている状態）であることを確認
await expect(page.locator('li[class$="on"]')).toContainText('仕入価格');

// その他加減算欄（input）の値が前回編集した「25000」であることを確認する！
await expect(page.locator('#vehicle_input > table > tbody > tr:nth-child(6) > td > input')).toHaveValue('25000');
console.log('その他加減算欄（input）の値が前回編集した「25000」');
// お客様氏名算欄（input）の値が前回編集した「鈴木一郎」であることを確認する！
await expect(page.locator('#vehicle_guest > table > tbody > tr:nth-child(1) > td:nth-child(2) > input')).toHaveValue('鈴木一郎');
console.log('お客様氏名算欄（input）の値が前回編集した「鈴木一郎」');
// 担当者名算欄（input）の値が先ほど編集した「テスト更新」であることを確認する！
await expect(page.locator('#vehicle_guest > table > tbody > tr:nth-child(6) > td:nth-child(2) > input')).toHaveValue('テスト更新');
console.log('担当者名算欄（input）の値が先ほど編集した「テスト更新」');

//その他加減算の元の値に10000足して再計算後、計が正しいことを確認する
// 1. 要素の場所（ロケーター）を変数にまとめる（コードを見やすくするため）
const inputField = page.locator('#vehicle_input > table > tbody > tr:nth-child(6) > td > input');
const totalField = page.locator('#vehicle_breakdown > table > tbody > tr:nth-child(9) > td.v_bd02.v_bd_total');
// 2. 【変更前】の「合計金額」を取得し、計算用の数字に変換する
const beforeTotalText = await totalField.innerText();
// ※「25,000円」などの文字から数字以外の記号をすべて消して「25000」にします
const beforeTotal = parseInt(beforeTotalText.replace(/[^0-9]/g, ''), 10);
// 3. 入力欄の「現在の値」を取得し、数字に変換する
const currentInputText = await inputField.inputValue();
const currentInput = parseInt(currentInputText.replace(/[^0-9]/g, ''), 10);
// 4. 10000を足した「新しい入力値」と「期待される新しい合計金額」を計算！
const newInput = currentInput + 10000;
const expectedTotal = beforeTotal + 10000;
console.log(`📝 現在の入力: ${currentInput} ->＋10000＝ 変更後: ${newInput}`);
console.log(`📝 現在の合計: ${beforeTotal} -> ＋10000＝ 期待する合計: ${expectedTotal}`);
// 5. 入力欄を新しい値で上書きし、Enterキーを押す（※Enterを押すことでシステムの自動計算を意図的に走らせます！）
await inputField.fill(newInput.toString());
await inputField.press('Enter');
//await page.keyboard.press('Tab');

//再計算ボタンを押下する
await page.getByRole('link', { name: '再計算' }).click();
await page.waitForTimeout(2000);

// 6. 合計金額が「期待値（+10000された数字）」になるまで、何度もチェックしながら待機する最強の魔法！
await expect(async () => {
  const currentTotalText = await totalField.innerText();
  const currentTotal = parseInt(currentTotalText.replace(/[^0-9]/g, ''), 10);

  // 数字同士がピッタリ一致するか確認！
  expect(currentTotal).toBe(expectedTotal); 
}).toPass({ timeout: 30000 });
//鈴木一郎から鈴木二郎にお客様氏名を変更する
// IDが「txt_salesman_name_」から始まる入力欄のうち、1番目（first）の中身をクリアして入力する最強の書き方！
await page.locator('#vehicle_guest > table > tbody > tr:nth-child(1) > td:nth-child(2) > input').first().fill('鈴木二郎');
await page.getByRole('link', { name: 'この内容で登録する' }).click();

//印刷プレビュー表示
const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '印刷' }).click();
  const page1 = await page1Promise;

// 🌟 ここで page1 の画面サイズを 横1280px × 縦1200px に強制変更する！
await page1.setViewportSize({ width: 1280, height: 800 });

  //印刷プレビュー表示内＞変更したお客様名が正しいことを確認
// タグや場所を一切無視して、page1の画面上に「鈴木二郎」という文字が見えているか直接確認する！
await expect(page1.getByText('鈴木二郎').first()).toBeVisible();
console.log('印刷プレビュー表示内＞お客様氏名算欄（input）の値が編集後「鈴木二郎」');
  // キーボードの「End」キーを押して一番下まで移動
  await page.keyboard.press('End');

//印刷プレビュー表示内＞買取下取参考価格が正しいことを確認
// ⭕️ 変更後（計算済みの expectedTotal を使う！）
const expectedText = expectedTotal.toLocaleString();
await expect(
  page1.locator('#print > table > tbody > tr > td > table:nth-child(4) > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr:nth-child(7) > td.style6')
).toContainText(expectedText);
console.log('印刷プレビュー表示内＞買取下取参考価格の値が編集後値：', expectedText);
//印刷プレビュー表示を閉じる
await page1.getByRole('button', { name: '閉じる' }).click();


//車両カタログ情報タブを押下＞車両カタログ情報へ遷移
await page.getByRole('link', { name: '車両情報' }).click();
// 車両カタログ情報タブが選択状態（クラス名に "on" が付いている状態）であることを確認
await expect(page.locator('li.vehicle_tab01aon')).toContainText('車両情報');
//車種を確認
await expect(page.locator('#vehicle').getByRole('cell', { name: 'アルファード', exact: true })).toBeVisible();
console.log('商談履歴＞車両カタログ情報タブ＞車種名：アルファード');
//グレードを確認
await expect(page.locator('#vehicle').getByRole('cell', { name: '２．５Ｓ', exact: true })).toBeVisible();
console.log('商談履歴＞車両カタログ情報タブ＞グレード名：2.5G');
await page.waitForTimeout(3000);

//買取・下取価格表示へを押下
await page.getByRole('link', { name: '買取・下取価格表示へ' }).click();
// 買取・下取価格タブへ遷移
// 買取・下取価格＞タブが選択状態（クラス名に "on" が付いている状態）であることを確認
await expect(page.locator('li[class$="on"]')).toContainText('仕入価格');
console.log('商談履歴＞車両カタログ情報タブ＞買取・下取価格表示へ＞買取・下取価格表示タブ表示');

//将来予測グラフタブを押下＞将来予測グラフへ遷移
await page.getByRole('link', { name: 'グラフ表示' }).click();
// 1. クラス名の最後が "on"（選択状態）で、かつ「将来予測グラフ」という文字を持つタブ（liタグ）をピンポイントで探す
const activeTab = page.locator('li[class$="on"]').filter({ hasText: 'グラフ表示' });
// 2. それがちゃんと画面に存在している（見えている）ことを確認する
await expect(activeTab).toBeVisible();
console.log('商談履歴＞将来予測グラフタブ押下＞将来予測グラフ表示');

//将来予測グラフ＞買取・下取参考価格が編集後の価格で表示されていること
// 1. 計算済みの expectedTotal を、画面表示に合わせたカンマ付きの文字（"3,365,000" など）に変換する
const expectedPriceText = expectedTotal.toLocaleString();
// 2. 元の画面（page）の指定した場所の中に、その金額が含まれていることを確認する！
await expect(
  page.locator('#vehicle_price > table > tbody > tr > td')
).toContainText(expectedPriceText);

//将来予測グラフ＞お客様名が編集後の値で表示されていること
// 🌟 inputタグの中身に「鈴木二郎」が含まれていること（部分一致）を確認する最強の書き方！
// 注意： '鈴木二郎' ではなく /鈴木二郎/ とスラッシュで囲むのが「含まれていればOK」の魔法です！
await expect(
  page.locator('#vehicle_info > div.vehicle_tab03.clearfix > ul > li:nth-child(1) > input')
).toHaveValue(/鈴木二郎/);

// IDが「txt_salesman_name_」から始まる入力欄のうち、1番目（first）の中身をクリアして入力する最強の書き方！
await page.locator('#vehicle_info > div.vehicle_tab03.clearfix > ul > li.input_kakaku > input[type=text]:nth-child(3)').first().fill('200');
//結果一覧＞データ１件目の担当者名を「再計算」に書き換える
await page.getByRole('link', { name: '再計算' }).click();
//将来予測グラフ＞買取・下取参考価格が編集＞再計算後￥2,000,000の価格で表示されていること
// 🌟 <td> タグ（普通の文字）の確認なので、toContainText を使って「2,000,000」が含まれているか確認します！
await expect(page.locator('#vehicle_price > table > tbody > tr > td')).toContainText('2,000,000');
//将来予測グラフ＞残率表示押下＞残率％表示になること
await page.getByRole('link', { name: '残率表示' }).click();
//将来予測グラフ＞残率表示100％で表示されていること
await expect(page.locator('#price_1 > div > p.txtPrice')).toContainText('100%');
//将来予測グラフ＞残価表示を押下＞残率表示表示になること
await page.getByRole('link', { name: '残価表示' }).click();
//将来予測グラフ＞残価表示2,000,000で表示されていること
await expect(page.locator('#price_1 > div > p.txtPrice')).toContainText('2,000,000');
//将来予測グラフ＞コメントが編集＞再計算後の価格で表示されていること
await expect(page.locator('#vehicle_info > div.vehicle_box > table > tbody > tr:nth-child(1) > td:nth-child(1) > textarea')).toHaveValue(/テストコメント/);


//将来予測グラフ＞印刷プレビュー表示
const page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '印刷' }).click();
  const page2 = await page2Promise;

// 🌟 ここで page1 の画面サイズを 横1280px × 縦1200px に強制変更する！
await page2.setViewportSize({ width: 1280, height: 800 });

  //印刷プレビュー表示内＞変更したお客様名が正しいことを確認
// タグや場所を一切無視して、page1の画面上に「鈴木二郎」という文字が見えているか直接確認する！
await expect(page2.locator('#txt_name')).toContainText('鈴木二郎');
console.log('将来予測グラフ＞印刷プレビュー表示内＞お客様氏名算欄（input）の値が編集後「鈴木二郎」');
//印刷プレビュー表示内＞買取下取参考価格が変更後2,000,000であることを確認
await expect(page2.locator('#clr1 > tbody > tr > td:nth-child(2)')).toContainText('2,000,000');
console.log('将来予測グラフ＞印刷プレビュー表示内＞買取・下取参考価格の値が編集後値：¥2,000,000');
//印刷プレビュー表示を閉じる
await page2.getByRole('button', { name: '閉じる' }).click();

//将来予測グラフタブを押下＞将来予測グラフへ遷移
await page.getByRole('link', { name: 'グラフ表示' }).click();
// 1. クラス名の最後が "on"（選択状態）で、かつ「将来予測グラフ」という文字を持つタブ（liタグ）をピンポイントで探す
const activeGraphTab = page.locator('li[class$="on"]').filter({ hasText: 'グラフ表示' });
// 2. それがちゃんと画面に存在している（見えている）ことを確認する
await expect(activeGraphTab).toBeVisible();
console.log('商談履歴＞将来予測グラフタブ押下＞将来予測グラフ表示');
//乗換診断へ押下
await page.getByRole('link', { name: '乗換診断へ' }).click();
//購入検討車輌を選択して下さいを表示
await expect(page.getByRole('img', { name: '購入検討車輌を選択して下さい' })).toBeVisible();


// アイコン「商談ツール」を押下
  await page.getByRole('link', { name: '商談ツール' }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

// 商談ツールへ遷移＞タブ名完全一致で確認する場合
  await expect(page).toHaveTitle('買取・下取');
//商談ツール＞商談履歴ボタンを押下する
await page.getByRole('link', { name: '商談履歴' }).click();
// 商談ツール＞商談履歴タブ名完全一致で確認する場合
  await expect(page).toHaveTitle('履歴・設定');

//商談ツール＞商談履歴＞商談種類＞買取下取を選択する
await page.locator('select[name="sales_for_history"]').selectOption('0');
//await page.goto('https://devdlpro.proto-dataline.com/syoudan_his/syoudan_his.php?action=change_select_history&key=sales_for_history');
//検索ボタンを押下する
await page.getByRole('link', { name: '検 索' }).click();
//検索結果一覧＞商談種類＞買取下取が表示されていることを確認
await expect(page.getByRole('cell', { name: '買取' }).nth(1)).toBeVisible();

// 🌟 一覧の1件目 「この内容で登録する」押下で新規登録されていることを確認（お客様名：鈴木二郎）
await expect(
  page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_sh_user')
).toContainText('鈴木二郎');
// 🌟 一覧の1件目 「この内容で登録する」押下で新規登録されていることを確認（参考価格は変数にする）
await expect(
  page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_sh_sonkou_kakaku > b')
).toContainText(expectedText);

// 🌟 一覧の1件目を削除する
// 1. 🌟 【重要】クリックする「前」に、次に出るダイアログで「OK（accept）」を押すように予約する！
page.once('dialog', async dialog => {
  console.log('💡 ダイアログが出ました！メッセージ:', dialog.message()); // 念のためメッセージをログに出す
  await dialog.accept(); // ここで「OK」をクリック！ （※キャンセルしたい場合は dialog.dismiss() です）
});
// 2. 削除ボタンをクリックする（ここでダイアログが呼び出され、上の予約が自動で実行されます）
await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_sh_edit > input[type=button]:nth-child(2)').click();
// 3. 削除処理（裏側の通信や画面の再描画）が終わるまで待つ！
await page.waitForLoadState('networkidle');
// 🌟 一覧の1件目 「この内容で登録する」押下で新規登録されていることを確認（お客様名：鈴木二郎）ではなくなること
await expect(
  page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_sh_user')
).not.toContainText('鈴木二郎');


//検索結果＞お客様氏名＞選択肢＞鈴木一郎を選択する
await page.locator('select[name="cmb_user_name"]').selectOption('鈴木一郎');
//この条件で絞り込むボタンを押下する
await page.getByRole('link', { name: 'この条件で絞り込む' }).click();
//検索結果一覧＞お客様名＞鈴木一郎が表示されていることを確認
await expect(page.getByRole('cell', { name: '鈴木一郎' }).nth(2)).toBeVisible();

//商談ツール＞検索結果一覧＞1件目データを押下する
await page.getByRole('cell', { name: '鈴木一郎' }).nth(2).click();
await page.waitForTimeout(3000);

// 買取・下取価格タブへ遷移
// 買取・下取価格＞タブが選択状態（クラス名に "on" が付いている状態）であることを確認
await expect(page.locator('li[class$="on"]')).toContainText('仕入価格');

await page.waitForTimeout(1000);

//商談ツール＞検索結果一覧＞1件目データを押下する
await page.getByRole('cell', { name: '鈴木一郎' }).nth(1).click();
await page.waitForTimeout(1000);

//買取・下取価格タブ表示
await page.getByText('鈴木一郎').waitFor();

// 🌟 下取・買取価格タブデータを削除する
// 1. 🌟 【重要】クリックする「前」に、次に出るダイアログで「OK（accept）」を押すように予約する！
page.once('dialog', async dialog => {
  console.log('💡 ダイアログが出ました！メッセージ:', dialog.message()); // 念のためメッセージをログに出す
  await dialog.accept(); // ここで「OK」をクリック！ （※キャンセルしたい場合は dialog.dismiss() です）
});
// 2. 削除ボタンをクリックする（ここでダイアログが呼び出され、上の予約が自動で実行されます）
await page.locator('#vehicle_info > div > div > div.delete_btn2.r_posi05 > ul > li > a').click();
// 3. 削除処理（裏側の通信や画面の再描画）が終わるまで待つ！

// 🌟 一覧に戻る＞一覧を表示
await page.getByText('これまでの商談履歴一覧です。').waitFor();

// アイコン「商談ツール」を押下
  await page.getByRole('link', { name: '商談ツール' }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);


// 商談ツールへ遷移＞タブ名完全一致で確認する場合
  await expect(page).toHaveTitle('買取・下取');
//商談ツール＞商談履歴ボタンを押下する
await page.getByRole('link', { name: '商談履歴' }).click();
//商談ツール＞商談履歴＞商談種類＞買取下取を選択する
await page.locator('select[name="sales_for_history"]').selectOption('0');
//await page.goto('https://devdlpro.proto-dataline.com/syoudan_his/syoudan_his.php?action=change_select_history&key=sales_for_history');
//検索ボタンを押下する
await page.getByRole('link', { name: '検 索' }).click();

//検索結果一覧＞商談種類＞買取下取が表示されていることを確認
await expect(page.getByRole('cell', { name: '買取' }).nth(1)).toBeVisible();

//商談ツール＞金額１件目の値を格納
  const targetTextprice1 = (await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_sh_sonkou_kakaku > b').first().textContent())?.trim();  
  console.log('履歴・設定＞商談種類：買取＞ソート前、取得した１件目の金額の値の中身は:', targetTextprice1);
//金額でソート（昇順）
 await page.locator('#result_head > table > thead > tr > th.col_sh_sonkou_kakaku > a:nth-child(2)').first().click();
  const targetTextprice2 = (await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_sh_sonkou_kakaku > b').first().textContent())?.trim();  
  console.log('履歴・設定＞商談種類：買取＞ソート（昇順）後、取得した１件目の金額の値の中身は:', targetTextprice2);
// ▼▼▼ ここに追加：値が一致していない（変更された）ことを確認する ▼▼▼
expect(targetTextprice1).not.toBe(targetTextprice2);

//金額でソート（降順）
  await page.locator('.col_sh_sonkou_kakaku > a:nth-child(4)').click();
  await page.waitForTimeout(1000);
  const targetTextprice3 = (await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_sh_sonkou_kakaku > b').first().textContent())?.trim();  
  console.log('履歴・設定＞商談種類：買取＞ソート（降順）後、取得した１件目の金額の値の中身は:', targetTextprice3);
  expect(targetTextprice2).not.toBe(targetTextprice3);

//金額でソートクリア＞ソート操作前の値であることを確認
 await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(2000);
  const targetTextprice4 = (await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_sh_sonkou_kakaku > b').first().textContent())?.trim();  
  console.log('履歴・設定＞商談種類：買取＞ソート（クリア後）取得した１件目の金額の値の中身は:', targetTextprice4);
  expect(targetTextprice1).toBe(targetTextprice4);

  await page.waitForTimeout(2000);
/* ページングの確認＞ページが無いため保留
await page.getByRole('link', { name: '次へ>>' }).click();
await expect(page.getByText(/件中 51 -/)).toBeVisible({ timeout: 15000 });
await page.getByRole('link', { name: '<<前へ' }).click();
await expect(page.getByText(/件中 1 -/)).toBeVisible({ timeout: 15000 });
await page.getByRole('link', { name: '2' }).click();
await expect(page.getByText(/件中 51 -/)).toBeVisible({ timeout: 15000 });
await page.getByRole('link', { name: '1' }).click();
await expect(page.getByText(/件中 1 -/)).toBeVisible({ timeout: 15000 });
*/

// アイコン「注文販売」を押下
  await page.getByRole('link', { name: '注文販売' }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  // 注文販売へ遷移＞タブ名完全一致で確認する場合
  await expect(page).toHaveTitle('注文販売');

  //注文販売＞商談履歴ボタンを押下する
  await page.getByRole('link', { name: '商談履歴' }).click();


  //注文販売＞商談履歴＞商談種類＞注文販売を選択する
  await page.locator('select[name="sales_for_history"]').selectOption('1');
//  await page.goto('https://devdlpro.proto-dataline.com/syoudan_his/syoudan_his.php?action=change_select_history&key=sales_for_history');
 
  //検索ボタンを押下する
  await page.getByRole('link', { name: '検 索' }).click();

  //検索結果一覧＞商談種類＞買取下取が表示されていることを確認
  await expect(page.getByRole('cell', { name: '注文' }).nth(1)).toBeVisible();

  //検索結果＞お客様氏名＞選択肢＞注文一郎を選択する
  await page.locator('#search_record01 > table.scr_table01 > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > select').selectOption('注文一郎');
  //この条件で絞り込むボタンを押下する
  await page.getByRole('link', { name: 'この条件で絞り込む' }).click();
  //検索結果一覧＞お客様名＞鈴木一郎が表示されていることを確認
  await expect(page.getByRole('cell', { name: '注文一郎' }).nth(2)).toBeVisible();


  //注文販売＞検索結果一覧＞1件目データを押下する
  await page.getByRole('cell', { name: '注文一郎' }).nth(2).click();
  await page.waitForTimeout(3000);

// 注文販売価格＞タブへ遷移
// 注文販売価格＞＞タブが選択状態（クラス名に "on" が付いている状態）であることを確認
await expect(page.locator('li[class$="on"]')).toContainText('仕入価格');

// 注文販売価格＞その他加減算欄（input）の値が前回編集した「35000」であることを確認する！
await expect(page.locator('#vehicle_input > table > tbody > tr:nth-child(5) > td > input')).toHaveValue('35000');
console.log('注文販売価格＞その他加減算欄（input）の値が前回編集した「35000」');
// お客様氏名算欄（input）の値が前回編集した「注文一郎一郎」であることを確認する！
await expect(page.locator('#vehicle_guest > table > tbody > tr:nth-child(1) > td:nth-child(2) > input')).toHaveValue('注文一郎');
console.log('お客様氏名算欄（input）の値が前回編集した「注文一郎」');
// 担当者名算欄（input）の値が先ほど編集した「テスト更新」であることを確認する！
await expect(page.locator('#vehicle_guest > table > tbody > tr:nth-child(6) > td:nth-child(2) > input')).toHaveValue('テスト次郎');
console.log('担当者名算欄（input）の値が先ほど編集した「テスト次郎」');

//その他加減算の元の値に10000足して再計算後、計が正しいことを確認する
// 1. 要素の場所（ロケーター）を変数にまとめる（コードを見やすくするため）
const inputField2 = page.locator('#vehicle_input > table > tbody > tr:nth-child(5) > td > input');
const totalField2 = page.locator('#vehicle_breakdown > table > tbody > tr:nth-child(9) > td.v_bd02.v_bd_total');
// 2. 【変更前】の「合計金額」を取得し、計算用の数字に変換する
const beforeTotalText2 = await totalField2.innerText();
// ※「35,000円」などの文字から数字以外の記号をすべて消して「35000」にします
const beforeTotal2 = parseInt(beforeTotalText2.replace(/[^0-9]/g, ''), 10);
// 3. 入力欄の「現在の値」を取得し、数字に変換する
const currentInputText2 = await inputField2.inputValue();
const currentInput2 = parseInt(currentInputText2.replace(/[^0-9]/g, ''), 10);
// 4. 10000を足した「新しい入力値」と「期待される新しい合計金額」を計算！
const newInput2 = currentInput2 + 10000;
const expectedTotal2 = beforeTotal2 + 10000;
console.log(`📝 現在の入力: ${currentInput2} ->＋10000＝ 変更後: ${newInput2}`);
console.log(`📝 現在の合計: ${beforeTotal2} -> ＋10000＝ 期待する合計: ${expectedTotal2}`);
// 5. 入力欄を新しい値で上書きし、Enterキーを押す（※Enterを押すことでシステムの自動計算を意図的に走らせます！）
await inputField2.fill(newInput2.toString());
await inputField2.press('Enter');
//await page.keyboard.press('Tab');

//再計算ボタンを押下する
await page.getByRole('link', { name: '再計算' }).click();
await page.waitForTimeout(2000);

// 6. 合計金額が「期待値（+10000された数字）」になるまで、何度もチェックしながら待機する最強の魔法！
await expect(async () => {
  const currentTotalText2 = await totalField2.innerText();
  const currentTotal2 = parseInt(currentTotalText2.replace(/[^0-9]/g, ''), 10);

  // 数字同士がピッタリ一致するか確認！
  expect(currentTotal2).toBe(expectedTotal2); 
}).toPass({ timeout: 30000 });
//注文一郎から注文二郎にお客様氏名を変更する
// IDが「txt_salesman_name_」から始まる入力欄のうち、1番目（first）の中身をクリアして入力する最強の書き方！
await page.locator('#vehicle_guest > table > tbody > tr:nth-child(1) > td:nth-child(2) > input').first().fill('注文二郎');
await page.getByRole('link', { name: '新規保存' }).click();

// IDが「txt_salesman_name_」から始まる入力欄のうち、1番目（first）の中身をクリアして入力する最強の書き方！
await page.locator('#vehicle_guest > table > tbody > tr:nth-child(1) > td:nth-child(2) > input').first().fill('注文三郎');
await page.getByRole('link', { name: '上書き保存' }).click();

//印刷プレビュー表示
const page3Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '印刷' }).click();
  const page3 = await page3Promise;

// 🌟 ここで page1 の画面サイズを 横1280px × 縦1200px に強制変更する！
await page3.setViewportSize({ width: 1280, height: 900 });

  //印刷プレビュー表示内＞変更したお客様名が正しいことを確認
// タグや場所を一切無視して、page1の画面上に「鈴木二郎」という文字が見えているか直接確認する！
await expect(page3.getByText('注文三郎').first()).not.toBeVisible();
console.log('印刷プレビュー表示内＞注文販売価格＞お客様氏名欄（input）の値が編集後「注文三郎」が非表示');
  // キーボードの「End」キーを押して一番下まで移動
  await page.keyboard.press('End');

//印刷プレビュー表示内＞買取下取参考価格が正しいことを確認
// ⭕️ 変更後（計算済みの expectedTotal を使う！）
const expectedText2 = expectedTotal2.toLocaleString();
await expect(
  page3.locator('#print > table > tbody > tr > td > table:nth-child(4) > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr:nth-child(7) > td.style6')
).toContainText(expectedText2);
console.log('印刷プレビュー表示内＞注文販売参考価格の値が編集後値：', expectedText2);
//印刷プレビュー表示を閉じる
await page3.getByRole('button', { name: '閉じる' }).click();

//車両カタログ情報タブを押下＞車両カタログ情報へ遷移
await page.getByRole('link', { name: '車両情報' }).click();
// 車両カタログ情報タブが選択状態（クラス名に "on" が付いている状態）であることを確認
await expect(page.locator('li.vehicle_tab01aon')).toContainText('車両情報');
//新車価格を確認
await expect(
  page.locator('#vehicle > table > tbody > tr > td.ve_td01 > div.vehicle_box01 > table > tbody > tr:nth-child(1) > td:nth-child(2) > span')
).toContainText('1,598,400円'); // 👈 ここを実際の文字に変えてください！
console.log('注文販売価格＞車両カタログ情報タブ＞新車価格：1,598,400円');

//注文販売価格タブを押下
await page.getByRole('link', { name: '仕入価格' }).click();
//注文販売価格タブへ遷移
//注文販売価格タブが選択状態（クラス名に "on" が付いている状態）であることを確認
await expect(page.locator('li[class$="on"]')).toContainText('仕入価格');
console.log('商談履歴＞車両カタログ情報タブ＞＞注文販売価格タブ表示');

//将来予測グラフタブを押下＞将来予測グラフへ遷移
await page.getByRole('link', { name: 'グラフ表示' }).click();
// 1. クラス名の最後が "on"（選択状態）で、かつ「将来予測グラフ」という文字を持つタブ（liタグ）をピンポイントで探す
const activeTab3 = page.locator('li[class$="on"]').filter({ hasText: 'グラフ表示' });
// 2. それがちゃんと画面に存在している（見えている）ことを確認する
await expect(activeTab3).toBeVisible();
console.log('商談履歴＞将来予測グラフタブ押下＞将来予測グラフ表示');

//将来予測グラフ＞買取・下取参考価格が編集後の価格で表示されていること
//その他加減算の元の値に10000足して再計算後、計が正しいことを確認する
// 1. 要素の場所（ロケーター）を変数にまとめる（コードを見やすくするため）
const totalField3 = page.locator('#charts > div:nth-child(10)');
// 2. 【変更前】の「合計金額」を取得し、計算用の数字に変換する
const beforeTotalText3 = await totalField3.innerText();
// ※「35,000円」などの文字から数字以外の記号をすべて消して「35000」にします
const beforeTotal3 = parseInt(beforeTotalText3.replace(/[^0-9]/g, ''), 10);
console.log(`グラフ表示価格:` , beforeTotal3);
// 4. 10000を足した「新しい入力値」と「期待される新しい合計金額」を計算！
const expectedTotal4 = expectedTotal2 * 0.001;
console.log(`📝 現在の合計: ${expectedTotal2} -> *0.001＝ 期待する合計: ${expectedTotal4}`);
// 5. 入力欄を新しい値で上書きし、Enterキーを押す（※Enterを押すことでシステムの自動計算を意図的に走らせます！）

await page.waitForTimeout(2000);
// 🌟 expectedTotal4 と beforeTotal3 がピッタリ同じであることを確認する！
expect(expectedTotal4).toBe(beforeTotal3);
console.log('商談履歴＞将来予測グラフタブ押下＞将来予測グラフ表示価格と注文販売価格で編集した値が同じであること');

// 🌟 指定したテキストボックスに「2000」を入力（fill）する！
await page.locator('#vehicle_info > table > tbody > tr > th > div.vehicle_tab03.clearfix > ul > li.input_kakaku > input[type=text]').fill('2000');

//再計算ボタンを押下する
await page.getByRole('link', { name: '再計算' }).click();
await page.waitForTimeout(2000);


//将来予測グラフ＞印刷プレビュー表示
const page4Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '印刷' }).click();
  const page4 = await page4Promise;

// 🌟 ここで page1 の画面サイズを 横1280px × 縦1200px に強制変更する！
await page4.setViewportSize({ width: 1280, height: 800 });

//印刷プレビュー表示内＞買取下取参考価格が変更後2,000,000であることを確認
await page4.getByText('2,000,000').waitFor();
//印刷プレビュー表示を閉じる
await page4.getByRole('button', { name: '閉じる' }).click();

  // アイコン「注文販売」を押下
  await page.getByRole('link', { name: '注文販売' }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  // 注文販売へ遷移＞タブ名完全一致で確認する場合
  await expect(page).toHaveTitle('注文販売');

  //注文販売＞商談履歴ボタンを押下する
  await page.getByRole('link', { name: '商談履歴' }).click();


  //注文販売＞商談履歴＞商談種類＞注文販売を選択する
  await page.locator('select[name="sales_for_history"]').selectOption('1');
//  await page.goto('https://devdlpro.proto-dataline.com/syoudan_his/syoudan_his.php?action=change_select_history&key=sales_for_history');
 
  //検索ボタンを押下する
  await page.getByRole('link', { name: '検 索' }).click();
// 🌟 一覧の1件目（tr:nth-child(1)）の、お客様名の列（td.col_sh_user）に
// 「注文三郎」という文字が正しく表示されているか確認する！
await expect(
  page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_sh_user')
).toContainText('注文三郎');

// 🌟 一覧の1件目（tr:nth-child(1)）の、お客様名の列（td.col_sh_user）に
// 「注文三郎」という文字が正しく表示されているか確認する！
await expect(
  page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_sh_sonkou_kakaku > b')
).toContainText(expectedText2);

// 🌟 一覧の1件目を削除する
// 1. 🌟 【重要】クリックする「前」に、次に出るダイアログで「OK（accept）」を押すように予約する！
page.once('dialog', async dialog => {
  console.log('💡 ダイアログが出ました！メッセージ:', dialog.message()); // 念のためメッセージをログに出す
  await dialog.accept(); // ここで「OK」をクリック！ （※キャンセルしたい場合は dialog.dismiss() です）
});
// 2. 削除ボタンをクリックする（ここでダイアログが呼び出され、上の予約が自動で実行されます）
await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_sh_edit > input[type=button]').click();
// 3. 削除処理（裏側の通信や画面の再描画）が終わるまで待つ！
await page.waitForLoadState('networkidle');
// 🌟 一覧の1件目 「この内容で登録する」押下で新規登録されている（お客様名：注文三郎）ではなくなること
await expect(
  page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_sh_user')
).not.toContainText('注文三郎');

//検索結果一覧＞商談種類＞買取下取が表示されていることを確認
await expect(page.getByRole('cell', { name: '注文' }).nth(1)).toBeVisible();

//商談ツール＞金額１件目の値を格納
  const targetTextprice11 = (await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_sh_sonkou_kakaku > b').first().textContent())?.trim();  
  console.log('履歴・設定＞商談種類：注文＞ソート前、取得した１件目の金額の値の中身は:', targetTextprice11);
//金額でソート（昇順）
 await page.locator('#result_head > table > thead > tr > th.col_sh_sonkou_kakaku > a:nth-child(2)').first().click();
  const targetTextprice22 = (await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_sh_sonkou_kakaku > b').first().textContent())?.trim();  
  console.log('履歴・設定＞商談種類：注文＞ソート（昇順）後、取得した１件目の金額の値の中身は:', targetTextprice22);
// ▼▼▼ ここに追加：値が一致していない（変更された）ことを確認する ▼▼▼
expect(targetTextprice11).not.toBe(targetTextprice22);

//金額でソート（降順）
  await page.locator('.col_sh_sonkou_kakaku > a:nth-child(4)').click();
  await page.waitForTimeout(1000);
  const targetTextprice33 = (await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_sh_sonkou_kakaku > b').first().textContent())?.trim();  
  console.log('履歴・設定＞商談種類：注文＞ソート（降順）後、取得した１件目の金額の値の中身は:', targetTextprice33);
  expect(targetTextprice2).not.toBe(targetTextprice3);

//金額でソートクリア＞ソート操作前の値であることを確認
 await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(2000);
  const targetTextprice44 = (await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_sh_sonkou_kakaku > b').first().textContent())?.trim();  
  console.log('履歴・設定＞商談種類：注文＞ソート（クリア後）取得した１件目の金額の値の中身は:', targetTextprice44);
  expect(targetTextprice11).toBe(targetTextprice44);


/* ページングの確認＞ページ数が無いため保留
  await page.waitForTimeout(2000);
await page.getByRole('link', { name: '次へ>>' }).click();
await expect(page.getByText(/件中 51 -/)).toBeVisible({ timeout: 15000 });
await page.getByRole('link', { name: '<<前へ' }).click();
await expect(page.getByText(/件中 1 -/)).toBeVisible({ timeout: 15000 });
await page.getByRole('link', { name: '2' }).click();
await expect(page.getByText(/件中 51 -/)).toBeVisible({ timeout: 15000 });
await page.getByRole('link', { name: '1' }).click();
await expect(page.getByText(/件中 1 -/)).toBeVisible({ timeout: 15000 });
*/

  // 「csv」！追加対応！
  // アイコン「商談ツール」を押下
  await page.getByRole('link', { name: '商談ツール' }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  // 商談ツールへ遷移＞タブ名完全一致で確認する場合
  await expect(page).toHaveTitle('買取・下取');

  //商談ツール＞商談履歴ボタンを押下する
await page.getByRole('link', { name: '商談履歴' }).click();
//商談ツール＞商談履歴＞商談種類＞買取下取を選択する
await page.locator('select[name="sales_for_history"]').selectOption('0');
//await page.goto('https://devdlpro.proto-dataline.com/syoudan_his/syoudan_his.php?action=change_select_history&key=sales_for_history');
//検索ボタンを押下する
await page.getByRole('link', { name: '検 索' }).click();

// 「出力csv」！追加対応！
const page14Promise = page.waitForEvent('popup');
const download3Promise = page.waitForEvent('download'); // 元の page に対して待つのが正解でした！
// 「出力」リンクをクリック！
await page.getByRole('link', { name: '出力', exact: true }).click();
// ポップアップが一瞬開いて閉じるのをキャッチ
const page14 = await page14Promise; 
// 同時に開始されたダウンロードをキャッチ
const download3 = await download3Promise; 
// ==========================================
// 🌟 捕獲したファイルをPCに保存する処理
// ==========================================
const fileName3 = download3.suggestedFilename();
await download3.saveAs('./downloads/' + fileName3);
console.log(`💡 ダウンロード＞「出力」csvファイル [${fileName3}] の保存が完了しました！`);

// ==========================================
// 🌟 追加するコード：ファイルが本当に存在するか確認（アサーション）する！
// ==========================================
const filePath3 = './downloads/dataline_pro_history.csv';
// fs.existsSync() は、ファイルが存在すれば true を返します。
// それが toBeTruthy()（Trueであること）を満たすかテストします！
expect(fs.existsSync(filePath3)).toBeTruthy();
console.log('✅ フォルダ内に出力CSVファイルが存在することを確認しました！');

// 「入庫管理票出力csv」！追加対応！
const page15Promise = page.waitForEvent('popup');
const download4Promise = page.waitForEvent('download'); // 元の page に対して待つのが正解でした！
// 「入庫管理票出力」リンクをクリック！
await page.getByRole('link', { name: '入庫管理票出力', exact: true }).click();
// ポップアップが一瞬開いて閉じるのをキャッチ
const page15 = await page15Promise; 
// 同時に開始されたダウンロードをキャッチ
const download4 = await download4Promise; 
// ==========================================
// 🌟 捕獲したファイルをPCに保存する処理
// ==========================================
const fileName4 = download4.suggestedFilename();
await download4.saveAs('./downloads/' + fileName4);
console.log(`💡 ダウンロード＞「出力」csvファイル [${fileName4}] の保存が完了しました！`);

// ==========================================
// 🌟 追加するコード：ファイルが本当に存在するか確認（アサーション）する！
// ==========================================
const filePath4 = './downloads/dataline_pro_history_manage.csv';
// fs.existsSync() は、ファイルが存在すれば true を返します。
// それが toBeTruthy()（Trueであること）を満たすかテストします！
expect(fs.existsSync(filePath4)).toBeTruthy();
console.log('✅ フォルダ内に入庫管理票出力CSVファイルが存在することを確認しました！');

//ダウンロードしたcsvファイルを削除（後処理）
const filePath5 = './downloads/dataline_pro_history.csv';
// 🌟 ファイルが存在するかチェックしてから削除する（エラー防止の鉄則！）
if (fs.existsSync(filePath5)) {
  fs.unlinkSync(filePath5); // ここでファイルを物理削除！
  console.log(`💡 古いファイル [${filePath5}] をお掃除（削除）しました！`);
} else {
  console.log(`💡 [${filePath5}] は存在しないため、削除をスキップしました。`);
}
const filePath6 = './downloads/dataline_pro_history_manage.csv';
// 🌟 ファイルが存在するかチェックしてから削除する（エラー防止の鉄則！）
if (fs.existsSync(filePath6)) {
  fs.unlinkSync(filePath6); // ここでファイルを物理削除！
  console.log(`💡 古いファイル [${filePath6}] をお掃除（削除）しました！`);
} else {
  console.log(`💡 [${filePath6}] は存在しないため、削除をスキップしました。`);
}

});
