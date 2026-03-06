import { test, expect } from  '../custom-test';
import fs from 'fs';
test('注文販売', async ({ page }, testInfo) => {
  test.setTimeout(300000);

  await page.goto('https://devdlpro.proto-dataline.com/');
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'ログインID' }).fill('tst0005');
  await page.getByRole('textbox', { name: 'パスワード' }).fill('tst0005');
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'ログイン' }).click();
  await page.waitForTimeout(2000);
  await expect.soft(page).toHaveURL('https://devdlpro.proto-dataline.com/top/top.php'); 
  
//No.1
  await page.getByRole('link', { name: '注文販売' }).click();
    await page.waitForTimeout(2000);
  await expect.soft(page).toHaveURL(/.*stock_biz.php/);
  await expect(page).toHaveTitle('注文販売'); 
//No.2  
  await page.locator('select[name="maker"]').selectOption('1050');
  await page.goto('https://devdlpro.proto-dataline.com/stock_biz/stock_biz.php#19c97785991259a');
  await page.waitForTimeout(2000);
//No.3 
  await page.locator('select[name="car"]').selectOption('10502014');
  await page.goto('https://devdlpro.proto-dataline.com/stock_biz/stock_biz.php#19c97787850168d1');
  await page.waitForTimeout(2000);
//No.4
  await page.locator('select[name="type[]"]').selectOption('26');
  await page.goto('https://devdlpro.proto-dataline.com/stock_biz/stock_biz.php#19c9778aa6711a90');
  await page.waitForTimeout(2000);
//No.5
  await page.locator('select[name="grade[]"]').selectOption('27');
  await page.waitForTimeout(2000);
//No.6
  await page.locator('select[name="s_year"]').selectOption('2013');
  await page.waitForTimeout(2000);
//No.7
  await page.locator('select[name="e_year"]').selectOption('2015');
  await page.waitForTimeout(2000);
//No.8
  await page.locator('select[name="model"]').selectOption('3_2013_10');
  await page.waitForTimeout(2000);
//No.9
  await page.locator('select[name="shift"]').selectOption('CVT');
  await page.waitForTimeout(2000);
//No.10
  await page.locator('select[name="door"]').selectOption('5');
  await page.waitForTimeout(2000);
//No.11
  await page.locator('select[name="handle"]').selectOption('1');
  await page.waitForTimeout(2000);
//No.12
  await page.locator('select[name="drive"]').selectOption('0');
  await page.waitForTimeout(2000);
//No.13
  await page.locator('select[name="exhaust"]').selectOption('6');
  await page.waitForTimeout(2000);
//No.14
  await page.locator('select[name="teiin"]').selectOption('4');
  await page.waitForTimeout(2000);
//No.15
  await page.getByRole('link', { name: '検 索' }).click();
  await page.waitForTimeout(2000);
    await expect(page.getByText('検索結果')).toBeVisible();
//No.16
  await expect(page.locator('#result_body')).toContainText('2015(H27)');
//No.17
  await expect(page.locator('#result_body')).toContainText('Ｇ');
//No.18  
  await page.getByRole('link', { name: 'お気に入り' }).click();
  await page.waitForTimeout(2000);
  await expect(page.getByRole('columnheader', { name: 'No.' })).toBeVisible();
//No.19
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
    //await dialog.dismiss();//キャンセルの場合
});
  // await page.getByRole('link', { name: '削除' }).first().click();
  await page.getByRole('link', { name: '削除' }).first().click();
  await page.waitForTimeout(2000);
//No.20
  await page.locator('#favorite').getByRole('link', { name: 'お気に入り' }).click();
  await page.waitForTimeout(2000);
   await expect(page.locator('#list_favorite > table > tbody > tr:nth-child(2) > td:nth-child(3)')).toHaveText('ダイハツ');
   await expect(page.locator('#list_favorite > table > tbody > tr:nth-child(2) > td:nth-child(4)')).toHaveText('タント');
//No.21
  await page.getByRole('link', { name: '全てクリア' }).click();
   await page.waitForTimeout(3000);
  let makerSelect = page.locator('select#s1');
  await expect(makerSelect).toHaveValue('');
  let carModelSelect = page.locator('select#s2');
// 3. 車種の value が「空（""）」ではなくなるまで自動待機（最大30秒）
  await expect(carModelSelect).toHaveValue('');
  await expect(page.locator('select[name="maker"]')).toHaveValue('');
  await expect(page.locator('select[name="car"]')).toHaveValue('');
//No.22
  await page.getByRole('link', { name: 'お気に入り' }).click();
  await page.waitForTimeout(2000);
  await expect(page.getByRole('columnheader', { name: 'No.' })).toBeVisible();
//No.23
  await page.getByRole('link', { name: '選択' }).first().click();
    await page.waitForTimeout(2000);
  makerSelect = page.locator('select#s1');
  await expect(makerSelect).toHaveValue('1050');
  carModelSelect = page.locator('select#s2');
// 3. 車種の value が「空（""）」ではなくなるまで自動待機（最大30秒）
  await expect(carModelSelect).toHaveValue('10502014');
  await expect(page.locator('select[name="maker"]')).toHaveValue('1050');
  await expect(page.locator('select[name="car"]')).toHaveValue('10502014');
//No.24
  await page.getByRole('link', { name: '全てクリア' }).click();
   await page.waitForTimeout(2000);
  makerSelect = page.locator('select#s1');
  await expect(makerSelect).toHaveValue('');
  carModelSelect = page.locator('select#s2');
// 3. 車種の value が「空（""）」ではなくなるまで自動待機（最大30秒）
  await expect(carModelSelect).toHaveValue('');
  await expect(page.locator('select[name="maker"]')).toHaveValue('');
  await expect(page.locator('select[name="car"]')).toHaveValue('');
//No.25
  await page.getByRole('link', { name: '検索履歴' }).click();
    await page.waitForTimeout(2000);
  await expect(page.getByRole('heading', { name: '検索履歴' })).toBeVisible();
//No.26
// ① 今日の日付を YYYYMMDD 形式で作成する
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0'); // 月は0から始まるので+1
  const dd = String(now.getDate()).padStart(2, '0');

  const todayDate = `${yyyy}/${mm}/${dd}`; // 例: "20260220"

// ② その日付のテキストが画面上に「表示されている（Visible）」か確認する
//await expect(page.getByText(todayDate)).toBeVisible(); 
  
   // 1. テキストを取得
  let  text  = (await page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(3)').first().textContent())?.trim();  

  // console.log(`今日の日付は: ${todayDate}`);
  console.log(`今日の日付は: ${todayDate}`);
  console.log('履歴の一番目は:', text);  
  expect.soft(text).toContain(todayDate);

   await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(4)')).toHaveText('ダイハツ');
   await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(5)')).toHaveText('タント');
//No.27
  await page.getByRole('link', { name: '選択' }).first().click();
  await page.waitForTimeout(3000);
  //makerSelect = page.locator('select#s1');
  await expect(makerSelect).not.toHaveValue('');
 
  // 2. 車種の要素を指定（※ "#car_model" の部分は実際のIDに合わせてください）
  //carModelSelect = page.locator('select#s2');
  // 3. 車種の value が「空（""）」ではなくなるまで自動待機（最大30秒）
  await expect(carModelSelect).not.toHaveValue('');

  await expect.soft(page.locator('select[name="maker"]')).toHaveValue('1050');
  await expect.soft(page.locator('select[name="car"]')).toHaveValue('10502014');
  await expect.soft(page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_sb_grade')).toHaveText('Ｇ');
  await expect.soft(page.locator('#result_body > table > tbody > tr:nth-child(2) > td.col_sb_grade')).toHaveText('Ｇ');
//No.28
  await page.getByRole('link', { name: '検索履歴' }).click();
  await expect(page.getByRole('heading', { name: '検索履歴' })).toBeVisible();

/*　3/4修正スキップ
  // 1. テキストを取得
  let text2 = await page.locator('#btnarea > tbody > tr > td > ul > li:nth-child(7)').textContent();
   console.log('表示中の履歴件数は:', text2); 
  // 2. 変数の中に「1」が含まれているか検証
  expect(text2).toContain(' 件中 1 -');



//No.29
  await page.getByRole('link', { name: '次へ>>' }).click();
  //await page.waitForTimeout(4000);
  //遷移後、一行目”No”が「51」になるまでまつ
  await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(1)').first()).toHaveText('51')
  text2 = await page.locator('#btnarea > tbody > tr > td > ul > li:nth-child(7)').textContent();
  console.log('表示中の履歴件数は:', text2); 
  // 2. 変数の中に「1」が含まれているか検証
  expect(text2).toContain(' 件中 51 -');

//No.30
  await page.getByRole('link', { name: '<<前へ' }).click();
  //await page.waitForTimeout(4000);
  //遷移後、一行目”No”が「1」になるまでまつ
  await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(1)').first()).toHaveText('1')
   // 1. テキストを取得
  text2 = await page.locator('#btnarea > tbody > tr > td > ul > li:nth-child(7)').textContent();
   console.log('表示中の履歴件数は:', text2); 
  // 2. 変数の中に「1」が含まれているか検証
  expect(text2).toContain(' 件中 1 -');

//No.31
  await page.getByRole('link', { name: '2' }).click();
  //await page.waitForTimeout(4000);
  //遷移後、一行目”No”が「51」になるまでまつ
  await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(1)').first()).toHaveText('51')
  text2 = await page.locator('#btnarea > tbody > tr > td > ul > li:nth-child(7)').textContent();
  console.log('表示中の履歴件数は:', text2); 
  // 2. 変数の中に「1」が含まれているか検証
  expect(text2).toContain(' 件中 51 -');
  
//ページ1を押下するときのケース

  await page.getByRole('link', { name: '1' }).click();
  //await page.waitForTimeout(4000);
  //遷移後、一行目”No”が「1」になるまでまつ
  await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(1)').first()).toHaveText('1')
   // 1. テキストを取得
  text2 = await page.locator('#btnarea > tbody > tr > td > ul > li:nth-child(7)').textContent();
  console.log('表示中の履歴件数は:', text2); 
  // 2. 変数の中に「1」が含まれているか検証
  expect(text2).toContain(' 件中 1 -');


*/
//No.32
  await page.getByRole('link', { name: '全てクリア' }).click();
   await page.waitForTimeout(2000);
  makerSelect = page.locator('select#s1');
  await expect(makerSelect).toHaveValue('');
  carModelSelect = page.locator('select#s2');
// 3. 車種の value が「空（""）」ではなくなるまで自動待機（最大30秒）
  await expect(carModelSelect).toHaveValue('');
  await expect(page.locator('select[name="maker"]')).toHaveValue('');
  await expect(page.locator('select[name="car"]')).toHaveValue('');
//No.33
  await page.locator('select[name="maker"]').selectOption('1025');
  await page.goto('https://devdlpro.proto-dataline.com/stock_biz/stock_biz.php#19c9848063cfc6f');
   await page.waitForTimeout(1000);
//No.34
  await page.locator('select[name="car"]').selectOption('10252010');
  await page.goto('https://devdlpro.proto-dataline.com/stock_biz/stock_biz.php#19c98482d28415e');
   await page.waitForTimeout(1000);
//No.35
  await page.locator('select[name="grade[]"]').selectOption('119');
//No.36
  await page.getByRole('link', { name: '検 索' }).click();
    await page.waitForTimeout(2000);
  await expect(page.getByText('検索結果')).toBeVisible();
//No.37
  await expect(page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_sb_grade')).toHaveText('１３Ｃ')
  await expect(page.locator('#result_body > table > tbody > tr:nth-child(2) > td.col_sb_grade')).toHaveText('１３Ｃ')
  //  await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(1)').first()).toHaveText('1')

//No.38
/*
  const price1 = (await page.locator('[id="0510054A20250922E001"] > td.col_total_price').first().textContent())?.trim();  
  console.log('ソート前、取得した１件目の新車価格の値は:', price1);
//新車価格でソート（昇順）
  await page.locator('.col_sb_price > a').first().click();
  await page.waitForTimeout(3000);
  const price2 = (await page.locator('[id="0401179A30250412W003"] > td.col_total_price > b').first().textContent())?.trim();  
  console.log('ソート（昇順）後、取得した１件目の金額の値の中身は:', price2);
// ▼▼▼ ここに追加：値が一致していない（変更された）ことを確認する ▼▼▼
  expect(price1).not.toBe(price2);  
*/
// 1. ソート前の金額が表示されている要素を指定する（※実際のセレクターに変更してください）
const locatorA = page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_sb_price'); // 例: 1つ目の金額
// 要素が表示されるまで待つ（安全対策）
await expect(locatorA).toBeVisible();
// 2. 画面からテキストを取得する（例: "¥1,500,000" や "1,200,000円"）
// ※前回の教訓を活かして、型エラーが出ない innerText() を使います！
const textA = await locatorA.innerText();
// 3. 数字（と小数点）以外の文字をすべて空文字に置き換え、数値型（Number）に変換する
// replace(/[^0-9.]/g, '') が「¥」や「,」「円」などを一掃してくれます
const numA = Number(textA.replace(/[^0-9.]/g, '')); 

//新車価格でソート（昇順）
  await page.locator('.col_sb_price > a').first().click();
  await page.waitForTimeout(3000);

// 1. ソート後の金額が表示されている要素を指定する（※実際のセレクターに変更してください）
  //const locatorB = page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_sb_price > b'); // 例: ソート後の金額金額
  await expect(locatorA).toBeVisible();
  const textB = await locatorA.innerText();
  const numB = Number(textB.replace(/[^0-9.]/g, '')); 

// 念のため、ちゃんと数値になっているかコンソールに出力（デバッグ用）
console.log('ソート前の１番: ', numA, ' / ソート昇順後の１番: ', numB);

// 4. A >= B （AがB以上）であることを確認する
expect(numA).toBeGreaterThanOrEqual(numB);
//No.39
//新車価格でソート（昇順）
  await page.locator('.col_sb_price > a:nth-child(4)').click();
  await page.waitForTimeout(3000);

// 1. ソート後の金額が表示されている要素を指定する（※実際のセレクターに変更してください）
  //const locatorC = page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_sb_price > b'); // 例: ソート後の金額金額
  await expect(locatorA).toBeVisible();
  const textC = await locatorA.innerText();
  const numC = Number(textC.replace(/[^0-9.]/g, '')); 

// 念のため、ちゃんと数値になっているかコンソールに出力（デバッグ用）
  console.log('ソート昇順後の１番: ', numB, ' / ソート降順後の１番: ', numC);

// 4. B <= C （BがC以下）であることを確認する
  expect(numB).toBeLessThanOrEqual(numC);
//No.40
await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(3000);

// 1. ソート後の金額が表示されている要素を指定する（※実際のセレクターに変更してください）
  //const locatorD = page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_sb_price > b'); // 例: ソート後の金額金額
  await expect(locatorA).toBeVisible();
  const textD = await locatorA.innerText();
  const numD = Number(textD.replace(/[^0-9.]/g, '')); 
   console.log('ソート前の１番目: ', numA, ' / ソートクリア後の１番目: ', numD);

// 4. A = B （AがBが同じ）であることを確認する
  expect(numA).toBe(numD); 

//検索結果のページング
 // await expect.soft(page.getByRole('list')).toContainText('全 200 件中 1 - 50件');
   // 1. テキストを取得
  let text3 = await page.locator('#btnarea > tbody > tr:nth-child(2) > td > ul > span').textContent();
   console.log('表示中の検索結果件数は:', text3); 
  // 2. 変数の中に「1」が含まれているか検証
  expect(text3).toContain(' 件中 1 -');
//No.41
  await page.getByRole('link', { name: '次へ>>' }).click();
  await page.waitForTimeout(4000);
  //遷移後、一行目”No”が「51」になるまでまつ
  //await expect(page.locator('#btnarea > tbody > tr > td:nth-child(1) > ul > li:nth-child(7)').first()).toHaveText('51')
  text3 = await page.locator('#btnarea > tbody > tr:nth-child(2) > td > ul > span').textContent();
  console.log('次へ押下後の検索結果件数は:', text3); 
  // 2. 変数の中に「51」が含まれているか検証
  expect(text3).toContain(' 件中 51 -');
//No.42
  await page.getByRole('link', { name: '<<前へ' }).click();
  await page.waitForTimeout(4000);
  //遷移後、一行目”No”が「1」になるまでまつ
  //await expect(page.locator('#btnarea > tbody > tr > td:nth-child(1) > ul > li:nth-child(7)').first()).toHaveText('1')
   // 1. テキストを取得
  text3 = await page.locator('#btnarea > tbody > tr:nth-child(2) > td > ul > span').textContent();
   console.log('前へ押下後の検索結果件数は:', text3); 
  // 2. 変数の中に「1」が含まれているか検証
  expect(text3).toContain(' 件中 1 -');
//No.43
  await page.getByRole('link', { name: '2' }).click();
  await page.waitForTimeout(4000);
  //遷移後、一行目”No”が「51」になるまでまつ
  //await expect(page.locator('#btnarea > tbody > tr > td:nth-child(1) > ul > li:nth-child(7)').first()).toHaveText('51')
  text3 = await page.locator('#btnarea > tbody > tr:nth-child(2) > td > ul > span').textContent();
  console.log('「2」押下後の検索結果件数は:', text3); 
  // 2. 変数の中に「51」が含まれているか検証
  expect(text3).toContain(' 件中 51 -');
//No.44
  await page.getByRole('link', { name: '1' }).click();
  await page.waitForTimeout(4000);
  //遷移後、一行目”No”が「1」になるまでまつ
  //await expect(page.locator('#btnarea > tbody > tr > td:nth-child(1) > ul > li:nth-child(7)').first()).toHaveText('1')
   // 1. テキストを取得
  text3 = await page.locator('#btnarea > tbody > tr:nth-child(2) > td > ul > span').textContent();
  console.log('「1」押下後の検索結果件数は:', text3); 
  // 2. 変数の中に「1」が含まれているか検証
  expect(text3).toContain(' 件中 1 -');
//No.45
  await page.getByRole('cell', { name: '(H29)/12〜' }).first().click();
  await page.waitForTimeout(3000);
  await expect(page.locator('#photo_file > img')).toBeVisible();
//No.46

  await page.getByRole('link', { name: '仕入価格' }).click();
  await page.waitForTimeout(3000);
  await expect(page.getByRole('heading', { name: '車両情報入力' })).toBeVisible();
//No.47
  const locatorB = page.locator('#vehicle_input > table > tbody > tr:nth-child(1) > td > input'); // 現在の走行距離を取得
// 1.初期の双極性障害を取得する
  //const kyoritext1 = await page.locator('#vehicle_input > table > tbody > tr:nth-child(1) > td > input').innerText();
  //const soukoukyorii = await locatorB.innerText();
  
  // 1. name属性を使って入力欄の要素を指定する
  const kyoriInput = page.locator('input[name="txt_kyori"]');
// 要素が表示されるまで待機（念のため）
  await expect(kyoriInput).toBeVisible();
// 2. 現在入力されている値を取得して、変数に格納する（※文字列として取得されます）
  const currentKyoriText = await kyoriInput.inputValue(); 
// 取得した値を確認（例: "72000"）
  console.log(`現在の入力値: ${currentKyoriText}`);
   const kyorinum1 = Number(currentKyoriText.replace(/[^0-9.]/g, '')); 
//   console.log('走行距離の初期値は: ',kyoritext1); 
   console.log('走行距離の初期値は: ',kyorinum1);
// 2. 足したい一定の金額を変数にしておく（例：2000km）
  const shippingFee = 2000;
  console.log('走行距離に足す金額は: ', shippingFee);
// 3. 取得した金額に一定の金額を足す
  const total = kyorinum1 + shippingFee; // 2000kmを足す

   console.log('走行距離の変更後は: ', total);
// 🚨 fill() は「文字列」しか受け付けない仕様です！
// そのため、数値を入力したい場合は .toString() をつけて文字に変換してあげます
  await page.locator('input[name="txt_kyori"]').fill(total.toString());
//No.48
//プルダウンの value 属性に合わせて文字列（String）に変換する
  const year1 = yyyy + 1
//今年の一年後の数字を文字列に変換する
  const year2 = year1.toString();
// デバッグ用: 計算した年を確認
  console.log(`選択する年: ${year2}年`);
  await page.locator('select[name="sel_syaken_year"]').selectOption(year2);
    await page.waitForTimeout(2000);
//No.49
  const mm2 = String(now.getMonth() + 1);//1~9月を１桁格納する
  console.log(`選択する月: ${mm2}月`);
  await page.locator('select[name="sel_syaken_month"]').selectOption(mm2);
    await page.waitForTimeout(2000);
//No.50
// 1. 「ＳＲ」というテキストを持つ label タグを指定する
  const srLabel = page.locator('label').filter({ hasText: 'ＳＲ' });
// 現在のクラス名をごっそり取得する
  const classValue = await srLabel.getAttribute('class') ?? '';
    await page.waitForTimeout(1000);
// もし "checked" が含まれていなかったら、クリックしてONにする
  if (!classValue.includes('checked')) {
    await srLabel.click();
    await page.waitForTimeout(1000);
}
//No.51
// 1. 「ＬＳ」というテキストを持つ label タグを指定する
  const srLabe2 = page.locator('label').filter({ hasText: 'ＬＳ' });
// 現在のクラス名をごっそり取得する
  const classValue2 = await srLabe2.getAttribute('class') ?? '';
    await page.waitForTimeout(1000);
// もし "checked" が含まれていなかったら、クリックしてONにする
  if (!classValue2.includes('checked')) {
   await srLabe2.click();
   await page.waitForTimeout(1000);   
}
//No.52
// 1. 「ＬＳ」というテキストを持つ label タグを指定する
  const srLabe3 = page.locator('label').filter({ hasText: 'ナビ' });
// 現在のクラス名をごっそり取得する
  const classValue3 = await srLabe3.getAttribute('class') ?? '';
    await page.waitForTimeout(1000);
// もし "checked" が含まれていなかったら、クリックしてONにする
  if (!classValue3.includes('checked')) {
   await srLabe3.click();
   await page.waitForTimeout(1000);   
  }
//No.53
  await page.locator('select[name="sel_color"]').selectOption('3');
  await expect(page.locator('select[name="sel_color"]')).toHaveValue('3');
//No.54
  await page.locator('input[name="txt_kagen"]').click();
  await page.locator('input[name="txt_kagen"]').fill('35000');
// 1. name属性を使って入力欄の要素を指定する
   const kagensan = page.locator('input[name="txt_kagen"]');
// 要素が表示されるまで待機（念のため）
  await expect(kagensan).toBeVisible();
// 2. 現在入力されている値を取得して、変数に格納する（※文字列として取得されます）
  const kagensanText = await kagensan.inputValue(); 
  console.log(`その他加減算の値は ${kagensanText}`);

//No.55
  await page.locator('textarea[name="txt_tokki"]').click();
  await page.locator('textarea[name="txt_tokki"]').fill('テスト注文販売');
    await page.waitForTimeout(1000);
//No.57
//注文販売参考価格＞計算前の価格を取得
  // 1. 注文販売参考価格の金額が表示されている要素を指定する（※実際のセレクターに変更してください）
  const locatorC = page.locator('#vehicle_price > table > tbody > tr > td'); 
// 要素が表示されるまで待つ（安全対策）
  await expect(locatorC).toBeVisible();
// ※前回の教訓を活かして、型エラーが出ない innerText() を使います！
  const kakakutxtA = await locatorC.innerText();
// 3. 数字（と小数点）以外の文字をすべて空文字に置き換え、数値型（Number）に変換する
// replace(/[^0-9.]/g, '') が「¥」や「,」「円」などを一掃してくれます
  const kakakunumA = Number(kakakutxtA.replace(/[^0-9.]/g, '')); 
  console.log(`計算前の注文販売価格は ${kakakunumA}`);
  await page.getByRole('link', { name: '計算する' }).click();
    await page.waitForTimeout(2000);
  const kakakutxtB = await locatorC.innerText();
// 3. 数字（と小数点）以外の文字をすべて空文字に置き換え、数値型（Number）に変換する
// replace(/[^0-9.]/g, '') が「¥」や「,」「円」などを一掃してくれます
  const kakakunumB = Number(kakakutxtB.replace(/[^0-9.]/g, '')); 
  console.log(`計算後の注文販売価格は ${kakakunumB}`);

  expect(kakakunumA).not.toBe(kakakunumB); 

  // ==========================================
  // 🌟 追加するコード：変数の中身をテキストファイルに書き出して保存する！
  // ==========================================
  const dirPath = './downloads';
  const textFilePath = './downloads/chumon-hanbai-cleanPrice.txt'; // 好きなファイル名にしてください
  // 1. もし「downloads」フォルダがまだ無ければ、自動で作る（エラー防止の鉄則！）
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
// 🌟 画面の指定した場所から文字を読み取り、変数「chumonprice1」に代入する！
  const chumonprice1 = await page.locator('#vehicle_breakdown > table > tbody > tr:nth-child(9) > td.v_bd02.v_bd_total').innerText();
// 無事に取得できたか、念のためログに出して確認する（プロの鉄則！）
  console.log(`💡 取得した値は: [${chumonprice1}] です！`);
  // 2. 計算後、変数「chumonprice1」の中身を、テキストファイルとして書き込む（保存する）！
  fs.writeFileSync(textFilePath, String(chumonprice1));
  console.log(`💡 変数の値 [${chumonprice1}] を、テキストファイルとして [${textFilePath}] に保存しました！`);
  
//No.57
  await page.locator('input[name="txt_name"]').click();
  await page.locator('input[name="txt_name"]').fill('注文一郎');
//No.58
  await page.locator('input[name="txt_kana"]').click();
  await page.locator('input[name="txt_kana"]').fill('チュウモンイチロウ');
    await page.waitForTimeout(1000);
//No.59
  await page.locator('input[name="txt_post1"]').click();
  await page.locator('input[name="txt_post1"]').fill('100');
    await page.waitForTimeout(1000);
  await page.locator('input[name="txt_post2"]').click();
  await page.locator('input[name="txt_post2"]').fill('0002');
    await page.waitForTimeout(1000);
//No.60
  await page.locator('input[name="txt_address"]').click();
  await page.locator('input[name="txt_address"]').fill('東京都千代田区皇居外苑');
    await page.waitForTimeout(1000);
//No.61
  await page.locator('input[name="txt_tel"]').click();
  await page.locator('input[name="txt_tel"]').fill('012-3456-7890');
    await page.waitForTimeout(1000);
//No.62
  await page.locator('input[name="txt_tanto"]').click();
  await page.locator('input[name="txt_tanto"]').fill('テスト次郎');
    await page.waitForTimeout(1000);
//No.63
  const entrydate = page.locator('input[name="txt_entrydate"]');
  const entrydateText = await entrydate.inputValue(); 
  console.log(`今日の日付は: ${todayDate}`);
  console.log('入力初期値は:', entrydateText);  
  expect.soft(entrydateText).toContain(todayDate);
  
  /*
  await page.locator('input[name="txt_entrydate"]').click();
  await page.locator('input[name="txt_entrydate"]').fill(todayDate);*/
    await page.waitForTimeout(1000);
//No.68
  await page.locator('textarea[name="txt_bikou"]').click();
  await page.locator('textarea[name="txt_bikou"]').fill('テストテスト');
   await page.waitForTimeout(1000);
//No.69
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('link', { name: 'この内容で登録する' }).click();
//No.70
  await page.getByRole('link', { name: 'グラフ表示' }).click();
    await page.waitForTimeout(5000);
  await expect(page.locator('canvas').nth(1)).toBeVisible();

//No.71
  const page13Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '印刷' }).click();
  const page13 = await page13Promise;
    await page13.waitForTimeout(5000);

  await page13.waitForLoadState(); // 読み込み完了を待つ
  console.log(await page13.title());
  await expect(page13).toHaveURL(/.*print.php/);   
//No.72
  const locatorD = page13.locator('#print > table:nth-child(1) > tbody > tr > td:nth-child(1) > table:nth-child(2) > tbody > tr:nth-child(7) > td.style8'); 
// 要素が表示されるまで待つ（安全対策）
  await expect(locatorD).toBeVisible();
// ※前回の教訓を活かして、型エラーが出ない innerText() を使います！
  const kakakutxtD = await locatorD.innerText();
// 3. 数字（と小数点）以外の文字をすべて空文字に置き換え、数値型（Number）に変換する
// replace(/[^0-9.]/g, '') が「¥」や「,」「円」などを一掃してくれます
  const kakakunumD = Number(kakakutxtD.replace(/[^0-9.]/g, '')); 
  console.log(`印刷プレビューの注文販売価格は ${kakakunumD}`);
  expect(kakakunumB).toBe(kakakunumD); 
   console.log('注文販売タブの参考価格は', kakakutxtB, ' / 印刷プレビューの参考価格は:' ,kakakutxtD);
//No.73
  await page13.getByRole('button', { name: '閉じる' }).click();
    await page.waitForTimeout(2000);
  await expect.soft(page).toHaveURL(/.*stock_biz.php/); 
//No.74
  await page.getByRole('link', { name: '全てクリア' }).click();
   await page.waitForTimeout(2000);
  makerSelect = page.locator('select#s1');
  await expect(makerSelect).toHaveValue('');
  carModelSelect = page.locator('select#s2');
// 3. 車種の value が「空（""）」ではなくなるまで自動待機（最大30秒）
  await expect(carModelSelect).toHaveValue('');
  await expect(page.locator('select[name="maker"]')).toHaveValue('');
  await expect(page.locator('select[name="car"]')).toHaveValue('');
//No.75
  await page.locator('select[name="maker"]').selectOption('1025');
  await page.goto('https://devdlpro.proto-dataline.com/stock_biz/stock_biz.php#19c9d7d643ad01a');
//No.76
  await page.locator('select[name="car"]').selectOption('10252010');
  await page.goto('https://devdlpro.proto-dataline.com/stock_biz/stock_biz.php#19c9d7dc92f5b18');
//No.77
  await page.locator('select[name="grade[]"]').selectOption('119');
//No.78
  await page.getByRole('link', { name: '検 索' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('link', { name: '型式・類別から検索' }).click();
  await page.waitForTimeout(8000);
//  await expect.soft(page).toHaveURL(/.*grade.php/);
  await expect(page).toHaveTitle('グレード検索');
//No.79
  await expect(page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_g_car')).toHaveText('デミオ');
  await expect(page.locator('#result_body > table > tbody > tr:nth-child(2) > td.col_g_car')).toHaveText('デミオ'); 
//No.80
  await page.goBack({ waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await expect.soft(page).toHaveURL(/.*stock_biz.php/); 
  await expect(page).toHaveTitle('注文販売'); 
  console.log('最後まで完了'); });
