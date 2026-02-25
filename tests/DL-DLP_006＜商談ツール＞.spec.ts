//custom-test.tsを使用
import { test, expect } from '../custom-test';
//import { test, expect } from '@playwright/test';
//DLP回帰テスト-AA相場検索-グレード検索＞AA相場検索
//ログイン画面

test('test', async ({ page }) => {
// ▼ この行を追加（テストの制限時間を180秒に変更）
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
  
// アイコン「商談ツール」を押下
  await page.getByRole('link', { name: '商談ツール' }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

// 商談ツールへ遷移＞タブ名完全一致で確認する場合
  await expect(page).toHaveTitle('買取・下取');

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
  await page.waitForTimeout(3000);

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

await page.waitForTimeout(3000);

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
// 販売店側特記事項エリアに「テスト買取」と入力する
await page.locator('#vehicle_input > table:nth-child(2) > tbody > tr:nth-child(7) > td > textarea').fill('テスト買取');
//計算するを押下する
await page.getByRole('link', { name: '計算する' }).click();

  await page.waitForTimeout(1000);
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
// 担当者名エリアに「テスト太郎」と入力する
await page.locator('#vehicle_guest > table > tbody > tr:nth-child(6) > td:nth-child(2) > input').fill('テスト太郎');
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

// 1. 指定した場所のテキストを取得し、変数「priceNewshitadorikaitori」に代入する
const priceNewshitadorikaitori = await page.locator('#vehicle_price > table > tbody > tr > td').innerText();
// 2. ちゃんと取れたか確認するために、ログ（コンソール）に出力する
// ★追加：計算が終わった「後」の最新の金額を、元の画面からもう一度取得する
// （※セレクタは手順1で値を取った時と同じものを指定してください）
console.log('再計算後下取・買取・下取参考価格:', priceNewshitadorikaitori);

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

// ★変更：古い変数ではなく、新しく取り直した変数（updatedPriceText）の「¥」を消して比較する
// 1. 元の画面で取得した値（文字列）から「¥」を消す
const cleanPrice1 = priceNewshitadorikaitori.replace('¥', '');

// ※確認用：印刷画面のセルから「実際の文字」を取り出してログに表示する
const targetCellText = await targetCell.innerText();
console.log('再計算後￥なし（探したい文字）:', cleanPrice1);
console.log('印刷画面の実際の文字（探される場所）:', targetCellText);
// 2. targetCell（場所）の中に、cleanPrice1（¥を消した金額）が含まれているか確認！
await expect(targetCell).toContainText(cleanPrice1);
await page1.getByRole('button', { name: '閉じる' }).click();


page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('link', { name: 'この内容で登録する' }).click();
await expect(page.getByRole('link', { name: '将来予測グラフへ' })).toBeVisible();
await page.waitForTimeout(1000);
await page.getByRole('link', { name: '将来予測グラフへ' }).click();

  await page.waitForTimeout(1000);

// 1. クラス名の最後が "on"（選択状態）で、かつ「将来予測グラフ」という文字を持つタブ（liタグ）をピンポイントで探す
const activeTab = page.locator('li[class$="on"]').filter({ hasText: 'グラフ表示' });
// 2. それがちゃんと画面に存在している（見えている）ことを確認する
await expect(activeTab).toBeVisible();

// 1. 確認したい名前欄（input）の場所を変数にして見やすくする
const targetInputnamae = page.locator('#vehicle_info > table > tbody > tr:nth-child(1) > td > div > ul > li:nth-child(1) > input');
// 2. その入力欄に入っている値が、変数「名前」と同じであることを確認する
await expect(targetInputnamae).toHaveValue('鈴木一郎');

// 1. 確認したい現在価格欄（input）の場所を変数にして見やすくする
const targetInputgenzaikakaku = page.locator('#price_1 > div > p.txtPrice');
// 2. その入力欄に入っている値が、変数「現在価格」と同じであることを確認する

await expect(targetInputgenzaikakaku).toHaveText(priceNewshitadorikaitori);

// 1. 確認したいコメント欄（input）の場所を変数にして見やすくする
const targetInputkomento = page.locator('#vehicle_info > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > textarea');
// 2. その入力欄に入っている値が、変数「コメント」と同じであることを確認する
await expect(targetInputkomento).toHaveValue('テストコメント');

await page.getByRole('link', { name: '乗換診断へ' }).click();
await page.waitForTimeout(1000);
//購入検討車種を選択
// 1. クラス名の最後が "on"（選択状態）で、かつ「乗換診断」という文字を持つタブ（liタグ）をピンポイントで探す
const activeTab2 = page.locator('li[class$="on"]').filter({ hasText: '乗換診断' });
// 2. それがちゃんと画面に存在している（見えている）ことを確認する
await expect(activeTab2).toBeVisible();

//登録ブランド・車種解除を押下
await page.getByRole('button', { name: '解除' }).click();
await page.waitForTimeout(1000);
// name="purchase_maker" を持ったプルダウンをピンポイントで指定する
const dropdown1 = page.locator('select[name="purchase_maker"]');
// その中に「スバル」が含まれているか確認
await expect(dropdown1).toContainText('スバル');

//登録ブランド・車種を押下
await page.getByRole('button', { name: '登録ブランド・車種' }).click();
//登録ブランドにメーカー「スバル」が無いことを確認
// name="purchase_maker" を持ったプルダウンをピンポイントで指定する
const dropdown2 = page.locator('select[name="purchase_maker"]');
// その中に「スバル」が含まれていないことを確認
await expect(dropdown2).not.toContainText('スバル');

await page.waitForTimeout(1000);
//メーカー：日産を選択する
await page.locator('select[name="purchase_maker"]').selectOption('1015');
await page.goto('https://devdlpro.proto-dataline.com/tradein_biz/tradein_biz.php#19c794f13ad1500');
//車種：GT-Rを選択する
await page.locator('select[name="purchase_car"]').selectOption('10151046');
await page.goto('https://devdlpro.proto-dataline.com/tradein_biz/tradein_biz.php#19c794f1e6c17f2f');
//検索を押下する
await page.locator('#vehicle_info').getByRole('link', { name: '検 索' }).click();
//購入検討車種＞検索結果一覧＞GT-Rが表示されていることを確認する
await expect(page.getByRole('cell', { name: 'ＧＴ－Ｒ' }).first()).toBeVisible();

//購入検討車種＞新車価格１件目の値を格納
  const targetTextprice11 = (await page.locator('#areaR02 > table > tbody > tr:nth-child(2) > td:nth-child(15) > b').first().textContent())?.trim();  
  console.log('ソート前、取得した１件目の新車価格の値の中身は:', targetTextprice11);
//新車価格でソート（昇順）
await page.locator('.th_7p > a').first().click();
  await page.waitForTimeout(2000);
  const targetTextprice22 = (await page.locator('#areaR02 > table > tbody > tr:nth-child(2) > td:nth-child(15)').first().textContent())?.trim();  
  console.log('ソート（昇順）後、取得した１件目の新車価格の値の中身は:', targetTextprice22);
// ▼▼▼ ここに追加：値が一致していない（変更された）ことを確認する ▼▼▼
expect(targetTextprice11).not.toBe(targetTextprice22);

//新車価格でソート（降順）
await page.locator('.th_7p > a:nth-child(4)').click();
  await page.waitForTimeout(2000);
  const targetTextprice33 = (await page.locator('#areaR02 > table > tbody > tr:nth-child(2) > td:nth-child(15) > b').first().textContent())?.trim();  
  console.log('ソート（降順）後、取得した１件目の新車価格の値の中身は:', targetTextprice33);
  expect(targetTextprice22).not.toBe(targetTextprice33);

//新車価格でソートクリア＞ソート操作前の値であることを確認
await page.locator('#vehicle_info').getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(3000);

  const targetTextprice44 = (await page.locator('#areaR02 > table > tbody > tr:nth-child(2) > td:nth-child(15) > b').first().textContent())?.trim();  
  console.log('ソート（クリア後）取得した１件目の金額の値の中身は:', targetTextprice44);
  expect(targetTextprice11).toBe(targetTextprice44);

  await page.waitForTimeout(5000);
// 新車価格＞検索結果一覧＞ページングの確認
await page.locator('#vehicle_info').getByRole('link', { name: '次へ>>' }).click();
await expect(page.getByText('件中 51 -')).toBeVisible();
await page.getByRole('link', { name: '<<前へ' }).click();
await expect(page.getByText('件中 1 -')).toBeVisible();
await page.locator('#vehicle_info').getByRole('link', { name: '2' }).click();
await expect(page.getByText('件中 51 -')).toBeVisible();
await page.getByRole('link', { name: '1' }).click();
await expect(page.getByText('件中 1 -')).toBeVisible();

// 新車価格＞検索結果一覧＞1件目を押下＞下取車輛情報入力へ遷移すること
await page.getByText(targetTextprice11).first().click();


// 1. 確認したい走行距離（input）の場所を変数にして見やすくする
const targetInputsoukoukyori = page.locator('#vehicle_input > table > tbody > tr:nth-child(1) > td > input');
// 2. その入力欄に入っている値が、買取・下取価格で登録した「走行距離」と同じであることを確認する
await expect(targetInputsoukoukyori).toHaveValue(String(newValueNum));

// 1. 確認したい車検年（input）の場所を変数にして見やすくする
const targetInputshakennen = page.locator('#vehicle_input > table > tbody > tr:nth-child(2) > td > select:nth-child(1)');
// 2. その入力欄に入っている値が、買取・下取価格で登録した「車検年」と同じであることを確認する
await expect(targetInputshakennen).toHaveValue(String(targetYear));

// 1. 装備「ＳＲ」というテキストを持つ label タグを探す
const srLabel = page.locator('label').filter({ hasText: 'ＳＲ' });
// 2. その要素のクラス名に 'checked'(ON) が含まれていることを確認する
await expect(srLabel).toHaveClass(/checked/);

// 1. 装備「ＬＳ」というテキストを持つ label タグを探す
const lsLabel = page.locator('label').filter({ hasText: 'ＬＳ' });
// 2. その要素のクラス名に 'checked' (ON)が含まれていることを確認する
await expect(lsLabel).toHaveClass(/checked/);

// 1. 装備「ナビ」というテキストを持つ label タグを探す
const nabiLabel = page.locator('label').filter({ hasText: 'ナビ' });
// 2. その要素のクラス名に 'checked' (ON)が含まれていることを確認する
await expect(nabiLabel).toHaveClass(/checked/);

// 1. 確認したいその他加減算（input）の場所を変数にして見やすくする
const targetInputsonotakagenzan = page.locator('#vehicle_input > table > tbody > tr:nth-child(6) > td > input');
// 2. その入力欄に入っている値が、買取・下取価格で登録した「その他加減算」と同じであることを確認する
await expect(targetInputsonotakagenzan).toHaveValue('25000');

//燃料代購入予定車輛（ハイオク）200であること
await expect(page.locator('input[name="new_car_fuel"]')).toBeVisible();
//燃料代下取予定車輛（レギュラー）100であること
await expect(page.locator('input[name="fuel"]')).toBeVisible();
//診断結果を表示する＞診断結果を表示
await page.getByRole('link', { name: '診断結果を表示する' }).click();

//診断結果表示内容の確認
// 1. 確認したいお客様氏名（input）の場所を変数にして見やすくする
const targetInputokyakusamashimei = page.locator('#result_box > center > span');
// 2. その入力欄に入っている値が、買取・下取価格で登録した「お客様氏名」と同じであることを確認する
await expect(targetInputokyakusamashimei).toHaveText('鈴木一郎');

// 1. 確認したい買取・下取車輛（input）の場所を変数にして見やすくする
const targetInputkaitorishitadorisharyou = page.locator('#photo_file01 > p');
// 2. その入力欄に入っている値が、買取・下取価格で登録した「買取・下取車輛」と同じであることを確認する
  await expect(targetInputkaitorishitadorisharyou).toHaveText('トヨタ アルファード ２．５Ｓ');

// 1. 確認したい購入車輛（input）の場所を変数にして見やすくする
const targetInputkounyusharyou = page.locator('#photo_file02 > p');
// 2. その入力欄に入っている値が、買取・下取価格で登録した「購入車輛」と同じであることを確認する
  await expect(targetInputkounyusharyou).toContainText('日産 ＧＴ－Ｒ');

// 1. 確認したい買取下取価格（input）の場所を変数にして見やすくする
const targetInputkaitorikakaku = page.locator('#diagnose_result_table > tbody > tr:nth-child(3) > td:nth-child(3)');
// 2. その入力欄に入っている値が、買取・下取価格で登録した「買取下取価格」と同じであることを確認する
  await expect(targetInputkaitorikakaku).toContainText(targetCellText);

//拡大表示
const page50Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '拡大表示' }).click();
  const page50 = await page50Promise;

  //拡大表示閉じる
  await page50.getByRole('button', { name: '閉じる' }).click();

  //購入車両選択に戻る
  await page.getByRole('button', { name: '購入車両選択に戻る' }).click();

  //購入予定車輌へ遷移する
  await expect(page.getByRole('img', { name: '購入予定車輌' })).toBeVisible();
await page.waitForTimeout(2000);

  //型式・類別から検索
  await page.getByRole('link', { name: '型式・類別から検索' }).click();
await page.waitForTimeout(2000);

  //グレード検索へ遷移する
await expect(page).toHaveTitle('グレード検索');
await page.waitForTimeout(2000);

//ブラウザバックで商談ツールへ遷移する
  await page.goto('https://devdlpro.proto-dataline.com/tradein_biz/tradein_biz.php#19c79f1470a62');
await page.waitForTimeout(2000);

//商談ツール画面を表示
await expect(page).toHaveTitle('買取・下取');
});
