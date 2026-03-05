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
//No.4「下取基準価格」が選択されていることを確認
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
// 1. 検索中のインジケータ（くるくるや「検索中...」の文字）を指定する
// ※クラス名やIDは実際のサイトに合わせてください
  let loadingIndicator = page.locator('#loadingdialog');
// 2. 検索ボタンをクリック
  await page.locator('#search_maker_btn').click();
      await page.waitForTimeout(3000);
// 3. インジケータが「非表示（Hidden）」になるまで待つ
await expect(loadingIndicator).toBeHidden();

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
    await page.waitForTimeout(3000); 
//No.24
  await page.locator('#favorite').getByRole('link', { name: 'お気に入り' }).click();
    await page.waitForTimeout(3000);
   await expect(page.locator('#list_favorite > table > tbody > tr:nth-child(2) > td:nth-child(3)')).toHaveText('レクサス');
   await expect(page.locator('#list_favorite > table > tbody > tr:nth-child(2) > td:nth-child(4)')).toHaveText('ＵＸ');
   await expect(page.locator('#list_favorite > table > tbody > tr:nth-child(2) > td:nth-child(5)')).toHaveText('MZAA10');
   await expect(page.locator('#list_favorite > table > tbody > tr:nth-child(2) > td:nth-child(6)')).toHaveText('ＵＸ２００');
//No.25
  await page.getByRole('link', { name: '全てクリア' }).click();
     await page.waitForTimeout(3000);
  let makerSelect = page.locator('select[name="maker"]');
  await expect(makerSelect).toHaveValue('');
  let carModelSelect = page.locator('select[name="car"]');
// 3. 車種の value が「空（""）」になるあｍで自動待機（最大30秒）
  await expect(carModelSelect).toHaveValue('');
  await expect(page.locator('select[name="maker"]')).toHaveValue('');
  await expect(page.locator('select[name="car"]')).toHaveValue('');
//No.26
  await page.getByRole('link', { name: 'お気に入り' }).click();
    await page.waitForTimeout(3000); 
  await expect(page.locator('#favorite > div > div.fav_group > span.favorite_title')).toContainText('お気に入り');
//No.27
  await page.getByRole('link', { name: '選択' }).first().click();
     await page.waitForTimeout(3000);
  await expect(page.locator('select[name="maker"]')).toHaveValue('1005');
  await expect(page.locator('select[name="car"]')).toHaveValue('10052004');

//No.28
  await page.getByRole('link', { name: '全てクリア' }).click();
     await page.waitForTimeout(3000);
  makerSelect = page.locator('select[name="maker"]');
  await expect(makerSelect).toHaveValue('');
  carModelSelect = page.locator('select[name="car"]');
// 3. 車種の value が「空（""）」になるあｍで自動待機（最大30秒）
  await expect(carModelSelect).toHaveValue('');
  await expect(page.locator('select[name="maker"]')).toHaveValue('');
  await expect(page.locator('select[name="car"]')).toHaveValue('');
//No.29
  await page.getByRole('link', { name: '検索履歴' }).click();
    await page.waitForTimeout(5000); 
  await expect(page.locator('#history > div > h3')).toContainText('検索履歴');
//No.30
  await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(4)')).toHaveText('レクサス');
  await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(5)')).toHaveText('ＵＸ');
  await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(6)')).toHaveText('MZAA10');
  await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(7)')).toHaveText('ＵＸ２００');
//No.31
  await page.getByRole('link', { name: '選択' }).first().click();
    await page.waitForTimeout(5000);
  await expect(page.locator('select[name="maker"]')).toHaveValue('1005');
  await expect(page.locator('select[name="car"]')).toHaveValue('10052004');
//Mo.32
  await page.getByRole('link', { name: '検索履歴' }).click();
    await page.waitForTimeout(3000); 
  await expect(page.locator('#history > div > h3')).toContainText('検索履歴');
  let text2 = await page.locator('#btnarea > tbody > tr > td > ul > li:nth-child(7)').textContent();
   console.log('表示中の履歴件数は:', text2); 
  // 2. 変数の中に「1」が含まれているか検証
  expect(text2).toContain(' 件中 1 -');
//No.33
  await page.getByRole('link', { name: '次へ>>' }).click();
  await page.waitForTimeout(4000);
  //遷移後、一行目”No”が「51」になるまでまつ
  await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(1)').first()).toHaveText('51')
  text2 = await page.locator('#btnarea > tbody > tr > td > ul > li:nth-child(7)').textContent();
  console.log('表示中の履歴件数は:', text2); 
  // 2. 変数の中に「1」が含まれているか検証
  expect(text2).toContain(' 件中 51 -');
//No.34
  await page.getByRole('link', { name: '<<前へ' }).click();
  //await page.waitForTimeout(4000);
  //遷移後、一行目”No”が「1」になるまでまつ
  await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(1)').first()).toHaveText('1')
   // 1. テキストを取得
  text2 = await page.locator('#btnarea > tbody > tr > td > ul > li:nth-child(7)').textContent();
   console.log('表示中の履歴件数は:', text2); 
  // 2. 変数の中に「1」が含まれているか検証
  expect(text2).toContain(' 件中 1 -');
//No.35
  await page.getByRole('link', { name: '2' }).click();
  //await page.waitForTimeout(4000);
  //遷移後、一行目”No”が「51」になるまでまつ
  await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(1)').first()).toHaveText('51')
  text2 = await page.locator('#btnarea > tbody > tr > td > ul > li:nth-child(7)').textContent();
  console.log('表示中の履歴件数は:', text2); 
  // 2. 変数の中に「1」が含まれているか検証
  expect(text2).toContain(' 件中 51 -');
//No.36 ページ1を押下するときのケース
  await page.getByRole('link', { name: '1' }).click();
  //await page.waitForTimeout(4000);
  //遷移後、一行目”No”が「1」になるまでまつ
  await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(1)').first()).toHaveText('1')
   // 1. テキストを取得
  text2 = await page.locator('#btnarea > tbody > tr > td > ul > li:nth-child(7)').textContent();
  console.log('表示中の履歴件数は:', text2); 
  // 2. 変数の中に「1」が含まれているか検証
  expect(text2).toContain(' 件中 1 -');  

  await page.getByRole('link', { name: '選択' }).first().click();
    await page.waitForTimeout(3000);
//No.37
  await page.getByRole('cell', { name: 'ＵＸ２００' }).nth(2).click();
    await page.waitForTimeout(3000);
  let targetTab_catalog = page.locator('li').filter({ hasText: '車両情報' });
  await expect(targetTab_catalog).toHaveClass(/vehicle_tab01aon/);
  //await expect(page.getByRole('heading', { name: '車両情報入力' })).toBeVisible();
  await expect(page.locator('#photo_file > img')).toBeVisible();

//No.38の準備　検索結果の下取基準価格金額が表示されている要素を指定する（※実際のセレクターに変更してください）
  const locatorA = page.locator('#target > td.col_sb_a_iro_k0'); // 例: 1つ目の金額
  // 要素が表示されるまで待つ（安全対策）
  await expect(locatorA).toBeVisible();
  // 2. 画面からテキストを取得する（例: "¥1,500,000" や "1,200,000円"）
  // ※前回の教訓を活かして、型エラーが出ない innerText() を使います！
  const kakakuTxtA = await locatorA.innerText();
  // 3. 数字（と小数点）以外の文字をすべて空文字に置き換え、数値型（Number）に変換する
  // replace(/[^0-9.]/g, '') が「¥」や「,」「円」などを一掃してくれます
  let Num = Number(kakakuTxtA.replace(/[^0-9.]/g, '')); 
  // 4. 画面Aの数字は「万」単位であることが前提なので、10,000を掛けて「円」単位に揃える
  const kakakuNumA = Num * 1000; // 2024 × 10000 = 20240000
//No.38
  let page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '印刷' }).click();
  let page2 = await page2Promise;
    await expect(page2).toHaveURL('https://devdlpro.proto-dataline.com/spg/print.php');   
  let locator = page2.locator('#print > table > tbody > tr > td > table:nth-child(4) > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr:nth-child(7) > td.style6'); // 例: 1つ目の金額
  // 要素が表示されるまで待つ（安全対策）
  await expect(locator).toBeVisible();
// 2. 画面からテキストを取得する（例: "¥1,500,000" や "1,200,000円"）
// ※前回の教訓を活かして、型エラーが出ない innerText() を使います！
  const kakakuTxtB = await locator.innerText();
// 3. 数字（と小数点）以外の文字をすべて空文字に置き換え、数値型（Number）に変換する
// replace(/[^0-9.]/g, '') が「¥」や「,」「円」などを一掃してくれます
  const kakakuNumB = Number(kakakuTxtB.replace(/[^0-9.]/g, '')); 
//No.39
  expect(kakakuNumA).toBe(kakakuNumB); 
    console.log('検索結果の基準価格: ', kakakuNumA, ' / 印刷画面の基準価格: ', kakakuNumB);
//No.40
  await page2.getByRole('button', { name: '閉じる' }).click();
//No.41
  const targetTab_Trade = page.locator('li').filter({ hasText: '下取基準価格' });
  //「下取基準価格」というテキストを含む li タグを指定する]
  await page.getByRole('link', { name: '下取基準価格' }).click();
    await page.waitForTimeout(3000);
  //現在「選択」されていることを確認したい場合
  await expect(targetTab_Trade).toHaveClass(/vehicle_tab01don/);
  await expect(page.getByRole('heading', { name: '車両情報入力' })).toBeVisible();
//No.42
  // 1. name属性を使って入力欄の要素を指定する
  const kyoriInput = page.locator('input[name="txt_kyori"]');
// 要素が表示されるまで待機（念のため）
  await expect(kyoriInput).toBeVisible();
// 2. 現在入力されている値を取得して、変数に格納する（※文字列として取得されます）
  const currentKyoriText = await kyoriInput.inputValue(); 
// 取得した値を確認（例: "72000"）
  console.log(`現在の入力値: ${currentKyoriText}`);
   const kyoriNum1 = Number(currentKyoriText.replace(/[^0-9.]/g, '')); 
//   console.log('走行距離の初期値は: ',kyoriText1); 
   console.log('走行距離の初期値は: ',kyoriNum1);
// 2. 足したい一定の金額を変数にしておく（例：2000km）
    let shippingFee = 1000;
  console.log('走行距離に足す距離は: ', shippingFee);
// 3. 取得した金額に一定の金額を足す
  const total = kyoriNum1 + shippingFee; // 1000kmを足す
    console.log('走行距離の変更後は: ', total);
  await page.locator('input[name="txt_kyori"]').fill(total.toString());
//  今日の日付を YYYYMMDD 形式で作成する
  const now2 = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0'); // 月は0から始まるので+1
  const dd = String(now.getDate()).padStart(2, '0');
//No.43 プルダウンの value 属性に合わせて文字列（String）に変換する
  const year1 = yyyy + 2
//今年の一年後の数字を文字列に変換する
  const year2 = year1.toString();
// デバッグ用: 計算した年を確認
  console.log(`選択する年: ${year2}年`);
  await page.locator('select[name="sel_syaken_year"]').selectOption(year2);
    await page.waitForTimeout(2000);
//No.44
  const mm2 = String(now.getMonth() + 1);//1~9月を１桁格納する
  console.log(`選択する月: ${mm2}月`);
  await page.locator('select[name="sel_syaken_month"]').selectOption(mm2);
    await page.waitForTimeout(2000);
//No.45
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
//No.46
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
//No.47
// 1. 「ＬＳ」というテキストを持つ label タグを指定する
  const srLabe3 = page.locator('label').filter({ hasText: 'ナビ' });
// 現在のクラス名をごっそり取得する
  const classValue3 = await srLabe3.getAttribute('class') ?? '';
    await page.waitForTimeout(1000);
// もし "checked" が含まれていなかったら、クリックしてONにする
  if (classValue3.includes('checked')) {
   await srLabe3.click();
   await page.waitForTimeout(1000);   
  }
//No.48
  await page.locator('select[name="sel_color"]').selectOption('2');
//No.49
  await page.locator('input[name="txt_kagen"]').click();
  await page.locator('input[name="txt_kagen"]').fill('25000');
   await page.waitForTimeout(1000);   
//No.50
  await page.locator('textarea[name="txt_tokki"]').click();
  await page.locator('textarea[name="txt_tokki"]').fill('テスト買取');
//No.51
//下取基準価格価格＞計算前の価格を取得
  // 1. 注文販売参考価格の金額が表示されている要素を指定する（※実際のセレクターに変更してください）
  const locatorC = page.locator('#vehicle_price > table > tbody > tr > td'); 
// 要素が表示されるまで待つ（安全対策）
  await expect(locatorC).toBeVisible();
// ※前回の教訓を活かして、型エラーが出ない innerText() を使います！
  const kakakuTxtC = await locatorC.innerText();
// 3. 数字（と小数点）以外の文字をすべて空文字に置き換え、数値型（Number）に変換する
// replace(/[^0-9.]/g, '') が「¥」や「,」「円」などを一掃してくれます
  const kakakuNumC = Number(kakakuTxtC.replace(/[^0-9.]/g, '')); 
  console.log(`計算前の注文販売価格は ${kakakuNumC}`);
  await page.getByRole('link', { name: '計算する' }).click();
    await page.waitForTimeout(2000);
  const kakakuTxtD = await locatorC.innerText();
// 3. 数字（と小数点）以外の文字をすべて空文字に置き換え、数値型（Number）に変換する
// replace(/[^0-9.]/g, '') が「¥」や「,」「円」などを一掃してくれます
  const kakakuNumD = Number(kakakuTxtD.replace(/[^0-9.]/g, '')); 
  console.log(`計算後の注文販売価格は ${kakakuNumD}`);
  expect(kakakuNumC).not.toBe(kakakuNumD); 
//No.52
  page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '印刷' }).click();
  page2 = await page2Promise;
    await page.waitForTimeout(3000);
    await expect(page2).toHaveURL('https://devdlpro.proto-dataline.com/spg/print.php');   
  locator = page2.locator('#print > table > tbody > tr > td > table:nth-child(4) > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr:nth-child(7) > td.style6'); // 例: 1つ目の金額
// 要素が表示されるまで待つ（安全対策）
  await expect(locator).toBeVisible();
  const kakakuTxtE = await locator.innerText();
// 3. 数字（と小数点）以外の文字をすべて空文字に置き換え、数値型（Number）に変換する
// replace(/[^0-9.]/g, '') が「¥」や「,」「円」などを一掃してくれます
  const kakakuNumE = Number(kakakuTxtE.replace(/[^0-9.]/g, '')); 
  expect(kakakuNumE).toBe(kakakuNumE); 
   console.log('下取基準価格タブの参考価格は', kakakuTxtD, ' / 基準価格＞印刷プレビューの参考価格は:' ,kakakuTxtE);
//No.53
  await page2.getByRole('button', { name: '閉じる' }).click();
    await page.waitForTimeout(2000);
  await expect.soft(page).toHaveURL(/.*spg.php/); 
//No.54
  await page.getByRole('link', { name: 'グラフ表示' }).click();
    await page.waitForTimeout(3000);
  //「グラフ表示」というテキストを含む li タグを指定する
  let targetTab_graph = page.locator('li').filter({ hasText: 'グラフ表示' });
  //現在「選択」されていることを確認したい場合
  await expect(targetTab_graph).toHaveClass(/vehicle_tab01con/);
  await expect(page.getByText('現在価格 千円')).toBeVisible();
//No.55
  page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '印刷' }).click();
  page2 = await page2Promise;
    await page.waitForTimeout(3000);
    await expect(page2).toHaveURL('https://devdlpro.proto-dataline.com/spg/print.php');   
  locator = page2.locator('#print > table:nth-child(1) > tbody > tr > td:nth-child(1) > table:nth-child(2) > tbody > tr:nth-child(7) > td.style8'); // 例: 1つ目の金額
// 要素が表示されるまで待つ（安全対策）
   await expect(locator).toBeVisible();
//No.56
  const kakakuTxtF = await locator.innerText();
// 3. 数字（と小数点）以外の文字をすべて空文字に置き換え、数値型（Number）に変換する
// replace(/[^0-9.]/g, '') が「¥」や「,」「円」などを一掃してくれます
  const kakakuNumF = Number(kakakuTxtF.replace(/[^0-9.]/g, '')); 
  expect(kakakuNumD).toBe(kakakuNumF); 
   console.log('下取基準価格タブの参考価格は', kakakuTxtD, ' / 将来予測グラフ＞印刷プレビューの参考価格は:' ,kakakuTxtF);
//No.57
  await page2.getByRole('button', { name: '閉じる' }).click();
    await page.waitForTimeout(2000);
  await expect.soft(page).toHaveURL(/.*spg.php/); 
//No.58
  await page.locator('input[name="input_kakaku"]').click();
  await page.locator('input[name="input_kakaku"]').fill('2000');
    await page.waitForTimeout(2000);
//No.59
  await page.getByRole('link', { name: '再計算' }).click();
  await page.waitForTimeout(2000);
//No.60
  page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '印刷' }).click();
  page2 = await page2Promise;
    await page2.waitForTimeout(2000);
  locator = page2.locator('#print > table:nth-child(1) > tbody > tr > td:nth-child(1) > table:nth-child(2) > tbody > tr:nth-child(7) > td.style8'); // 例: 1つ目の金額
  // 要素が表示されるまで待つ（安全対策）
   await expect(locator).toBeVisible();
  //await expect(page2.locator('#print > table:nth-child(1) > tbody > tr > td:nth-child(1) > table:nth-child(2) > tbody > tr:nth-child(7) > td.style8')).toContainText('2,000,000円')
  // ↑途中の複雑な階層をすべて省略して、ターゲットを直接狙い撃ちします
  const targetCell = page.locator('#print td.style8').filter({ hasText: '2,000,000' });
//No.61
  await page2.getByRole('button', { name: '閉じる' }).click();
    await page.waitForTimeout(2000);
  await expect.soft(page).toHaveURL(/.*spg.php/); 
//No.62
  await page.locator('#output_price').selectOption('1');
    let output_price = page.locator('select[name="output_price"]');
  await expect(output_price).toHaveValue('1');
   await page.waitForTimeout(2000);
//No.63
// 1. 検索中のインジケータ（くるくるや「検索中...」の文字）を指定する
// ※クラス名やIDは実際のサイトに合わせてください
  loadingIndicator = page.locator('#loadingdialog');
// 2. 検索ボタンをクリック
  await page.locator('#search_maker_btn').click();
    await page.waitForTimeout(3000);
  await expect(page.getByText('検索結果')).toBeVisible();
//No.64     
  await expect(page.locator('#result_head > table > thead > tr > th.col_sb_a_iro_k0')).toContainText('卸売基準価格')
//No.65
  await page.getByRole('cell', { name: 'ＵＸ２００' }).nth(2).click();
    await page.waitForTimeout(3000);
  targetTab_catalog = page.locator('li').filter({ hasText: '車両情報' });
  await expect(targetTab_catalog).toHaveClass(/vehicle_tab01aon/);
  await expect(page.getByRole('link', { name: '車両情報' })).toBeVisible();
//No.66
  page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '印刷' }).click();
  page2 = await page2Promise;
  //await expect(page2.locator('#print > table > tbody > tr > td > table:nth-child(4) > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td > table:nth-child(1) > tbody > tr:nth-child(1) > td > div')).toContainText('レクサス　ＵＸ')
// 「レクサス」と「ＵＸ」の両方が含まれている div を探す（間のスペースは無視）
  const targetDiv = page2.locator('#print div').filter({ hasText: /レクサス.*ＵＸ/ });
  await expect(targetDiv).toBeVisible()
//No.67の準備
const locatorB = page.locator('#target > td.col_sb_a_iro_k0 > b'); // 例: 1つ目の金額
// 要素が表示されるまで待つ（安全対策）
  await expect(locatorB).toBeVisible();
// 2. 画面からテキストを取得する（例: "¥1,500,000" や "1,200,000円"）
// ※前回の教訓を活かして、型エラーが出ない innerText() を使います！
  const kakakuTxtG = await locatorB.innerText();
// 3. 数字（と小数点）以外の文字をすべて空文字に置き換え、数値型（Number）に変換する
// replace(/[^0-9.]/g, '') が「¥」や「,」「円」などを一掃してくれます
  Num = Number(kakakuTxtG.replace(/[^0-9.]/g, '')); 
// 4. 画面Aの数字は「万」単位であることが前提なので、10,000を掛けて「円」単位に揃える
  const kakakuNumG = Num * 1000; // 2024 × 10000 = 20240000
  locator = page2.locator('#print > table > tbody > tr > td > table:nth-child(4) > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr:nth-child(7) > td.style6'); // 例: 1つ目の金額
// 要素が表示されるまで待つ（安全対策）
  await expect(locator).toBeVisible();
// 2. 画面からテキストを取得する（例: "¥1,500,000" や "1,200,000円"）
// ※前回の教訓を活かして、型エラーが出ない innerText() を使います！
  const kakakuTxtH = await locator.innerText();
// 3. 数字（と小数点）以外の文字をすべて空文字に置き換え、数値型（Number）に変換する
// replace(/[^0-9.]/g, '') が「¥」や「,」「円」などを一掃してくれます
  const kakakuNumH = Number(kakakuTxtH.replace(/[^0-9.]/g, '')); 
  expect(kakakuNumG).toBe(kakakuNumH); 
    console.log('検索結果の卸売金額は', kakakuNumG, ' / 車両カタログ＞印刷プレビューの卸売金額は:' ,kakakuNumH);
//No.68
  await page2.getByRole('button', { name: '閉じる' }).click();
  await expect.soft(page).toHaveURL(/.*spg.php/); 
//No.69
// 1. 「卸売基準価格」というテキストを含む li タグを指定する
  const targetTab_wholesale = page.locator('li').filter({ hasText: '卸売基準価格' });

  await page.getByRole('link', { name: '卸売基準価格' }).click();
    await page.waitForTimeout(3000);
  await expect(targetTab_wholesale).toHaveClass(/vehicle_tab01don1/);
  await expect(page.getByRole('heading', { name: '車両情報入力' })).toBeVisible();
//No.70
//下取基準価格価格＞計算前の価格を取得
  // 1. 注文販売参考価格の金額が表示されている要素を指定する（※実際のセレクターに変更してください）
  //const locatorD = page.locator('#vehicle_price > table > tbody > tr > td'); 
// 要素が表示されるまで待つ（安全対策）
  await expect(locatorC).toBeVisible();
// ※前回の教訓を活かして、型エラーが出ない innerText() を使います！
  const kakakuTxtI = await locatorC.innerText();
// 3. 数字（と小数点）以外の文字をすべて空文字に置き換え、数値型（Number）に変換する
// replace(/[^0-9.]/g, '') が「¥」や「,」「円」などを一掃してくれます
  const kakakuNumI = Number(kakakuTxtI.replace(/[^0-9.]/g, '')); 
  expect(kakakuNumG).toBe(kakakuNumI); 
    console.log('検索結果の卸売金額は', kakakuNumG, ' / 卸売金額＞印刷プレビューの卸売金額は:' ,kakakuNumI);
//No.71
  await page.getByRole('link', { name: 'グラフ表示' }).click();
    await page.waitForTimeout(3000);
  //「グラフ表示」というテキストを含む li タグを指定する
  targetTab_graph = page.locator('li').filter({ hasText: 'グラフ表示' });
  //現在「選択」されていることを確認したい場合
  await expect(targetTab_graph).toHaveClass(/vehicle_tab01con/);
  await expect(page.getByText('現在価格 千円')).toBeVisible();
//No.72
  page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '印刷' }).click();
  page2 = await page2Promise;
    await page.waitForTimeout(3000);
    await expect(page2).toHaveURL('https://devdlpro.proto-dataline.com/spg/print.php');   
  locator = page2.locator('#print > table:nth-child(1) > tbody > tr > td:nth-child(1) > table:nth-child(2) > tbody > tr:nth-child(7) > td.style8'); // 例: 1つ目の金額
// 要素が表示されるまで待つ（安全対策）
    await expect(locator).toBeVisible();
//No.73
  const kakakuTxtJ = await locator.innerText();
// 3. 数字（と小数点）以外の文字をすべて空文字に置き換え、数値型（Number）に変換する
// replace(/[^0-9.]/g, '') が「¥」や「,」「円」などを一掃してくれます
  const kakakuNumJ = Number(kakakuTxtJ.replace(/[^0-9.]/g, '')); 
  expect(kakakuNumG).toBe(kakakuNumJ); 
   console.log('検索結果の卸売価格は', kakakuNumG, ' / 将来予測グラフ＞印刷プレビューの卸売価格は:' ,kakakuNumJ);
//No.74
  await page2.getByRole('button', { name: '閉じる' }).click();
    await page.waitForTimeout(2000);
  await expect.soft(page).toHaveURL(/.*spg.php/); 
//Np.75
  await page.locator('#output_price').selectOption('2');
      output_price = page.locator('select[name="output_price"]');
  await expect(output_price).toHaveValue('2');
//No.76
  loadingIndicator = page.locator('#loadingdialog');
  // 2. 検索ボタンをクリック
  await page.locator('#search_maker_btn').click();
      await page.waitForTimeout(3000);
  await expect(page.getByText('検索結果')).toBeVisible();
//No.77
  await expect(page.locator('#result_head > table > thead > tr > th.col_sb_a_iro_k0')).toContainText('小売基準価格')
//No.78
  await page.getByRole('cell', { name: 'ＵＸ２００' }).nth(2).click();
    await page.waitForTimeout(3000);
  targetTab_catalog = page.locator('li').filter({ hasText: '車両情報' });
  await expect(targetTab_catalog).toHaveClass(/vehicle_tab01aon/);
  //await expect(page.getByRole('heading', { name: '車両情報入力' })).toBeVisible();
  await expect(page.locator('#photo_file > img')).toBeVisible();
//No.80の準備
// 要素が表示されるまで待つ（安全対策）
  await expect(locatorB).toBeVisible();
// 2. 画面からテキストを取得する（例: "¥1,500,000" や "1,200,000円"）
// ※前回の教訓を活かして、型エラーが出ない innerText() を使います！
  const kakakuTxtK = await locatorB.innerText();
// 3. 数字（と小数点）以外の文字をすべて空文字に置き換え、数値型（Number）に変換する
// replace(/[^0-9.]/g, '') が「¥」や「,」「円」などを一掃してくれます
  Num = Number(kakakuTxtK.replace(/[^0-9.]/g, '')); 
// 4. 画面Aの数字は「万」単位であることが前提なので、10,000を掛けて「円」単位に揃える
  const kakakuNumK = Num * 1000; // 2024 × 10000 = 20240000
  //No.79
  page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '印刷' }).click();
  page2 = await page2Promise;
    await expect(page2).toHaveURL('https://devdlpro.proto-dataline.com/spg/print.php');   
  locator = page2.locator('#print > table > tbody > tr > td > table:nth-child(4) > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr:nth-child(7) > td.style6'); // 例: 1つ目の金額
// 要素が表示されるまで待つ（安全対策）
    await expect(locator).toBeVisible();
//No.80　 2. 画面からテキストを取得する（例: "¥1,500,000" や "1,200,000円"）
// ※前回の教訓を活かして、型エラーが出ない innerText() を使います！
  const kakakuTxtL = await locator.innerText();
// 3. 数字（と小数点）以外の文字をすべて空文字に置き換え、数値型（Number）に変換する
// replace(/[^0-9.]/g, '') が「¥」や「,」「円」などを一掃してくれます
  const kakakuNumL = Number(kakakuTxtL.replace(/[^0-9.]/g, '')); 
   expect(kakakuNumK).toBe(kakakuNumL); 
    console.log('検索結果の小売価格: ', kakakuNumK, ' / 印刷画面の小売り価格: ', kakakuNumL);
//No.81
  await page2.getByRole('button', { name: '閉じる' }).click();
    await page.waitForTimeout(2000);
  await expect.soft(page).toHaveURL(/.*spg.php/); 
//No.82
  const targetTab_retail = page.locator('li').filter({ hasText: '小売基準価格' });
  //「下取基準価格」というテキストを含む li タグを指定する]
  await page.getByRole('link', { name: '小売基準価格' }).click();
    await page.waitForTimeout(3000);
  //現在「選択」されていることを確認したい場合
  await expect(targetTab_retail).toHaveClass(/vehicle_tab01don/);
  await expect(page.getByRole('heading', { name: '車両情報入力' })).toBeVisible();
//No.83
  const kakakuTxtM = await locatorC.innerText();
// 3. 数字（と小数点）以外の文字をすべて空文字に置き換え、数値型（Number）に変換する
// replace(/[^0-9.]/g, '') が「¥」や「,」「円」などを一掃してくれます
  const kakakuNumM = Number(kakakuTxtM.replace(/[^0-9.]/g, '')); 
  expect(kakakuNumK).toBe(kakakuNumM); 
    console.log('検索結果の小売金額は', kakakuNumK, ' / カタログ＞印刷プレビューの小売金額は:' ,kakakuNumM);
//No.84
  await page.getByRole('link', { name: 'グラフ表示' }).click();
      await page.waitForTimeout(3000);
  //「グラフ表示」というテキストを含む li タグを指定する
  targetTab_graph = page.locator('li').filter({ hasText: 'グラフ表示' });
  //現在「選択」されていることを確認したい場合
  await expect(targetTab_graph).toHaveClass(/vehicle_tab01con/);
  await expect(page.getByText('現在価格 千円')).toBeVisible();
//No.85
 page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '印刷' }).click();
  page2 = await page2Promise;
    await expect(page2).toHaveURL('https://devdlpro.proto-dataline.com/spg/print.php');   
  locator = page2.locator('#print > table:nth-child(1) > tbody > tr > td:nth-child(1) > table:nth-child(2) > tbody > tr:nth-child(7) > td.style8'); // 例: 1つ目の金額
// 要素が表示されるまで待つ（安全対策）
    await expect(locator).toBeVisible();
//画面からテキストを取得する（例: "¥1,500,000" や "1,200,000円"）
// ※前回の教訓を活かして、型エラーが出ない innerText() を使います！
//No.86
  const kakakuTxtO = await locator.innerText();
// 3. 数字（と小数点）以外の文字をすべて空文字に置き換え、数値型（Number）に変換する
// replace(/[^0-9.]/g, '') が「¥」や「,」「円」などを一掃してくれます
  const kakakuNumO = Number(kakakuTxtL.replace(/[^0-9.]/g, '')); 
  expect(kakakuNumK).toBe(kakakuNumO); 
    console.log('検索結果の小売価格: ', kakakuNumK, ' / 印刷画面の小売り価格: ', kakakuNumO);
//No.87
  await page2.getByRole('button', { name: '閉じる' }).click();
    await page.waitForTimeout(2000);
  await expect.soft(page).toHaveURL(/.*spg.php/); 
//No.87
  await page.locator('#list_type').selectOption('1');
  let list_type = page.locator('select[name="list_type"]');
  await expect(list_type).toHaveValue('1');
//No.88
  loadingIndicator = page.locator('#loadingdialog');
  // 2. 検索ボタンをクリック
  await page.locator('#search_maker_btn').click();
  
      await page.waitForTimeout(3000);
   await expect(page.locator('#resultD_body > table > tbody > tr:nth-child(1) > th')).toHaveText('基本情報');

//No.89
  await page.locator('#output_price').selectOption('0');
      output_price = page.locator('select[name="output_price"]');
  await expect(output_price).toHaveValue('0');
    loadingIndicator = page.locator('#loadingdialog');
//  検索ボタンをクリック
  await page.locator('#search_maker_btn').click();
      await page.waitForTimeout(3000);
// インジケータが「非表示（Hidden）」になるまで待つ
  await expect(loadingIndicator).toBeHidden();
      await page.waitForTimeout(3000);
   await expect(page.locator('#resultD_body > table > tbody > tr:nth-child(13) > td.gc_td.gc_td01.bgc_3')).toHaveText('下取基準価格');
//No.90
  await page.locator('input[name="katashiki"]').click();
  await page.locator('input[name="katashiki"]').fill('16086');//No.91
// ※クラス名やIDは実際のサイトに合わせてください
  loadingIndicator = page.locator('#loadingdialog');
//  検索ボタンをクリック
  await page.locator('#search_type_btn').click();
      await page.waitForTimeout(3000);
// インジケータが「非表示（Hidden）」になるまで待つ
  await expect(loadingIndicator).toBeHidden();
//No.92
  let fullText = await page.locator('p.titl').innerText();
  // 「--->」と「＞」の間にある文字(.*?)を探して抜き出す呪文
  const match = fullText.match(/--->(.*?)＞/);
  if (match) {
    // match[1] に挟まれていた文字が入っているので、スペースを綺麗にして変数に入れる
    const carName = match[1].trim();
    // .toMatch() と正規表現（/ /）を使って確認する
    // ※ .* は「間にどんな文字（スペース等）が何文字入っていてもOK」という最強の呪文です
    expect(carName).toMatch(/トヨタ.*ヴェルファイア/);
    console.log(`抽出した車名: 【${carName}】`);
  }
//No.93
  await expect(page.locator('#resultD_body > table > tbody > tr:nth-child(13) > td.gc_td.gc_td01.bgc_3')).toHaveText('下取基準価格');
//No.94
/*
  //支払い総額＞金額１件目の値を格納
  // 1. クラス名を使って要素を指定する（今回は特徴的な gc_td02 を使います）
  // ※もし同じクラス名のセルが複数ある場合は .first() をつけたりします
  const targetTd = page.locator('td.gc_td02').first();;
    // 2. .innerText() で画面に見えている文字（"3175"）を取得し、変数「rawText」に代入する
   const rawText = await targetTd.innerText();
  // 以前使ったテクニックでカンマや空白を消して Number に変換しておくと完璧です！
  const priceNum = Number(rawText.replace(/[^0-9.]/g, ''));

  // 確認用：ちゃんと変数に入ったかコンソールに出力
  console.log(`取得した文字: ${rawText} / 計算用の数値: ${priceNum}`);
*/
  // 1. まず「新車価格」というテキストが含まれている行（tr）をまるごと指定する
  const targetRow = page.locator('tr').filter({ hasText: '新車価格' });
  // 2. その行の中にある「gc_td02」クラスを持つセルのうち、一番最初（一番左）のものを指定する
  let targetTd = targetRow.locator('td.gc_td02').first();
  // 3. テキストを取得する
  let rawText = await targetTd.innerText();
  // デバッグ用：ちゃんと取れたか確認
    console.log(`新車価格の一番左の値: ${rawText}`);
  Num = Number(rawText.replace(/[^0-9.]/g, ''));
  const priceNum1 = Num * 1000;
     console.log(`ソート前の新車価格の一番目 : ${priceNum1}`);
  //金額でソート（昇順）
  await page.getByRole('link', { name: '▲' }).nth(3).click();
     await page.waitForTimeout(2000);
  // 1. まず「新車価格」というテキストが含まれている行（tr）をまるごと指定する
  const targetRow2 = page.locator('tr').filter({ hasText: '新車価格' });
  // 2. その行の中にある「gc_td02」クラスを持つセルのうち、一番最初（一番左）のものを指定する
  targetTd = targetRow2.locator('td.gc_td02').first();
  rawText = await targetTd.innerText();
  Num = Number(rawText.replace(/[^0-9.]/g, ''));
  const priceNum2 = Num * 1000;
    console.log(`昇順ソート後の新車価格の一番目 : ${priceNum2}`);
  expect(priceNum1).toBeGreaterThanOrEqual(priceNum2)
//No.95
  await page.getByRole('link', { name: '▼' }).nth(3).click();
    await page.waitForTimeout(2000);
  // 1. まず「新車価格」というテキストが含まれている行（tr）をまるごと指定する
  //const targetRow2 = page.locator('tr').filter({ hasText: '新車価格' });
  // 2. その行の中にある「gc_td02」クラスを持つセルのうち、一番最初（一番左）のものを指定する
  targetTd = targetRow2.locator('td.gc_td02').first();
  rawText = await targetTd.innerText();
  Num = Number(rawText.replace(/[^0-9.]/g, ''));
  const priceNum3 = Num * 1000;
    console.log(`順順ソート後の新車価格の一番目 : ${priceNum3}`);
  expect(priceNum2).toBeLessThanOrEqual(priceNum3)
//No.96
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
    await page.waitForTimeout(2000);
  // 1. まず「新車価格」というテキストが含まれている行（tr）をまるごと指定する
  //const targetRow2 = page.locator('tr').filter({ hasText: '新車価格' });
  // 2. その行の中にある「gc_td02」クラスを持つセルのうち、一番最初（一番左）のものを指定する
  targetTd = targetRow2.locator('td.gc_td02').first();
  rawText = await targetTd.innerText();
  Num = Number(rawText.replace(/[^0-9.]/g, ''));
  const priceNum4 = Num * 1000;
    console.log(`ソートクリア後の新車価格の一番目 : ${priceNum4}`);
  expect(priceNum1).toBe(priceNum4)
//No.97　検索結果のページング
 // await expect.soft(page.getByRole('list')).toContainText('全 200 件中 1 - 50件');
 // 1. テキストを取得
  let text3 = await page.locator('#btnarea > tbody > tr:nth-child(2) > td > ul > span').textContent();
   console.log('表示中の検索結果件数は:', text3); 
  // 2. 変数の中に「1」が含まれているか検証
  expect(text3).toContain(' 件中 1 -');

  await page.getByRole('link', { name: '次へ>>' }).click();
  await page.waitForTimeout(4000);
  //遷移後、一行目”No”が「51」になるまでまつ
  //await expect(page.locator('#btnarea > tbody > tr > td:nth-child(1) > ul > li:nth-child(7)').first()).toHaveText('51')
  text3 = await page.locator('#btnarea > tbody > tr:nth-child(2) > td > ul > span').textContent();
  console.log('次へ押下後の検索結果件数は:', text3); 
  // 2. 変数の中に「51」が含まれているか検証
  expect(text3).toContain(' 件中 5 -');
//No.98
  await page.getByRole('link', { name: '<<前へ' }).click();
  await page.waitForTimeout(4000);
   // 1. テキストを取得
  text3 = await page.locator('#btnarea > tbody > tr:nth-child(2) > td > ul > span').textContent();
   console.log('前へ押下後の検索結果件数は:', text3); 
  // 2. 変数の中に「1」が含まれているか検証
  expect(text3).toContain(' 件中 1 -');
//No.99
  await page.getByRole('link', { name: '2', exact: true }).click();
  await page.waitForTimeout(4000);
  text3 = await page.locator('#btnarea > tbody > tr:nth-child(2) > td > ul > span').textContent();
  console.log('「2」押下後の検索結果件数は:', text3); 
  // 2. 変数の中に「51」が含まれているか検証
  expect(text3).toContain(' 件中 5 -');
//No.100 
  await page.getByRole('link', { name: '1', exact: true }).click();
  await page.waitForTimeout(4000);
   // 1. テキストを取得
  text3 = await page.locator('#btnarea > tbody > tr:nth-child(2) > td > ul > span').textContent();
  console.log('「1」押下後の検索結果件数は:', text3); 
  // 2. 変数の中に「1」が含まれているか検証
  expect(text3).toContain(' 件中 1 -');
//No.101
  await page.locator('#output_price').selectOption('1');
      output_price = page.locator('select[name="output_price"]');
  await expect(output_price).toHaveValue('1');
    loadingIndicator = page.locator('#loadingdialog');
//No.102 検索ボタンをクリック
  await page.locator('#search_type_btn').click();
      await page.waitForTimeout(3000);
// インジケータが「非表示（Hidden）」になるまで待つ
  await expect(loadingIndicator).toBeHidden();
      await page.waitForTimeout(3000);
//No.103
  await expect(page.locator('#resultD_body > table > tbody > tr:nth-child(13) > td.gc_td.gc_td01.bgc_3')).toHaveText('卸売基準価格');
//No.104
  fullText = await page.locator('p.titl').innerText();
  // 「--->」と「＞」の間にある文字(.*?)を探して抜き出す呪文
  const match2 = fullText.match(/--->(.*?)＞/);
  if (match2) {
    // match[1] に挟まれていた文字が入っているので、スペースを綺麗にして変数に入れる
    const carName = match2[1].trim();
    // .toMatch() と正規表現（/ /）を使って確認する
    // ※ .* は「間にどんな文字（スペース等）が何文字入っていてもOK」という最強の呪文です
    expect(carName).toMatch(/トヨタ.*ヴェルファイア/);
    console.log(`抽出した車名: 【${carName}】`);
  }

//o.105
  await page.locator('#output_price').selectOption('2');
      output_price = page.locator('select[name="output_price"]');
  await expect(output_price).toHaveValue('2');
    loadingIndicator = page.locator('#loadingdialog');
//No.106 検索ボタンをクリック
  await page.locator('#search_type_btn').click();
      await page.waitForTimeout(3000);
// インジケータが「非表示（Hidden）」になるまで待つ
  await expect(loadingIndicator).toBeHidden();
      await page.waitForTimeout(3000);
//No.107
  await expect(page.locator('#resultD_body > table > tbody > tr:nth-child(13) > td.gc_td.gc_td01.bgc_3')).toHaveText('小売基準価格');
//No.104
  fullText = await page.locator('p.titl').innerText();
  // 「--->」と「＞」の間にある文字(.*?)を探して抜き出す呪文
  const match3 = fullText.match(/--->(.*?)＞/);
  if (match3) {
    // match[1] に挟まれていた文字が入っているので、スペースを綺麗にして変数に入れる
    const carName = match3[1].trim();
    // .toMatch() と正規表現（/ /）を使って確認する
    // ※ .* は「間にどんな文字（スペース等）が何文字入っていてもOK」という最強の呪文です
    expect(carName).toMatch(/トヨタ.*ヴェルファイア/);
    console.log(`抽出した車名: 【${carName}】`);
  }

});
