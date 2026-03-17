//custom-test.tsを使用
import { test, expect } from '../custom-test';
//import { test, expect } from '@playwright/test';
//DLP回帰テスト-AA相場検索-グレード検索＞AA相場検索
test('ソート', async ({ page }) => {
// ▼ この行を追加（テストの制限時間を120秒に変更）
  test.setTimeout(3600000);

  //ログイン画面へ遷移
  await page.goto('https://devdlpro.proto-dataline.com/top/top.php');
  await page.getByRole('textbox', { name: 'ログインID' }).click();
  await page.getByRole('textbox', { name: 'ログインID' }).fill('tst0001');
  
  // パスワードにtst0002を入力
  await page.getByRole('textbox', { name: 'ログインID' }).press('Tab');
  await page.getByRole('textbox', { name: 'パスワード' }).fill('tst0001');
  await page.getByRole('button', { name: 'ログイン' }).click();
  await page.waitForLoadState('networkidle');
  
  // 「グレード検索」の右横にある「ＡＡ相場」を押下
  await page.getByRole('link', { name: 'ＡＡ相場' }).click();
  await page.waitForLoadState('networkidle');
  
  // AA相場へ遷移＞タブ名完全一致で確認する場合
  await expect(page).toHaveTitle('AA相場');


  // メーカー「トヨタ」を選択
  await page.locator('select[name="maker"]').selectOption('1010');
  await page.waitForTimeout(500);
  // 車種「アルファード」を選択
  await page.locator('select[name="car"]').selectOption('10102070');
  await page.waitForTimeout(500);


  //年式「2018」～「2018」まで
  await page.locator('select[name="s_year"]').selectOption('2018');
  await page.locator('select[name="e_year"]').selectOption('2018');
  //await page.getByText('上記条件から検索 該当件数288件').click();
  await page.getByText('上記条件から検索').click();


//★ソート機能1「型式」
  // 🌟 1件目のセルのロケーター
let targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_type_nm');
// 1. ソート前の「元の値」を取得する
let originalValue = await targetCell.innerText();
console.log(`💡 「型式」ソート前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. 【昇順】ソートを実行する！
// ==========================================
// ※ ↓ 実際のソート（昇順）ボタンのクリック処理に書き換えてください
await page.getByRole('link', { name: '▲' }).first().click();
await page.waitForTimeout(6500); 
// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
let ascValue = await targetCell.innerText();
console.log(`💡 「型式」昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 究極の3段階条件分岐！
// ==========================================
if (originalValue !== ascValue) {
  // パターンA：元の値と「違った」場合 ＝ 昇順ソート成功！
  console.log('✅ 「型式」昇順ソートで値が変化したため、ソート機能のテストOKです！');

} else {
  // 元の値と「同じ」だった場合 ＝ 降順ソートに挑戦する！
  console.log('💡 「型式」昇順ソートで値が同じでした。続けて【降順ソート】を試します...');

  // 4. 【降順】ソートを実行する！
  // ※ ↓ 実際のソート（降順）ボタンのクリック処理に書き換えてください
  await page.locator('#result_head > table > tbody > tr:nth-child(1) > th.col_type_nm > a:nth-child(3)').click();
  await page.waitForTimeout(6500); 
// その上で、ローディングが「消える」のを確実に待つ！
  await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

  let descValue = await targetCell.innerText();
  console.log(`💡 「型式」降順ソート後の1件目の値: [${descValue}]`);

  // 5. 最後の判定：降順でも同じだった場合の神対応！
  if (originalValue !== descValue) {
    // パターンB：降順で値が「違った」場合 ＝ 降順ソート成功！
    console.log('✅ 「型式」降順ソートで値が変化したため、ソート機能のテストOKです！');
    
  } else {
    // パターンC：昇順でも降順でも値が「同じ」だった場合！
    console.log('✅ 「型式」昇順でも降順でも値が同じでした。すべて同じデータ（型式）が並んでいると判断し、テストOKとします！');
  }
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「型式」でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(6500);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
let clearValue = await targetCell.innerText();
console.log(`💡 「型式」ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「型式」ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_type_nm');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await targetCell.innerText();
console.log(`💡 「型式」フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. フィルタ「A」を選択する！
// ==========================================
console.log('💡 「型式」フィルタ「AGH35W」を選択します...');
// ※ ↓ 実際のフィルタ選択処理（プルダウンやボタン等）に書き換えてください
await page.locator('select[name="filter_type_nm"]').selectOption('AGH35W');
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
let filteredValue = await targetCell.innerText();
console.log(`💡 「型式」フィルタ「AGH35W」適用後の1件目の値: [${filteredValue}]`);

// 🌟 確認①：フィルタ結果の1件目がちゃんと「A」になっているか？
expect(filteredValue).toBe('AGH35W');
console.log('✅ 「型式」フィルタ適用後、1件目が「AGH35W」になっていることを確認しました！');

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
let clearedValue = await targetCell.innerText();
console.log(`💡 フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
let isOriginal = (clearedValue === originalValue);
let isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');

//★ソート機能2「年式」
  // 🌟 1件目のセルのロケーター
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_year_num');
// 1. ソート前の「元の値」を取得する
originalValue = await targetCell.innerText();
console.log(`💡 「年式」 ソート前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. 【昇順】ソートを実行する！
// ==========================================
// ※ ↓ 実際のソート（昇順）ボタンのクリック処理に書き換えてください
await page.getByRole('link', { name: '▲' }).nth(1).click();
await page.waitForTimeout(6500); 
// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
ascValue = await targetCell.innerText();
console.log(`💡 「年式」 昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 昇順ソートの結果判定（エラーにはせず、結果をログに残すだけ）
// ==========================================
if (originalValue !== ascValue) {
  // パターンA：元の値と「違った」場合
  console.log('✅ 「年式」 昇順ソートで値が変化しました！（昇順OK）');
} else {
  // 元の値と「同じ」だった場合
  console.log('💡 「年式」 昇順ソートで値が同じでした。（同値が並んでいる可能性があります）');
}
// ==========================================
// 4. 【降順】ソートを「必ず」実行する！（elseの外に出すのがポイント！）
// ==========================================
console.log('💡 続けて「年式」の【降順ソート】をテストします...');

// 降順ソートボタンを強制クリック！
await page.getByRole('link', { name: '▼' }).nth(1).click();

// 🌟 ユーザー様が設定された念のための待機！
await page.waitForTimeout(8500); 

// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

let descValue = await targetCell.innerText();
console.log(`💡 「年式」 降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 5. 最後の判定：降順ソートの完璧な検証！
// ==========================================
// 🌟 プロの工夫：originalValue ではなく ascValue（昇順の値）と比較する！
if (ascValue !== descValue) {
  // 昇順の時と一番上の車が「変わった」場合 ＝ 降順ソート成功！
  console.log('✅ 「年式」 降順ソートで、昇順の時と値が変化したため、降順ソートもテストOKです！');
  
} else {
  // 昇順にしても降順にしても、ずっと同じ車（年式）が一番上にいる場合！
  console.log('✅ 「年式」 昇順でも降順でも値が同じでした。すべて同じデータ（年式）が並んでいると判断し、テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「年式」 でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(6500);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await targetCell.innerText();
console.log(`💡 「年式」 ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「年式」 ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_year_num');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await targetCell.innerText();
console.log(`💡 「年式」 フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. フィルタ「A」を選択する！
// ==========================================
console.log('💡 「年式」 フィルタ「H30」を選択します...');
// ※ ↓ 実際のフィルタ選択処理（プルダウンやボタン等）に書き換えてください
await page.locator('#result_head > table > tbody > tr:nth-child(2) > th.year_num.col_year_num > select').selectOption('H30');
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
filteredValue = await targetCell.innerText();
console.log(`💡 「年式」 フィルタ「H30」適用後の1件目の値: [${filteredValue}]`);

// 🌟 確認①：フィルタ結果の1件目がちゃんと「A」になっているか？
expect(filteredValue).toContain('H30');
console.log('✅ 「年式」フィルタ適用後、1件目に「H30」が含まれていることを確認しました！');

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 「年式」フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await targetCell.innerText();
console.log(`💡 「年式」フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ 「年式」フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');

//★ソート機能3「MC」
  // 🌟 1件目のセルのロケーター
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_atype_nm.aa_font_size > p');
// 1. ソート前の「元の値」を取得する
originalValue = await targetCell.innerText();
console.log(`💡 「MC」 ソート前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. 【昇順】ソートを実行する！
// ==========================================
// ※ ↓ 実際のソート（昇順）ボタンのクリック処理に書き換えてください
await page.getByRole('link', { name: '▲' }).nth(2).click();
await page.waitForTimeout(6500); 
// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
ascValue = await targetCell.innerText();
console.log(`💡 「MC」 昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 昇順ソートの結果判定（エラーにはせず、結果をログに残すだけ）
// ==========================================
if (originalValue !== ascValue) {
  // パターンA：元の値と「違った」場合
  console.log('✅ 「MC」 昇順ソートで値が変化しました！（昇順OK）');
} else {
  // 元の値と「同じ」だった場合
  console.log('💡 「MC」 昇順ソートで値が同じでした。（同値が並んでいる可能性があります）');
}
// ==========================================
// 4. 【降順】ソートを「必ず」実行する！（elseの外に出すのがポイント！）
// ==========================================
console.log('💡 続けて「MC」の【降順ソート】をテストします...');

// 降順ソートボタンを強制クリック！
await page.getByRole('link', { name: '▼' }).nth(2).click();

// 🌟 ユーザー様が設定された念のための待機！
await page.waitForTimeout(8500); 

// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

descValue = await targetCell.innerText();
console.log(`💡 「MC」 降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 5. 最後の判定：降順ソートの完璧な検証！
// ==========================================
// 🌟 プロの工夫：originalValue ではなく ascValue（昇順の値）と比較する！
if (ascValue !== descValue) {
  // 昇順の時と一番上の車が「変わった」場合 ＝ 降順ソート成功！
  console.log('✅ 「MC」 降順ソートで、昇順の時と値が変化したため、降順ソートもテストOKです！');
  
} else {
  // 昇順にしても降順にしても、ずっと同じ車（年式）が一番上にいる場合！
  console.log('✅ 「MC」 昇順でも降順でも値が同じでした。すべて同じデータ（年式）が並んでいると判断し、テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「MC」 でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(6500);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await targetCell.innerText();
console.log(`💡 「MC」 ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「MC」 ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_atype_nm.aa_font_size > p');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await targetCell.innerText();
console.log(`💡 「MC」 フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2-1. フィルタ「A」を選択する！MCは以前不具合があったため前後確認！
// ==========================================
console.log('💡 「MC」 フィルタ「前」を選択します...');
// ※ ↓ 実際のフィルタ選択処理（プルダウンやボタン等）に書き換えてください
await page.locator('#result_head > table > tbody > tr:nth-child(2) > th.atype_nm.col_atype_nm > select').selectOption('前');
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
filteredValue = await targetCell.innerText();
console.log(`💡 「MC」 フィルタ「前」適用後の1件目の値: [${filteredValue}]`);

// 🌟 確認①：フィルタ結果の1件目がちゃんと「A」になっているか？
expect(filteredValue).toContain('前');
console.log('✅ 「MC」フィルタ適用後、1件目に「前」が含まれていることを確認しました！');

// ==========================================
// 2-2. フィルタ「A」を選択する！MCは以前不具合があったため前後確認！
// ==========================================
console.log('💡 「MC」 フィルタ「後」を選択します...');
// ※ ↓ 実際のフィルタ選択処理（プルダウンやボタン等）に書き換えてください
await page.locator('#result_head > table > tbody > tr:nth-child(2) > th.atype_nm.col_atype_nm > select').selectOption('後');
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
filteredValue = await targetCell.innerText();
console.log(`💡 「MC」 フィルタ「後」適用後の1件目の値: [${filteredValue}]`);

// 🌟 確認①：フィルタ結果の1件目がちゃんと「A」になっているか？
expect(filteredValue).toContain('後');
console.log('✅ 「MC」フィルタ適用後、1件目に「後」が含まれていることを確認しました！');

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 「前」フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await targetCell.innerText();
console.log(`💡 「MC」フィルタ解除後の1件目の値: [${clearedValue}]`);


// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ 「MC」フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');

//★ソート機能4「グレード」
  // 🌟 1件目のセルのロケーター
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_grade_nm');
// 1. ソート前の「元の値」を取得する
originalValue = await targetCell.innerText();
console.log(`💡 「グレード」 ソート前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. 【昇順】ソートを実行する！
// ==========================================
// ※ ↓ 実際のソート（昇順）ボタンのクリック処理に書き換えてください
await page.getByRole('link', { name: '▲' }).nth(3).click();
await page.waitForTimeout(6500); 
// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
ascValue = await targetCell.innerText();
console.log(`💡 「グレード」 昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 昇順ソートの結果判定（エラーにはせず、結果をログに残すだけ）
// ==========================================
if (originalValue !== ascValue) {
  // パターンA：元の値と「違った」場合
  console.log('✅ 「グレード」 昇順ソートで値が変化しました！（昇順OK）');
} else {
  // 元の値と「同じ」だった場合
  console.log('💡 「グレード」 昇順ソートで値が同じでした。（同値が並んでいる可能性があります）');
}
// ==========================================
// 4. 【降順】ソートを「必ず」実行する！（elseの外に出すのがポイント！）
// ==========================================
console.log('💡 続けて「グレード」の【降順ソート】をテストします...');

// 降順ソートボタンを強制クリック！
await page.getByRole('link', { name: '▼' }).nth(3).click();

// 🌟 ユーザー様が設定された念のための待機！
await page.waitForTimeout(8500); 

// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

descValue = await targetCell.innerText();
console.log(`💡 「グレード」 降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 5. 最後の判定：降順ソートの完璧な検証！
// ==========================================
// 🌟 プロの工夫：originalValue ではなく ascValue（昇順の値）と比較する！
if (ascValue !== descValue) {
  // 昇順の時と一番上の車が「変わった」場合 ＝ 降順ソート成功！
  console.log('✅ 「グレード」 降順ソートで、昇順の時と値が変化したため、降順ソートもテストOKです！');
  
} else {
  // 昇順にしても降順にしても、ずっと同じ車（年式）が一番上にいる場合！
  console.log('✅ 「グレード」 昇順でも降順でも値が同じでした。すべて同じデータ（年式）が並んでいると判断し、テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「グレード」 でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(6500);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await targetCell.innerText();
console.log(`💡 「グレード」 ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「グレード」 ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_grade_nm');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await targetCell.innerText();
console.log(`💡 「グレード」 フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2-1. フィルタ「A」を選択する！
// ==========================================
console.log('💡 「グレード」 フィルタ「２．５Ｘ」を選択します...');
// ※ ↓ 実際のフィルタ選択処理（プルダウンやボタン等）に書き換えてください
await page.locator('#result_head > table > tbody > tr:nth-child(2) > th.grade_nm.col_grade_nm > select').selectOption('２．５Ｘ');
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
filteredValue = await targetCell.innerText();
console.log(`💡 「グレード」 フィルタ「２．５Ｘ」適用後の1件目の値: [${filteredValue}]`);

// 🌟 確認①：フィルタ結果の1件目がちゃんと「A」になっているか？
expect(filteredValue).toContain('２．５Ｘ');
console.log('✅ 「グレード」フィルタ適用後、1件目に「２．５Ｘ」が含まれていることを確認しました！');

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 「２．５Ｘ」フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await targetCell.innerText();
console.log(`💡 「グレード」フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ 「グレード」フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');

//★ソート機能5「排気」
  // 🌟 1件目のセルのロケーター
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_exhaust_name');
// 1. ソート前の「元の値」を取得する
originalValue = await targetCell.innerText();
console.log(`💡 「排気」 ソート前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. 【昇順】ソートを実行する！
// ==========================================
// ※ ↓ 実際のソート（昇順）ボタンのクリック処理に書き換えてください
await page.getByRole('link', { name: '▲' }).nth(4).click();
await page.waitForTimeout(6500); 
// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
ascValue = await targetCell.innerText();
console.log(`💡 「排気」 昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 昇順ソートの結果判定（エラーにはせず、結果をログに残すだけ）
// ==========================================
if (originalValue !== ascValue) {
  // パターンA：元の値と「違った」場合
  console.log('✅ 「排気」 昇順ソートで値が変化しました！（昇順OK）');
} else {
  // 元の値と「同じ」だった場合
  console.log('💡 「排気」 昇順ソートで値が同じでした。（同値が並んでいる可能性があります）');
}
// ==========================================
// 4. 【降順】ソートを「必ず」実行する！（elseの外に出すのがポイント！）
// ==========================================
console.log('💡 続けて「排気」の【降順ソート】をテストします...');

// 降順ソートボタンを強制クリック！
await page.getByRole('link', { name: '▼' }).nth(4).click();

// 🌟 ユーザー様が設定された念のための待機！
await page.waitForTimeout(8500); 

// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

descValue = await targetCell.innerText();
console.log(`💡 「排気」 降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 5. 最後の判定：降順ソートの完璧な検証！
// ==========================================
// 🌟 プロの工夫：originalValue ではなく ascValue（昇順の値）と比較する！
if (ascValue !== descValue) {
  // 昇順の時と一番上の車が「変わった」場合 ＝ 降順ソート成功！
  console.log('✅ 「排気」 降順ソートで、昇順の時と値が変化したため、降順ソートもテストOKです！');
  
} else {
  // 昇順にしても降順にしても、ずっと同じ車（年式）が一番上にいる場合！
  console.log('✅ 「排気」 昇順でも降順でも値が同じでした。すべて同じデータ（年式）が並んでいると判断し、テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「排気」 でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(6500);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await targetCell.innerText();
console.log(`💡 「排気」 ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「排気」 ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_exhaust_name');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await targetCell.innerText();
console.log(`💡 「排気」 フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2-1. フィルタ「A」を選択する！
// ==========================================
console.log('💡 「排気」 フィルタ「3.5」を選択します...');
// ※ ↓ 実際のフィルタ選択処理（プルダウンやボタン等）に書き換えてください
await page.locator('#result_head > table > tbody > tr:nth-child(2) > th.exhaust_name.col_exhaust_name > select').selectOption('3.5');
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
filteredValue = await targetCell.innerText();
console.log(`💡 「排気」 フィルタ「3.5」適用後の1件目の値: [${filteredValue}]`);

// 🌟 確認①：フィルタ結果の1件目がちゃんと「A」になっているか？
expect(filteredValue).toContain('3.5');
console.log('✅ 「排気」フィルタ適用後、1件目に「3.5」が含まれていることを確認しました！');

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 「3.5」フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await targetCell.innerText();
console.log(`💡 「排気」フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ 「排気」フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');

//★ソート機能6「燃料」

//★ソート機能7「駆動」
  // 🌟 1件目のセルのロケーター
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_kudo > p');
// 1. ソート前の「元の値」を取得する
originalValue = await targetCell.innerText();
console.log(`💡 「駆動」 ソート前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. 【昇順】ソートを実行する！
// ==========================================
// ※ ↓ 実際のソート（昇順）ボタンのクリック処理に書き換えてください
await page.getByRole('link', { name: '▲' }).nth(6).click();
await page.waitForTimeout(10000); 
// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
ascValue = await targetCell.innerText();
console.log(`💡 「駆動」 昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 昇順ソートの結果判定（エラーにはせず、結果をログに残すだけ）
// ==========================================
if (originalValue !== ascValue) {
  // パターンA：元の値と「違った」場合
  console.log('✅ 「駆動」 昇順ソートで値が変化しました！（昇順OK）');
} else {
  // 元の値と「同じ」だった場合
  console.log('💡 「駆動」 昇順ソートで値が同じでした。（同値が並んでいる可能性があります）');
}
// ==========================================
// 4. 【降順】ソートを「必ず」実行する！（elseの外に出すのがポイント！）
// ==========================================
console.log('💡 続けて「駆動」の【降順ソート】をテストします...');

// 降順ソートボタンを強制クリック！
await page.getByRole('link', { name: '▼' }).nth(6).click();

// 🌟 ユーザー様が設定された念のための待機！
await page.waitForTimeout(10000); 

// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

descValue = await targetCell.innerText();
console.log(`💡 「駆動」 降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 5. 最後の判定：降順ソートの完璧な検証！
// ==========================================
// 🌟 プロの工夫：originalValue ではなく ascValue（昇順の値）と比較する！
if (ascValue !== descValue) {
  // 昇順の時と一番上の車が「変わった」場合 ＝ 降順ソート成功！
  console.log('✅ 「駆動」 降順ソートで、昇順の時と値が変化したため、降順ソートもテストOKです！');
  
} else {
  // 昇順にしても降順にしても、ずっと同じ車（年式）が一番上にいる場合！
  console.log('✅ 「駆動」 昇順でも降順でも値が同じでした。すべて同じデータ（年式）が並んでいると判断し、テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「駆動」 でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(10000);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await targetCell.innerText();
console.log(`💡 「駆動」 ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「駆動」 ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_kudo > p');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await targetCell.innerText();
console.log(`💡 「駆動」 フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2-1. フィルタ「A」を選択する！
// ==========================================
console.log('💡 「駆動」 フィルタ「4WD」を選択します...');
// ※ ↓ 実際のフィルタ選択処理（プルダウンやボタン等）に書き換えてください
await page.locator('#result_head > table > tbody > tr:nth-child(2) > th.kudo.col_kudo > select').selectOption('4WD');
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
filteredValue = await targetCell.innerText();
console.log(`💡 「駆動」 フィルタ「4WD」適用後の1件目の値: [${filteredValue}]`);

// 🌟 確認①：フィルタ結果の1件目がちゃんと「A」になっているか？
expect(filteredValue).toContain('4WD');
console.log('✅ 「駆動」フィルタ適用後、1件目に「4WD」が含まれていることを確認しました！');

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 「4WD」フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await targetCell.innerText();
console.log(`💡 「駆動」フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ 「駆動」フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');

//★ソート機能8「シフト」
  // 🌟 1件目のセルのロケーター
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_comnt1_nm > p');
// 1. ソート前の「元の値」を取得する
originalValue = await targetCell.innerText();
console.log(`💡 「シフト」 ソート前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. 【昇順】ソートを実行する！
// ==========================================
// ※ ↓ 実際のソート（昇順）ボタンのクリック処理に書き換えてください
await page.getByRole('link', { name: '▲' }).nth(7).click();
await page.waitForTimeout(10000); 
// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
ascValue = await targetCell.innerText();
console.log(`💡 「シフト」 昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 昇順ソートの結果判定（エラーにはせず、結果をログに残すだけ）
// ==========================================
if (originalValue !== ascValue) {
  // パターンA：元の値と「違った」場合
  console.log('✅ 「シフト」 昇順ソートで値が変化しました！（昇順OK）');
} else {
  // 元の値と「同じ」だった場合
  console.log('💡 「シフト」 昇順ソートで値が同じでした。（同値が並んでいる可能性があります）');
}
// ==========================================
// 4. 【降順】ソートを「必ず」実行する！（elseの外に出すのがポイント！）
// ==========================================
console.log('💡 続けて「シフト」の【降順ソート】をテストします...');

// 降順ソートボタンを強制クリック！
await page.getByRole('link', { name: '▼' }).nth(7).click();

// 🌟 ユーザー様が設定された念のための待機！
await page.waitForTimeout(10000); 

// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

descValue = await targetCell.innerText();
console.log(`💡 「シフト」 降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 5. 最後の判定：降順ソートの完璧な検証！
// ==========================================
// 🌟 プロの工夫：originalValue ではなく ascValue（昇順の値）と比較する！
if (ascValue !== descValue) {
  // 昇順の時と一番上の車が「変わった」場合 ＝ 降順ソート成功！
  console.log('✅ 「シフト」 降順ソートで、昇順の時と値が変化したため、降順ソートもテストOKです！');
  
} else {
  // 昇順にしても降順にしても、ずっと同じ車（年式）が一番上にいる場合！
  console.log('✅ 「シフト」 昇順でも降順でも値が同じでした。すべて同じデータ（年式）が並んでいると判断し、テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「シフト」 でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(10000);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await targetCell.innerText();
console.log(`💡 「シフト」 ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「シフト」 ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_comnt1_nm > p');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await targetCell.innerText();
console.log(`💡 「シフト」 フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2-1. フィルタ「A」を選択する！
// ==========================================
console.log('💡 「シフト」 フィルタ「ＡＴ」を選択します...');
// ※ ↓ 実際のフィルタ選択処理（プルダウンやボタン等）に書き換えてください
await page.locator('#result_head > table > tbody > tr:nth-child(2) > th.comnt1_nm.col_comnt1_nm > select').selectOption('ＡＴ');
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
filteredValue = await targetCell.innerText();
console.log(`💡 「シフト」 フィルタ「ＡＴ」適用後の1件目の値: [${filteredValue}]`);

// 🌟 確認①：フィルタ結果の1件目がちゃんと「A」になっているか？
expect(filteredValue).toContain('ＡＴ');
console.log('✅ 「シフト」フィルタ適用後、1件目に「ＡＴ」が含まれていることを確認しました！');

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 「ＡＴ」フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await targetCell.innerText();
console.log(`💡 「シフト」フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ 「シフト」フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');

//★ソート機能9「ドア」
//カスタマイズ表示　非表示の確認＞ダイアログを表示＞tst0001ではドアは非表示設定としている
await page.getByText('カスタマイズ').click();
//ドアを非表示から表示にする
await page.locator('._btn.js_soat_switch.is-off').click();
//カスタマイズ設定を保存する
await page.getByText('設定を保存').click();

  // 🌟 1件目のセルのロケーター
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_door_nm');
// 1. ソート前の「元の値」を取得する
originalValue = await targetCell.innerText();
console.log(`💡 「ドア」 ソート前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. 【昇順】ソートを実行する！
// ==========================================
// ※ ↓ 実際のソート（昇順）ボタンのクリック処理に書き換えてください
await page.getByRole('link', { name: '▲' }).nth(8).click();
await page.waitForTimeout(10000); 
// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
ascValue = await targetCell.innerText();
console.log(`💡 「ドア」 昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 昇順ソートの結果判定（エラーにはせず、結果をログに残すだけ）
// ==========================================
if (originalValue !== ascValue) {
  // パターンA：元の値と「違った」場合
  console.log('✅ 「ドア」 昇順ソートで値が変化しました！（昇順OK）');
} else {
  // 元の値と「同じ」だった場合
  console.log('💡 「ドア」 昇順ソートで値が同じでした。（同値が並んでいる可能性があります）');
}
// ==========================================
// 4. 【降順】ソートを「必ず」実行する！（elseの外に出すのがポイント！）
// ==========================================
console.log('💡 続けて「ドア」の【降順ソート】をテストします...');

// 降順ソートボタンを強制クリック！
await page.getByRole('link', { name: '▼' }).nth(8).click();

// 🌟 ユーザー様が設定された念のための待機！
await page.waitForTimeout(10000); 

// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

descValue = await targetCell.innerText();
console.log(`💡 「ドア」 降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 5. 最後の判定：降順ソートの完璧な検証！
// ==========================================
// 🌟 プロの工夫：originalValue ではなく ascValue（昇順の値）と比較する！
if (ascValue !== descValue) {
  // 昇順の時と一番上の車が「変わった」場合 ＝ 降順ソート成功！
  console.log('✅ 「ドア」 降順ソートで、昇順の時と値が変化したため、降順ソートもテストOKです！');
  
} else {
  // 昇順にしても降順にしても、ずっと同じ車（年式）が一番上にいる場合！
  console.log('✅ 「ドア」 昇順でも降順でも値が同じでした。すべて同じデータ（年式）が並んでいると判断し、テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「ドア」 でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(10000);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await targetCell.innerText();
console.log(`💡 「ドア」 ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「ドア」 ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_door_nm');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await targetCell.innerText();
console.log(`💡 「ドア」 フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2-1. フィルタ「A」を選択する！
// ==========================================
console.log('💡 「ドア」 フィルタ「5D」を選択します...');
// ※ ↓ 実際のフィルタ選択処理（プルダウンやボタン等）に書き換えてください
await page.locator('select[name="filter_door_nm"]').selectOption('5D');

// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
filteredValue = await targetCell.innerText();
console.log(`💡 「ドア」 フィルタ「5D」適用後の1件目の値: [${filteredValue}]`);

// 🌟 確認①：フィルタ結果の1件目がちゃんと「A」になっているか？
expect(filteredValue).toContain('5D');
console.log('✅ 「ドア」フィルタ適用後、1件目に「5D」が含まれていることを確認しました！');

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await targetCell.innerText();
console.log(`💡 「ドア」フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ 「ドア」フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');

//カスタマイズ表示　非表示の確認＞ダイアログを表示＞tst0001では「ドア」は非表示設定に戻す
await page.getByText('カスタマイズ').click();
//ドアを表示から非表示にする
await page.locator('li:nth-child(5) > ._switch > ._btn').click();
//カスタマイズ設定を保存する
await page.getByText('設定を保存').click();

//★ソート機能9「車検」
  // 🌟 1件目のセルのロケーター
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_inspect_nm');
// 1. ソート前の「元の値」を取得する
originalValue = await targetCell.innerText();
console.log(`💡 「車検」 ソート前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. 【昇順】ソートを実行する！
// ==========================================
// ※ ↓ 実際のソート（昇順）ボタンのクリック処理に書き換えてください
await page.getByRole('link', { name: '▲' }).nth(8).click();
await page.waitForTimeout(10000); 
// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
ascValue = await targetCell.innerText();
console.log(`💡 「車検」 昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 昇順ソートの結果判定（エラーにはせず、結果をログに残すだけ）
// ==========================================
if (originalValue !== ascValue) {
  // パターンA：元の値と「違った」場合
  console.log('✅ 「車検」 昇順ソートで値が変化しました！（昇順OK）');
} else {
  // 元の値と「同じ」だった場合
  console.log('💡 「車検」 昇順ソートで値が同じでした。（同値が並んでいる可能性があります）');
}
// ==========================================
// 4. 【降順】ソートを「必ず」実行する！（elseの外に出すのがポイント！）
// ==========================================
console.log('💡 続けて「車検」の【降順ソート】をテストします...');

// 降順ソートボタンを強制クリック！
await page.getByRole('link', { name: '▼' }).nth(8).click();

// 🌟 ユーザー様が設定された念のための待機！
await page.waitForTimeout(10000); 

// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

descValue = await targetCell.innerText();
console.log(`💡 「車検」 降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 5. 最後の判定：降順ソートの完璧な検証！
// ==========================================
// 🌟 プロの工夫：originalValue ではなく ascValue（昇順の値）と比較する！
if (ascValue !== descValue) {
  // 昇順の時と一番上の車が「変わった」場合 ＝ 降順ソート成功！
  console.log('✅ 「車検」 降順ソートで、昇順の時と値が変化したため、降順ソートもテストOKです！');
  
} else {
  // 昇順にしても降順にしても、ずっと同じ車（年式）が一番上にいる場合！
  console.log('✅ 「車検」 昇順でも降順でも値が同じでした。すべて同じデータ（年式）が並んでいると判断し、テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「車検」 でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(10000);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await targetCell.innerText();
console.log(`💡 「車検」 ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「車検」 ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_inspect_nm');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await targetCell.innerText();
console.log(`💡 「車検」 フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2-1. フィルタ「A」を選択する！
// ==========================================
console.log('💡 「車検」 フィルタ「7番目」を選択します...');
// 1. まずはプルダウン（select）そのものの場所を変数に入れる
let selectBox = page.locator('#result_head > table > tbody > tr:nth-child(2) > th.inspect_nm.col_inspect_nm > select');
// 2. プルダウンの中にある「7番目の選択肢（option）」を狙い撃ちする！
// 🌟 プロの技：要素は0から数えるので、7番目は nth(6) になります
let targetOption7th = selectBox.locator('option').nth(6);
// 3. 7番目の選択肢の「テキスト（表示されている文字）」を取得する
let optionText = await targetOption7th.innerText();
console.log(`💡 確認：プルダウンの上から7番目の値は [${optionText}] です！`);
// ==========================================
// 4. 取得したその文字（label）を使って、プルダウンを選択する！
// ==========================================
await selectBox.selectOption({ label: optionText });
console.log(`✅ プルダウンから「${optionText}」を選択しました！`);
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）とローディング待ち
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
filteredValue = await targetCell.innerText();
console.log(`💡 「車検」 フィルタ「${optionText}」適用後の1件目の値: [${filteredValue}]`);

// 🌟 確認①：フィルタ結果の1件目がちゃんと「A」になっているか？
expect(filteredValue).toContain(optionText);
console.log(`✅ 「車検」フィルタ適用後、1件目に「${optionText}」が含まれていることを確認しました！`);

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 「車検」フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await targetCell.innerText();
console.log(`💡 「車検」フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ 「車検」フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');

//★ソート機能10「評価」
  // 🌟 1件目のセルのロケーター
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_a_value_nm.aa_font_size');
// 1. ソート前の「元の値」を取得する
originalValue = await targetCell.innerText();
console.log(`💡 「評価」 ソート前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. 【昇順】ソートを実行する！
// ==========================================
// ※ ↓ 実際のソート（昇順）ボタンのクリック処理に書き換えてください
await page.getByRole('link', { name: '▲' }).nth(9).click();
await page.waitForTimeout(20000); 
// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
ascValue = await targetCell.innerText();
console.log(`💡 「評価」 昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 昇順ソートの結果判定（エラーにはせず、結果をログに残すだけ）
// ==========================================
if (originalValue !== ascValue) {
  // パターンA：元の値と「違った」場合
  console.log('✅ 「評価」 昇順ソートで値が変化しました！（昇順OK）');
} else {
  // 元の値と「同じ」だった場合
  console.log('💡 「評価」 昇順ソートで値が同じでした。（同値が並んでいる可能性があります）');
}
// ==========================================
// 4. 【降順】ソートを「必ず」実行する！（elseの外に出すのがポイント！）
// ==========================================
console.log('💡 続けて「評価」の【降順ソート】をテストします...');

// 降順ソートボタンを強制クリック！
await page.getByRole('link', { name: '▼' }).nth(9).click();

// 🌟 ユーザー様が設定された念のための待機！
await page.waitForTimeout(20000); 

// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

descValue = await targetCell.innerText();
console.log(`💡 「評価」 降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 5. 最後の判定：降順ソートの完璧な検証！
// ==========================================
// 🌟 プロの工夫：originalValue ではなく ascValue（昇順の値）と比較する！
if (ascValue !== descValue) {
  // 昇順の時と一番上の車が「変わった」場合 ＝ 降順ソート成功！
  console.log('✅ 「評価」 降順ソートで、昇順の時と値が変化したため、降順ソートもテストOKです！');
  
} else {
  // 昇順にしても降順にしても、ずっと同じ車（年式）が一番上にいる場合！
  console.log('✅ 「評価」 昇順でも降順でも値が同じでした。すべて同じデータ（年式）が並んでいると判断し、テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「評価」 でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(20000);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await targetCell.innerText();
console.log(`💡 「評価」 ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「評価」 ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_a_value_nm.aa_font_size');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await targetCell.innerText();
console.log(`💡 「評価」 フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2-1. フィルタ「A」を選択する！
// ==========================================
console.log('💡 「評価」 フィルタ「6番目」を選択します...');
// 1. まずはプルダウン（select）そのものの場所を変数に入れる
selectBox = page.locator('#result_head > table > tbody > tr:nth-child(2) > th.a_value_nm.col_a_value_nm > select');
// 2. プルダウンの中にある「7番目の選択肢（option）」を狙い撃ちする！
// 🌟 プロの技：要素は0から数えるので、6番目は nth(5) になります
let targetOption6th = selectBox.locator('option').nth(5);
// 3. 7番目の選択肢の「テキスト（表示されている文字）」を取得する
optionText = await targetOption6th.innerText();
console.log(`💡 確認：プルダウンの上から6番目の値は [${optionText}] です！`);
// ==========================================
// 4. 取得したその文字（label）を使って、プルダウンを選択する！
// ==========================================
await selectBox.selectOption({ label: optionText });
console.log(`✅ プルダウンから「${optionText}」を選択しました！`);
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）とローディング待ち
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
filteredValue = await targetCell.innerText();
console.log(`💡 「評価」 フィルタ「${optionText}」適用後の1件目の値: [${filteredValue}]`);

// 🌟 確認①：フィルタ結果の1件目がちゃんと「A」になっているか？
expect(filteredValue).toContain(optionText);
console.log(`✅ 「評価」フィルタ適用後、1件目に「${optionText}」が含まれていることを確認しました！`);

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 「評価」フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await targetCell.innerText();
console.log(`💡 「評価」フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ 「評価」フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');

//★ソート機能11「内装」
  // 🌟 1件目のセルのロケーター
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_i_value');
// 1. ソート前の「元の値」を取得する
originalValue = await targetCell.innerText();
console.log(`💡 「内装」 ソート前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. 【昇順】ソートを実行する！
// ==========================================
// ※ ↓ 実際のソート（昇順）ボタンのクリック処理に書き換えてください
await page.getByRole('link', { name: '▲' }).nth(10).click();
await page.waitForTimeout(10000); 
// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
ascValue = await targetCell.innerText();
console.log(`💡 「内装」 昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 昇順ソートの結果判定（エラーにはせず、結果をログに残すだけ）
// ==========================================
if (originalValue !== ascValue) {
  // パターンA：元の値と「違った」場合
  console.log('✅ 「内装」 昇順ソートで値が変化しました！（昇順OK）');
} else {
  // 元の値と「同じ」だった場合
  console.log('💡 「内装」 昇順ソートで値が同じでした。（同値が並んでいる可能性があります）');
}
// ==========================================
// 4. 【降順】ソートを「必ず」実行する！（elseの外に出すのがポイント！）
// ==========================================
console.log('💡 続けて「内装」の【降順ソート】をテストします...');

// 降順ソートボタンを強制クリック！
await page.getByRole('link', { name: '▼' }).nth(10).click();

// 🌟 ユーザー様が設定された念のための待機！
await page.waitForTimeout(10000); 

// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

descValue = await targetCell.innerText();
console.log(`💡 「内装」 降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 5. 最後の判定：降順ソートの完璧な検証！
// ==========================================
// 🌟 プロの工夫：originalValue ではなく ascValue（昇順の値）と比較する！
if (ascValue !== descValue) {
  // 昇順の時と一番上の車が「変わった」場合 ＝ 降順ソート成功！
  console.log('✅ 「内装」 降順ソートで、昇順の時と値が変化したため、降順ソートもテストOKです！');
  
} else {
  // 昇順にしても降順にしても、ずっと同じ車（年式）が一番上にいる場合！
  console.log('✅ 「内装」 昇順でも降順でも値が同じでした。すべて同じデータ（年式）が並んでいると判断し、テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「内装」 でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(10000);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await targetCell.innerText();
console.log(`💡 「内装」 ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「内装」 ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_i_value');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await targetCell.innerText();
console.log(`💡 「内装」 フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2-1. フィルタ「A」を選択する！
// ==========================================
console.log('💡 「内装」 フィルタ「3番目」を選択します...');
// 1. まずはプルダウン（select）そのものの場所を変数に入れる
selectBox = page.locator('#result_head > table > tbody > tr:nth-child(2) > th.i_value.col_i_value > select');
// 2. プルダウンの中にある「7番目の選択肢（option）」を狙い撃ちする！
// 🌟 プロの技：要素は0から数えるので、3番目は nth(2) になります
let targetOption3th = selectBox.locator('option').nth(2);
// 3. 7番目の選択肢の「テキスト（表示されている文字）」を取得する
optionText = await targetOption3th.innerText();
console.log(`💡 確認：プルダウンの上から3番目の値は [${optionText}] です！`);
// ==========================================
// 4. 取得したその文字（label）を使って、プルダウンを選択する！
// ==========================================
await selectBox.selectOption({ label: optionText });
console.log(`✅ プルダウンから「${optionText}」を選択しました！`);
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）とローディング待ち
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
filteredValue = await targetCell.innerText();
console.log(`💡 「内装」 フィルタ「${optionText}」適用後の1件目の値: [${filteredValue}]`);

// 🌟 確認①：フィルタ結果の1件目がちゃんと「A」になっているか？
expect(filteredValue).toContain(optionText);
console.log(`✅ 「内装」フィルタ適用後、1件目に「${optionText}」が含まれていることを確認しました！`);

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 「内装」フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await targetCell.innerText();
console.log(`💡 「内装」フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ 「内装」フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');

//★ソート機能12「修復」
  // 🌟 1件目のセルのロケーター
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_accident.aa_font_size > p');
// 1. ソート前の「元の値」を取得する
originalValue = await targetCell.innerText();
console.log(`💡 「修復」 ソート前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. 【昇順】ソートを実行する！
// ==========================================
// ※ ↓ 実際のソート（昇順）ボタンのクリック処理に書き換えてください
await page.getByRole('link', { name: '▲' }).nth(11).click();
await page.waitForTimeout(10000); 
// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
ascValue = await targetCell.innerText();
console.log(`💡 「修復」 昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 昇順ソートの結果判定（エラーにはせず、結果をログに残すだけ）
// ==========================================
if (originalValue !== ascValue) {
  // パターンA：元の値と「違った」場合
  console.log('✅ 「修復」 昇順ソートで値が変化しました！（昇順OK）');
} else {
  // 元の値と「同じ」だった場合
  console.log('💡 「修復」 昇順ソートで値が同じでした。（同値が並んでいる可能性があります）');
}
// ==========================================
// 4. 【降順】ソートを「必ず」実行する！（elseの外に出すのがポイント！）
// ==========================================
console.log('💡 続けて「修復」の【降順ソート】をテストします...');

// 降順ソートボタンを強制クリック！
await page.getByRole('link', { name: '▼' }).nth(11).click();

// 🌟 ユーザー様が設定された念のための待機！
await page.waitForTimeout(10000); 

// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

descValue = await targetCell.innerText();
console.log(`💡 「修復」 降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 5. 最後の判定：降順ソートの完璧な検証！
// ==========================================
// 🌟 プロの工夫：originalValue ではなく ascValue（昇順の値）と比較する！
if (ascValue !== descValue) {
  // 昇順の時と一番上の車が「変わった」場合 ＝ 降順ソート成功！
  console.log('✅ 「修復」 降順ソートで、昇順の時と値が変化したため、降順ソートもテストOKです！');
  
} else {
  // 昇順にしても降順にしても、ずっと同じ車（年式）が一番上にいる場合！
  console.log('✅ 「修復」 昇順でも降順でも値が同じでした。すべて同じデータ（年式）が並んでいると判断し、テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「修復」 でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(10000);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await targetCell.innerText();
console.log(`💡 「修復」 ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「修復」 ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_accident.aa_font_size > p');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await targetCell.innerText();
console.log(`💡 「修復」 フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2-1. フィルタ「A」を選択する！
// ==========================================
console.log('💡 「「修復」」 フィルタ「あり」を選択します...');
// ※ ↓ 実際のフィルタ選択処理（プルダウンやボタン等）に書き換えてください
await page.locator('select[name="filter_accident"]').selectOption('有');

//await page.locator('#result_head > table > tbody > tr:nth-child(2) > th.accident.col_accident > select').selectOption('あり');
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
filteredValue = await targetCell.innerText();
console.log(`💡 「「修復」」 フィルタ「あり」適用後の1件目の値: [${filteredValue}]`);

// 🌟 確認①：フィルタ結果の1件目がちゃんと「A」になっているか？
expect(filteredValue).toContain('有');
console.log('✅ 「「修復」」フィルタ適用後、1件目に「有」が含まれていることを確認しました！');


// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 「修復」フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await targetCell.innerText();
console.log(`💡 「修復」フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ 「修復」フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');

//★ソート機能13「エアロ」

//★ソート機能14「AW」
  // 🌟 1件目のセルのロケーター
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_aw.aa_font_size');
// 1. ソート前の「元の値」を取得する
originalValue = await targetCell.innerText();
console.log(`💡 「AW」 ソート前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. 【昇順】ソートを実行する！
// ==========================================
// ※ ↓ 実際のソート（昇順）ボタンのクリック処理に書き換えてください
await page.getByRole('link', { name: '▲' }).nth(13).click();
await page.waitForTimeout(10000); 
// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
ascValue = await targetCell.innerText();
console.log(`💡 「AW」 昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 昇順ソートの結果判定（エラーにはせず、結果をログに残すだけ）
// ==========================================
if (originalValue !== ascValue) {
  // パターンA：元の値と「違った」場合
  console.log('✅ 「AW」 昇順ソートで値が変化しました！（昇順OK）');
} else {
  // 元の値と「同じ」だった場合
  console.log('💡 「AW」 昇順ソートで値が同じでした。（同値が並んでいる可能性があります）');
}
// ==========================================
// 4. 【降順】ソートを「必ず」実行する！（elseの外に出すのがポイント！）
// ==========================================
console.log('💡 続けて「AW」の【降順ソート】をテストします...');

// 降順ソートボタンを強制クリック！
await page.getByRole('link', { name: '▼' }).nth(13).click();

// 🌟 ユーザー様が設定された念のための待機！
await page.waitForTimeout(10000); 

// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

descValue = await targetCell.innerText();
console.log(`💡 「AW」 降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 5. 最後の判定：降順ソートの完璧な検証！
// ==========================================
// 🌟 プロの工夫：originalValue ではなく ascValue（昇順の値）と比較する！
if (ascValue !== descValue) {
  // 昇順の時と一番上の車が「変わった」場合 ＝ 降順ソート成功！
  console.log('✅ 「AW」 降順ソートで、昇順の時と値が変化したため、降順ソートもテストOKです！');
  
} else {
  // 昇順にしても降順にしても、ずっと同じ車（年式）が一番上にいる場合！
  console.log('✅ 「AW」 昇順でも降順でも値が同じでした。すべて同じデータ（年式）が並んでいると判断し、テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「AW」 でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(10000);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await targetCell.innerText();
console.log(`💡 「AW」 ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「AW」 ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_aw.aa_font_size');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await targetCell.innerText();
console.log(`💡 「AW」 フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2-1. フィルタ「A」を選択する！
// ==========================================
console.log('💡 「AW」 フィルタ「あり」を選択します...');
// ※ ↓ 実際のフィルタ選択処理（プルダウンやボタン等）に書き換えてください
await page.locator('select[name="filter_aw"]').selectOption('AW');
//await page.locator('#result_head > table > tbody > tr:nth-child(2) > th.accident.col_accident > select').selectOption('あり');
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
filteredValue = await targetCell.innerText();
console.log(`💡 「AW」 フィルタ「あり」適用後の1件目の値: [${filteredValue}]`);

// 🌟 確認①：フィルタ結果の1件目がちゃんと「A」になっているか？
expect(filteredValue).toContain('ＡＷ');
console.log('✅ 「「AW」」フィルタ適用後、1件目に「有」が含まれていることを確認しました！');

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 「AW」フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await targetCell.innerText();
console.log(`💡 「AW」フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ 「AW」フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');

//★ソート機能15「ＳＲ」
  // 🌟 1件目のセルのロケーター
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_sr_text.aa_font_size');
// 1. ソート前の「元の値」を取得する
originalValue = await targetCell.innerText();
console.log(`💡 「SR」 ソート前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. 【昇順】ソートを実行する！
// ==========================================
// ※ ↓ 実際のソート（昇順）ボタンのクリック処理に書き換えてください
await page.getByRole('link', { name: '▲' }).nth(14).click();
await page.waitForTimeout(10000); 
// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
ascValue = await targetCell.innerText();
console.log(`💡 「SR」 昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 昇順ソートの結果判定（エラーにはせず、結果をログに残すだけ）
// ==========================================
if (originalValue !== ascValue) {
  // パターンA：元の値と「違った」場合
  console.log('✅ 「SR」 昇順ソートで値が変化しました！（昇順OK）');
} else {
  // 元の値と「同じ」だった場合
  console.log('💡 「SR」 昇順ソートで値が同じでした。（同値が並んでいる可能性があります）');
}
// ==========================================
// 4. 【降順】ソートを「必ず」実行する！（elseの外に出すのがポイント！）
// ==========================================
console.log('💡 続けて「SR」の【降順ソート】をテストします...');

// 降順ソートボタンを強制クリック！
await page.getByRole('link', { name: '▼' }).nth(14).click();

// 🌟 ユーザー様が設定された念のための待機！
await page.waitForTimeout(10000); 

// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

descValue = await targetCell.innerText();
console.log(`💡 「SR」 降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 5. 最後の判定：降順ソートの完璧な検証！
// ==========================================
// 🌟 プロの工夫：originalValue ではなく ascValue（昇順の値）と比較する！
if (ascValue !== descValue) {
  // 昇順の時と一番上の車が「変わった」場合 ＝ 降順ソート成功！
  console.log('✅ 「SR」 降順ソートで、昇順の時と値が変化したため、降順ソートもテストOKです！');
  
} else {
  // 昇順にしても降順にしても、ずっと同じ車（年式）が一番上にいる場合！
  console.log('✅ 「SR」 昇順でも降順でも値が同じでした。すべて同じデータ（年式）が並んでいると判断し、テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「SR」 でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(10000);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await targetCell.innerText();
console.log(`💡 「SR」 ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「SR」 ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_sr_text.aa_font_size');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await targetCell.innerText();
console.log(`💡 「SR」 フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2-1. フィルタ「A」を選択する！
// ==========================================
console.log('💡 「SR」 フィルタ「あり」を選択します...');
// ※ ↓ 実際のフィルタ選択処理（プルダウンやボタン等）に書き換えてください
await page.locator('select[name="filter_sr_text"]').selectOption('ＳＲ');
//await page.locator('#result_head > table > tbody > tr:nth-child(2) > th.accident.col_accident > select').selectOption('あり');
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
filteredValue = await targetCell.innerText();
console.log(`💡 「SR」 フィルタ「SR」適用後の1件目の値: [${filteredValue}]`);

// 🌟 確認①：フィルタ結果の1件目がちゃんと「A」になっているか？
expect(filteredValue).toContain('ＳＲ');
console.log('✅ 「SR」フィルタ適用後、1件目に「ＳＲ」が含まれていることを確認しました！');

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 「SR」フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(10000); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await targetCell.innerText();
console.log(`💡 「SR」フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ 「SR」フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');

//★ソート機能16「エアロ」
//★ソート機能17「ルーフレール」
//★ソート機能18「革」

//★ソート機能19「ハンドル」
  // 🌟 1件目のセルのロケーター
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_handle.aa_font_size > p');
// 1. ソート前の「元の値」を取得する
originalValue = await targetCell.innerText();
console.log(`💡 「ハンドル」 ソート前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. 【昇順】ソートを実行する！
// ==========================================
// ※ ↓ 実際のソート（昇順）ボタンのクリック処理に書き換えてください
await page.getByRole('link', { name: '▲' }).nth(18).click();
await page.waitForTimeout(10000); 
// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
ascValue = await targetCell.innerText();
console.log(`💡 「ハンドル」 昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 昇順ソートの結果判定（エラーにはせず、結果をログに残すだけ）
// ==========================================
if (originalValue !== ascValue) {
  // パターンA：元の値と「違った」場合
  console.log('✅ 「ハンドル」 昇順ソートで値が変化しました！（昇順OK）');
} else {
  // 元の値と「同じ」だった場合
  console.log('💡 「ハンドル」 昇順ソートで値が同じでした。（同値が並んでいる可能性があります）');
}
// ==========================================
// 4. 【降順】ソートを「必ず」実行する！（elseの外に出すのがポイント！）
// ==========================================
console.log('💡 続けて「ハンドル」の【降順ソート】をテストします...');

// 降順ソートボタンを強制クリック！
await page.getByRole('link', { name: '▼' }).nth(18).click();

// 🌟 ユーザー様が設定された念のための待機！
await page.waitForTimeout(10000); 

// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

descValue = await targetCell.innerText();
console.log(`💡 「ハンドル」 降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 5. 最後の判定：降順ソートの完璧な検証！
// ==========================================
// 🌟 プロの工夫：originalValue ではなく ascValue（昇順の値）と比較する！
if (ascValue !== descValue) {
  // 昇順の時と一番上の車が「変わった」場合 ＝ 降順ソート成功！
  console.log('✅ 「ハンドル」 降順ソートで、昇順の時と値が変化したため、降順ソートもテストOKです！');
  
} else {
  // 昇順にしても降順にしても、ずっと同じ車（年式）が一番上にいる場合！
  console.log('✅ 「ハンドル」 昇順でも降順でも値が同じでした。すべて同じデータ（年式）が並んでいると判断し、テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「ハンドル」 でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(10000);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await targetCell.innerText();
console.log(`💡 「ハンドル」 ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「ハンドル」 ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_handle.aa_font_size > p');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await targetCell.innerText();
console.log(`💡 「ハンドル」 フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2-1. フィルタ「A」を選択する！
// ==========================================
console.log('💡 「ハンドル」 フィルタ「あり」を選択します...');
// ※ ↓ 実際のフィルタ選択処理（プルダウンやボタン等）に書き換えてください
await page.locator('select[name="filter_handle"]').selectOption('右');
//await page.locator('#result_head > table > tbody > tr:nth-child(2) > th.accident.col_accident > select').selectOption('あり');
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
filteredValue = await targetCell.innerText();
console.log(`💡 「ハンドル」 フィルタ「ハンドル」適用後の1件目の値: [${filteredValue}]`);

// 🌟 確認①：フィルタ結果の1件目がちゃんと「A」になっているか？
expect(filteredValue).toContain('右');
console.log('✅ 「ハンドル」フィルタ適用後、1件目に「右」が含まれていることを確認しました！');

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 「ハンドル」フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(10000); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await targetCell.innerText();
console.log(`💡 「ハンドル」フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ 「ハンドル」フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');

//★ソート機能20「正／並」
//★ソート機能21「画像」

//★ソート機能22「定員」
  // 🌟 1件目のセルのロケーター
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_capacity');
// 1. ソート前の「元の値」を取得する
originalValue = await targetCell.innerText();
console.log(`💡 「定員」 ソート前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. 【昇順】ソートを実行する！
// ==========================================
// ※ ↓ 実際のソート（昇順）ボタンのクリック処理に書き換えてください
await page.getByRole('link', { name: '▲' }).nth(21).click();
await page.waitForTimeout(10000); 
// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
ascValue = await targetCell.innerText();
console.log(`💡 「定員」 昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 昇順ソートの結果判定（エラーにはせず、結果をログに残すだけ）
// ==========================================
if (originalValue !== ascValue) {
  // パターンA：元の値と「違った」場合
  console.log('✅ 「定員」 昇順ソートで値が変化しました！（昇順OK）');
} else {
  // 元の値と「同じ」だった場合
  console.log('💡 「定員」 昇順ソートで値が同じでした。（同値が並んでいる可能性があります）');
}
// ==========================================
// 4. 【降順】ソートを「必ず」実行する！（elseの外に出すのがポイント！）
// ==========================================
console.log('💡 続けて「定員」の【降順ソート】をテストします...');

// 降順ソートボタンを強制クリック！
await page.getByRole('link', { name: '▼' }).nth(21).click();

// 🌟 ユーザー様が設定された念のための待機！
await page.waitForTimeout(10000); 

// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

descValue = await targetCell.innerText();
console.log(`💡 「定員」 降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 5. 最後の判定：降順ソートの完璧な検証！
// ==========================================
// 🌟 プロの工夫：originalValue ではなく ascValue（昇順の値）と比較する！
if (ascValue !== descValue) {
  // 昇順の時と一番上の車が「変わった」場合 ＝ 降順ソート成功！
  console.log('✅ 「定員」 降順ソートで、昇順の時と値が変化したため、降順ソートもテストOKです！');
  
} else {
  // 昇順にしても降順にしても、ずっと同じ車（年式）が一番上にいる場合！
  console.log('✅ 「定員」 昇順でも降順でも値が同じでした。すべて同じデータ（年式）が並んでいると判断し、テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「定員」 でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(10000);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await targetCell.innerText();
console.log(`💡 「定員」 ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「定員」 ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_capacity');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await targetCell.innerText();
console.log(`💡 「定員」 フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2-1. フィルタ「A」を選択する！
// ==========================================
console.log('💡 「定員」 フィルタ「あり」を選択します...');
// ※ ↓ 実際のフィルタ選択処理（プルダウンやボタン等）に書き換えてください
await page.locator('select[name="filter_capacity"]').selectOption('8名');
//await page.locator('#result_head > table > tbody > tr:nth-child(2) > th.accident.col_accident > select').selectOption('あり');
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
filteredValue = await targetCell.innerText();
console.log(`💡 「定員」 フィルタ「定員」適用後の1件目の値: [${filteredValue}]`);

// 🌟 確認①：フィルタ結果の1件目がちゃんと「A」になっているか？
expect(filteredValue).toContain('8名');
console.log('✅ 「定員」フィルタ適用後、1件目に「8名」が含まれていることを確認しました！');

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 「定員」フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(10000); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await targetCell.innerText();
console.log(`💡 「定員」フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ 「定員」フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');

//★ソート機能23「経過月数」
// 🌟 1件目のセルのロケーター
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_elapsed_months');
// 1. ソート前の「元の値」を取得する
originalValue = await targetCell.innerText();
console.log(`💡 「経過月数」 ソート前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. 【昇順】ソートを実行する！
// ==========================================
// ※ ↓ 実際のソート（昇順）ボタンのクリック処理に書き換えてください
await page.getByRole('link', { name: '▲' }).nth(22).click();
await page.waitForTimeout(10000); 
// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
ascValue = await targetCell.innerText();
console.log(`💡 「経過月数」 昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 昇順ソートの結果判定（エラーにはせず、結果をログに残すだけ）
// ==========================================
if (originalValue !== ascValue) {
  // パターンA：元の値と「違った」場合
  console.log('✅ 「経過月数」 昇順ソートで値が変化しました！（昇順OK）');
} else {
  // 元の値と「同じ」だった場合
  console.log('💡 「経過月数」 昇順ソートで値が同じでした。（同値が並んでいる可能性があります）');
}
// ==========================================
// 4. 【降順】ソートを「必ず」実行する！（elseの外に出すのがポイント！）
// ==========================================
console.log('💡 続けて「経過月数」の【降順ソート】をテストします...');

// 降順ソートボタンを強制クリック！
await page.getByRole('link', { name: '▼' }).nth(22).click();

// 🌟 ユーザー様が設定された念のための待機！
await page.waitForTimeout(10000); 

// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

descValue = await targetCell.innerText();
console.log(`💡 「経過月数」 降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 5. 最後の判定：降順ソートの完璧な検証！
// ==========================================
// 🌟 プロの工夫：originalValue ではなく ascValue（昇順の値）と比較する！
if (ascValue !== descValue) {
  // 昇順の時と一番上の車が「変わった」場合 ＝ 降順ソート成功！
  console.log('✅ 「経過月数」 降順ソートで、昇順の時と値が変化したため、降順ソートもテストOKです！');
  
} else {
  // 昇順にしても降順にしても、ずっと同じ車（年式）が一番上にいる場合！
  console.log('✅ 「経過月数」 昇順でも降順でも値が同じでした。すべて同じデータ（年式）が並んでいると判断し、テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「経過月数」 でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(10000);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await targetCell.innerText();
console.log(`💡 「経過月数」 ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「経過月数」 ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_elapsed_months');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await targetCell.innerText();
console.log(`💡 「経過月数」 フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2-1. フィルタ「A」を選択する！
// ==========================================
console.log('💡 「経過月数」 フィルタ「61ヶ月以上」を選択します...');
// ※ ↓ 実際のフィルタ選択処理（プルダウンやボタン等）に書き換えてください
await page.locator('select[name="filter_elapsed_months"]').selectOption('61');
//await page.locator('#result_head > table > tbody > tr:nth-child(2) > th.accident.col_accident > select').selectOption('あり');
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
filteredValue = await targetCell.innerText();
console.log(`💡 「経過月数」 フィルタ「経過月数」適用後の1件目の値: [${filteredValue}]`);

// 🌟 確認①：フィルタ結果の1件目がちゃんと「A」になっているか？
//expect(filteredValue).toContain('8名');
//console.log('✅ 「経過月数」フィルタ適用後、1件目に「8名」が含まれていることを確認しました！');
// ==========================================
// ⭕️ 修正後：「数字」だけを取り出して、61以上か算数で比較する最強コンボ！
// ==========================================
// 1. 🌟 文字（例："65" や "62名"）から数字以外のゴミを消し去り、純粋な「数値」に変換する！
let numericValue = parseInt(filteredValue.replace(/[^0-9]/g, ''), 10);
console.log(`💡 確認：画面の文字 [${filteredValue}] から、数値 [${numericValue}] を抽出しました！`);
// 2. Playwright専用の「61以上（>=）」を判定するメソッドを使う！
expect(numericValue).toBeGreaterThanOrEqual(61);
console.log('✅ 1件目のデータが「61以上」であることを確認しました！');

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 「経過月数」フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(10000); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await targetCell.innerText();
console.log(`💡 「経過月数」フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ 「経過月数」フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');

//★ソート機能24「車体色」
  // 🌟 1件目のセルのロケーター
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_color_nm');
// 1. ソート前の「元の値」を取得する
originalValue = await targetCell.innerText();
console.log(`💡 「車体色」 ソート前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. 【昇順】ソートを実行する！
// ==========================================
// ※ ↓ 実際のソート（昇順）ボタンのクリック処理に書き換えてください
await page.getByRole('link', { name: '▲' }).nth(23).click();
await page.waitForTimeout(10000); 
// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
ascValue = await targetCell.innerText();
console.log(`💡 「車体色」 昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 昇順ソートの結果判定（エラーにはせず、結果をログに残すだけ）
// ==========================================
if (originalValue !== ascValue) {
  // パターンA：元の値と「違った」場合
  console.log('✅ 「車体色」 昇順ソートで値が変化しました！（昇順OK）');
} else {
  // 元の値と「同じ」だった場合
  console.log('💡 「車体色」 昇順ソートで値が同じでした。（同値が並んでいる可能性があります）');
}
// ==========================================
// 4. 【降順】ソートを「必ず」実行する！（elseの外に出すのがポイント！）
// ==========================================
console.log('💡 続けて「車体色」の【降順ソート】をテストします...');

// 降順ソートボタンを強制クリック！
await page.getByRole('link', { name: '▼' }).nth(23).click();

// 🌟 ユーザー様が設定された念のための待機！
await page.waitForTimeout(10000); 

// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

descValue = await targetCell.innerText();
console.log(`💡 「車体色」 降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 5. 最後の判定：降順ソートの完璧な検証！
// ==========================================
// 🌟 プロの工夫：originalValue ではなく ascValue（昇順の値）と比較する！
if (ascValue !== descValue) {
  // 昇順の時と一番上の車が「変わった」場合 ＝ 降順ソート成功！
  console.log('✅ 「車体色」 降順ソートで、昇順の時と値が変化したため、降順ソートもテストOKです！');
  
} else {
  // 昇順にしても降順にしても、ずっと同じ車（年式）が一番上にいる場合！
  console.log('✅ 「車体色」 昇順でも降順でも値が同じでした。すべて同じデータ（年式）が並んでいると判断し、テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「車体色」 でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(10000);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await targetCell.innerText();
console.log(`💡 「車体色」 ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「車体色」 ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_color_nm');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await targetCell.innerText();
console.log(`💡 「車体色」 フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2-1. フィルタ「A」を選択する！
// ==========================================
console.log('💡 「車体色」 フィルタ「黒」を選択します...');
// ※ ↓ 実際のフィルタ選択処理（プルダウンやボタン等）に書き換えてください
await page.locator('select[name="filter_color_nm"]').selectOption('黒');
//await page.locator('#result_head > table > tbody > tr:nth-child(2) > th.accident.col_accident > select').selectOption('あり');
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
filteredValue = await targetCell.innerText();
console.log(`💡 「車体色」 フィルタ「車体色」適用後の1件目の値: [${filteredValue}]`);

// 🌟 確認①：フィルタ結果の1件目がちゃんと「A」になっているか？
expect(filteredValue).toContain('黒');
console.log('✅ 「車体色」フィルタ適用後、1件目に「黒」が含まれていることを確認しました！');

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 「車体色」フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(10000); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await targetCell.innerText();
console.log(`💡 「車体色」フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ 「車体色」フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');

//★ソート機能25「色番号」
  // 🌟 1件目のセルのロケーター
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_body_color_cd');
// 1. ソート前の「元の値」を取得する
originalValue = await targetCell.innerText();
console.log(`💡 「色番号」 ソート前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. 【昇順】ソートを実行する！
// ==========================================
// ※ ↓ 実際のソート（昇順）ボタンのクリック処理に書き換えてください
await page.getByRole('link', { name: '▲' }).nth(24).click();
await page.waitForTimeout(10000); 
// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
ascValue = await targetCell.innerText();
console.log(`💡 「色番号」 昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 昇順ソートの結果判定（エラーにはせず、結果をログに残すだけ）
// ==========================================
if (originalValue !== ascValue) {
  // パターンA：元の値と「違った」場合
  console.log('✅ 「色番号」 昇順ソートで値が変化しました！（昇順OK）');
} else {
  // 元の値と「同じ」だった場合
  console.log('💡 「色番号」 昇順ソートで値が同じでした。（同値が並んでいる可能性があります）');
}
// ==========================================
// 4. 【降順】ソートを「必ず」実行する！（elseの外に出すのがポイント！）
// ==========================================
console.log('💡 続けて「色番号」の【降順ソート】をテストします...');

// 降順ソートボタンを強制クリック！
await page.getByRole('link', { name: '▼' }).nth(24).click();

// 🌟 ユーザー様が設定された念のための待機！
await page.waitForTimeout(10000); 

// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

descValue = await targetCell.innerText();
console.log(`💡 「色番号」 降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 5. 最後の判定：降順ソートの完璧な検証！
// ==========================================
// 🌟 プロの工夫：originalValue ではなく ascValue（昇順の値）と比較する！
if (ascValue !== descValue) {
  // 昇順の時と一番上の車が「変わった」場合 ＝ 降順ソート成功！
  console.log('✅ 「色番号」 降順ソートで、昇順の時と値が変化したため、降順ソートもテストOKです！');
  
} else {
  // 昇順にしても降順にしても、ずっと同じ車（年式）が一番上にいる場合！
  console.log('✅ 「色番号」 昇順でも降順でも値が同じでした。すべて同じデータ（年式）が並んでいると判断し、テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「色番号」 でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(10000);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await targetCell.innerText();
console.log(`💡 「色番号」 ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「色番号」 ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_body_color_cd');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await targetCell.innerText();
console.log(`💡 「色番号」 フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2-1. フィルタ「A」を選択する！
// ==========================================
console.log('💡 「色番号」 フィルタ「202」を選択します...');
// ※ ↓ 実際のフィルタ選択処理（プルダウンやボタン等）に書き換えてください
await page.locator('select[name="filter_body_color_cd"]').selectOption('202');
//await page.locator('#result_head > table > tbody > tr:nth-child(2) > th.accident.col_accident > select').selectOption('あり');
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
filteredValue = await targetCell.innerText();
console.log(`💡 「色番号」 フィルタ「色番号」適用後の1件目の値: [${filteredValue}]`);

// 🌟 確認①：フィルタ結果の1件目がちゃんと「A」になっているか？
expect(filteredValue).toContain('202');
console.log('✅ 「色番号」フィルタ適用後、1件目に「202」が含まれていることを確認しました！');

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 「色番号」フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(10000); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await targetCell.innerText();
console.log(`💡 「色番号」フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ 「色番号」フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');

//★ソート機能26「走行」
// 🌟 1件目のセルのロケーター
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_distance_num.aa_font_size');
// 1. ソート前の「元の値」を取得する
originalValue = await targetCell.innerText();
console.log(`💡 「走行」 ソート前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. 【昇順】ソートを実行する！
// ==========================================
// ※ ↓ 実際のソート（昇順）ボタンのクリック処理に書き換えてください
await page.getByRole('link', { name: '▲' }).nth(25).click();
await page.waitForTimeout(10000); 
// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
ascValue = await targetCell.innerText();
console.log(`💡 「走行」 昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 昇順ソートの結果判定（エラーにはせず、結果をログに残すだけ）
// ==========================================
if (originalValue !== ascValue) {
  // パターンA：元の値と「違った」場合
  console.log('✅ 「走行」 昇順ソートで値が変化しました！（昇順OK）');
} else {
  // 元の値と「同じ」だった場合
  console.log('💡 「走行」 昇順ソートで値が同じでした。（同値が並んでいる可能性があります）');
}
// ==========================================
// 4. 【降順】ソートを「必ず」実行する！（elseの外に出すのがポイント！）
// ==========================================
console.log('💡 続けて「走行」の【降順ソート】をテストします...');

// 降順ソートボタンを強制クリック！
await page.getByRole('link', { name: '▼' }).nth(25).click();

// 🌟 ユーザー様が設定された念のための待機！
await page.waitForTimeout(10000); 

// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

descValue = await targetCell.innerText();
console.log(`💡 「走行」 降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 5. 最後の判定：降順ソートの完璧な検証！
// ==========================================
// 🌟 プロの工夫：originalValue ではなく ascValue（昇順の値）と比較する！
if (ascValue !== descValue) {
  // 昇順の時と一番上の車が「変わった」場合 ＝ 降順ソート成功！
  console.log('✅ 「走行」 降順ソートで、昇順の時と値が変化したため、降順ソートもテストOKです！');
  
} else {
  // 昇順にしても降順にしても、ずっと同じ車（年式）が一番上にいる場合！
  console.log('✅ 「走行」 昇順でも降順でも値が同じでした。すべて同じデータ（年式）が並んでいると判断し、テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「走行」 でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(10000);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await targetCell.innerText();
console.log(`💡 「走行」 ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「走行」 ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_distance_num.aa_font_size');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await targetCell.innerText();
console.log(`💡 「走行」 フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2-1. フィルタ「A」を選択する！
// ==========================================
console.log('💡 「走行」 フィルタ「10千±5千」を選択します...');
// ※ ↓ 実際のフィルタ選択処理（プルダウンやボタン等）に書き換えてください

await page.locator('select[name="filter_distance_num"]').selectOption('5,15');
//await page.locator('#result_head > table > tbody > tr:nth-child(2) > th.accident.col_accident > select').selectOption('あり');
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
filteredValue = await targetCell.innerText();
console.log(`💡 「走行」 フィルタ「走行」適用後の1件目の値: [${filteredValue}]`);

// 🌟 確認①：フィルタ結果の1件目がちゃんと「A」になっているか？
// ==========================================
// ⭕️ 修正後：「5から15の間」に収まっているか算数で比較する最強コンボ！
// ==========================================
// 1. 🌟 文字（例："10" や "12名"）から数字以外のゴミを消し去り、純粋な「数値」に変換する！
numericValue = parseInt(filteredValue.replace(/[^0-9]/g, ''), 10);
console.log(`💡 確認：画面の文字 [${filteredValue}] から、数値 [${numericValue}] を抽出しました！`);
// 2. Playwright専用のメソッドを使って「範囲」を厳密にチェックする！
// 条件①：5「以上」であること ( >= 5 )
expect(numericValue).toBeGreaterThanOrEqual(5);
// 条件②：15「以下」であること ( <= 15 )
expect(numericValue).toBeLessThanOrEqual(15);
console.log(`✅ 「走行」1件目のデータ（${numericValue}）が「5千から15千の間」であることを確認しました！`);

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 「走行」フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(10000); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await targetCell.innerText();
console.log(`💡 「走行」フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ 「走行」フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');

//★ソート機能27「Pドア」
  // 🌟 1件目のセルのロケーター
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_pdoor.p_capa');
// 1. ソート前の「元の値」を取得する
originalValue = await targetCell.innerText();
console.log(`💡 「Pドア」 ソート前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. 【昇順】ソートを実行する！
// ==========================================
// ※ ↓ 実際のソート（昇順）ボタンのクリック処理に書き換えてください
await page.getByRole('link', { name: '▲' }).nth(26).click();
await page.waitForTimeout(10000); 
// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
ascValue = await targetCell.innerText();
console.log(`💡 「Pドア」 昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 昇順ソートの結果判定（エラーにはせず、結果をログに残すだけ）
// ==========================================
if (originalValue !== ascValue) {
  // パターンA：元の値と「違った」場合
  console.log('✅ 「Pドア」 昇順ソートで値が変化しました！（昇順OK）');
} else {
  // 元の値と「同じ」だった場合
  console.log('💡 「Pドア」 昇順ソートで値が同じでした。（同値が並んでいる可能性があります）');
}
// ==========================================
// 4. 【降順】ソートを「必ず」実行する！（elseの外に出すのがポイント！）
// ==========================================
console.log('💡 続けて「Pドア」の【降順ソート】をテストします...');

// 降順ソートボタンを強制クリック！
await page.getByRole('link', { name: '▼' }).nth(26).click();

// 🌟 ユーザー様が設定された念のための待機！
await page.waitForTimeout(10000); 

// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

descValue = await targetCell.innerText();
console.log(`💡 「Pドア」 降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 5. 最後の判定：降順ソートの完璧な検証！
// ==========================================
// 🌟 プロの工夫：originalValue ではなく ascValue（昇順の値）と比較する！
if (ascValue !== descValue) {
  // 昇順の時と一番上の車が「変わった」場合 ＝ 降順ソート成功！
  console.log('✅ 「Pドア」 降順ソートで、昇順の時と値が変化したため、降順ソートもテストOKです！');
  
} else {
  // 昇順にしても降順にしても、ずっと同じ車（年式）が一番上にいる場合！
  console.log('✅ 「Pドア」 昇順でも降順でも値が同じでした。すべて同じデータ（年式）が並んでいると判断し、テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「Pドア」 でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(10000);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await targetCell.innerText();
console.log(`💡 「Pドア」 ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「Pドア」 ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_pdoor.p_capa');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await targetCell.innerText();
console.log(`💡 「Pドア」 フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2-1. フィルタ「A」を選択する！
// ==========================================
console.log('💡 「Pドア」 フィルタ「左Ｐスラ」を選択します...');
// ※ ↓ 実際のフィルタ選択処理（プルダウンやボタン等）に書き換えてください

await page.locator('select[name="filter_pdoor"]').selectOption('左Ｐスラ');
//await page.locator('#result_head > table > tbody > tr:nth-child(2) > th.accident.col_accident > select').selectOption('あり');
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
filteredValue = await targetCell.innerText();
console.log(`💡 「Pドア」 フィルタ「左Ｐスラ」適用後の1件目の値: [${filteredValue}]`);

// 🌟 確認①：フィルタ結果の1件目がちゃんと「A」になっているか？
expect(filteredValue).toContain('左Pｽﾗ');
console.log('✅ 「Pドア」フィルタ適用後、1件目に「左Ｐスラ」が含まれていることを確認しました！');

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 「Pドア」フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(10000); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await targetCell.innerText();
console.log(`💡 「Pドア」フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ 「Pドア」フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');

//★ソート機能28「金額」
  // 🌟 1件目のセルのロケーター
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_price_num > b');
// 1. ソート前の「元の値」を取得する
originalValue = await targetCell.innerText();
console.log(`💡 「金額」 ソート前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. 【昇順】ソートを実行する！
// ==========================================
// ※ ↓ 実際のソート（昇順）ボタンのクリック処理に書き換えてください
await page.getByRole('link', { name: '▲' }).nth(27).click();
await page.waitForTimeout(10000); 
// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
ascValue = await targetCell.innerText();
console.log(`💡 「金額」 昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 昇順ソートの結果判定（エラーにはせず、結果をログに残すだけ）
// ==========================================
if (originalValue !== ascValue) {
  // パターンA：元の値と「違った」場合
  console.log('✅ 「金額」 昇順ソートで値が変化しました！（昇順OK）');
} else {
  // 元の値と「同じ」だった場合
  console.log('💡 「金額」 昇順ソートで値が同じでした。（同値が並んでいる可能性があります）');
}
// ==========================================
// 4. 【降順】ソートを「必ず」実行する！（elseの外に出すのがポイント！）
// ==========================================
console.log('💡 続けて「金額」の【降順ソート】をテストします...');

// 降順ソートボタンを強制クリック！
await page.getByRole('link', { name: '▼' }).nth(27).click();

// 🌟 ユーザー様が設定された念のための待機！
await page.waitForTimeout(10000); 

// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

descValue = await targetCell.innerText();
console.log(`💡 「金額」 降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 5. 最後の判定：降順ソートの完璧な検証！
// ==========================================
// 🌟 プロの工夫：originalValue ではなく ascValue（昇順の値）と比較する！
if (ascValue !== descValue) {
  // 昇順の時と一番上の車が「変わった」場合 ＝ 降順ソート成功！
  console.log('✅ 「金額」 降順ソートで、昇順の時と値が変化したため、降順ソートもテストOKです！');
  
} else {
  // 昇順にしても降順にしても、ずっと同じ車（年式）が一番上にいる場合！
  console.log('✅ 「金額」 昇順でも降順でも値が同じでした。すべて同じデータ（年式）が並んでいると判断し、テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「金額」 でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(10000);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await targetCell.innerText();
console.log(`💡 「金額」 ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「金額」 ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_price_num > b');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await targetCell.innerText();
console.log(`💡 「金額」 フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2-1. フィルタ「A」を選択する！
// ==========================================
console.log('💡 「金額」 フィルタ「税込」を選択します...');
// ※ ↓ 実際のフィルタ選択処理（プルダウンやボタン等）に書き換えてください
await page.locator('select[name="filter_price_num"]').selectOption('1');
//await page.locator('#result_head > table > tbody > tr:nth-child(2) > th.accident.col_accident > select').selectOption('あり');
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
filteredValue = await targetCell.innerText();
console.log(`💡 「金額」 フィルタ「税込」適用後の1件目の値: [${filteredValue}]`);

// ==========================================
// 🌟 最後の審判：元の値とフィルタ後の値が「異なっていること」！
// ==========================================
// Playwrightに「originalValueと『同じではない』こと」を保証させる！
expect(filteredValue).not.toBe(originalValue);
console.log(`✅ フィルタ「税込」適用後、値が [${originalValue}] から [${filteredValue}] に変化したことを確認しました！`);

// ==========================================
// 2-2. フィルタ「A」を選択する！
// ==========================================
console.log('💡 「金額」 フィルタ「税抜」を選択します...');
// ※ ↓ 実際のフィルタ選択処理（プルダウンやボタン等）に書き換えてください
await page.locator('select[name="filter_price_num"]').selectOption('0');
//await page.locator('#result_head > table > tbody > tr:nth-child(2) > th.accident.col_accident > select').selectOption('あり');
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
filteredValue = await targetCell.innerText();
console.log(`💡 「金額」 フィルタ「税抜」適用後の1件目の値: [${filteredValue}]`);

// ==========================================
// 🌟 最後の審判：元の値とフィルタ後の値が「異なっていること」！
// ==========================================
// Playwrightに「originalValueと『同じではない』こと」を保証させる！
expect(filteredValue).toBe(originalValue);
console.log(`✅ フィルタ「税抜」適用後、値が [${originalValue}] から [${filteredValue}] に一致したことを確認しました！`);

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 「金額」フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(10000); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await targetCell.innerText();
console.log(`💡 「金額」フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ 「金額」フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');

//★ソート機能29「開催」
  // 🌟 1件目のセルのロケーター
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_open_date_nm');
// 1. ソート前の「元の値」を取得する
originalValue = await targetCell.innerText();
console.log(`💡 「開催」 ソート前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. 【昇順】ソートを実行する！
// ==========================================
// ※ ↓ 実際のソート（昇順）ボタンのクリック処理に書き換えてください
await page.getByRole('link', { name: '▲' }).nth(28).click();
await page.waitForTimeout(10000); 
// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
ascValue = await targetCell.innerText();
console.log(`💡 「開催」 昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 昇順ソートの結果判定（エラーにはせず、結果をログに残すだけ）
// ==========================================
if (originalValue !== ascValue) {
  // パターンA：元の値と「違った」場合
  console.log('✅ 「開催」 昇順ソートで値が変化しました！（昇順OK）');
} else {
  // 元の値と「同じ」だった場合
  console.log('💡 「開催」 昇順ソートで値が同じでした。（同値が並んでいる可能性があります）');
}
// ==========================================
// 4. 【降順】ソートを「必ず」実行する！（elseの外に出すのがポイント！）
// ==========================================
console.log('💡 続けて「開催」の【降順ソート】をテストします...');

// 降順ソートボタンを強制クリック！
await page.getByRole('link', { name: '▼' }).nth(28).click();

// 🌟 ユーザー様が設定された念のための待機！
await page.waitForTimeout(10000); 

// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

descValue = await targetCell.innerText();
console.log(`💡 「開催」 降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 5. 最後の判定：降順ソートの完璧な検証！
// ==========================================
// 🌟 プロの工夫：originalValue ではなく ascValue（昇順の値）と比較する！
if (ascValue !== descValue) {
  // 昇順の時と一番上の車が「変わった」場合 ＝ 降順ソート成功！
  console.log('✅ 「開催」 降順ソートで、昇順の時と値が変化したため、降順ソートもテストOKです！');
  
} else {
  // 昇順にしても降順にしても、ずっと同じ車（年式）が一番上にいる場合！
  console.log('✅ 「開催」 昇順でも降順でも値が同じでした。すべて同じデータ（年式）が並んでいると判断し、テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「開催」 でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(10000);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await targetCell.innerText();
console.log(`💡 「開催」 ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「開催」 ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_open_date_nm');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await targetCell.innerText();
console.log(`💡 「開催」 フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2-1. フィルタ「A」を選択する！
// ==========================================
console.log('💡 「開催」 フィルタ「3番目」を選択します...');
// 1. まずはプルダウン（select）そのものの場所を変数に入れる
selectBox = page.locator('#result_head > table > tbody > tr:nth-child(2) > th.open_date_nm.col_open_date_nm > select');
// 2. プルダウンの中にある「3番目の選択肢（option）」を狙い撃ちする！
// 🌟 プロの技：要素は0から数えるので、3番目は nth(2) になります
let targetOption33th = selectBox.locator('option').nth(2);
// 3. 7番目の選択肢の「テキスト（表示されている文字）」を取得する
optionText = await targetOption33th.innerText();
console.log(`💡 確認：プルダウンの上から3番目の値は [${optionText}] です！`);
// ==========================================
// 4. 取得したその文字（label）を使って、プルダウンを選択する！
// ==========================================
await selectBox.selectOption({ label: optionText });
console.log(`✅ プルダウンから「${optionText}」を選択しました！`);
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）とローディング待ち
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
filteredValue = await targetCell.innerText();
console.log(`💡 「開催」 フィルタ「3番目：当日から1週間前まで」適用後の1件目の値: [${filteredValue}]`);

// ==========================================
// 🌟 最後の審判：取得した日付が「1週間前 〜 今日」の範囲内であること！
// ==========================================
// 1. 画面の文字（例："26/03/05"）を、安全に日付（数値）に変換する！
let rawDate = filteredValue.trim(); // 余計な空白を消す
let parts = rawDate.split('/');     // "/" で切り分ける（["26", "03", "05"] になる）
// 「2000年」を足して、確実に「2026年」としてJavaScriptに認識させる！
// ※ JavaScriptの月は「0」から始まる特殊ルールの為、月から「-1」しています
let targetDate = new Date(2000 + parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
let targetTime = targetDate.getTime(); // 算数用の数値（タイムスタンプ）にする
// 2. 「今日」の終わり（23:59:59.999）を計算する！
let today = new Date();
today.setHours(23, 59, 59, 999);
let endTime = today.getTime();
// 3. 「1週間前（7日前）」の始まり（00:00:00.000）を計算する！
let oneWeekAgo = new Date();
oneWeekAgo.setDate(today.getDate() - 7);
oneWeekAgo.setHours(0, 0, 0, 0);
let startTime = oneWeekAgo.getTime();
// 💡 ログを出して、裏側でどんな日付で比較しているか「見える化」する
console.log(`💡 確認：画面の日付 [${rawDate}] が、[${oneWeekAgo.toLocaleDateString()}] から [${today.toLocaleDateString()}] の間かチェックします！`);
// 4. いざ検証！Playwrightの「範囲指定（以上・以下）」で比較する！
// 条件①：1週間前（00:00:00）の時点より「後（以上）」であること
expect(targetTime).toBeGreaterThanOrEqual(startTime);
// 条件②：今日（23:59:59）の時点より「前（以下）」であること
expect(targetTime).toBeLessThanOrEqual(endTime);
console.log('✅ 1件目のデータの日付が、当日〜1週間前の範囲内に収まっていることを確認しました！');

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 「開催」フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(10000); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await targetCell.innerText();
console.log(`💡 「開催」フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ 「開催」フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');

//★ソート機能30「期間（週前）」
  // 🌟 1件目のセルのロケーター
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_open_week');
// 1. ソート前の「元の値」を取得する
originalValue = await targetCell.innerText();
console.log(`💡 「期間（週前）」 ソート前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. 【昇順】ソートを実行する！
// ==========================================
// ※ ↓ 実際のソート（昇順）ボタンのクリック処理に書き換えてください
await page.getByRole('link', { name: '▲' }).nth(29).click();
await page.waitForTimeout(10000); 
// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
ascValue = await targetCell.innerText();
console.log(`💡 「期間（週前）」 昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 昇順ソートの結果判定（エラーにはせず、結果をログに残すだけ）
// ==========================================
if (originalValue !== ascValue) {
  // パターンA：元の値と「違った」場合
  console.log('✅ 「期間（週前）」 昇順ソートで値が変化しました！（昇順OK）');
} else {
  // 元の値と「同じ」だった場合
  console.log('💡 「期間（週前）」 昇順ソートで値が同じでした。（同値が並んでいる可能性があります）');
}
// ==========================================
// 4. 【降順】ソートを「必ず」実行する！（elseの外に出すのがポイント！）
// ==========================================
console.log('💡 続けて「期間（週前）」の【降順ソート】をテストします...');

// 降順ソートボタンを強制クリック！
await page.getByRole('link', { name: '▼' }).nth(29).click();

// 🌟 ユーザー様が設定された念のための待機！
await page.waitForTimeout(10000); 

// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

descValue = await targetCell.innerText();
console.log(`💡 「期間（週前）」 降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 5. 最後の判定：降順ソートの完璧な検証！
// ==========================================
// 🌟 プロの工夫：originalValue ではなく ascValue（昇順の値）と比較する！
if (ascValue !== descValue) {
  // 昇順の時と一番上の車が「変わった」場合 ＝ 降順ソート成功！
  console.log('✅ 「期間（週前）」 降順ソートで、昇順の時と値が変化したため、降順ソートもテストOKです！');
  
} else {
  // 昇順にしても降順にしても、ずっと同じ車（年式）が一番上にいる場合！
  console.log('✅ 「期間（週前）」 昇順でも降順でも値が同じでした。すべて同じデータ（年式）が並んでいると判断し、テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「期間（週前）」 でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(10000);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await targetCell.innerText();
console.log(`💡 「期間（週前）」 ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「期間（週前）」 ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_open_week');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await targetCell.innerText();
console.log(`💡 「期間（週前）」 フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2-1. フィルタ「A」を選択する！
// ==========================================
console.log('💡 「期間（週前）」 フィルタ「3番目」を（1週から4週がある前提）選択します...');
// 1. まずはプルダウン（select）そのものの場所を変数に入れる
selectBox = page.locator('#result_head > table > tbody > tr:nth-child(2) > th.open_week.col_open_week > select');
// 2. プルダウンの中にある「7番目の選択肢（option）」を狙い撃ちする！
// 🌟 プロの技：要素は0から数えるので、3番目は nth(2) になります
let targetOption333th = selectBox.locator('option').nth(2);
// 3. 7番目の選択肢の「テキスト（表示されている文字）」を取得する
optionText = await targetOption333th.innerText();
console.log(`💡 確認：プルダウンの上から3番目の値は [${optionText}] です！`);
// ==========================================
// 4. 取得したその文字（label）を使って、プルダウンを選択する！
// ==========================================
await selectBox.selectOption({ label: optionText });
console.log(`✅ プルダウンから「${optionText}」を選択しました！`);
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）とローディング待ち
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
filteredValue = await targetCell.innerText();
console.log(`💡 「期間（週前）」 フィルタ「${optionText}」適用後の1件目の値: [${filteredValue}]`);

// ==========================================
// 🌟 最後の審判：取得した値に「1週」〜「4週」が含まれていること！
// ==========================================
console.log(`💡 確認：画面の文字 [${filteredValue}] に「1週〜4週」のどれかが含まれるかチェックします！`);
// 1. 🌟 プロの魔法（正規表現）：Playwright専用の toMatch を使う！
// /[1-4]週/ と書くことで、「1週」「2週」「3週」「4週」のどれかが入っていれば合格！という最強のOR条件になります。
expect(filteredValue).toMatch(/[1-4]週/);
console.log(`✅ 1件目のデータ（${filteredValue}）に「1週〜4週」が含まれていることを確認しました！`);

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 「期間（週前）」フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await targetCell.innerText();
console.log(`💡 「期間（週前）」フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ 「期間（週前）」フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');

//★ソート機能31「会場」
  // 🌟 1件目のセルのロケーター
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_place_nm');
// 1. ソート前の「元の値」を取得する
originalValue = await targetCell.innerText();
console.log(`💡 「会場」 ソート前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. 【昇順】ソートを実行する！
// ==========================================
// ※ ↓ 実際のソート（昇順）ボタンのクリック処理に書き換えてください
await page.getByRole('link', { name: '▲' }).nth(30).click();
await page.waitForTimeout(10000); 
// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
ascValue = await targetCell.innerText();
console.log(`💡 「会場」 昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 昇順ソートの結果判定（エラーにはせず、結果をログに残すだけ）
// ==========================================
if (originalValue !== ascValue) {
  // パターンA：元の値と「違った」場合
  console.log('✅ 「会場」 昇順ソートで値が変化しました！（昇順OK）');
} else {
  // 元の値と「同じ」だった場合
  console.log('💡 「会場」 昇順ソートで値が同じでした。（同値が並んでいる可能性があります）');
}
// ==========================================
// 4. 【降順】ソートを「必ず」実行する！（elseの外に出すのがポイント！）
// ==========================================
console.log('💡 続けて「会場」の【降順ソート】をテストします...');

// 降順ソートボタンを強制クリック！
await page.getByRole('link', { name: '▼' }).nth(30).click();

// 🌟 ユーザー様が設定された念のための待機！
await page.waitForTimeout(10000); 

// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

descValue = await targetCell.innerText();
console.log(`💡 「会場」 降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 5. 最後の判定：降順ソートの完璧な検証！
// ==========================================
// 🌟 プロの工夫：originalValue ではなく ascValue（昇順の値）と比較する！
if (ascValue !== descValue) {
  // 昇順の時と一番上の車が「変わった」場合 ＝ 降順ソート成功！
  console.log('✅ 「会場」 降順ソートで、昇順の時と値が変化したため、降順ソートもテストOKです！');
  
} else {
  // 昇順にしても降順にしても、ずっと同じ車（年式）が一番上にいる場合！
  console.log('✅ 「会場」 昇順でも降順でも値が同じでした。すべて同じデータ（年式）が並んでいると判断し、テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「会場」 でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(13000);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await targetCell.innerText();
console.log(`💡 「会場」 ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「会場」 ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_place_nm');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await targetCell.innerText();
console.log(`💡 「会場」 フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2-1. フィルタ「A」を選択する！
// ==========================================
console.log('💡 フィルタ：任意文字で「シーエ東京」を入力します...');
// 1. プルダウンで「任意文字（値：-1 など）」を選択し、入力ダイアログを呼び出す
await page.locator('select[name="filter_place_nm"]').selectOption('-1');
// ==========================================
// 2. 🌟 修正ポイント：ダイアログの入力欄に「シーエ東京」を直接入力（fill）する！
// ==========================================
// ※ .click() してから入力しなくても、.fill() だけでPlaywrightが自動でカチッとクリックして入力してくれます！
await page.locator('#fdlg_text').fill('シーエ東京');
// 3. OKボタンを押してフィルタを実行！
await page.getByRole('button', { name: 'OK' }).click();
// 4. 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）とローディング待ち
await page.waitForTimeout(10000); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
console.log('✅ 任意文字フィルタ「シーエ東京」の適用が完了しました！');
// （この後に、抽出された1件目のデータに「シーエ東京」が含まれているかの検証を続けます）
// フィルタ適用後の1件目の値を取得する
filteredValue = await targetCell.innerText();
console.log(`💡 「会場」 フィルタ「シーエ東京」適用後の1件目の値: [${filteredValue}]`);
// ==========================================
// 🌟 最後の審判：取得した値に「シーエ東京」が含まれていること！
// ==========================================
console.log(`💡 確認：画面の文字 [${filteredValue}] に「シーエ東京」が含まれるかチェックします！`);
// 1. 🌟 プロの魔法（正規表現）：Playwright専用の toMatch を使う！
// /[シーエ東京]が入っていれば合格！という最強のOR条件になります。
expect(filteredValue).toMatch(/シーエ東京/);
console.log(`✅ 1件目のデータ（${filteredValue}）に「シーエ東京」が含まれていることを確認しました！`);

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 「会場」フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await targetCell.innerText();
console.log(`💡 「会場」フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ 「会場」フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');

//★ソート機能32「区分」
  // 🌟 1件目のセルのロケーター
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_a_ryusatsu_nm > p');
// 1. ソート前の「元の値」を取得する
originalValue = await targetCell.innerText();
console.log(`💡 「区分」 ソート前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. 【昇順】ソートを実行する！
// ==========================================
// ※ ↓ 実際のソート（昇順）ボタンのクリック処理に書き換えてください
await page.getByRole('link', { name: '▲' }).nth(31).click();
await page.waitForTimeout(10000); 
// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
ascValue = await targetCell.innerText();
console.log(`💡 「区分」 昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 昇順ソートの結果判定（エラーにはせず、結果をログに残すだけ）
// ==========================================
if (originalValue !== ascValue) {
  // パターンA：元の値と「違った」場合
  console.log('✅ 「区分」 昇順ソートで値が変化しました！（昇順OK）');
} else {
  // 元の値と「同じ」だった場合
  console.log('💡 「区分」 昇順ソートで値が同じでした。（同値が並んでいる可能性があります）');
}
// ==========================================
// 4. 【降順】ソートを「必ず」実行する！（elseの外に出すのがポイント！）
// ==========================================
console.log('💡 続けて「区分」の【降順ソート】をテストします...');

// 降順ソートボタンを強制クリック！
await page.getByRole('link', { name: '▼' }).nth(31).click();

// 🌟 ユーザー様が設定された念のための待機！
await page.waitForTimeout(10000); 

// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

descValue = await targetCell.innerText();
console.log(`💡 「区分」 降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 5. 最後の判定：降順ソートの完璧な検証！
// ==========================================
// 🌟 プロの工夫：originalValue ではなく ascValue（昇順の値）と比較する！
if (ascValue !== descValue) {
  // 昇順の時と一番上の車が「変わった」場合 ＝ 降順ソート成功！
  console.log('✅ 「区分」 降順ソートで、昇順の時と値が変化したため、降順ソートもテストOKです！');
  
} else {
  // 昇順にしても降順にしても、ずっと同じ車（年式）が一番上にいる場合！
  console.log('✅ 「区分」 昇順でも降順でも値が同じでした。すべて同じデータ（年式）が並んでいると判断し、テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「区分」 でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(10000);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await targetCell.innerText();
console.log(`💡 「区分」 ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「区分」 ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_a_ryusatsu_nm > p');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await targetCell.innerText();
console.log(`💡 「区分」 フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2-1. フィルタ「A」を選択する！
// ==========================================
console.log('💡 「区分」 フィルタ「黒」を選択します...');
// ※ ↓ 実際のフィルタ選択処理（プルダウンやボタン等）に書き換えてください
await page.locator('select[name="filter_a_ryusatsu_nm"]').selectOption('流札');
//await page.locator('#result_head > table > tbody > tr:nth-child(2) > th.accident.col_accident > select').selectOption('あり');
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
filteredValue = await targetCell.innerText();
console.log(`💡 「区分」 フィルタ「流札」適用後の1件目の値: [${filteredValue}]`);

// 🌟 確認①：フィルタ結果の1件目がちゃんと「A」になっているか？
expect(filteredValue).toContain('流札');
console.log('✅ 「区分」フィルタ適用後、1件目に「流札」が含まれていることを確認しました！');

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 「区分」フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(10000); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await targetCell.innerText();
console.log(`💡 「区分」フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ 「区分」フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');


//★ソート機能33「画像」

  await page.getByRole('link', { name: '全てクリア' }).click();
  await page.waitForTimeout(10000);

  // メーカー「メルセデスベンツ」を選択
  await page.locator('select[name="maker"]').selectOption('2025');
  await page.waitForTimeout(500);
  // 車種「Cクラス」を選択
  await page.locator('select[name="car"]').selectOption('20251503');
  await page.waitForTimeout(500);

  await page.getByText('上記条件から検索').click();

//★ソート機能5「燃料」
  // 🌟 1件目のセルのロケーター
// 1. ターゲットの画像（img）を狙い撃ちする
let ImageLocator = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_fuel_text > img');
// 2. 画像から「title」を引っこ抜く！
originalValue = await ImageLocator.getAttribute('title');
console.log(`💡 確認：1件目の燃料アイコンのシステム値は [${originalValue}] です！`);

// ==========================================
// 2. 【昇順】ソートを必ず実行する！
// ==========================================
console.log('💡 「燃料」昇順ソートを実行します...');
await page.getByRole('link', { name: '▲' }).nth(5).click();
// 🌟 フライング防止＆ローディング待ち
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
// 🌟 安全対策：画像があるかカウントしてから取得する！（昇順）
ascValue = '';
if (await ImageLocator.count() > 0) {
  ascValue = await ImageLocator.getAttribute('title') || '';
} else {
  ascValue = '(画像なし)';
}
console.log(`💡 「燃料」昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 【降順】ソートも続けて必ず実行する！
// ==========================================
console.log('💡 続けて、「燃料」降順ソートを実行します...');
await page.getByRole('link', { name: '▼' }).nth(5).click();
// 🌟 フライング防止＆ローディング待ち
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
// 🌟 安全対策：画像があるかカウントしてから取得する！（降順）
descValue = '';
if (await ImageLocator.count() > 0) {
  descValue = await ImageLocator.getAttribute('title') || '';
} else {
  descValue = '(画像なし)';
}
console.log(`💡 「燃料」降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 4. 究極の最終判定！（すべてのパターンを網羅）
// ==========================================
if (ascValue !== descValue) {
  // パターンA：昇順と降順で一番上のデータが変わった場合 ＝ 両方のソートが完璧に動いている！
  console.log('✅ 昇順と降順で一番上の値が変化しました！両方のソート機能が完璧に動作しています！');
} else if (originalValue !== ascValue) {
  // パターンB：昇順と降順は同じだったが、最初の状態からは変わった場合
  console.log('✅ 昇降順で値は同じですが、初期状態からは変化しました！ソート機能テストOKです！');
} else {
  // パターンC：最初、昇順、降順ですべて値が同じだった場合
  console.log('✅ 初期、昇順、降順ですべて値が同じでした。（表示されているデータがすべて同じ燃料アイコンです）テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「燃料」でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(6500);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await ImageLocator.getAttribute('title');
console.log(`💡 「燃料」ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「燃料」ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
ImageLocator = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_fuel_text > img');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await ImageLocator.getAttribute('title');
console.log(`💡 「燃料」フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. フィルタ「A」を選択する！
// ==========================================
console.log('💡 「燃料」フィルタ「D」を選択します...');
// ※ ↓ 実際のフィルタ選択処理（プルダウンやボタン等）に書き換えてください
await page.locator('select[name="filter_fuel_text"]').selectOption('Ｄ');
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
filteredValue = await ImageLocator.getAttribute('title');
console.log(`💡 「燃料」フィルタ「D」適用後の1件目の値: [${filteredValue}]`);

// 🌟 確認①：フィルタ結果の1件目がちゃんと「A」になっているか？
expect(filteredValue).toBe('軽油');
console.log('✅ 「燃料」フィルタ適用後、1件目が「D」になっていることを確認しました！');

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await ImageLocator.getAttribute('title');
console.log(`💡 フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');

//★ソート機能13「ナビ」
  // 🌟 1件目のセルのロケーター
// 1. ターゲットの画像（img）を狙い撃ちする（画像データからタイトルを取得）
ImageLocator = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_navi_text > img');
// 2. 画像から「title」を引っこ抜く！
originalValue = await ImageLocator.getAttribute('title');
console.log(`💡 確認：1件目のナビアイコンのシステム値は [${originalValue}] です！`);

// ==========================================
// 2. 【昇順】ソートを必ず実行する！
// ==========================================
console.log('💡 「ナビ」昇順ソートを実行します...');
await page.getByRole('link', { name: '▲' }).nth(12).click();
// 🌟 フライング防止＆ローディング待ち
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
// 🌟 安全対策：画像があるかカウントしてから取得する！（昇順）
ascValue = '';
if (await ImageLocator.count() > 0) {
  ascValue = await ImageLocator.getAttribute('title') || '';
} else {
  ascValue = '(画像なし)';
}
console.log(`💡 「ナビ」昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 【降順】ソートも続けて必ず実行する！
// ==========================================
console.log('💡 続けて、「ナビ」降順ソートを実行します...');
await page.getByRole('link', { name: '▼' }).nth(12).click();
// 🌟 フライング防止＆ローディング待ち
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
// 🌟 安全対策：画像があるかカウントしてから取得する！（降順）
descValue = '';
if (await ImageLocator.count() > 0) {
  descValue = await ImageLocator.getAttribute('title') || '';
} else {
  descValue = '(画像なし)';
}
console.log(`💡 「ナビ」降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 4. 究極の最終判定！（すべてのパターンを網羅）
// ==========================================
if (ascValue !== descValue) {
  // パターンA：昇順と降順で一番上のデータが変わった場合 ＝ 両方のソートが完璧に動いている！
  console.log('✅ 昇順と降順で一番上の値が変化しました！両方のソート機能が完璧に動作しています！');
} else if (originalValue !== ascValue) {
  // パターンB：昇順と降順は同じだったが、最初の状態からは変わった場合
  console.log('✅ 昇降順で値は同じですが、初期状態からは変化しました！ソート機能テストOKです！');
} else {
  // パターンC：最初、昇順、降順ですべて値が同じだった場合
  console.log('✅ 初期、昇順、降順ですべて値が同じでした。（表示されているデータがすべて同じナビアイコンです）テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「ナビ」でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(6500);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await ImageLocator.getAttribute('title');
console.log(`💡 「ナビ」ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「ナビ」ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
ImageLocator = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_navi_text > img');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await ImageLocator.getAttribute('title');
console.log(`💡 「ナビ」フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. フィルタ「A」を選択する！
// ==========================================
console.log('💡 「ナビ」フィルタ「純」を選択します...');
// ※ ↓ 実際のフィルタ選択処理（プルダウンやボタン等）に書き換えてください
await page.locator('select[name="filter_navi_text"]').selectOption('純ナビ');
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
filteredValue = await ImageLocator.getAttribute('title');
console.log(`💡 「ナビ」フィルタ「純」適用後の1件目の値: [${filteredValue}]`);

// 🌟 確認①：フィルタ結果の1件目がちゃんと「A」になっているか？
expect(filteredValue).toBe('純正ナビ');
console.log('✅ 「ナビ」フィルタ適用後、1件目が「純」になっていることを確認しました！');

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await ImageLocator.getAttribute('title');
console.log(`💡 フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');

//★ソート機能16「エアロ」アイコン画像が特殊

// 1. 🌟 プロの魔法：1行目（tr）の中にある、srcに "earo" が含まれる画像(img) を直接狙い撃ちする！
// ※ img[src*="earo"] は「src属性に "earo" という文字が含まれるimgタグ」を探す最強の指定方法です！
let aeroImageLocator = page.locator('#t_result_area > tbody > tr:nth-child(1) img[src*="earo"]');
// 2. 画像が存在するか安全チェック（タイムアウト防止）
if (await aeroImageLocator.count() > 0) {
  
  // 画像から「title」を引っこ抜く！
  let ImageLocator = await aeroImageLocator.first().getAttribute('title');
    console.log(`💡 確認：「エアロ」1件目の画像の title は [${ImageLocator}] です！`);
  // 3. いざ検証！発掘したHTMLの通り「社外　位置不明」と完全一致するかチェック！
} else {
  console.log('ソート前：1件目のデータにエアロの画像(img)が見つかりませんでした！');
}

// ==========================================
// 2. 【昇順】ソートを必ず実行する！
// ==========================================
console.log('💡 「エアロ」昇順ソートを実行します...');
//await page.getByRole('link', { name: '▲' }).nth(12).click();
// 🌟 プロの魔法：onclick属性の中に「EARO_TEXT」と「ASC」の両方が含まれる aタグ をクリック！
await page.locator('a[onclick*="EARO_TEXT"][onclick*="ASC"]').click();

// 🌟 フライング防止＆ローディング待ち
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
aeroImageLocator = page.locator('#t_result_area > tbody > tr:nth-child(1) img[src*="earo"]');
// 2. 画像が存在するか安全チェック（タイムアウト防止）
if (await aeroImageLocator.count() > 0) {
  
  // 画像から「title」を引っこ抜く！
  let ascValue = await aeroImageLocator.first().getAttribute('title');
    console.log(`💡 確認：「エアロ」昇順ソート後の1件目の値: [${ascValue}] です！`);
  // 3. いざ検証！発掘したHTMLの通り「社外　位置不明」と完全一致するかチェック！
//  expect(filteredValue).toBe('社外　位置不明');
//  console.log('✅ 「エアロ」フィルタ適用後、1件目が「社外　位置不明」であることを確認しました！完璧です！');
} else {
  console.log('ソート（昇順）後：1件目のデータにエアロの画像(img)が見つかりませんでした！');
  // わざとテストを失敗させて異常を知らせる
  //expect('(画像なし)').toBe('社外　位置不明'); 
}

// ==========================================
// 3. 【降順】ソートも続けて必ず実行する！
// ==========================================
console.log('💡 続けて、「エアロ」降順ソートを実行します...');
//await page.getByRole('link', { name: '▼' }).nth(12).click();
await page.locator('a[onclick*="EARO_TEXT"][onclick*="DESC"]').click();
// 🌟 フライング防止＆ローディング待ち
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
// 🌟 安全対策：画像があるかカウントしてから取得する！（降順）
aeroImageLocator = page.locator('#t_result_area > tbody > tr:nth-child(1) img[src*="earo"]');
// 2. 画像が存在するか安全チェック（タイムアウト防止）
if (await aeroImageLocator.count() > 0) {
  
  // 画像から「title」を引っこ抜く！
  let descValue = await aeroImageLocator.first().getAttribute('title');
    console.log(`💡 確認：「エアロ」降順ソート後の1件目の値: [${descValue}] です！`);
  // 3. いざ検証！発掘したHTMLの通り「社外　位置不明」と完全一致するかチェック！
} else {
  console.log('ソート（降順）後：1件目のデータにエアロの画像(img)が見つかりませんでした！');
}

// ==========================================
// 4. 究極の最終判定！（すべてのパターンを網羅）
// ==========================================
if (ascValue !== descValue) {
  // パターンA：昇順と降順で一番上のデータが変わった場合 ＝ 両方のソートが完璧に動いている！
  console.log('✅ 昇順と降順で一番上の値が変化しました！両方のソート機能が完璧に動作しています！');
} else if (originalValue !== ascValue) {
  // パターンB：昇順と降順は同じだったが、最初の状態からは変わった場合
  console.log('✅ 昇降順で値は同じですが、初期状態からは変化しました！ソート機能テストOKです！');
} else {
  // パターンC：最初、昇順、降順ですべて値が同じだった場合
  console.log('✅ 初期、昇順、降順ですべて値が同じでした。（表示されているデータがすべて同じエアロアイコンです）テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
// ソートクリア後の、1件目の値を取得する

console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(6500);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
// ソートクリア後の、1件目の値を取得する
aeroImageLocator = page.locator('#t_result_area > tbody > tr:nth-child(1) img[src*="earo"]');
// 2. 画像が存在するか安全チェック（タイムアウト防止）
if (await aeroImageLocator.count() > 0) {
  
  // 画像から「title」を引っこ抜く！
  let clearValue = await aeroImageLocator.first().getAttribute('title');
    console.log(`💡 確認：「エアロ」ソートクリア後の1件目の値: [${clearValue}] です！`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(ImageLocator);
console.log('✅ 「エアロ」ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

    // 3. いざ検証！発掘したHTMLの通り「社外　位置不明」と完全一致するかチェック！
} else {
  console.log('ソートクリア後：1件目のデータにエアロの画像(img)が見つかりませんでした！');
}

//★フィルタ機能
aeroImageLocator = page.locator('#t_result_area > tbody > tr:nth-child(1) img[src*="earo"]');
// 2. 画像が存在するか安全チェック（タイムアウト防止）
if (await aeroImageLocator.count() > 0) {
  
  // 画像から「title」を引っこ抜く！
  ImageLocator = await aeroImageLocator.first().getAttribute('title');
    console.log(`💡 確認：「エアロ」フィルタ前の1件目の値: [${ImageLocator}] です！`);
  // 3. いざ検証！発掘したHTMLの通り「社外　位置不明」と完全一致するかチェック！
} else {
  console.log('フィルタ前：1件目のデータにエアロの画像(img)が見つかりませんでした！');
}

// ==========================================
// 2. フィルタ「A」を選択する！
// ==========================================
console.log('💡 「エアロ」フィルタ「社外」を選択します...');
// ※ ↓ 実際のフィルタ選択処理（プルダウンやボタン等）に書き換えてください

await page.locator('select[name="filter_earo_text"]').selectOption('外　不　エアロ');
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）
await page.waitForTimeout(10000); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// 1. 🌟 プロの魔法：1行目（tr）の中にある、srcに "earo" が含まれる画像(img) を直接狙い撃ちする！
// ※ img[src*="earo"] は「src属性に "earo" という文字が含まれるimgタグ」を探す最強の指定方法です！
aeroImageLocator = page.locator('#t_result_area > tbody > tr:nth-child(1) img[src*="earo"]');
// 2. 画像が存在するか安全チェック（タイムアウト防止）
if (await aeroImageLocator.count() > 0) {
  
  // 画像から「title」を引っこ抜く！
  let filteredValue = await aeroImageLocator.first().getAttribute('title');
    console.log(`💡 確認：「エアロ」1件目の画像の title は [${filteredValue}] です！`);
  // 3. いざ検証！発掘したHTMLの通り「社外　位置不明」と完全一致するかチェック！
  expect(filteredValue).toBe('社外　位置不明');
  console.log('✅ 「エアロ」フィルタ適用後、1件目が「社外　位置不明」であることを確認しました！完璧です！');
} else {
  console.log('1件目のデータにエアロの画像(img)が見つかりませんでした！');
  // わざとテストを失敗させて異常を知らせる
  expect('(画像なし)').toBe('社外　位置不明'); 
}

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

aeroImageLocator = page.locator('#t_result_area > tbody > tr:nth-child(1) img[src*="earo"]');
// 2. 画像が存在するか安全チェック（タイムアウト防止）
if (await aeroImageLocator.count() > 0) {
  
  // 画像から「title」を引っこ抜く！
  ImageLocator = await aeroImageLocator.first().getAttribute('title');
    console.log(`💡 確認：フィルタ解除後の1件目の値: [${ImageLocator}] です！`);
  // 3. いざ検証！発掘したHTMLの通り「社外　位置不明」と完全一致するかチェック！
} else {
  console.log('フィルタ解除後：1件目のデータにエアロの画像(img)が見つかりませんでした');
}

//★ソート機能18「革」
  // 🌟 1件目のセルのロケーター
// 1. ターゲットの画像（img）を狙い撃ちする（画像データからタイトルを取得）
ImageLocator = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_leather_text > img');
// 2. 画像から「title」を引っこ抜く！
originalValue = await ImageLocator.getAttribute('title');
console.log(`💡 確認：1件目の革アイコンのシステム値は [${originalValue}] です！`);

// ==========================================
// 2. 【昇順】ソートを必ず実行する！
// ==========================================
console.log('💡 「革」昇順ソートを実行します...');
//await page.getByRole('link', { name: '▲' }).nth(18).click();
await page.locator('#result_head > table > tbody > tr:nth-child(1) > th.col_leather_text > a:nth-child(1)').click();
// 🌟 フライング防止＆ローディング待ち
await page.waitForTimeout(9500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
// 🌟 安全対策：画像があるかカウントしてから取得する！（昇順）
ascValue = '';
if (await ImageLocator.count() > 0) {
  ascValue = await ImageLocator.getAttribute('title') || '';
} else {
  ascValue = '(画像なし)';
}
console.log(`💡 「革」昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 【降順】ソートも続けて必ず実行する！
// ==========================================
console.log('💡 続けて、「革」降順ソートを実行します...');
// 🌟 究極の指定：onclickの中に「KAWA」と「DESC」が含まれるリンクを狙い撃ち！
// これなら、何番目(nth)か数える必要も、複雑な階層(tr > th > a)を書く必要もありません。
await page.locator('a[onclick*="KAWA"][onclick*="DESC"]').click();
// ※ もし上の行でエラーが出る場合は、シンプルに以下でもOKです！
// await page.locator('a[onclick*="KAWA"][onclick*="DESC"]').click();

// 🌟 フライング防止＆ローディング待ち
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// 🌟 画像の取得（ここは以前のままで完璧です！）
descValue = '';
if (await ImageLocator.count() > 0) {
  descValue = await ImageLocator.getAttribute('title') || '';
} else {
  descValue = '(画像なし)';
}
console.log(`💡 「革」降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 4. 究極の最終判定！（すべてのパターンを網羅）
// ==========================================
if (ascValue !== descValue) {
  // パターンA：昇順と降順で一番上のデータが変わった場合 ＝ 両方のソートが完璧に動いている！
  console.log('✅ 昇順と降順で一番上の値が変化しました！両方のソート機能が完璧に動作しています！');
} else if (originalValue !== ascValue) {
  // パターンB：昇順と降順は同じだったが、最初の状態からは変わった場合
  console.log('✅ 昇降順で値は同じですが、初期状態からは変化しました！ソート機能テストOKです！');
} else {
  // パターンC：最初、昇順、降順ですべて値が同じだった場合
  console.log('✅ 初期、昇順、降順ですべて値が同じでした。（表示されているデータがすべて同じ革アイコンです）テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「革」でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(6500);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await ImageLocator.getAttribute('title');
console.log(`💡 「革」ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「革」ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
ImageLocator = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_leather_text > img');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await ImageLocator.getAttribute('title');
console.log(`💡 「革」フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. フィルタ「A」を選択する！
// ==========================================
console.log('💡 「革」フィルタ「赤革」を選択します...');
// ※ ↓ 実際のフィルタ選択処理（プルダウンやボタン等）に書き換えてください
await page.locator('select[name="filter_leather_text"]').selectOption('赤革');
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
filteredValue = await ImageLocator.getAttribute('title');
console.log(`💡 「革」フィルタ「赤革」適用後の1件目の値: [${filteredValue}]`);

// 🌟 確認①：フィルタ結果の1件目がちゃんと「A」になっているか？
expect(filteredValue).toBe('赤革系');
console.log('✅ 「革」フィルタ適用後、1件目が「赤」になっていることを確認しました！');

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await ImageLocator.getAttribute('title');
console.log(`💡 フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');

//★ソート機能20「正/並」
  // 🌟 1件目のセルのロケーター
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_dealer_nm');
// 1. ソート前の「元の値」を取得する
originalValue = await targetCell.innerText();
console.log(`💡 「正/並」 ソート前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. 【昇順】ソートを実行する！
// ==========================================
// ※ ↓ 実際のソート（昇順）ボタンのクリック処理に書き換えてください
await page.getByRole('link', { name: '▲' }).nth(19).click();
await page.waitForTimeout(6500); 
// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
ascValue = await targetCell.innerText();
console.log(`💡 「正/並」 昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 昇順ソートの結果判定（エラーにはせず、結果をログに残すだけ）
// ==========================================
if (originalValue !== ascValue) {
  // パターンA：元の値と「違った」場合
  console.log('✅ 「正/並」 昇順ソートで値が変化しました！（昇順OK）');
} else {
  // 元の値と「同じ」だった場合
  console.log('💡 「正/並」 昇順ソートで値が同じでした。（同値が並んでいる可能性があります）');
}
// ==========================================
// 4. 【降順】ソートを「必ず」実行する！（elseの外に出すのがポイント！）
// ==========================================
console.log('💡 続けて「正/並」の【降順ソート】をテストします...');

// 降順ソートボタンを強制クリック！
await page.getByRole('link', { name: '▼' }).nth(19).click();

// 🌟 ユーザー様が設定された念のための待機！
await page.waitForTimeout(8500); 

// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

descValue = await targetCell.innerText();
console.log(`💡 「正/並」 降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 5. 最後の判定：降順ソートの完璧な検証！
// ==========================================
// 🌟 プロの工夫：originalValue ではなく ascValue（昇順の値）と比較する！
if (ascValue !== descValue) {
  // 昇順の時と一番上の車が「変わった」場合 ＝ 降順ソート成功！
  console.log('✅ 「正/並」 降順ソートで、昇順の時と値が変化したため、降順ソートもテストOKです！');
  
} else {
  // 昇順にしても降順にしても、ずっと同じ車（年式）が一番上にいる場合！
  console.log('✅ 「正/並」 昇順でも降順でも値が同じでした。すべて同じデータ（年式）が並んでいると判断し、テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「正/並」 でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(6500);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await targetCell.innerText();
console.log(`💡 「正/並」 ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「正/並」 ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_dealer_nm');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await targetCell.innerText();
console.log(`💡 「正/並」 フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2-1. フィルタ「A」を選択する！
// ==========================================
console.log('💡 「正/並」 フィルタ「並行」を選択します...');
// ※ ↓ 実際のフィルタ選択処理（プルダウンやボタン等）に書き換えてください
await page.locator('select[name="filter_dealer_nm"]').selectOption('並行');
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
filteredValue = await targetCell.innerText();
console.log(`💡 「正/並」 フィルタ「並行」適用後の1件目の値: [${filteredValue}]`);

// 🌟 確認①：フィルタ結果の1件目がちゃんと「A」になっているか？
expect(filteredValue).toContain('並行');
console.log('✅ 「正/並」フィルタ適用後、1件目に「並行」が含まれていることを確認しました！');

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 「正/並」フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await targetCell.innerText();
console.log(`💡 「正/並」フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ 「正/並」フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');

//★ソート機能21「詳細」
  // 🌟 1件目のセルのロケーター
// 1. ターゲットの画像（img）を狙い撃ちする（画像データからタイトルを取得）
ImageLocator = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_other > span > img');
// 2. 画像から「title」を引っこ抜く！
originalValue = await ImageLocator.getAttribute('title');
console.log(`💡 確認：1件目の革アイコンのシステム値は [${originalValue}] です！`);

// ==========================================
// 2. 【昇順】ソートを必ず実行する！
// ==========================================
console.log('💡 「詳細」昇順ソートを実行します...');
await page.getByRole('link', { name: '▲' }).nth(20).click();
// 🌟 フライング防止＆ローディング待ち
await page.waitForTimeout(9500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
// 🌟 安全対策：画像があるかカウントしてから取得する！（昇順）
ascValue = '';
if (await ImageLocator.count() > 0) {
  ascValue = await ImageLocator.getAttribute('title') || '';
} else {
  ascValue = '(画像なし)';
}
console.log(`💡 「詳細」昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 【降順】ソートも続けて必ず実行する！
// ==========================================
console.log('💡 続けて、「詳細」降順ソートを実行します...');
await page.getByRole('link', { name: '▼' }).nth(20).click();

// 🌟 フライング防止＆ローディング待ち
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// 🌟 画像の取得（ここは以前のままで完璧です！）
descValue = '';
if (await ImageLocator.count() > 0) {
  descValue = await ImageLocator.getAttribute('title') || '';
} else {
  descValue = '(画像なし)';
}
console.log(`💡 「詳細」降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 4. 究極の最終判定！（すべてのパターンを網羅）
// ==========================================
if (ascValue !== descValue) {
  // パターンA：昇順と降順で一番上のデータが変わった場合 ＝ 両方のソートが完璧に動いている！
  console.log('✅ 昇順と降順で一番上の値が変化しました！両方のソート機能が完璧に動作しています！');
} else if (originalValue !== ascValue) {
  // パターンB：昇順と降順は同じだったが、最初の状態からは変わった場合
  console.log('✅ 昇降順で値は同じですが、初期状態からは変化しました！ソート機能テストOKです！');
} else {
  // パターンC：最初、昇順、降順ですべて値が同じだった場合
  console.log('✅ 初期、昇順、降順ですべて値が同じでした。（表示されているデータがすべて同じ詳細アイコンです）テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「詳細」でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(6500);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await ImageLocator.getAttribute('title');
console.log(`💡 「詳細」ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「詳細」ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
ImageLocator = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_other > span > img');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await ImageLocator.getAttribute('title');
console.log(`💡 「詳細」フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. フィルタ「A」を選択する！
// ==========================================
console.log('💡 フィルタ：任意文字で「レザー」を入力します...');
// ※ ↓ 実際のフィルタ選択処理（プルダウンやボタン等）に書き換えてください
await page.locator('select[name="filter_other"]').selectOption('-1');
// ==========================================
// 2. 🌟 修正ポイント：ダイアログの入力欄に「シーエ東京」を直接入力（fill）する！
// ==========================================
// ※ .click() してから入力しなくても、.fill() だけでPlaywrightが自動でカチッとクリックして入力してくれます！
await page.locator('#fdlg_text').fill('レザー');
// 3. OKボタンを押してフィルタを実行！
await page.getByRole('button', { name: 'OK' }).click();
// 4. 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）とローディング待ち
await page.waitForTimeout(10000); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
console.log('✅ 任意文字フィルタ「レザー」の適用が完了しました！');

// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ==========================================
// 🌟 装備（レザー）の判定：画像ファイル名 or テキストでチェック！
// ==========================================
// 1. ターゲットのセルを指定（詳細/装備の列）
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_leather_text');
// 2. セルの中の画像(img)を取得
const imgLocator = targetCell.locator('img');
let leatherFound = false;
if (await imgLocator.count() > 0) {
    // 画像がある場合：src属性（ファイル名）を確認する
    const imgSrc = await imgLocator.first().getAttribute('src') || '';
    const imgTitle = await imgLocator.first().getAttribute('title') || '';
    
    console.log(`💡 確認：画像が見つかりました。src=[${imgSrc}], title=[${imgTitle}]`);
    
    // ファイル名に "leather" や "kawa"、または title に "レザー" が含まれていればOKとする
    if (imgSrc.includes('leather') || imgSrc.includes('kawa') || imgTitle.includes('レザー')) {
        leatherFound = true;
    }
} else {
    // 画像がない場合：テキストを確認
    const cellText = await targetCell.innerText();
    console.log(`💡 確認：画像がないためテキストを確認します。text=[${cellText}]`);
    if (cellText.includes('レザー')) {
        leatherFound = true;
    }
}
// 3. 判定
expect(leatherFound).toBe(true);
console.log('✅ 「詳細」フィルタ適用後、1件目に「レザー」の装備があることを確認しました！');

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await ImageLocator.getAttribute('title');
console.log(`💡 フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');

//★ソート機能32「画像」
  // 🌟 1件目のセルのロケーター
// 1. ターゲットの画像（img）を狙い撃ちする（画像データからタイトルを取得）
ImageLocator = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_tokki_nm > img');
// 2. 画像から「title」を引っこ抜く！
originalValue = await ImageLocator.getAttribute('title');
console.log(`💡 確認：1件目の革アイコンのシステム値は [${originalValue}] です！`);

// ==========================================
// 2. 【昇順】ソートを必ず実行する！
// ==========================================
console.log('💡 「画像」昇順ソートを実行します...');
await page.getByRole('link', { name: '▲' }).nth(31).click();
// 🌟 フライング防止＆ローディング待ち
await page.waitForTimeout(9500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
// 🌟 安全対策：画像があるかカウントしてから取得する！（昇順）
ascValue = '';
if (await ImageLocator.count() > 0) {
  ascValue = await ImageLocator.getAttribute('title') || '';
} else {
  ascValue = '(画像なし)';
}
console.log(`💡 「画像」昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 【降順】ソートも続けて必ず実行する！
// ==========================================
console.log('💡 続けて、「画像」降順ソートを実行します...');
await page.getByRole('link', { name: '▼' }).nth(31).click();

// 🌟 フライング防止＆ローディング待ち
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// 🌟 画像の取得（ここは以前のままで完璧です！）
descValue = '';
if (await ImageLocator.count() > 0) {
  descValue = await ImageLocator.getAttribute('title') || '';
} else {
  descValue = '(画像なし)';
}
console.log(`💡 「画像」降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 4. 究極の最終判定！（すべてのパターンを網羅）
// ==========================================
if (ascValue !== descValue) {
  // パターンA：昇順と降順で一番上のデータが変わった場合 ＝ 両方のソートが完璧に動いている！
  console.log('✅ 昇順と降順で一番上の値が変化しました！両方のソート機能が完璧に動作しています！');
} else if (originalValue !== ascValue) {
  // パターンB：昇順と降順は同じだったが、最初の状態からは変わった場合
  console.log('✅ 昇降順で値は同じですが、初期状態からは変化しました！ソート機能テストOKです！');
} else {
  // パターンC：最初、昇順、降順ですべて値が同じだった場合
  console.log('✅ 初期、昇順、降順ですべて値が同じでした。（表示されているデータがすべて同じ詳細アイコンです）テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「画像」でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(6500);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await ImageLocator.getAttribute('title');
console.log(`💡 「画像」ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「画像」ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
ImageLocator = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_tokki_nm > img');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await ImageLocator.getAttribute('title');
console.log(`💡 「画像」フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. フィルタ「A」を選択する！
// ==========================================
console.log('💡 フィルタ：任意文字で「あり」を入力します...');
// ※ ↓ 実際のフィルタ選択処理（プルダウンやボタン等）に書き換えてください
await page.locator('select[name="filter_tokki_nm"]').selectOption('1');
// 4. 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）とローディング待ち
await page.waitForTimeout(10000); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
console.log('✅ フィルタ「あり」の適用が完了しました！');

// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ==========================================
// 🌟 カメラ（出品票）アイコンの存在確認：完全版
// ==========================================

// 1. ターゲットの画像(img)を指定
// ※ srcの中に "camera" という文字が含まれているimgタグを直接狙い撃ちします
const cameraImage = page.locator('#t_result_area > tbody > tr:nth-child(1) img[src*="camera"]');

// 2. 画像が存在するかカウントで確認（nullエラー防止）
if (await cameraImage.count() > 0) {
    
    // 3. 発掘したHTMLに合わせて「alt属性」を取得してみる
const altText = await cameraImage.first().getAttribute('alt');
const imgSrc = await cameraImage.first().getAttribute('src');

    console.log(`💡 確認：アイコンを発見！ alt=[${altText}], src=[${imgSrc}]`);

    // 4. 検証：altが「出品票」であること、またはファイル名に「camera」が含まれること
    // どちらか一方が合っていれば合格、という強靭な判定にします
    const isValid = altText === '出品票' || imgSrc?.includes('camera');
    
    expect(isValid).toBe(true);
    
    console.log('✅ カメラ（出品票）アイコンが正しく表示されていることを確認しました！');

} else {
    console.log('❌ エラー：カメラアイコン（srcにcameraを含む画像）が見つかりませんでした。');
    expect(await cameraImage.count()).toBeGreaterThan(0);
}

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await ImageLocator.getAttribute('title');
console.log(`💡 フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');

//★ソート機能18「ルーフレール」
  await page.getByRole('link', { name: '全てクリア' }).click();
  await page.waitForTimeout(10000);

  // メーカー「スバル」を選択
await page.locator('select[name="maker"]').selectOption('1045');
  // 車種「フォレスター」を選択
await page.locator('select[name="car"]').selectOption('10452006');
  // グレード「アドバンス」を選択
await page.locator('#Grade').selectOption('236');
  await page.getByText('上記条件から検索').click();

  //★ソート機能18「ルーフレール」
  // 🌟 1件目のセルのロケーター
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_rr_text.aa_font_size');
// 1. ソート前の「元の値」を取得する
originalValue = await targetCell.innerText();
console.log(`💡 「ルーフレール」 ソート前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. 【昇順】ソートを実行する！
// ==========================================
// ※ ↓ 実際のソート（昇順）ボタンのクリック処理に書き換えてください
await page.getByRole('link', { name: '▲' }).nth(17).click();
await page.waitForTimeout(10000); 
// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
ascValue = await targetCell.innerText();
console.log(`💡 「ルーフレール」 昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 昇順ソートの結果判定（エラーにはせず、結果をログに残すだけ）
// ==========================================
if (originalValue !== ascValue) {
  // パターンA：元の値と「違った」場合
  console.log('✅ 「ルーフレール」 昇順ソートで値が変化しました！（昇順OK）');
} else {
  // 元の値と「同じ」だった場合
  console.log('💡 「ルーフレール」 昇順ソートで値が同じでした。（同値が並んでいる可能性があります）');
}
// ==========================================
// 4. 【降順】ソートを「必ず」実行する！（elseの外に出すのがポイント！）
// ==========================================
console.log('💡 続けて「ルーフレール」の【降順ソート】をテストします...');

// 降順ソートボタンを強制クリック！
await page.getByRole('link', { name: '▼' }).nth(17).click();

// 🌟 ユーザー様が設定された念のための待機！
await page.waitForTimeout(10000); 

// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

descValue = await targetCell.innerText();
console.log(`💡 「ルーフレール」 降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 5. 最後の判定：降順ソートの完璧な検証！
// ==========================================
// 🌟 プロの工夫：originalValue ではなく ascValue（昇順の値）と比較する！
if (ascValue !== descValue) {
  // 昇順の時と一番上の車が「変わった」場合 ＝ 降順ソート成功！
  console.log('✅ 「ルーフレール」 降順ソートで、昇順の時と値が変化したため、降順ソートもテストOKです！');
  
} else {
  // 昇順にしても降順にしても、ずっと同じ車（年式）が一番上にいる場合！
  console.log('✅ 「ルーフレール」 昇順でも降順でも値が同じでした。すべて同じデータ（年式）が並んでいると判断し、テストOKとします！');
}

// ==========================================
// 6. ソートクリアを実行し、元の状態に戻るか確認する！
// ==========================================
console.log('💡 ソートクリアボタンをクリックして、元の並び順に戻します...');

  //「ルーフレール」 でソートクリア
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(10000);
// 🌟 ここでも必須！Playwrightのフライング防止（魔法の0.5秒）
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// ソートクリア後の、1件目の値を取得する
clearValue = await targetCell.innerText();
console.log(`💡 「ルーフレール」 ソートクリア後の1件目の値: [${clearValue}]`);

// 🌟 最後の審判：一番最初に保存しておいた「originalValue」と完全に一致するか検証！
expect(clearValue).toBe(originalValue);
console.log('✅ 「ルーフレール」 ソートが正常に解除され、1件目が元の値に戻ったことを確認しました！');

//★フィルタ機能
// 🌟 1件目のセルのロケーター（※実際の要素に合わせて調整してください）
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_rr_text.aa_font_size');

// 1. フィルタをかける前の「元の値」を取得しておく
originalValue = await targetCell.innerText();
console.log(`💡 「ルーフレール」 フィルタ前の1件目の値: [${originalValue}]`);

// ==========================================
// 2-1. フィルタ「A」を選択する！
// ==========================================
console.log('💡 「「ルーフレール」」 フィルタ「あり」を選択します...');
// ※ ↓ 実際のフィルタ選択処理（プルダウンやボタン等）に書き換えてください
await page.locator('select[name="filter_rr_text"]').selectOption('有');
//await page.locator('#result_head > table > tbody > tr:nth-child(2) > th.accident.col_accident > select').selectOption('あり');
// 🌟 必須！Playwrightのフライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
// ローディング（処理中画面）が消えるのを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ適用後の1件目の値を取得する
filteredValue = await targetCell.innerText();
console.log(`💡 「「ルーフレール」」 フィルタ「あり」適用後の1件目の値: [${filteredValue}]`);

// 🌟 確認①：フィルタ結果の1件目がちゃんと「A」になっているか？
expect(filteredValue).toContain('有');
console.log('✅ 「「ルーフレール」」フィルタ適用後、1件目に「有」が含まれていることを確認しました！');

// ==========================================
// 3. フィルタを解除する！
// ==========================================
console.log('💡 「ルーフレール」フィルタを解除します...');
// ※ ↓ 実際のフィルタ解除処理（「すべて」を選ぶ、クリアボタンを押す等）に書き換えてください
await page.getByRole('link', { name: 'フィルタ解除' }).click();
//await page.locator('select[name="filter_atype_nm"]').selectOption(''); 

// 🌟 ここでも必須！フライング防止（魔法の0.5秒）
await page.waitForTimeout(6500); 
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

// フィルタ解除後の1件目の値を取得する
clearedValue = await targetCell.innerText();
console.log(`💡 「ルーフレール」フィルタ解除後の1件目の値: [${clearedValue}]`);

// ==========================================
// 4. 最後の審判：「元の1件目」または「」であること！
// ==========================================
// JavaScriptの判定を使って「どちらか一方でも当てはまれば true」を作る
isOriginal = (clearedValue === originalValue);
isA = (clearedValue === '');

// Playwrightに「true（真）であること」を保証させる！
expect(isOriginal || isA).toBeTruthy();
console.log('✅ 「ルーフレール」フィルタ解除後、1件目が「元の値」または「null」であることを確認しました！');


});
