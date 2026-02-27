//custom-test.tsを使用
import { test, expect } from '../custom-test';
//import { test, expect } from '@playwright/test';
//DLP回帰テスト-AA相場検索-グレード検索＞AA相場検索
//ログイン画面
//商談設定①～⑩を設定しておく⇒７と８は他テストに影響があるのでここで設定、終わったら元に戻す
https://docs.google.com/spreadsheets/d/1xMfbw_5Dp9ME5LTUauBiVhaDMut8POQ2A3YspgtRMLM/edit?gid=1959219696#gid=1959219696&range=L64

//⑦走行加減算設定（買取・下取　乗用車）
//⑧走行加減算設定（注文販売　乗用車）
test('test', async ({ page }) => {
// ▼ この行を追加（テストの制限時間を180秒に変更）
  test.setTimeout(480000);

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

    // 商談ツールへ遷移＞タブ名完全一致で確認する場合
  await expect(page).toHaveTitle('買取・下取');

  //◎乗用車
  // メーカー「スズキ」を選択
  await page.locator('select[name="maker"]').selectOption('1055');
  await page.goto('https://devdlpro.proto-dataline.com/tradein_biz/tradein_biz.php#19c8d24a8883ddd');
  // 車種「ワゴンR」を選択
  await page.locator('select[name="car"]').selectOption('10552003');
  await page.goto('https://devdlpro.proto-dataline.com/tradein_biz/tradein_biz.php#19c8d24cbe7133b0');
  // 年式「2015」～「2015」を選択
  await page.locator('#s_year').selectOption('2015');
  // 「検索」を押下
  await page.getByRole('link', { name: '検 索' }).click();
  // 検索結果一覧＞1件目を選択
  await page.getByRole('cell', { name: '(H27)' }).nth(2).click();
  // 「買取・下取価格表示へ」を選択
  await page.getByRole('link', { name: '買取・下取価格表示へ' }).click();
  await page.waitForTimeout(2000);
  // キーボードの「End」キーを押して一番下まで移動
  await page.keyboard.press('End');
  
  await page.waitForTimeout(2000);
  //　買取・下取価格が空白（0円）であることを確認（粗利100%設定）
  // 1. 確認したい金額の場所（tdタグ）を変数にします
  let targetPriceCell = page.locator('#vehicle_price > table > tbody > tr > td');
  // 2. その場所の文字が「¥0」であることを確認する
  await expect(targetPriceCell).toHaveText('¥0');
  // 3. 画面の要素（td）から、表示されている文字を取得する
  let priceText1 = await page.locator('#vehicle_price > table > tbody > tr > td').innerText();
  console.log('乗用車＞買取下取粗利設定100％の金額の値の中身は:', priceText1);
  await page.getByText('買取・下取参考価格').waitFor();

  //全てクリアでいったんリセットする
  await page.getByRole('link', { name: '全てクリア' }).click();
  await page.waitForTimeout(3000);

  //◎商用車（商用車を検索する）
  await page.getByRole('link', { name: '商用車を検索する' }).click();
  // メーカー「トヨタ」を選択
  await page.locator('select[name="maker"]').selectOption('1010');
  await page.goto('https://devdlpro.proto-dataline.com/tradein_biz/tradein_biz.php#19c8d4a2ef4baa6');
  // 車種「カローラバン」を選択
  await page.locator('select[name="car"]').selectOption('10106118');
  await page.goto('https://devdlpro.proto-dataline.com/tradein_biz/tradein_biz.php#19c8d4a453e1d0e');
  // 年式「2002」～「2002」を選択
  await page.locator('#s_year').selectOption('2002');
  // 「検索」を押下
  await page.getByRole('link', { name: '検 索' }).click();
  // 検索結果一覧＞1件目を選択
  await page.getByRole('cell', { name: '(H14)' }).nth(2).click();
  // 「買取・下取価格表示へ」を選択
  await page.getByRole('link', { name: '買取・下取価格表示へ' }).click();
  await page.waitForTimeout(2000);
  // キーボードの「End」キーを押して一番下まで移動
  await page.keyboard.press('End');

  await page.waitForTimeout(2000);
  //　買取・下取価格が空白（0円）であることを確認（粗利100%設定）
  // 1. 確認したい金額の場所（tdタグ）を変数にします
  targetPriceCell = page.locator('#vehicle_price > table > tbody > tr > td');
  // 2. その場所の文字が「¥0」であることを確認する
  await expect(targetPriceCell).toHaveText('¥0');
  // 3. 画面の要素（td）から、表示されている文字を取得する
  priceText1 = await page.locator('#vehicle_price > table > tbody > tr > td').innerText();
  console.log('商用車＞買取下取粗利設定100％の金額の値の中身は:', priceText1);
  await page.getByText('買取・下取参考価格').waitFor();

  //全てクリアでいったんリセットする
  await page.getByRole('link', { name: '全てクリア' }).click();
  await page.waitForTimeout(3000);

  //◎輸入車（乗用車を検索する）
    await page.getByRole('link', { name: '乗用車を検索する' }).click();
  // メーカー「トヨタ」を選択
    await page.locator('select[name="maker"]').selectOption('2010');
    await page.goto('https://devdlpro.proto-dataline.com/tradein_biz/tradein_biz.php#19c8d4c51827fc8');
  // 車種「カローラバン」を選択
    await page.locator('select[name="car"]').selectOption('20101531');
    await page.goto('https://devdlpro.proto-dataline.com/tradein_biz/tradein_biz.php#19c8d4c688c7702');
  // 年式「2016」～「2016」を選択
    await page.locator('#s_year').selectOption('2016');
  // 「検索」を押下
  await page.getByRole('link', { name: '検 索' }).click();
  // 検索結果一覧＞1件目を選択
  await page.getByRole('cell', { name: '(H28)' }).nth(2).click();
  // 「買取・下取価格表示へ」を選択
  await page.getByRole('link', { name: '買取・下取価格表示へ' }).click();
  await page.waitForTimeout(2000);
  // キーボードの「End」キーを押して一番下まで移動
  await page.keyboard.press('End');

  await page.waitForTimeout(2000);
  //　買取・下取価格が空白（0円）であることを確認（粗利100%設定）
  // 1. 確認したい金額の場所（tdタグ）を変数にします
  targetPriceCell = page.locator('#vehicle_price > table > tbody > tr > td');
  // 2. その場所の文字が「¥0」であることを確認する
  await expect(targetPriceCell).toHaveText('¥0');
  // 3. 画面の要素（td）から、表示されている文字を取得する
  priceText1 = await page.locator('#vehicle_price > table > tbody > tr > td').innerText();
  console.log('輸入車＞買取下取粗利設定100％の金額の値の中身は:', priceText1);
  await page.getByText('買取・下取参考価格').waitFor();

  await page.waitForTimeout(3000);

  //ホームアイコン押下でホームへ遷移
  await page.getByRole('link', { name: 'TOP' }).click();
  //注文販売押下で注文販売へ遷移
  await page.getByRole('link', { name: '注文販売' }).click();

  // 注文販売へ遷移＞タブ名完全一致で確認する場合
  await expect(page).toHaveTitle('注文販売');
  await page.waitForTimeout(1000);

    //◎乗用車
  // メーカー「スズキ」を選択
  await page.locator('select[name="maker"]').selectOption('1055');
  await page.goto('https://devdlpro.proto-dataline.com/stock_biz/stock_biz.php#19c8d79c5c914194');
  // 車種「ワゴンR」を選択
  await page.locator('select[name="car"]').selectOption('10552003');
  await page.goto('https://devdlpro.proto-dataline.com/stock_biz/stock_biz.php#19c8d79e22f84a3');
  // 年式「2015」～「2015」を選択
  await page.locator('select[name="s_year"]').selectOption('2015');
  await page.locator('select[name="e_year"]').selectOption('2015');
  // 「検索」を押下
  await page.getByRole('link', { name: '検 索' }).click();

  // 検索結果一覧＞1件目を選択
  await page.getByRole('cell', { name: '(H27)' }).nth(2).click();
  // 「注文販売価格」（仕入価格）を選択
  await page.getByRole('link', { name: '仕入価格' }).click();
  await page.waitForTimeout(2000);
  // キーボードの「End」キーを押して一番下まで移動
  await page.keyboard.press('End');

  await page.waitForTimeout(2000);
  //　注文販売価格が（100,000,000円）以上であることを確認（粗利100%設定）
  // 1. 画面の要素（td）から、表示されている文字を取得する
  let priceText = await page.locator('#vehicle_price > table > tbody > tr > td').innerText();
  // 2. 取得した文字から「¥」「,（カンマ）」「円」「空白」などをすべて取り除く
  let cleanPriceText = priceText.replace(/[¥,円\s]/g, '');
  // 3. キレイになった文字を、計算可能な「数値（Number）」に変換する
  let priceNumber = Number(cleanPriceText);
  // 4. その数値が 100000000 より「大きい」ことを確認する
  expect(priceNumber).toBeGreaterThan(100000000);
  console.log('乗用車＞注文販売粗利設定100％の金額の値の中身は:', priceText);
  await page.getByText('注文販売参考価格').waitFor();

  //全てクリアでいったんリセットする
  await page.getByRole('link', { name: '全てクリア' }).click();
  await page.waitForTimeout(3000);

  //◎商用車（商用車を検索する）
  await page.getByRole('link', { name: '商用車を検索する' }).click();
  // メーカー「トヨタ」を選択
  await page.locator('select[name="maker"]').selectOption('1010');
  await page.goto('https://devdlpro.proto-dataline.com/stock_biz/stock_biz.php#19c8d7a84f0d496');
  // 車種「カローラバン」を選択
  await page.locator('select[name="car"]').selectOption('10106118');
  await page.goto('https://devdlpro.proto-dataline.com/stock_biz/stock_biz.php#19c8d7a900843d0');
  // 年式「2002」～「2002」を選択
  await page.locator('select[name="s_year"]').selectOption('2002');
  await page.locator('select[name="e_year"]').selectOption('2002');
  // 「検索」を押下
  await page.getByRole('link', { name: '検 索' }).click();

  // 検索結果一覧＞1件目を選択
  await page.getByRole('cell', { name: '(H14)' }).nth(2).click();
  // 「注文販売価格」（仕入価格）を選択
  await page.getByRole('link', { name: '仕入価格' }).click();
  await page.waitForTimeout(2000);
  // キーボードの「End」キーを押して一番下まで移動
  await page.keyboard.press('End');

  await page.waitForTimeout(2000);
  //　注文販売価格が（100,000,000円）以上であることを確認（粗利100%設定）
  // 1. 画面の要素（td）から、表示されている文字を取得する
  priceText = await page.locator('#vehicle_price > table > tbody > tr > td').innerText();
  // 2. 取得した文字から「¥」「,（カンマ）」「円」「空白」などをすべて取り除く
  cleanPriceText = priceText.replace(/[¥,円\s]/g, '');
  // 3. キレイになった文字を、計算可能な「数値（Number）」に変換する
  priceNumber = Number(cleanPriceText);
  // 4. その数値が 100000000 より「大きい」ことを確認する
  expect(priceNumber).toBeGreaterThan(100000000);
  console.log('商用車＞注文販売粗利設定100％の金額の値の中身は:', priceText);
  await page.getByText('注文販売参考価格').waitFor();

  //全てクリアでいったんリセットする
  await page.getByRole('link', { name: '全てクリア' }).click();
  await page.waitForTimeout(3000);

  //◎輸入車（乗用車を検索する）
  await page.getByRole('link', { name: '乗用車を検索する' }).click();
  // メーカー「アウディ」を選択
  await page.locator('select[name="maker"]').selectOption('2010');
  await page.goto('https://devdlpro.proto-dataline.com/stock_biz/stock_biz.php#19c8d7bb7e614d18');
  // 車種「A1」を選択
  await page.locator('select[name="car"]').selectOption('20101531');
  await page.goto('https://devdlpro.proto-dataline.com/stock_biz/stock_biz.php#19c8d7bc38c10a47');
  // 年式「2016」～「2016」を選択
  await page.locator('select[name="s_year"]').selectOption('2016');
  await page.locator('select[name="e_year"]').selectOption('2016');
  // 「検索」を押下
  await page.getByRole('link', { name: '検 索' }).click();

  // 検索結果一覧＞1件目を選択
  await page.getByRole('cell', { name: '(H28)' }).nth(2).click();
  // 「注文販売価格」（仕入価格）を選択
  await page.getByRole('link', { name: '仕入価格' }).click();
  await page.waitForTimeout(2000);
  // キーボードの「End」キーを押して一番下まで移動
  await page.keyboard.press('End');

  await page.waitForTimeout(2000);
  //　注文販売価格が（100,000,000円）以上であることを確認（粗利100%設定）
  // 1. 画面の要素（td）から、表示されている文字を取得する
  priceText = await page.locator('#vehicle_price > table > tbody > tr > td').innerText();
  // 2. 取得した文字から「¥」「,（カンマ）」「円」「空白」などをすべて取り除く
  cleanPriceText = priceText.replace(/[¥,円\s]/g, '');
  // 3. キレイになった文字を、計算可能な「数値（Number）」に変換する
  priceNumber = Number(cleanPriceText);
  // 4. その数値が 100000000 より「大きい」ことを確認する
  expect(priceNumber).toBeGreaterThan(100000000);
  console.log('輸入車＞注文販売粗利設定100％の金額の値の中身は:', priceText);
  await page.getByText('注文販売参考価格').waitFor();

  //ホームアイコン押下でホームへ遷移
  await page.getByRole('link', { name: 'TOP' }).click();

  // アイコン「商談ツール」を押下
  await page.getByRole('link', { name: '商談ツール' }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500);

  //商談設定＞走行加減算設定＞空白
  await page.getByRole('link', { name: '商談設定' }).click();
  await page.waitForTimeout(1000);
   await page.getByRole('link', { name: '走行加減算設定' }).click();
  // name属性が "shitadori_distance_over" のinputタグを探して、中身を空っぽ（クリア）にする
  await page.locator('input[name="shitadori_distance_over"]').clear();
  // name属性が "shitadori_distance_short" のinputタグを探して、中身を空っぽ（クリア）にする
  await page.locator('input[name="shitadori_distance_short"]').clear();
  // name属性が "stock_distance_over" のinputタグを探して、中身を空っぽ（クリア）にする
  await page.locator('input[name="stock_distance_over"]').clear();
  // name属性が "stock_distance_short" のinputタグを探して、中身を空っぽ（クリア）にする
  await page.locator('input[name="stock_distance_short"]').clear();
  // この内容で登録する
  await page.getByRole('link', { name: 'この内容で登録する' }).click();
  console.log('商談設定＞走行加減算設定＞乗用車＞空白に設定');

  // アイコン「商談ツール」を押下
  await page.getByRole('link', { name: '商談ツール' }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500);

//◎乗用車（走行加減算設定なし＞走行距離加算＋1000km）
  // メーカー「トヨタ」を選択
  await page.locator('select[name="maker"]').selectOption('1010');
  await page.goto('https://devdlpro.proto-dataline.com/tradein_biz/tradein_biz.php#19c8e6a53a31673d');
  // 車種「SAI」を選択
  await page.locator('select[name="car"]').selectOption('10101070');
  await page.goto('https://devdlpro.proto-dataline.com/tradein_biz/tradein_biz.php#19c8e6a68c91057d');
  // 年式「2015」～「2015」を選択
  await page.locator('#s_year').selectOption('2015');
  // 「検索」を押下
  await page.getByRole('link', { name: '検 索' }).click();
  // 検索結果一覧＞1件目を選択
  await page.getByRole('cell', { name: '(H27)' }).nth(2).click();
  // 「買取・下取価格表示へ」を選択
  await page.getByRole('link', { name: '買取・下取価格表示へ' }).click();
  await page.waitForTimeout(2000);
  // キーボードの「End」キーを押して一番下まで移動
  await page.keyboard.press('End');

  await page.waitForTimeout(2000);

  //元の走行距離＋1000を代入する
  // 1. 対象の入力欄をわかりやすく変数にしておく
  let inputLocator = page.locator('#vehicle_input > table:nth-child(2) > tbody > tr:nth-child(1) > td > input');
  // 2. 現在の値を取得する（例: "5000" や "5,000" という文字として取れる）
  let currentValueStr = await inputLocator.inputValue();
  // 3. カンマ(,)を取り除いて「計算できる数値」に変換する（空欄の場合は 0 として扱う）
  let currentValueNum = Number(currentValueStr.replace(/,/g, '')) || 0;
  // 4. 1000を足す
  let newValueNum = currentValueNum + 1000;
  // 5. 新しい値を入力欄にセットする（数値から文字に戻して入力）
  await inputLocator.fill(String(newValueNum));
  // 確認用：コンソールに結果を出力
  console.log(`下取・買取 元の走行距離の値: ${currentValueStr} -> 新しい走行距離の値: ${newValueNum}`);
  //計算するを押下する
  await page.getByRole('link', { name: '計算する' }).click();
  await page.waitForTimeout(3000);

  // 1. 指定した場所のテキストを取得し、変数「priceNewshitadorikaitori」に代入する
  let priceNewshitadorikaitori1 = await page.locator('#vehicle_price > table > tbody > tr > td').innerText();
  // 2. ちゃんと取れたか確認するために、ログ（コンソール）に出力する
  console.log('加走行時減算設定：なし計算後下取・買取 下取参考価格:', priceNewshitadorikaitori1);
  await page.getByText('買取・下取参考価格').waitFor();

  //走行加減算設定比較用1
  let currentValueStrkakaku1 = String(priceNewshitadorikaitori1);
  // 変更箇所：「カンマだけ」ではなく、「数字・マイナス・小数点 以外（[^\d.-]）」をすべて消す！
  let cleanStr1 = currentValueStrkakaku1.replace(/[^\d.-]/g, '');
  let currentValueNumkakaku1 = Number(cleanStr1) || 0;
  console.log('加走行時減算設定：なし計算後下取・買取 下取参考価格　数字化:', currentValueNumkakaku1);
  await page.waitForTimeout(1000);

  //商談設定＞走行加減算設定＞999
  await page.getByRole('link', { name: '商談設定' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: '走行加減算設定' }).click();
  // name属性が "shitadori_distance_over" のinputタグを探して、「999」を入力する
  await page.locator('input[name="shitadori_distance_over"]').fill('999');
  // name属性が "shitadori_distance_short" のinputタグを探して、「999」を入力する
  await page.locator('input[name="shitadori_distance_short"]').fill('999');
  // name属性が "stock_distance_over" のinputタグを探して、「999」を入力する
  await page.locator('input[name="stock_distance_over"]').fill('999');
  // name属性が "stock_distance_short" のinputタグを探して、「999」を入力する
  await page.locator('input[name="stock_distance_short"]').fill('999');
  // この内容で登録する
  await page.getByRole('link', { name: 'この内容で登録する' }).click();
  console.log('商談設定＞走行加減算設定＞乗用車＞999に設定');

    // アイコン「商談ツール」を押下
  await page.getByRole('link', { name: '商談ツール' }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500);

    //全てクリアでいったんリセットする
  await page.getByRole('link', { name: '全てクリア' }).click();
  await page.waitForTimeout(3000);

//◎乗用車（走行加減算設定999＞走行距離加算＋1000km）
  // メーカー「トヨタ」を選択
  await page.locator('select[name="maker"]').selectOption('1010');
  await page.goto('https://devdlpro.proto-dataline.com/tradein_biz/tradein_biz.php#19c8e6a53a31673d');
  // 車種「SAI」を選択
  await page.locator('select[name="car"]').selectOption('10101070');
  await page.goto('https://devdlpro.proto-dataline.com/tradein_biz/tradein_biz.php#19c8e6a68c91057d');
  // 年式「2015」～「2015」を選択
  await page.locator('#s_year').selectOption('2015');
  // 「検索」を押下
  await page.getByRole('link', { name: '検 索' }).click();
  // 検索結果一覧＞1件目を選択
  await page.getByRole('cell', { name: '(H27)' }).nth(2).click();
  // 「買取・下取価格表示へ」を選択
  await page.getByRole('link', { name: '買取・下取価格表示へ' }).click();
  await page.waitForTimeout(2000);
  // キーボードの「End」キーを押して一番下まで移動
  await page.keyboard.press('End');
  await page.waitForTimeout(2000);

  //元の走行距離＋1000を代入する
  // 1. 対象の入力欄をわかりやすく変数にしておく
  inputLocator = page.locator('#vehicle_input > table:nth-child(2) > tbody > tr:nth-child(1) > td > input');
  // 2. 現在の値を取得する（例: "5000" や "5,000" という文字として取れる）
  currentValueStr = await inputLocator.inputValue();
  // 3. カンマ(,)を取り除いて「計算できる数値」に変換する（空欄の場合は 0 として扱う）
  currentValueNum = Number(currentValueStr.replace(/,/g, '')) || 0;
  // 4. 1000を足す
  newValueNum = currentValueNum + 1000;
  // 5. 新しい値を入力欄にセットする（数値から文字に戻して入力）
  await inputLocator.fill(String(newValueNum));
  // 確認用：コンソールに結果を出力
  console.log(`下取・買取 元の走行距離の値: ${currentValueStr} -> 新しい走行距離の値: ${newValueNum}`);
  //計算するを押下する
  await page.getByRole('link', { name: '計算する' }).click();
  await page.waitForTimeout(3000);
  // 1. 指定した場所のテキストを取得し、変数「priceNewshitadorikaitori」に代入する
  let priceNewshitadorikaitori2 = await page.locator('#vehicle_price > table > tbody > tr > td').innerText();
  // 2. ちゃんと取れたか確認するために、ログ（コンソール）に出力する
  console.log('加走行時減算設定：999で計算後下取・買取 下取参考価格:', priceNewshitadorikaitori2);
  await page.getByText('買取・下取参考価格').waitFor();

  //走行加減算設定比較用2
  let currentValueStrkakaku2 = String(priceNewshitadorikaitori2);
  // 変更箇所：「カンマだけ」ではなく、「数字・マイナス・小数点 以外（[^\d.-]）」をすべて消す！
  let cleanStr2 = currentValueStrkakaku2.replace(/[^\d.-]/g, '');
  let currentValueNumkakaku2 = Number(cleanStr2) || 0;
  console.log('加走行時減算設定：999で計算後下取・買取 下取参考価格　数字化:', currentValueNumkakaku2);
  // priceNewshitadorikaitori1 が priceNewshitadorikaitori2 より「大きい（>）」ことを確認する
  expect(currentValueNumkakaku1).toBeGreaterThan(currentValueNumkakaku2);

  // 1. currentValueNumkakaku1 から currentValueNumkakaku2 を引き算する
  let diffPrice = currentValueNumkakaku2 - currentValueNumkakaku1;
  // 2. 計算結果をコンソール（ターミナル）に出力して確認する
  console.log('下取・買取 走行距離1000km加算：空白と999の差の価格はマイナス値となる:', diffPrice);

  //全てクリアでいったんリセットする
  await page.getByRole('link', { name: '全てクリア' }).click();
  await page.waitForTimeout(3000);

  // アイコン「注文販売」を押下
  await page.getByRole('link', { name: '注文販売', exact: true  }).click();
  await page.waitForTimeout(500);

  //商談設定＞走行加減算設定＞空白
  await page.getByRole('link', { name: '商談設定' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: '走行加減算設定' }).click();
  // name属性が "shitadori_distance_over" のinputタグを探して、中身を空っぽ（クリア）にする
  await page.locator('input[name="shitadori_distance_over"]').clear();
  // name属性が "shitadori_distance_short" のinputタグを探して、中身を空っぽ（クリア）にする
  await page.locator('input[name="shitadori_distance_short"]').clear();
  // name属性が "stock_distance_over" のinputタグを探して、中身を空っぽ（クリア）にする
  await page.locator('input[name="stock_distance_over"]').clear();
  // name属性が "stock_distance_short" のinputタグを探して、中身を空っぽ（クリア）にする
  await page.locator('input[name="stock_distance_short"]').clear();
  // この内容で登録する
  await page.getByRole('link', { name: 'この内容で登録する' }).click();
  console.log('商談設定＞走行加減算設定＞乗用車＞空白に設定');

  await page.waitForTimeout(500);
  // アイコン「注文販売」を押下
  await page.getByRole('link', { name: '注文販売', exact: true  }).click();
  await page.waitForTimeout(500);

//◎乗用車（走行加減算設定なし＞走行距離加算-1000km）
  // メーカー「トヨタ」を選択
  await page.locator('select[name="maker"]').selectOption('1010');
  await page.goto('https://devdlpro.proto-dataline.com/stock_biz/stock_biz.php#19c8eed743b6b93');
  // 車種「SAI」を選択
  await page.locator('select[name="car"]').selectOption('10101070');
  await page.goto('https://devdlpro.proto-dataline.com/stock_biz/stock_biz.php#19c8eed8ff76596');
  // 年式「2015」～「2015」を選択
  await page.locator('select[name="s_year"]').selectOption('2015');
  await page.locator('select[name="e_year"]').selectOption('2015');
  // 「検索」を押下
  await page.getByRole('link', { name: '検 索' }).click();

  // 検索結果一覧＞1件目を選択
  await page.getByRole('cell', { name: '(H27)' }).nth(2).click();
  // 「注文販売価格へ」を選択
  await page.getByRole('link', { name: '仕入価格' }).click();
  await page.waitForTimeout(2000);
  // キーボードの「End」キーを押して一番下まで移動
  await page.keyboard.press('End');

  await page.waitForTimeout(2000);

  //元の走行距離-1000を代入する
  // 1. 対象の入力欄をわかりやすく変数にしておく
  inputLocator = page.locator('#vehicle_input > table > tbody > tr:nth-child(1) > td > input');
  // 2. 現在の値を取得する（例: "5000" や "5,000" という文字として取れる）
  currentValueStr = await inputLocator.inputValue();
  // 3. カンマ(,)を取り除いて「計算できる数値」に変換する（空欄の場合は 0 として扱う）
  currentValueNum = Number(currentValueStr.replace(/,/g, '')) || 0;
  // 4. 1000を足す
  newValueNum = currentValueNum - 1000;
  // 5. 新しい値を入力欄にセットする（数値から文字に戻して入力）
  await inputLocator.fill(String(newValueNum));
  // 確認用：コンソールに結果を出力
  console.log(`注文販売 元の走行距離の値: ${currentValueStr} -> 新しい走行距離の値: ${newValueNum}`);
  //計算するを押下する
  await page.getByRole('link', { name: '計算する' }).click();
  await page.waitForTimeout(3000);
  // 1. 指定した場所のテキストを取得し、変数「priceNewshitadorikaitori」に代入する
  priceNewshitadorikaitori1 = await page.locator('#vehicle_price > table > tbody > tr > td').innerText();
  // 2. ちゃんと取れたか確認するために、ログ（コンソール）に出力する
  console.log('少走行時加算設定：なし計算後、注文販売参考価格:', priceNewshitadorikaitori1);
  await page.getByText('注文販売参考価格').waitFor();

  //走行加減算設定比較用1
  currentValueStrkakaku1 = String(priceNewshitadorikaitori1);
  // 変更箇所：「カンマだけ」ではなく、「数字・マイナス・小数点 以外（[^\d.-]）」をすべて消す！
  cleanStr1 = currentValueStrkakaku1.replace(/[^\d.-]/g, '');
  currentValueNumkakaku1 = Number(cleanStr1) || 0;
  console.log('少走行時加算設定：なし計算後、注文販売参考価格　数字化:', currentValueNumkakaku1);
  await page.waitForTimeout(1000);

  //商談設定＞走行加減算設定＞999
  await page.getByRole('link', { name: '商談設定' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: '走行加減算設定' }).click();
  // name属性が "shitadori_distance_over" のinputタグを探して、「999」を入力する
  await page.locator('input[name="shitadori_distance_over"]').fill('999');
  // name属性が "shitadori_distance_short" のinputタグを探して、「999」を入力する
  await page.locator('input[name="shitadori_distance_short"]').fill('999');
  // name属性が "stock_distance_over" のinputタグを探して、「999」を入力する
  await page.locator('input[name="stock_distance_over"]').fill('999');
  // name属性が "stock_distance_short" のinputタグを探して、「999」を入力する
  await page.locator('input[name="stock_distance_short"]').fill('999');
  // この内容で登録する
  await page.getByRole('link', { name: 'この内容で登録する' }).click();
  console.log('商談設定＞走行加減算設定＞乗用車＞999に設定');


    // アイコン「注文販売」を押下
  await page.getByRole('link', { name: '注文販売', exact: true  }).click();
  await page.waitForTimeout(500);

    //全てクリアでいったんリセットする
  await page.getByRole('link', { name: '全てクリア' }).click();
  await page.waitForTimeout(3000);

  //◎乗用車（走行加減算設定999＞走行距離加算-1000km）
  // メーカー「トヨタ」を選択
  await page.locator('select[name="maker"]').selectOption('1010');
  await page.goto('https://devdlpro.proto-dataline.com/stock_biz/stock_biz.php#19c8eed743b6b93');
  // 車種「SAI」を選択
  await page.locator('select[name="car"]').selectOption('10101070');
  await page.goto('https://devdlpro.proto-dataline.com/stock_biz/stock_biz.php#19c8eed8ff76596');
  // 年式「2015」～「2015」を選択
  await page.locator('select[name="s_year"]').selectOption('2015');
  await page.locator('select[name="e_year"]').selectOption('2015');
  // 「検索」を押下
  await page.getByRole('link', { name: '検 索' }).click();

  // 検索結果一覧＞1件目を選択
  await page.getByRole('cell', { name: '(H27)' }).nth(2).click();
  // 「注文販売価格へ」を選択
  await page.getByRole('link', { name: '仕入価格' }).click();
  await page.waitForTimeout(2000);
  // キーボードの「End」キーを押して一番下まで移動
  await page.keyboard.press('End');

  await page.waitForTimeout(2000);

  //元の走行距離＋1000を代入する
  // 1. 対象の入力欄をわかりやすく変数にしておく
  inputLocator = page.locator('#vehicle_input > table > tbody > tr:nth-child(1) > td > input');
  // 2. 現在の値を取得する（例: "5000" や "5,000" という文字として取れる）
  currentValueStr = await inputLocator.inputValue();
  // 3. カンマ(,)を取り除いて「計算できる数値」に変換する（空欄の場合は 0 として扱う）
  currentValueNum = Number(currentValueStr.replace(/,/g, '')) || 0;
  // 4. 1000を足す
  newValueNum = currentValueNum - 1000;
  // 5. 新しい値を入力欄にセットする（数値から文字に戻して入力）
  await inputLocator.fill(String(newValueNum));
  // 確認用：コンソールに結果を出力
  console.log(`注文販売 元の走行距離の値: ${currentValueStr} -> 新しい走行距離の値: ${newValueNum}`);
  //計算するを押下する
  await page.getByRole('link', { name: '計算する' }).click();
  await page.waitForTimeout(3000);

  // 1. 指定した場所のテキストを取得し、変数「priceNewshitadorikaitori」に代入する
  priceNewshitadorikaitori2 = await page.locator('#vehicle_price > table > tbody > tr > td').innerText();
  // 2. ちゃんと取れたか確認するために、ログ（コンソール）に出力する
  console.log('少走行時加算設定：999で計算後、注文販売参考価格:', priceNewshitadorikaitori2);
  await page.getByText('注文販売参考価格').waitFor();
  //走行加減算設定比較用2
  currentValueStrkakaku2 = String(priceNewshitadorikaitori2);
  // 変更箇所：「カンマだけ」ではなく、「数字・マイナス・小数点 以外（[^\d.-]）」をすべて消す！
  cleanStr2 = currentValueStrkakaku2.replace(/[^\d.-]/g, '');
  currentValueNumkakaku2 = Number(cleanStr2) || 0;
  console.log('少走行時加算設定：999で計算後、注文販売参考価格　数字化:', currentValueNumkakaku2);
  // priceNewshitadorikaitori1 が priceNewshitadorikaitori2 より「大きい（>）」ことを確認する
  expect(currentValueNumkakaku2).toBeGreaterThan(currentValueNumkakaku1);

  // 1. currentValueNumkakaku1 から currentValueNumkakaku2 を引き算する
  diffPrice = currentValueNumkakaku2 - currentValueNumkakaku1;
  // 2. 計算結果をコンソール（ターミナル）に出力して確認する
  console.log('注文販売　走行距離-1000km加算：空白と999の差の価格はプラス値となる:', diffPrice);

  //商談設定＞走行加減算設定＞元の空白に戻す
  await page.getByRole('link', { name: '商談設定' }).click();
  await page.waitForTimeout(1000);
   await page.getByRole('link', { name: '走行加減算設定' }).click();
  // name属性が "shitadori_distance_over" のinputタグを探して、中身を空っぽ（クリア）にする
  await page.locator('input[name="shitadori_distance_over"]').clear();
  // name属性が "shitadori_distance_short" のinputタグを探して、中身を空っぽ（クリア）にする
  await page.locator('input[name="shitadori_distance_short"]').clear();
  // name属性が "stock_distance_over" のinputタグを探して、中身を空っぽ（クリア）にする
  await page.locator('input[name="stock_distance_over"]').clear();
  // name属性が "stock_distance_short" のinputタグを探して、中身を空っぽ（クリア）にする
  await page.locator('input[name="stock_distance_short"]').clear();
  // この内容で登録する
  await page.getByRole('link', { name: 'この内容で登録する' }).click();
  console.log('商談設定＞走行加減算設定＞乗用車＞空白に設定');

  // アイコン「商談ツール」を押下
  await page.getByRole('link', { name: '商談ツール' }).click();
  await page.waitForTimeout(500);

  //商談設定を押下
  await page.getByRole('link', { name: '商談設定' }).click();
  //乗換診断初期設定を押下
  await page.getByRole('link', { name: '乗換診断初期設定' }).click();

  //登録車＞レギュラーガソリン価格：100円設定
  await expect(page.locator('input[name="fuel_regular"]')).toBeVisible();
  await page.getByText('レギュラー').first().waitFor();
  //登録車＞ハイオクガソリン価格：200円設定
  await expect(page.locator('input[name="fuel_premium"]')).toBeVisible();
  await page.getByText('ハイオク').first().waitFor();
  //自社在庫一覧＞日産　GT-Rが存在すること
  // セル単位ではなく、「日産 ＧＴ－Ｒのデータ行」が画面に存在することを確認する！
  await expect(page.getByRole('row', { name: '日産 ＧＴ－Ｒ 指定なし 指定なし 指定なし' })).toBeVisible();
  await page.getByText('ＧＴ－Ｒ').first().waitFor();
  // キーボードの「End」キーを押して一番下まで移動
  await page.keyboard.press('End');
  await page.waitForTimeout(1000);

  //自社在庫一覧＞日産　GT-Rが存在＞削除✅できること
  await page.getByRole('row', { name: '日産 ＧＴ－Ｒ 指定なし 指定なし 指定なし' }).locator('#register_stock_id').check();
  await page.keyboard.press('End');
  await page.waitForTimeout(1000);
  await page.getByText('自社在庫登録内容').waitFor();
  //この内容で登録する＞削除できること
  await page.getByRole('link', { name: 'この内容で登録する' }).click();
  await page.waitForTimeout(1000);


  //自社在庫一覧＞日産　GT-Rが存在しないこと
  await expect(page.getByRole('row', { name: '日産 ＧＴ－Ｒ 指定なし 指定なし 指定なし' })).not.toBeVisible();
  await page.keyboard.press('End');
  await page.waitForTimeout(1000);

  //自社在庫一覧＞日産を登録する
  await page.locator('select[name="register_stock_maker"]').selectOption('1015');
  await page.goto('https://devdlpro.proto-dataline.com/setting/setting.php?action=register_stock_select&key=register_stock_maker#stockResist');
  //自社在庫一覧＞GT-Rを登録する
  await page.locator('select[name="register_stock_car"]').selectOption('10151046');
  await page.goto('https://devdlpro.proto-dataline.com/setting/setting.php?action=register_stock_select&key=register_stock_car#stockResist');
  //この内容で登録する
  await page.getByRole('link', { name: 'この内容で登録する' }).click();
  await page.waitForTimeout(1000);
  await page.keyboard.press('End');
  await page.waitForTimeout(1000);
  await page.getByText('自社在庫登録内容').waitFor();

  //一括選択を押下
  await page.getByRole('button', { name: '一括選択' }).click();
  // 1. 画面上にある同じチェックボックス（#register_stock_id）をすべて探し、
  // その中から「一番最初のもの（1件目）」だけを .first() で抜き出す！
  let firstCheckbox = page.locator('#register_stock_id').first();
  // 2. その1件目のチェックボックスが「ON」であることを確認する
  await expect(firstCheckbox).toBeChecked();
  await page.keyboard.press('End');
  await page.waitForTimeout(1000);

  //クリアを押下
  await page.getByRole('button', { name: 'クリア' }).click();
  // 1. 画面上にある同じチェックボックス（#register_stock_id）をすべて探し、
  // その中から「一番最初のもの（1件目）」だけを .first() で抜き出す！
  firstCheckbox = page.locator('#register_stock_id').first();
  // 2. その1件目のチェックボックスが「ON」であることを確認する
  await expect(firstCheckbox).not.toBeChecked();
  await page.keyboard.press('End');
  await page.waitForTimeout(1000);

  // 検索履歴ページングと自社登録車両に「スバル」が無いことの確認
  await page.getByRole('link', { name: '次へ>>' }).click();
  await expect(page.getByRole('cell', { name: '件中 51 -' })).toBeVisible();
  await page.getByText('自社在庫登録内容').waitFor();

  // 「スバル」という文字が画面に【表示されていないこと】を確認する
  await page.getByText('スバル', { exact: true }).waitFor({ state: 'hidden' });
  await page.keyboard.press('End');
  await page.waitForTimeout(1000);

  await page.getByRole('link', { name: '<<前へ' }).click();
  await expect(page.getByRole('cell', { name: '件中 1 -' })).toBeVisible();
  // 「スバル」という文字が画面に【表示されていないこと】を確認する
  await page.getByText('スバル', { exact: true }).waitFor({ state: 'hidden' });
  await page.keyboard.press('End');
  await page.waitForTimeout(1000);
  await page.getByText('自社在庫登録内容').waitFor();

  await page.getByRole('link', { name: '2' }).click();
  await expect(page.getByRole('cell', { name: '件中 51 -' })).toBeVisible();
  await page.keyboard.press('End');
  await page.waitForTimeout(1000);

  await page.getByRole('link', { name: '1' }).click();
  await expect(page.getByRole('cell', { name: '件中 1 -' })).toBeVisible();
  await page.keyboard.press('End');
  await page.waitForTimeout(1000);

  await page.keyboard.press('Home');


});
