import { test, expect } from '../custom-test';

test('小売相場', async({page, context}, testInfo)=> {
  test.setTimeout(300000);

  await page.goto('https://devdlpro.proto-dataline.com/');
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'ログインID' }).fill('tst0001');
  await page.getByRole('textbox', { name: 'パスワード' }).fill('tst0001');
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'ログイン' }).click();
  await page.waitForTimeout(2000);
  await expect.soft(page).toHaveURL('https://devdlpro.proto-dataline.com/top/top.php'); 

//No.1
  await page.getByRole('link', { name: '小売相場' }).click();
  await page.waitForTimeout(2000);
  await expect.soft(page).toHaveURL(/.*retail.php/); 
  await expect(page).toHaveTitle('小売相場');  
//No.2
  await page.locator('select[name="maker"]').selectOption('1010');
  await page.goto('https://devdlpro.proto-dataline.com/retail/retail.php#19c743b87ca12b31');
//No.3
  await page.locator('select[name="car"]').selectOption('10101073');
  await page.goto('https://devdlpro.proto-dataline.com/retail/retail.php#19c743bd41214914');
  await page.waitForTimeout(2000);
//No.4
  await page.locator('#Model').selectOption('13');
  await page.goto('https://devdlpro.proto-dataline.com/retail/retail.php#19c743c0f3a4423');
  await page.waitForTimeout(2000);
//No.5
  await page.locator('select[name="s_zaiko"]').selectOption('0');
  await page.waitForTimeout(1000);
//No.6
  await page.locator('select[name="e_zaiko"]').selectOption('2000');
  await page.waitForTimeout(1000);
//No.7
  await page.locator('#Grade').selectOption('15');
  await page.goto('https://devdlpro.proto-dataline.com/retail/retail.php#19c743eab325346');
  await page.waitForTimeout(2000);

//No.8
  await page.locator('select[name="s_year"]').selectOption('2011');
  await page.waitForTimeout(1000);
//No.9 
  await page.locator('select[name="s_tmonth"]').selectOption('1');  
  await page.waitForTimeout(1000);
//No.10
  await page.locator('select[name="e_year"]').selectOption('2018');
//No.11
  await page.locator('select[name="e_tmonth"]').selectOption('12');

//No.12
  await page.locator('select[name="s_running"]').selectOption('1');
//No.13
  await page.locator('select[name="e_running"]').selectOption('200');

//No.14
  await page.locator('#Shift').selectOption('1');
//No.15
  await page.locator('#Color').selectOption('10');
//No.16※デフォルトの「評価（外）」を選択することができないので一度他を選択してから「評価（外）」を選択
  await page.locator('select[name="s_out_kantei_retail"]').selectOption('1');
  await page.locator('select[name="s_out_kantei_retail"]').selectOption('');
//No.17※デフォルトの「以上」を選択することができないので一度他を選択してから「以上」を選択
  await page.locator('select[name="e_out_kantei_retail"]').selectOption('1');
  await page.locator('select[name="e_out_kantei_retail"]').selectOption('');
//No.18　※デフォルトの「評価（内）」を選択することができないので一度他を選択してから「評価（内
  await page.locator('select[name="s_in_kantei_retail"]').selectOption('1');
  await page.locator('select[name="s_in_kantei_retail"]').selectOption('');
//No.19　※デフォルトの「以上」を選択することができないので一度他を選択してから「以上」を選択
  await page.locator('select[name="e_in_kantei_retail"]').selectOption('1');
  await page.locator('select[name="e_in_kantei_retail"]').selectOption('');
//No.20
  await page.getByText('＋ 詳細検索').click();
  await page.waitForTimeout(1000);
  await page.getByText('整備付').click();
  await page.waitForTimeout(1000);
//No.21
  await page.locator('#Exhaust').selectOption('24');
//No.22
  await page.locator('#Drive').selectOption('0');
//No.23
  await page.locator('#Door').selectOption('5');
//No.24
await page.getByText('無').nth(1).click();
//No.25
  await page.getByText('有').nth(3).click();
//No.26
  await page.getByText('無').nth(4).click();
//No.27
  await page.getByText('無').nth(5).click();
//No.28
  await page.getByText('無').nth(2).click();
//No.29
  await page.getByText('右').click();
//No.30
  await page.locator('.left.checked').first().click();
//No.31
  await page.getByRole('link', { name: 'エリア' }).click();
  await page.waitForTimeout(3000);
  //await expect(page.getByText('全選択')).toBeVisible();
  //const all_select = page.getByRole('button', { name: '全選択' });
  //await expect(all_select).toBeEnabled();
  //No.32 ※先頭２つと末尾2つのチェックを確認
  await page.getByText('全選択').click();
  await expect(page.locator('td:nth-child(6) > table > tbody > tr > td > input').first()).toBeChecked();
  await expect(page.locator('td:nth-child(6) > table > tbody > tr > td > input:nth-child(6)').first()).toBeChecked();
  await expect(page.locator('input:nth-child(16)').first()).toBeChecked();
  await expect(page.locator('input[name="place_id[]"]').nth(5)).toBeChecked();
//No.33
  await page.getByRole('link', { name: '閉じる' }).click();
  await expect(page.getByText('全選択')).not.toBeVisible();
//No.34
  await page.getByRole('cell', { name: '成約状況' }).click();
  await page.locator('#Pledge').selectOption('1');
//No.35
  await page.locator('input[name="s_price"]').click();
  await page.locator('input[name="s_price"]').fill('10');
//No.36
  await page.locator('input[name="e_price"]').click();
  await page.locator('input[name="e_price"]').fill('2000');
 //No37
  await page.locator('input[name="s_price_total"]').click();
  await page.locator('input[name="s_price_total"]').fill('30');
//No.38
  await page.locator('input[name="e_price_total"]').click();
  await page.locator('input[name="e_price_total"]').fill('4000');
//No.39 ※デフォルトの「goo鑑/保」を選択することができないので一度他を選択してから「goo鑑/保」を選択

  await page.getByRole('cell', { name: 'Goo鑑/保' }).click();
  await page.locator('#Ninho').selectOption('1');
  await page.locator('#Ninho').selectOption('');
//No.40
  await page.getByText('ディーラー').click();
//No.41
  await page.locator('tr:nth-child(8) > td:nth-child(4) > .retail_radio > .center').click();
//No.42
  await page.getByText('上記条件から検索').click();
  await page.waitForTimeout(2000);
//No.43 
  await expect.soft(page.locator('[id="0901446A20250604T006"]')).toContainText('NHP10');
//No.44
  await expect.soft(page.locator('[id="0901446A20250604T006"]')).toContainText('Ｓ');

//カスタマイズの設定を実施
  await page.getByText('カスタマイズ').click();
  await page.waitForTimeout(2000);
/*特定の項目名でis-offを持っている項目名があるかを確認する方法いったんコメントアウト
// 「is-off クラスを持っている、排気の項目」をピンポイントで指定
const offToggle = page.locator('span.is-off[data-soatitem="col_exhaust_nm"]');
const toggle = page.locator('span[data-soatitem="col_exhaust_nm"]');
// 存在する場合のみクリックする
if (await offToggle.isVisible()) {
  await offToggle.click();
  // クリック後、その要素（OFF状態のもの）が消えたことを確認
  await expect(offToggle).toBeHidden();
}

// クラスに "is-off" が含まれていなければ ON とみなす
const isOn = !(await toggle.evaluate(el => el.classList.contains('is-off')));

if (isOn) {
  console.log('排気は現在は ON です');
} else {
  console.log('排気は現在は OFF です');
}

// 「is-off クラスを持っている、排気の項目」をピンポイントで指定
const offToggle2 = page.locator('span.is-off[data-soatitem="col_door_nm"]:not(.is-off)');
const toggle2 = page.locator('span[data-soatitem="col_door_nm"]');
// 存在する場合のみクリックする
if (await offToggle2.isVisible()) {
  await offToggle2.click();
  // クリック後、その要素（OFF状態のもの）が消えたことを確認
  await expect(offToggle2).toBeHidden();
}

// クラスに "is-off" が含まれていなければ ON とみなす
const isOn2 = !(await toggle2.evaluate(el => el.classList.contains('is-off')));

if (isOn2) {
  console.log('ドアは現在は ON です');
} else {
  console.log('ドアは現在は OFF です');
}
特定の項目名でis-offを持っている項目名があるかを確認する方法いったんコメントアウトここまで*/
  const exhaust_toggle = page.locator('span[data-soatitem="col_exhaust_nm"]');
// 現在の状態を確認
  const exhaust_isOff = await exhaust_toggle.evaluate(el => el.classList.contains('is-off'));

// ONにしたい場合（現在 OFF である "is-off" が含まれているならクリック）
  if (exhaust_isOff) {
    // 1. 要素が見える位置までスクロール（念のため）
    await exhaust_toggle.scrollIntoViewIfNeeded();
    // 2. クリック実行
    await exhaust_toggle.click();
    // 3. 状態が切り替わるのを待機
    // not.toHaveClass(/is-off/) を使うことで、is-off が消えるまで最大5秒待ちます
    await expect(exhaust_toggle).not.toHaveClass(/is-off/);
  }

const door_toggle = page.locator('span[data-soatitem="col_door_nm"]');
// 現在の状態を確認
const door_isOff = await door_toggle.evaluate(el => el.classList.contains('is-off'));

// ONにしたい場合（現在 OFF である "is-off" が含まれているならクリック）
  if (!door_isOff) {
  // 1. 要素が見える位置までスクロール（念のため）
  await door_toggle.scrollIntoViewIfNeeded();
  
  // 2. クリック実行
  await door_toggle.click();

  // 3. 状態が切り替わるのを待機
  // not.toHaveClass(/is-off/) を使うことで、is-off が消えるまで最大5秒待ちます
  await expect(door_toggle).toHaveClass(/is-off/);
  }
  if (exhaust_isOff) {
    console.log('排気は現在は OFF です');
  } else {
    console.log('排気は現在は ON です');
  }
  if (door_isOff) {
    console.log('ドアは現在は OFF です');
  } else {
    console.log('ドアは現在は ON です');
  }
  await page.getByText('設定を保存').click();

//No.45
  await expect.soft(page.locator('#c-sortable').getByText('排気')).toBeVisible();
//No.46
  await expect.soft(page.locator('#c-sortable').getByText('ドア')).not.toBeVisible();

//No.47
  await page.getByRole('link', { name: 'お気に入り' }).click();
//No.48
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
//No.49 
  await page.locator('#favorite').getByRole('link', { name: 'お気に入り' }).click();
  await page.waitForTimeout(3000);
  await expect(page.locator('#list_favorite > table > tbody > tr:nth-child(2) > td:nth-child(3)')).toHaveText('トヨタ');
  await expect(page.locator('#list_favorite > table > tbody > tr:nth-child(2) > td:nth-child(4)')).toHaveText('アクア');

   // await page.getByText('設定を保存').click();//失敗して止める用
//No.50
  await page.getByRole('link', { name: '全てクリア' }).click();
  await page.waitForTimeout(2000);

  let makerSelect = page.locator('select#s1');
  await expect(makerSelect).toHaveValue('');
// 2. 車種の要素を指定（※ "#car_model" の部分は実際のIDに合わせてください）
  let carModelSelect = page.locator('select#s2');
// 3. 車種の value が「空（""）」ではなくなるまで自動待機（最大30秒）
  await expect(carModelSelect).toHaveValue('');

  await expect(page.locator('select[name="maker"]')).toHaveValue('');
  await expect(page.locator('select[name="car"]')).toHaveValue('');

  console.log('検索結果がクリアOK');

//No.51
  await page.getByRole('link', { name: 'お気に入り' }).click();
  await page.waitForTimeout(3000);  
  
//No.52
  await page.getByRole('link', { name: '選択' }).nth(3).click();
  await page.goto('https://devdlpro.proto-dataline.com/retail/retail.php#19c79c3877314f44');
  await page.waitForTimeout(1000);
  await expect(page.locator('select[name="maker"]')).toHaveValue('1010');
  await expect(page.locator('select[name="car"]')).toHaveValue('10101073');
 //No.53
  await page.getByRole('link', { name: '全てクリア' }).click({ timeout: 15000 });
  await page.waitForTimeout(5000);
  //const pulldown = page.locator('select[name="maker"]');
  //await expect(pulldown).toHaveValue(''); // value="" になるのを待つ
  makerSelect = page.locator('select#s1');
  await expect(makerSelect).toHaveValue('');
 
  // 2. 車種の要素を指定（※ "#car_model" の部分は実際のIDに合わせてください）
  const carModelSelect1 = page.locator('select#s2');
  // 3. 車種の value が「空（""）」ではなくなるまで自動待機（最大30秒）
  await expect(carModelSelect1).toHaveValue('');

 //すべてクリアが聞く前にスクショ取られてしまうので、すべてクリアが確認後にスクリーンショット添付
const screenshot1 = await page.screenshot();
await testInfo.attach('すべてクリア実施後', {
  body: screenshot1,
  contentType: 'image/png',
});

//No.54
  await page.getByRole('link', { name: '検索履歴' }).click({ timeout: 15000 });

// ① 今日の日付を YYYYMMDD 形式で作成する
const now = new Date();
const yyyy = now.getFullYear();
const mm = String(now.getMonth() + 1).padStart(2, '0'); // 月は0から始まるので+1
const dd = String(now.getDate()).padStart(2, '0');

const todayDate = `${yyyy}/${mm}/${dd}`; // 例: "20260220"
// ② その日付のテキストが画面上に「表示されている（Visible）」か確認する
//await expect(page.getByText(todayDate)).toBeVisible(); 
  
//No.55
   // 1. テキストを取得
  let  text  = (await page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(3)').first().textContent())?.trim();  

  // console.log(`今日の日付は: ${todayDate}`);
  console.log(`今日の日付は: ${todayDate}`);
  console.log('履歴の一番目は:', text);  
  expect.soft(text).toContain(todayDate);

   await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(4)')).toHaveText('トヨタ');
   await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(5)')).toHaveText('アクア');
//No.56

await page.getByRole('link', { name: '選択' }).nth(3).click({ delay: 150 });
  await page.waitForTimeout(3000);
  //makerSelect = page.locator('select#s1');
  await expect(makerSelect).not.toHaveValue('');
 
  // 2. 車種の要素を指定（※ "#car_model" の部分は実際のIDに合わせてください）
  //carModelSelect = page.locator('select#s2');
  // 3. 車種の value が「空（""）」ではなくなるまで自動待機（最大30秒）
  await expect(carModelSelect).not.toHaveValue('');

  await expect.soft(page.locator('select[name="maker"]')).toHaveValue('1010');
  await expect.soft(page.locator('select[name="car"]')).toHaveValue('10101073');

   await expect(page.locator('[id="0901446A20250604T006"]')).toContainText('Ｓ');
   await expect(page.locator('[id="3001045A20251113T005"]')).toContainText('Ｓ');

//No.57 前提条件、再度、検索履歴を表示するところから
  await page.getByRole('link', { name: '検索履歴' }).click();
  await page.waitForTimeout(5000);
  await expect.soft(page.getByRole('heading', { name: '検索履歴' })).toBeVisible(); 
  //await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(1)').first()).toHaveText('51')
  // 1. テキストを取得
  let text2 = await page.locator('#btnarea > tbody > tr > td > ul > li:nth-child(7)').textContent();
   console.log('表示中の履歴件数は:', text2); 
  // 2. 変数の中に「1」が含まれているか検証
  expect(text2).toContain(' 件中 1 -');

//No.57
  await page.getByRole('link', { name: '次へ>>' }).click();
  //await page.waitForTimeout(4000);
  //遷移後、一行目”No”が「51」になるまでまつ
  await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(1)').first()).toHaveText('51')
  text2 = await page.locator('#btnarea > tbody > tr > td > ul > li:nth-child(7)').textContent();
  console.log('表示中の履歴件数は:', text2); 
  // 2. 変数の中に「1」が含まれているか検証
  expect(text2).toContain(' 件中 51 -');

//No.58  
  await page.getByRole('link', { name: '<<前へ' }).click();
  //await page.waitForTimeout(4000);
  //遷移後、一行目”No”が「1」になるまでまつ
  await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(1)').first()).toHaveText('1')
   // 1. テキストを取得
  text2 = await page.locator('#btnarea > tbody > tr > td > ul > li:nth-child(7)').textContent();
   console.log('表示中の履歴件数は:', text2); 
  // 2. 変数の中に「1」が含まれているか検証
  expect(text2).toContain(' 件中 1 -');

//No.59
  await page.getByRole('link', { name: '2' }).click();
  //await page.waitForTimeout(4000);
  //遷移後、一行目”No”が「51」になるまでまつ
  await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(1)').first()).toHaveText('51')
  text2 = await page.locator('#btnarea > tbody > tr > td > ul > li:nth-child(7)').textContent();
  console.log('表示中の履歴件数は:', text2); 
  // 2. 変数の中に「1」が含まれているか検証
  expect(text2).toContain(' 件中 51 -');
  
//ページ1を押下するときのケース
/*
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
//No.60
  await page.locator('select[name="maker"]').selectOption('1015');
  await page.goto('https://devdlpro.proto-dataline.com/retail/retail.php#19c7a60c4bfedf2');
await page.waitForTimeout(2000);
//No.61
  await page.locator('select[name="car"]').selectOption('10152029');
  await page.goto('https://devdlpro.proto-dataline.com/retail/retail.php#19c7a60f105f50');
  await page.waitForTimeout(2000);
//No.62
  await page.getByText('上記条件から検索 ').click();
 //No.63
  await page.locator('.col_total_price > a').first().click();

//支払い総額＞金額１件目の値を格納
  const targetTextprice11 = (await page.locator('[id="0510054A20250922E001"] > td.col_total_price').first().textContent())?.trim();  
  console.log('ソート前、取得した１件目の金額の値の中身は:', targetTextprice11);
//金額でソート（昇順）

await page.locator('th:nth-child(24) > a').first().click();
  await page.waitForTimeout(3000);
  const targetTextprice22 = (await page.locator('[id="0401179A30250412W003"] > td.col_total_price > b').first().textContent())?.trim();  
  console.log('ソート（昇順）後、取得した１件目の金額の値の中身は:', targetTextprice22);
// ▼▼▼ ここに追加：値が一致していない（変更された）ことを確認する ▼▼▼
expect(targetTextprice11).not.toBe(targetTextprice22);  
//No.64
  await page.locator('.col_total_price > a:nth-child(3)').click();
  await page.waitForTimeout(3000);
  const targetTextprice33 = (await page.locator('[id="0100268A20241121E003"] > td.col_total_price > b').first().textContent())?.trim();  
  console.log('ソート（降順）後、取得した１件目の金額の値の中身は:', targetTextprice33);
// ▼▼▼ ここに追加：値が一致していない（変更された）ことを確認する ▼▼▼
expect(targetTextprice22).not.toBe(targetTextprice33);   
//No.65
await page.getByRole('link', { name: 'ソートのクリア' }).click();
  const targetTextprice44 = (await page.locator('[id="0510054A20250922E001"] > td.col_total_price').first().textContent())?.trim();  
  console.log('ソートクリア後、取得した１件目の金額の値の中身は:', targetTextprice44);
  expect(targetTextprice11).toBe(targetTextprice44);  
//No.66
  await page.locator('select[name="filter_p_katashiki_nm"]').selectOption('Z12');
  await page.goto('https://devdlpro.proto-dataline.com/retail/retail.php#19c92673ce86c47');
  await page.waitForTimeout(3000);
  await expect(page.locator('[id="0510054A20250922E001"]')).toContainText('Z12');
  await expect(page.locator('[id="0501521A20251110E006"]')).toContainText('Z12');
  await expect(page.locator('[id="0706850A20251116E001"]')).toContainText('Z12');
//No.67
  await page.getByRole('link', { name: 'フィルタ解除' }).click();
  await page.waitForTimeout(3000);
  await expect(page.locator('select[name="filter_p_katashiki_nm"]')).toHaveValue('');


//検索結果のページング
 // await expect.soft(page.getByRole('list')).toContainText('全 200 件中 1 - 50件');
   // 1. テキストを取得
  let text3 = await page.locator('#btnarea > tbody > tr > td:nth-child(1) > ul > li:nth-child(7)').textContent();
   console.log('表示中の検索結果件数は:', text3); 
  // 2. 変数の中に「1」が含まれているか検証
  expect(text3).toContain(' 件中 1 -');
//No.68
  await page.getByRole('link', { name: '次へ>>' }).click();
  await page.waitForTimeout(4000);
  //遷移後、一行目”No”が「51」になるまでまつ
  //await expect(page.locator('#btnarea > tbody > tr > td:nth-child(1) > ul > li:nth-child(7)').first()).toHaveText('51')
  text3 = await page.locator('#btnarea > tbody > tr > td:nth-child(1) > ul > li:nth-child(7)').textContent();
  console.log('次へ押下後の検索結果件数は:', text3); 
  // 2. 変数の中に「51」が含まれているか検証
  expect(text3).toContain(' 件中 51 -');
//No.69
  await page.getByRole('link', { name: '<<前へ' }).click();
  await page.waitForTimeout(4000);
  //遷移後、一行目”No”が「1」になるまでまつ
  //await expect(page.locator('#btnarea > tbody > tr > td:nth-child(1) > ul > li:nth-child(7)').first()).toHaveText('1')
   // 1. テキストを取得
  text3 = await page.locator('#btnarea > tbody > tr > td:nth-child(1) > ul > li:nth-child(7)').textContent();
   console.log('前へ押下後の検索結果件数は:', text3); 
  // 2. 変数の中に「1」が含まれているか検証
  expect(text3).toContain(' 件中 1 -');
//No.70
  await page.getByRole('link', { name: '2' }).click();
  await page.waitForTimeout(4000);
  //遷移後、一行目”No”が「51」になるまでまつ
  //await expect(page.locator('#btnarea > tbody > tr > td:nth-child(1) > ul > li:nth-child(7)').first()).toHaveText('51')
  text3 = await page.locator('#btnarea > tbody > tr > td:nth-child(1) > ul > li:nth-child(7)').textContent();
  console.log('「2」押下後の検索結果件数は:', text3); 
  // 2. 変数の中に「51」が含まれているか検証
  expect(text3).toContain(' 件中 51 -');
//No.71 
  await page.getByRole('link', { name: '1' }).click();
  await page.waitForTimeout(4000);
  //遷移後、一行目”No”が「1」になるまでまつ
  //await expect(page.locator('#btnarea > tbody > tr > td:nth-child(1) > ul > li:nth-child(7)').first()).toHaveText('1')
   // 1. テキストを取得
  text3 = await page.locator('#btnarea > tbody > tr > td:nth-child(1) > ul > li:nth-child(7)').textContent();
  console.log('「1」押下後の検索結果件数は:', text3); 
  // 2. 変数の中に「1」が含まれているか検証
  expect(text3).toContain(' 件中 1 -');

//No.72
  await page.getByRole('link', { name: '次のページを続けて表示する' }).click();
    await page.waitForTimeout(5000);
  text3 = await page.locator('#btnarea > tbody > tr > td:nth-child(1) > ul > li:nth-child(7)').textContent();
  console.log('「次のページを続けて表示する」押下後の検索結果件数は:', text3); 
  // 2. 変数の中に「51」が含まれているか検証
  expect(text3).toContain(' 件中 51 -');

//No.73
const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '印刷' }).click();
  const page1 = await page1Promise;
//No.74
await page.setViewportSize({ width: 1251, height: 750 });
  await page.waitForTimeout(3000);
await page1.getByRole('button', { name: '閉じる' }).click();
//No.75
await page.getByRole('link', { name: 'メモ' }).click();
  await page.waitForTimeout(3000);
let text4 = await page.locator('#btnarea > tbody > tr > td > p > b').last().innerText();
  console.log('メモの内容は:', text4); 
expect(text4).toContain('日産');
expect(text4).toContain('キューブ');
  //No.76
await page.locator('#xxx02').click();
    await page.waitForTimeout(3000);
await expect(page.locator('div').filter({ hasText: '小売相場 日産_1千km〜200千km_キューブ_0〜' }).nth(3)).not.toBeVisible();
//No.77

 await page.getByRole('link', { name: 'グラフ' }).click();
 await page.waitForTimeout(5000);
//  const myFrame = page.frameLocator('#fancybox-frame');
//  const ratioLabel = myFrame.locator('td', { hasText: 'ヒット数に対する比率' });
//  await expect(ratioLabel).toBeVisible();

  const myFrame = page.frameLocator('iframe[id^="fancybox-frame"]');
// 1. まず iframe 内の body が「空っぽ（中身なし）」じゃなくなるのを待つ
  await myFrame.locator('body').waitFor({ state: 'visible' });
  const targetTd = myFrame.getByText('ヒット数に対する比率', { exact: false });

// 5秒（デフォルト）で足りない場合があるため、少し長めに待機時間を設定するとより安定します
//await expect(targetTd).toBeVisible({ timeout: 15000 });
  await expect.soft(page.locator('iframe[id="fancybox-frame"]').contentFrame().getByRole('rowheader', { name: '定番設定' })).toBeVisible();
//No.78
  await page.locator('iframe[id^="fancybox-frame"]').contentFrame().getByRole('link', { name: '小売成約率' }).click();
  await page.waitForTimeout(3000);
// await expect(page.locator('iframe[name^="fancybox-frame"]').contentFrame().locator('#aac-r').contentFrame().getByRole('cell', { name: '小売成約率    ※赤文字は台数です' })).toBeVisible();
  await expect.soft(page.locator('iframe[id="fancybox-frame"]').contentFrame().locator('#rc-r').contentFrame().getByRole('cell', { name: '小売成約率    ※赤文字は台数です' })).toBeVisible();
//No.79
  await page.locator('iframe[id^="fancybox-frame"]').contentFrame().getByRole('link', { name: '小売基準価格' }).click();
  await page.waitForTimeout(3000);
  //  await expect(page.locator('iframe[name^="fancybox-frame"]').contentFrame().locator('#aac-r').contentFrame().getByRole('cell', { name: '小売成約率' })).toBeVisible();
  await expect.soft(page.locator('iframe[id="fancybox-frame"]').contentFrame().locator('#rc-bp').contentFrame().getByRole('cell', { name: '小売基準価格' })).toBeVisible();
  //No.80
  await page.locator('iframe[id^="fancybox-frame"]').contentFrame().getByRole('link', { name: 'クロス集計' }).click();
  await page.waitForTimeout(3000);
//  await expect(page.locator('iframe[name^="fancybox-frame"]').contentFrame().locator('#aac-ct').contentFrame().getByRole('cell', { name: 'ヒット数に対する比率(％)：' })).toBeVisible();
  await expect.soft(page.locator('iframe[id="fancybox-frame"]').contentFrame().getByRole('rowheader', { name: '定番設定' })).toBeVisible();
//No.81
  await page.locator('iframe[id="fancybox-frame"]').contentFrame().locator('#rc-ct-yaxis').selectOption('grade');
  await page.waitForTimeout(3000);
  await page.locator('iframe[id="fancybox-frame"]').contentFrame().locator('#rc-ct-show-btn').click();
  await page.waitForTimeout(3000);
  await expect(page.locator('iframe[id="fancybox-frame"]').contentFrame().locator('#rc-ct-yaxis-title')).toContainText('グレ｜ド');
//No.82
  await page.locator('iframe[id="fancybox-frame"]').contentFrame().locator('#rc-ct-xaxis').selectOption('color');
  await page.waitForTimeout(3000);
  await page.locator('iframe[id="fancybox-frame"]').contentFrame().locator('#rc-ct-show-btn').click();
  await page.waitForTimeout(3000);
  await expect(page.locator('iframe[id="fancybox-frame"]').contentFrame().locator('#rc-ct-xaxis-title')).toContainText('カラー');
//No.83
  await page.locator('iframe[id="fancybox-frame"]').contentFrame().locator('#rc-ct-show-btn').click();
  await page.waitForTimeout(3000);
  const page2Promise = page.waitForEvent('popup');
  await page.locator('iframe[id="fancybox-frame"]').contentFrame().getByRole('link', { name: '印刷' }).click();
  const page2 = await page2Promise;
//No.84
  await page2.getByRole('button', { name: '閉じる' }).click();
//No.85
  await page.waitForTimeout(2000);
  await page.locator('#fancybox-close').click({ force: true });
  await page.waitForTimeout(3000);
  
  //No.86
  await page.getByRole('link', { name: '相場 分析' }).click();
  await page.waitForTimeout(3000);
  await expect.soft(page).toHaveURL(/.*stock.php/); 
  await expect(page).toHaveTitle('仕入リサーチ');
//No.87
  // オプション：ページ遷移が完了するまで待機する場合
  await page.goBack({ waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await expect.soft(page).toHaveURL(/.*retail.php/); 
  await expect(page).toHaveTitle('小売相場'); 
//画面のリロード
  await page.reload();
//No.88
  await page.getByRole('link', { name: 'ＡＡ 相場' }).click();
  await page.waitForTimeout(3000);
  await expect.soft(page).toHaveURL(/.*aa.php/); 
  await expect(page).toHaveTitle('AA相場');
//No.89
  await page.goBack({ waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await expect.soft(page).toHaveURL(/.*retail.php/); 
  await expect(page).toHaveTitle('小売相場'); 
  //画面のリロード
  await page.reload();
//No.90

//No.91

//No.92

//No.93
  await page.getByRole('link', { name: '型式・類別から検索' }).click();
  await page.waitForTimeout(3000);
  await expect.soft(page).toHaveURL(/.*grade.php/); 
  await expect(page).toHaveTitle('グレード検索'); 
//No.94
  await page.goBack({ waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await expect.soft(page).toHaveURL(/.*retail.php/); 
  await expect(page).toHaveTitle('小売相場'); 
//画面のリロード
  await page.reload();

  console.log('最後まで完了');  
});

