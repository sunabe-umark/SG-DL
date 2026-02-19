//custom-test.tsを使用
import { test, expect } from '../custom-test';
//import { test, expect } from '@playwright/test';
//DLP回帰テスト-AA相場検索-グレード検索＞AA相場検索
//ログイン画面

test('test', async ({ page }) => {
// ▼ この行を追加（テストの制限時間を120秒に変更）
  test.setTimeout(60000);

  //ログイン画面へ遷移
  await page.goto('https://devdlpro.proto-dataline.com/top/top.php');
  await page.getByRole('textbox', { name: 'ログインID' }).click();
  await page.getByRole('textbox', { name: 'ログインID' }).fill('tst0002');
  
  // パスワードにtst0002を入力
  await page.getByRole('textbox', { name: 'ログインID' }).press('Tab');
  await page.getByRole('textbox', { name: 'パスワード' }).fill('tst0002');
  await page.getByRole('button', { name: 'ログイン' }).click();
  await page.waitForLoadState('networkidle');
  
  // アイコン「商談ツール」を押下
  await page.getByRole('link', { name: '商談ツール' }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500);

/*ここからスキップ

// メーカー「トヨタ」を選択
const makerSelect = page.locator('select').first();
await makerSelect.selectOption({ label: 'トヨタ' });
await page.waitForTimeout(500);
// 車種「ハリアー」を選択
await page.locator('select[name="car"]').selectOption('10102029');
await page.goto('https://devdlpro.proto-dataline.com/tradein_biz/tradein_biz.php#19c73a9ed051097f');
await page.locator('select[name="type[]"]').selectOption('79');
await page.goto('https://devdlpro.proto-dataline.com/tradein_biz/tradein_biz.php#19c73aa44ca16b9a');
await page.locator('select[name="grade[]"]').selectOption('249');
await page.goto('https://devdlpro.proto-dataline.com/tradein_biz/tradein_biz.php#19c73aa67ad1450');
await page.locator('#s_year').selectOption('2022');
await page.locator('select[name="model"]').selectOption('4_2020_6');
await page.locator('select[name="shift"]').selectOption('CVT');
await page.locator('select[name="door"]').selectOption('5');
await page.locator('select[name="handle"]').selectOption('1');
await page.locator('select[name="drive"]').selectOption('0');
await page.locator('select[name="exhaust"]').selectOption('32');
await page.locator('select[name="teiin"]').selectOption('5');
await page.getByRole('link', { name: '検 索' }).click();
await expect(page.getByRole('cell', { name: '(R4)' }).nth(2)).toBeVisible();
await expect(page.getByRole('cell', { name: 'Ｇ' }).nth(1)).toBeVisible();

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
await expect(page.getByRole('cell', { name: 'ハリアー' }).nth(1)).toBeVisible();

//全てクリアを押下する
// 1. 「全てクリア」ボタンをクリック
await page.getByRole('link', { name: '全てクリア' }).click();
// 2. 検索条件の型式テキストボックスが空になるまで待つ
await expect(page.locator('#F2_1 > select')).toHaveValue('');

await page.getByRole('link', { name: 'お気に入り' }).first().click({ timeout: 15000 });
await page.waitForTimeout(1000);
await page.getByRole('link', { name: '選択', exact: true }).first().click();
await page.waitForTimeout(1000);

//お気に入り＞「選択」後、検索結果一覧＞検索条件である「モデル」「認定型式」が一致することを確認
await expect(page.getByRole('cell', { name: '８０系' }).nth(1)).toBeVisible();
await expect(page.getByRole('cell', { name: '6BA-MXUA80' }).first()).toBeVisible();

// 商談ツール＞検索履歴の確認
await page.waitForTimeout(1000);
await page.getByRole('link', { name: '検索履歴' }).first().click({ timeout: 15000 });


// '登録した検索条件は' という文字が見えるようになるまで待つ（デフォルト30秒）
await expect(page.getByText('登録した検索条件を')).toBeVisible({ timeout: 30000 });

await expect(page.getByRole('heading', { name: '検索履歴' })).toBeVisible({ timeout: 15000 });

await page.waitForTimeout(1000);
// await page.evaluate(() => window.scrollTo(0, 0));

await expect(page.getByRole('cell', { name: 'トヨタ' }).first()).toBeVisible({ timeout: 15000 });
await expect(page.getByRole('cell', { name: 'ハリアー' }).first()).toBeVisible();

await page.getByRole('link', { name: '選択', exact: true }).first().click();
//検索条件＞「選択」後、検索結果一覧＞検索条件である「モデル」「認定型式」が一致することを確認
await expect(page.getByRole('cell', { name: '８０系' }).nth(1)).toBeVisible();
await expect(page.getByRole('cell', { name: '6BA-MXUA80' }).first()).toBeVisible();

await page.waitForTimeout(1000);
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

ここまでスキップ
*/

// メーカー「トヨタ」を選択
 await page.locator('select[name="maker"]').selectOption('1010');
 await page.goto('https://devdlpro.proto-dataline.com/tradein_biz/tradein_biz.php#19c745072f36fcf');
  // 車種「アルファード」を選択
  await page.locator('select[name="car"]').selectOption('10102070');
  await page.goto('https://devdlpro.proto-dataline.com/tradein_biz/tradein_biz.php#19c7452978533be');
  // グレード「2.0G」を選択
  await page.locator('select[name="grade[]"]').selectOption('106');
  await page.goto('https://devdlpro.proto-dataline.com/tradein_biz/tradein_biz.php#19c74720de512604');
// 「検索」押下
  await page.getByRole('link', { name: '検 索' }).click();
  await page.waitForTimeout(500);

/*ここからスキップ

  // 検索結果一覧＞「グレード」＞2.5Sと一致確認
 await expect(page.getByRole('cell', { name: /２．５Ｓ/ }).nth(1)).toBeVisible();

//商談ツール＞金額１件目の値を格納
  const targetTextprice1 = (await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_g_price').first().textContent())?.trim();  
  console.log('ソート前、取得した１件目の金額の値の中身は:', targetTextprice1);
//金額でソート（昇順）
 await page.locator('.col_g_price > a').first().click();
  await page.waitForTimeout(2000);
  const targetTextprice2 = (await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_g_price > b').first().textContent())?.trim();  
  console.log('ソート（昇順）後、取得した１件目の金額の値の中身は:', targetTextprice2);
// ▼▼▼ ここに追加：値が一致していない（変更された）ことを確認する ▼▼▼
expect(targetTextprice1).not.toBe(targetTextprice2);

//金額でソート（降順）
 await page.locator('.col_g_price > a:nth-child(4)').click();
  await page.waitForTimeout(2000);
  const targetTextprice3 = (await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_g_price > b').first().textContent())?.trim();  
  console.log('ソート（降順）後、取得した１件目の金額の値の中身は:', targetTextprice3);
  expect(targetTextprice2).not.toBe(targetTextprice3);

//金額でソートクリア＞ソート操作前の値であることを確認
 await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(2000);
  const targetTextprice4 = (await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_g_price > b').first().textContent())?.trim();  
  console.log('ソート（クリア後）取得した１件目の金額の値の中身は:', targetTextprice4);
  expect(targetTextprice1).toBe(targetTextprice4);

  await page.waitForTimeout(2000);
// ページングの確認
await page.getByRole('link', { name: '次へ>>' }).click();
await expect(page.getByText(/件中 51 -/)).toBeVisible({ timeout: 15000 });
await page.getByRole('link', { name: '<<前へ' }).click();
await expect(page.getByText(/件中 1 -/)).toBeVisible({ timeout: 15000 });
await page.getByRole('link', { name: '2' }).click();
await expect(page.getByText(/件中 51 -/)).toBeVisible({ timeout: 15000 });
await page.getByRole('link', { name: '1' }).click();
await expect(page.getByText(/件中 1 -/)).toBeVisible({ timeout: 15000 });

ここまでスキップ
*/

//商談ツール＞検索結果一覧＞1件目データを押下する
await page.getByRole('cell', { name: '(R5)' }).first().click();
// 買取・下取へ遷移＞車両カタログ情報タブへ遷移
await expect(page).toHaveTitle('買取・下取');

// 車両カタログ情報タブが選択状態（クラス名に "on" が付いている状態）であることを確認
await expect(page.locator('li.vehicle_tab01aon')).toContainText('車両情報');

//車種を確認
await expect(page.getByRole('cell', { name: 'アルファード', exact: true })).toBeVisible();
//グレードを確認
await expect(page.locator('.vehicle_box01 > table > tbody > tr:nth-child(2) > td').first()).toBeVisible();
//買取・下取価格タブを押下
await page.getByRole('link', { name: '仕入価格' }).click();
// 買取・下取価格タブへ遷移
// 買取・下取価格＞タブが選択状態（クラス名に "on" が付いている状態）であることを確認
await expect(page.locator('li[class$="on"]')).toContainText('仕入価格');

// 1. 指定した場所のテキストを取得し、変数「priceshitadorikaitori」に代入する
const priceshitadorikaitori = await page.locator('#vehicle_price > table > tbody > tr > td').innerText();
// 2. ちゃんと取れたか確認するために、ログ（コンソール）に出力する
console.log('下取・買取・下取参考価格:', priceshitadorikaitori);

//元の走行距離＋1000を代入する
// 1. 対象の入力欄をわかりやすく変数にしておく
const inputLocator = page.locator('#vehicle_input > table:nth-child(2) > tbody > tr:nth-child(1) > td > input');
// 2. 現在の値を取得する（例: "5000" や "5,000" という文字として取れる）
const currentValueStr = await inputLocator.inputValue();
// 3. カンマ(,)を取り除いて「計算できる数値」に変換する（空欄の場合は 0 として扱う）
const currentValueNum = Number(currentValueStr.replace(/,/g, '')) || 0;
// 4. 1000を足す
const newValueNum = currentValueNum + 1000;
// 5. 新しい値を入力欄にセットする（数値から文字に戻して入力）
await inputLocator.fill(String(newValueNum));
// 確認用：コンソールに結果を出力
console.log(`元の値: ${currentValueStr} -> 新しい値: ${newValueNum}`);

// 1. 現在の西暦年を取得して、2を足す（例: 2026年なら 2028 になる）
const currentYear = new Date().getFullYear();
const targetYear = currentYear + 2;
// 2. プルダウンの場所を変数にしておく
const yearSelect = page.locator('#vehicle_input > table:nth-child(2) > tbody > tr:nth-child(2) > td > select:nth-child(1)');
// 3. 計算した年（2028）をプルダウンから選択する
// パターンA：裏側の値（value）や表示テキストが単なる「2028」の場合
await yearSelect.selectOption(String(targetYear));

// 1. 現在の月を取得する（※必ず +1 をします）
const currentMonth = new Date().getMonth() + 1; // 例：2月なら「2」になる
// 2. 指定されたプルダウンの場所を変数に入れる
const monthSelect = page.locator('#vehicle_input > table:nth-child(2) > tbody > tr:nth-child(2) > td > select:nth-child(2)');
// 3. 取得した月を選択する
await monthSelect.selectOption(String(currentMonth));

// サンルーフのラベルを変数に入れる
const onLabelsr = page.locator('#vehicle_input > table:nth-child(2) > tbody > tr:nth-child(3) > td > div > label:nth-child(2)');
// ラベルをクリックしてONにする
await onLabelsr.click();
// 革シートのラベルを変数に入れる
const onLabelkawa = page.locator('#vehicle_input > table:nth-child(2) > tbody > tr:nth-child(3) > td > div > label:nth-child(4)');
// ラベルをクリックしてONにする
await onLabelkawa.click();
// ナビのラベルを変数に入れる
const onLabelnabi = page.locator('#vehicle_input > table:nth-child(2) > tbody > tr:nth-child(3) > td > div > label:nth-child(6)');
// ラベルをクリックしてONにする
await onLabelnabi.click();
// 色#sel_color のプルダウンから「ブラック」を選択する
await page.locator('#sel_color').selectOption({ label: 'ブラック' });
// その他加減算入力枠に「25000」を入力する
await page.locator('#vehicle_input > table:nth-child(2) > tbody > tr:nth-child(6) > td > input').fill('25000');
// 販売店側特記事項エリアに「販売店特記事項」と入力する
await page.locator('#vehicle_input > table:nth-child(2) > tbody > tr:nth-child(7) > td > textarea').fill('販売店特記事項');
//計算するを押下する
await page.getByRole('link', { name: '計算する' }).click();

// 1. 指定した場所のテキストを取得し、変数「priceNewshitadorikaitori」に代入する
const priceNewshitadorikaitori = await page.locator('#vehicle_price > table > tbody > tr > td').innerText();
// 2. ちゃんと取れたか確認するために、ログ（コンソール）に出力する
console.log('再計算後下取・買取・下取参考価格:', priceNewshitadorikaitori);

// 氏名エリアに「鈴木一郎」と入力する
await page.locator('#vehicle_guest > table > tbody > tr:nth-child(1) > td:nth-child(2) > input').fill('鈴木一郎');
// フリガナエリアに「スズキイチロウ」と入力する
await page.locator('#vehicle_guest > table > tbody > tr:nth-child(2) > td:nth-child(2) > input').fill('スズキイチロウ');
// 郵便１エリアに「100」と入力する
await page.locator('#vehicle_guest > table > tbody > tr:nth-child(3) > td:nth-child(2) > input.vg_zip01').fill('100');
// 郵便２エリアに「0001」と入力する
await page.locator('#vehicle_guest > table > tbody > tr:nth-child(3) > td:nth-child(2) > input.vg_zip02').fill('0001');
// 住所エリアに「東京都千代田区千代田」と入力する
await page.locator('#vehicle_guest > table > tbody > tr:nth-child(4) > td:nth-child(2) > input').fill('東京都千代田区千代田');
// 電話番号エリアに「999-9999-9999」と入力する
await page.locator('#vehicle_guest > table > tbody > tr:nth-child(5) > td:nth-child(2) > input').fill('999-9999-9999');
// 担当者名エリアに「担当者テスト」と入力する
await page.locator('#vehicle_guest > table > tbody > tr:nth-child(6) > td:nth-child(2) > input').fill('担当者テスト');
// 1. 現在の日付を取得し、2ヶ月後をセットする
const targetDate = new Date();
targetDate.setMonth(targetDate.getMonth() + 2);
// 2. 年と月を計算し、月は「04」のように必ず2桁にする
const year = targetDate.getFullYear();
const month = String(targetDate.getMonth() + 1).padStart(2, '0');
const day = String(targetDate.getDate()).padStart(2, '0'); // 日にちも必要な場合
const inputString = `${year}/${month}/${day}`;
// 4. 計算した日付を入力枠にセットする
await page.locator('#txt_nyuukodate').fill(inputString);
//入庫区分＞下取
await page.getByText('下取', { exact: true }).click();
// 入庫価格エリアに「37000」と入力する
await page.locator('#vehicle_guest > table > tbody > tr:nth-child(10) > td:nth-child(2) > input').fill('37000');;
// 車台番号エリアに「123456789」と入力する
await page.locator('#vehicle_guest > table > tbody > tr:nth-child(11) > td > input').fill('123456789');
// お客様向けコメントエリアに「テストコメント」と入力する
await page.locator('#vehicle_guest > table > tbody > tr:nth-child(12) > td > textarea').fill('テストコメント');

// 1. 新しいタブ（ポップアップ）が開くのを待ち構える準備
const page1Promise = page.waitForEvent('popup');
// 2. 印刷のリンク（またはボタン）をクリックして別画面を開く
await page.getByRole('link', { name: '印刷' }).click();
// 3. 新しいタブを「page1」という変数として受け取る
const page1 = await page1Promise;
// 4. 新しいタブの読み込みが完了するまで待機（エラー防止）
await page1.waitForLoadState();
// 5. 【重要】元の page ではなく、新しいタブ（page1）の中から金額のセルを探す
const targetCell = page1.locator('#print > table > tbody > tr > td > table:nth-child(4) > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr:nth-child(7) > td.style6');
// 6. 金額が含まれているか確認

// 1. 取得していた元の値（¥3,345,000）から「¥」の文字だけを消して「3,345,000」にする
const cleanPrice = priceNewshitadorikaitori.replace('¥', '');
// 2. 「3,345,000」という数字が、画面の文字（3,345,000円）の中に含まれているか確認する
await expect(targetCell).toContainText(cleanPrice);

});
