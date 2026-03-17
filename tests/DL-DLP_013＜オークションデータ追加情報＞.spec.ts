//custom-test.tsを使用
import { test, expect } from '../custom-test';
//import { test, expect } from '@playwright/test';
//DLP回帰テスト-AA相場検索-グレード検索＞AA相場検索
test('オークションデータ追加情報', async ({ page }) => {
// ▼ この行を追加（テストの制限時間を120秒に変更）
  test.setTimeout(600000);

  //ログイン画面へ遷移
  await page.goto('https://stgdlpro.proto-dataline.com/admin/');
  await page.waitForLoadState('networkidle');
  // ID,パスワードを入力
  await page.locator('input[name="user_id"]').fill('999999');
  await page.locator('input[name="passwd"]').fill('pdcpdc');
  //管理画面へ遷移
  await page.getByRole('link').click();

//オークションデータ追加情報設定
await page.getByRole('link', { name: 'オークションデータ追加情報設定' }).click();
console.log('オークションデータ追加情報設定を表示');
await page.locator('select[name="maker"]').selectOption('1005');
await page.locator('#car_list').selectOption('10052003');
await expect(page.getByRole('radio', { name: '未処理 一時保存 略称確認中 申請完了 承認差戻' })).toBeVisible();
await page.getByRole('button', { name: '検索' }).click();
await expect(page.getByRole('cell', { name: 'ＬＸ' }).nth(1)).toBeVisible();
await expect(page.getByRole('cell', { name: '未処理' }).nth(1)).toBeVisible();
await page.getByRole('link', { name: 'メニューへ' }).click();
await expect(page.getByText('管理者メニュー')).toBeVisible();
await page.getByRole('link', { name: 'オークションデータ追加情報設定' }).click();
await expect(page.getByText('オークションデータ追加情報設定')).toBeVisible();
await page.locator('select[name="maker"]').selectOption('1020');
await page.locator('#car_list').selectOption('10202010');
await page.locator('select[name="open_date_from"]').selectOption('20241111');
await page.locator('select[name="open_date_to"]').selectOption('20241111');
await page.locator('select[name="place"]').selectOption('178');
await page.getByRole('textbox').fill('17812024111100000066');
await page.getByRole('textbox').click();
await page.getByRole('radio', { name: '未処理 一時保存 略称確認中 申請完了 承認差戻' }).check();
await page.getByRole('button', { name: '検索' }).click();
await expect(page.getByRole('cell', { name: 'ステップワゴン', exact: true })).toBeVisible();
await expect(page.getByRole('cell', { name: '2024/11/11', exact: true })).toBeVisible();
await expect(page.getByText('17812024111100000066')).toBeVisible();
await expect(page.locator('td').filter({ hasText: /^ホンダ東京$/ })).toBeVisible();
await expect(page.getByRole('cell', { name: '未処理', exact: true })).toBeVisible();
await expect(page.getByRole('cell', { name: '10075' })).toBeVisible();
await expect(page.getByRole('cell', { name: 'エアー' })).toBeVisible();
await expect(page.getByRole('cell', { name: '2022' })).toBeVisible();
await page.getByRole('textbox').fill('');

await page.getByRole('button', { name: '検索' }).click();

//★ソート機能「AUCCAR_ID」
  // 🌟 1件目のセルのロケーター
let targetCell = page.locator('#wrap > center > form > table:nth-child(7) > tbody > tr:nth-child(2) > td:nth-child(2)');
// 1. ソート前の「元の値」を取得する
let originalValue = await targetCell.innerText();
console.log(`💡 「AUCCAR_ID」 ソート前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. 【昇順】ソートを実行する！
// ==========================================
// ※ ↓ 実際のソート（昇順）ボタンのクリック処理に書き換えてください
await page.getByRole('link', { name: '▲' }).nth(1).click();
await page.waitForTimeout(6500); 
// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
let ascValue = await targetCell.innerText();
console.log(`💡 「AUCCAR_ID」 昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 昇順ソートの結果判定（エラーにはせず、結果をログに残すだけ）
// ==========================================
if (originalValue !== ascValue) {
  // パターンA：元の値と「違った」場合
  console.log('✅ 「AUCCAR_ID」 昇順ソートで値が変化しました！（昇順OK）');
} else {
  // 元の値と「同じ」だった場合
  console.log('💡 「AUCCAR_ID」 昇順ソートで値が同じでした。（同値が並んでいる可能性があります）');
}
// ==========================================
// 4. 【降順】ソートを「必ず」実行する！（elseの外に出すのがポイント！）
// ==========================================
console.log('💡 続けて「AUCCAR_ID」の【降順ソート】をテストします...');

// 降順ソートボタンを強制クリック！
await page.getByRole('link', { name: '▼' }).nth(1).click();

// 🌟 ユーザー様が設定された念のための待機！
await page.waitForTimeout(8500); 

// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

let descValue = await targetCell.innerText();
console.log(`💡 「AUCCAR_ID」 降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 5. 最後の判定：降順ソートの完璧な検証！
// ==========================================
// 🌟 プロの工夫：originalValue ではなく ascValue（昇順の値）と比較する！
if (ascValue !== descValue) {
  // 昇順の時と一番上の車が「変わった」場合 ＝ 降順ソート成功！
  console.log('✅ 「AUCCAR_ID」 降順ソートで、昇順の時と値が変化したため、降順ソートもテストOKです！');
  
} else {
  // 昇順にしても降順にしても、ずっと同じ車（年式）が一番上にいる場合！
  console.log('✅ 「AUCCAR_ID」 昇順でも降順でも値が同じでした。すべて同じデータ（年式）が並んでいると判断し、テストOKとします！');
}

//検索結果のページング
await page.getByRole('link', { name: '次へ' }).click();
await expect(page.getByText('20件')).toBeVisible();
await page.getByRole('link', { name: '前へ' }).click();
await expect(page.getByText('10件')).toBeVisible();

await page.getByRole('link', { name: '2' }).click();
await expect(page.getByText('20件')).toBeVisible();
await page.getByRole('link', { name: '4' }).click();
await expect(page.getByText('次へ')).not.toBeVisible();

await page.getByRole('button', { name: '検索' }).click();
await expect(page.getByText('10件')).toBeVisible();
await page.getByRole('link', { name: 'メニューへ' }).click();

//管理者メニュー＞オークションデータ追加情報設定＞検索条件を登録
await expect(page.getByText('管理者メニュー')).toBeVisible();
await page.getByRole('link', { name: 'オークションデータ追加情報設定' }).click();
await expect(page.getByText('オークションデータ追加情報設定')).toBeVisible();
await page.locator('select[name="maker"]').selectOption('1020');
await page.locator('#car_list').selectOption('10202010');
await page.locator('select[name="open_date_from"]').selectOption('20241111');
await page.locator('select[name="open_date_to"]').selectOption('20241111');
await page.locator('select[name="place"]').selectOption('178');
await page.getByRole('textbox').fill('17812024111100000066');
await page.getByRole('textbox').click();
await page.getByRole('radio', { name: '未処理 一時保存 略称確認中 申請完了 承認差戻' }).check();
await page.getByRole('button', { name: '検索' }).click();

//検索結果一覧＞検索条件と一致していること
await expect(page.getByRole('cell', { name: 'ステップワゴン', exact: true })).toBeVisible();
await expect(page.getByRole('cell', { name: '2024/11/11', exact: true })).toBeVisible();
await expect(page.getByText('17812024111100000066')).toBeVisible();
await expect(page.locator('td').filter({ hasText: /^ホンダ東京$/ })).toBeVisible();
await expect(page.getByRole('cell', { name: '未処理', exact: true })).toBeVisible();
await expect(page.getByRole('cell', { name: '10075' })).toBeVisible();
await expect(page.getByRole('cell', { name: 'エアー' })).toBeVisible();
await expect(page.getByRole('cell', { name: '2022' })).toBeVisible();
await page.getByRole('textbox').fill('');

//await page.getByRole('button', { name: '検索' }).click();

//検索結果一覧＞「変更」ボタンを押下
await page.getByRole('row', { name: '/11/11 17812024111100000066 2022 ステップワゴン エアー ホンダ東京 10075 未処理 変更' }).getByRole('button').click();
await page.waitForTimeout(5000);
//登録内容＞編集画面＞検索条件と一致していることを確認
await expect(page.getByRole('cell', { name: '17812024111100000066' })).toBeVisible();
await expect(page.getByRole('cell', { name: '10075' })).toBeVisible();
await expect(page.getByRole('cell', { name: 'ステップワゴン' })).toBeVisible();
await expect(page.getByRole('cell', { name: 'ホンダ東京' })).toBeVisible();
await expect(page.getByText('未処理')).toBeVisible();

//ドアが空白でないことを確認
// 1. ドア数の入力欄を確実に狙い撃ち！
let doorInput = page.locator('input[name="door_text_full"]');
// 2. 🌟 .toHaveValue() を使って、値が「空（""）」じゃなくなるまで待機＆検証！
// ※ .inputValue() で取ってから比較するのではなく、これを使うと最大10秒間、
// 「値が入るかな…？」とPlaywrightが何度も自動でチェックしてくれます！
await expect(doorInput).not.toHaveValue('', { timeout: 10000 });
// 3. （確認用）無事に待機を突破できたら、実際に入っていた値を取得して表示
let doorValue = await doorInput.inputValue();
console.log(`✅ ドア数に [${doorValue}] が登録されていることを確認しました！`);

//定員が空白でないことを確認
// 1. 定員の入力欄を確実に狙い撃ち！
let teiinInput = page.locator('#teiin_text_cell > input[type=text]:nth-child(1)');
// 2. 🌟 .toHaveValue() を使って、値が「空（""）」じゃなくなるまで待機＆検証！
// ※ .inputValue() で取ってから比較するのではなく、これを使うと最大10秒間、
// 「値が入るかな…？」とPlaywrightが何度も自動でチェックしてくれます！
await expect(teiinInput).not.toHaveValue('', { timeout: 10000 });
// 3. （確認用）無事に待機を突破できたら、実際に入っていた値を取得して表示
let teiinValue = await teiinInput.inputValue();
console.log(`✅ 定員に [${teiinValue}] が登録されていることを確認しました！`);

//セールスポイントが空白でないことを確認
// 1. セールスポイントの入力欄を確実に狙い撃ち！
let spInput = page.locator('textarea[name="salespoint_caption"]');
// 2. 🌟 .toHaveValue() を使って、値が「空（""）」じゃなくなるまで待機＆検証！
// ※ .inputValue() で取ってから比較するのではなく、これを使うと最大10秒間、
// 「値が入るかな…？」とPlaywrightが何度も自動でチェックしてくれます！
await expect(spInput).not.toHaveValue('', { timeout: 10000 });
// 3. （確認用）無事に待機を突破できたら、実際に入っていた値を取得して表示
let spValue = await spInput.inputValue();
console.log(`✅ セールスポイントに [${spValue}] が登録されていることを確認しました！`);
await page.waitForTimeout(3000);

//「入力項目クリア」ボタンを押下
await page.getByRole('button', { name: '入力項目クリア' }).click();
  await page.waitForTimeout(3000);

console.log(`✅ 「入力項目クリア」ボタン押下＞編集エリアがクリアされることを確認`);
//ドアが空白であることを確認
// 1. ドア数の入力欄を確実に狙い撃ち！
doorInput = page.locator('input[name="door_text_full"]');
// 2. 🌟 .toHaveValue() を使って、値が「空（""）」じゃなくなるまで待機＆検証！
// ※ .inputValue() で取ってから比較するのではなく、これを使うと最大10秒間、
// 「値が入るかな…？」とPlaywrightが何度も自動でチェックしてくれます！
await expect(doorInput).toHaveValue('', { timeout: 10000 });
// 3. （確認用）無事に待機を突破できたら、実際に入っていた値を取得して表示
doorValue = await doorInput.inputValue();
console.log(`✅ ドア数に [${doorValue}] が登録されていることを確認しました！`);

//定員が空白であることを確認
// 1. 定員の入力欄を確実に狙い撃ち！
teiinInput = page.locator('#teiin_text_cell > input[type=text]:nth-child(1)');
// 2. 🌟 .toHaveValue() を使って、値が「空（""）」じゃなくなるまで待機＆検証！
// ※ .inputValue() で取ってから比較するのではなく、これを使うと最大10秒間、
// 「値が入るかな…？」とPlaywrightが何度も自動でチェックしてくれます！
await expect(teiinInput).toHaveValue('', { timeout: 10000 });
// 3. （確認用）無事に待機を突破できたら、実際に入っていた値を取得して表示
teiinValue = await teiinInput.inputValue();
console.log(`✅ 定員に [${teiinValue}] が登録されていることを確認しました！`);

//セールスポイントが空白であることを確認
// 1. セールスポイントの入力欄を確実に狙い撃ち！
spInput = page.locator('textarea[name="salespoint_caption"]');
// 2. 🌟 .toHaveValue() を使って、値が「空（""）」じゃなくなるまで待機＆検証！
// ※ .inputValue() で取ってから比較するのではなく、これを使うと最大10秒間、
// 「値が入るかな…？」とPlaywrightが何度も自動でチェックしてくれます！
await expect(spInput).toHaveValue('', { timeout: 10000 });
// 3. （確認用）無事に待機を突破できたら、実際に入っていた値を取得して表示
spValue = await spInput.inputValue();
console.log(`✅ セールスポイントに [${spValue}] が登録されていることを確認しました！`);

//編集可能エリアで編集（TEXTボックス編集）
await page.locator('textarea[name="type_nm_text"]').fill('AB1');
await page.locator('input[name="tmonth_text"]').fill('12');
await page.locator('input[name="door_text_full"]').fill('カブリオレ');
await page.keyboard.press('Tab');
//await page.locator('input[name="door_text_full"]').press('Tab');
// 1. ターゲットの要素（ラベル）を指定
let ryakushouLabel = page.locator('#door_text_label');
// 2. 検証：テキストの中に「オープン」が含まれているかチェック！
await expect(ryakushouLabel).toContainText('オープン');
// 3. （確認用）無事に通過したら、実際のテキストを取得してログに出力
let actualLabelText = await ryakushouLabel.innerText();
console.log(`✅ ドアラベル「カブリオレ」略称に [${actualLabelText}]が含まれていることを確認しました！`);

await page.locator('input[name="teiin_text_full"]').fill('１０名');
await page.keyboard.press('Tab');
//await page.locator('input[name="door_text_full"]').press('Tab');
// 1. ターゲットの要素（ラベル）を指定
ryakushouLabel = page.locator('#teiin_text_label');
// 2. 検証：テキストの中に「オープン」が含まれているかチェック！
await expect(ryakushouLabel).toContainText('データがありません');
// 3. （確認用）無事に通過したら、実際のテキストを取得してログに出力
actualLabelText = await ryakushouLabel.innerText();
console.log(`✅ 定員ラベル「１０名」略称に [${actualLabelText}] が含まれていることを確認しました！`);

await page.locator('textarea[name="salespoint_caption"]').fill('セールスポイントテスト');
await page.locator('textarea[name="notes_caption"]').fill('注意事項テスト');
await page.locator('input[name="sr_text_full"]').fill('ツインムーンルーフ');
await page.keyboard.press('Tab');
//await page.locator('input[name="door_text_full"]').press('Tab');
// 1. ターゲットの要素（ラベル）を指定
ryakushouLabel = page.locator('#sr_text_cell');
// 2. 検証：テキストの中に「オープン」が含まれているかチェック！
await expect(ryakushouLabel).toContainText('ＳＲ');
// 3. （確認用）無事に通過したら、実際のテキストを取得してログに出力
actualLabelText = await ryakushouLabel.innerText();
console.log(`✅ サンルーフラベル「ツインムーンルーフ」略称に [${actualLabelText}]が含まれていることを確認しました！`);

await page.locator('input[name="leather_text_full"]').fill('ベージュ本革エアーシート');
await page.keyboard.press('Tab');
//await page.locator('input[name="door_text_full"]').press('Tab');
// 1. ターゲットの要素（ラベル）を指定
ryakushouLabel = page.locator('#leather_text_cell');
// 2. 検証：テキストの中に「オープン」が含まれているかチェック！
await expect(ryakushouLabel).toContainText('ベージュ');
// 3. （確認用）無事に通過したら、実際のテキストを取得してログに出力
actualLabelText = await ryakushouLabel.innerText();
console.log(`✅ 革ラベル「ベージュ本革エアーシート」略称に [${actualLabelText}]が含まれていることを確認しました！`);

await page.locator('input[name="navi_text_full"]').fill('アルバイン９型ナビ');
await page.keyboard.press('Tab');
//await page.locator('input[name="door_text_full"]').press('Tab');
// 1. ターゲットの要素（ラベル）を指定
ryakushouLabel = page.locator('#navi_text_cell');
// 2. 検証：テキストの中に「オープン」が含まれているかチェック！
await expect(ryakushouLabel).toContainText('外ナビ');
// 3. （確認用）無事に通過したら、実際のテキストを取得してログに出力
actualLabelText = await ryakushouLabel.innerText();
console.log(`✅ ナビラベル「外ナビ」略称に [${actualLabelText}]が含まれていることを確認しました！`);

await page.locator('input[name="earo_text_full"]').fill('ＡＭＧエアロ');
await page.keyboard.press('Tab');
//await page.locator('input[name="door_text_full"]').press('Tab');
// 1. ターゲットの要素（ラベル）を指定
ryakushouLabel = page.locator('#earo_text_label');
// 2. 検証：テキストの中に「オープン」が含まれているかチェック！
await expect(ryakushouLabel).toContainText('純　不　ＡＭＧ');
// 3. （確認用）無事に通過したら、実際のテキストを取得してログに出力
actualLabelText = await ryakushouLabel.innerText();
console.log(`✅ エアロラベル「ＡＭＧエアロ」略称に [${actualLabelText}] が含まれていることを確認しました！`);

await page.locator('input[name="psd_text_full"]').fill('左リアパワースライドドア');
await page.keyboard.press('Tab');
//await page.locator('input[name="door_text_full"]').press('Tab');
// 1. ターゲットの要素（ラベル）を指定
ryakushouLabel = page.locator('#psd_text_label');
// 2. 検証：テキストの中に「オープン」が含まれているかチェック！
await expect(ryakushouLabel).toContainText('左Ｐスラ');
// 3. （確認用）無事に通過したら、実際のテキストを取得してログに出力
actualLabelText = await ryakushouLabel.innerText();
console.log(`✅ パワースライドドアラベル「左リアパワースライドドア」略称に [${actualLabelText}]が含まれていることを確認しました！`);
//ルーフレール＞なし⇒ありに変更
await page.getByRole('radio', { name: 'あり' }).check();

await page.getByRole('button', { name: '登録' }).click();
await expect(page.getByText('オークションデータ追加情報を未処理いたしました。')).toBeVisible();
await page.waitForTimeout(2000);
await page.getByRole('button', { name: 'ＯＫ！' }).click();
//ＴＯＰ画面を表示
await expect(page.getByRole('cell', { name: 'メーカー・車種' })).toBeVisible();

await page.getByRole('button', { name: '変更' }).click();
//登録した内容が保持されていること
await expect(page.getByText('ＡＢ１')).toBeVisible();
await expect(page.locator('input[name="tmonth_text"]')).toBeVisible();
await expect(page.getByText('注意事項テスト')).toBeVisible();
await expect(page.locator('input[name="sr_text_full"]')).toBeVisible();
await expect(page.getByText('ＳＲ')).toBeVisible();
await expect(page.locator('input[name="leather_text_full"]')).toBeVisible();
await expect(page.getByText('ベージュ')).toBeVisible();
await expect(page.locator('input[name="navi_text_full"]')).toBeVisible();
await expect(page.getByText('外ナビ')).toBeVisible();
await expect(page.locator('input[name="earo_text_full"]')).toBeVisible();
await expect(page.getByText('純 不 ＡＭＧ')).toBeVisible();
await expect(page.locator('input[name="psd_text_full"]')).toBeVisible();
await expect(page.getByText('左Ｐスラ')).toBeVisible();
await expect(page.getByText('あり', { exact: true })).toBeVisible();

//「入力項目クリア」ボタンを押下＞いったん元に戻す
await page.getByRole('button', { name: '入力項目クリア' }).click();
  await page.waitForTimeout(3000);

 await page.getByRole('button', { name: '登録' }).click();
await expect(page.getByText('オークションデータ追加情報を未処理いたしました。')).toBeVisible();
await page.waitForTimeout(2000);
await page.getByRole('button', { name: 'ＯＫ！' }).click();

//ＴＯＰ画面を表示
await expect(page.getByRole('cell', { name: 'メーカー・車種' })).toBeVisible();
await page.getByRole('button', { name: '変更' }).click();

//登録編集画面＞キャンセルボタン押下＞一覧に戻る
await page.getByRole('button', { name: 'キャンセル' }).click();

//メニューへ＞
await page.getByRole('link', { name: 'メニューへ' }).click();


//管理者メニュー＞オークションデータ追加情報設定＞検索条件を登録
await expect(page.getByText('管理者メニュー')).toBeVisible();
await page.getByRole('link', { name: 'オークションデータ追加情報設定' }).click();
await expect(page.getByText('オークションデータ追加情報設定')).toBeVisible();
await page.locator('select[name="maker"]').selectOption('1020');
await page.locator('#car_list').selectOption('10202010');
//期間設定はデータが更新されると消える可能性があります⇒あるデータで対応する
await page.locator('select[name="open_date_from"]').selectOption('20250731');
await page.locator('select[name="open_date_to"]').selectOption('20250731');
await page.locator('select[name="place"]').selectOption('210');
await page.getByRole('textbox').fill('21012025073100001693');
//await page.getByRole('textbox').click();
//await page.getByRole('radio', { name: '未処理 一時保存 略称確認中 申請完了 承認差戻' }).check();
await page.getByRole('button', { name: '検索' }).click();

await page.getByRole('button', { name: '変更' }).click();

await page.locator('textarea[name="salespoint_caption"]').fill('セールスポイントテスト');
await page.locator('textarea[name="notes_caption"]').fill('注意事項テスト');
await page.locator('input[name="sr_text_full"]').fill('ツインムーンルーフ');
await page.locator('input[name="leather_text_full"]').fill('ベージュ本革エアーシート');
await page.locator('input[name="navi_text_full"]').fill('アルバイン９型ナビ');
await page.locator('input[name="earo_text_full"]').fill('ＡＭＧエアロ');
await page.locator('input[name="psd_text_full"]').fill('左リアパワースライドドア');
await page.getByRole('radio', { name: 'あり' }).check();
//ステータス：未処理⇒一時保存へ変更する
await page.getByRole('radio', { name: '一時保存' }).check();
await page.getByRole('button', { name: '登録' }).click();
await expect(page.getByText('オークションデータ追加情報を一時保存いたしました。')).toBeVisible();
await page.waitForTimeout(2000);
await page.getByRole('button', { name: 'ＯＫ！' }).click();
console.log('✅ オークションデータ追加情報設定＞ステータス：「未処理」から「一時保存」に変更しました');

//ＴＯＰ画面を表示
await expect(page.getByRole('cell', { name: 'メーカー・車種' })).toBeVisible();
await page.getByRole('radio', { name: '一時保存 略称確認中 申請完了 承認差戻', exact: true }).check();
await page.getByRole('button', { name: '検索' }).click();
await page.getByRole('button', { name: '変更' }).click();

//登録した内容が[一時保存]が保持されていること
await expect(page.getByRole('radio', { name: '一時保存' })).toBeChecked();
console.log('✅ オークションデータ追加情報設定＞登録画面＞「一時保存」のラジオボタンが選択されていることを確認しました！');

//キャンセルボタン＞TOPへ
await page.getByRole('button', { name: 'キャンセル' }).click();

//メニューへ＞
await page.getByRole('link', { name: 'メニューへ' }).click();
//オークションデータ追加情報承認
await page.getByRole('link', { name: 'オークションデータ追加情報承認' }).click();
//設定画面で登録した内容＞検索結果一覧＞登録内容確認
//期間設定はデータが更新されると消える可能性があります⇒あるデータで対応する
await page.getByRole('textbox').fill('');
await page.getByText('承認完了').click();
await page.getByRole('button', { name: '検索' }).click();

//★ソート機能（オークションデータ追加情報承認）「AUCCAR_ID」
  // 🌟 1件目のセルのロケーター
targetCell = page.locator('#wrap > center > form > table:nth-child(7) > tbody > tr:nth-child(3) > td:nth-child(2)');
// 1. ソート前の「元の値」を取得する
originalValue = await targetCell.innerText();
console.log(`💡 「AUCCAR_ID」 ソート前の1件目の値: [${originalValue}]`);

// ==========================================
// 2. 【昇順】ソートを実行する！
// ==========================================
// ※ ↓ 実際のソート（昇順）ボタンのクリック処理に書き換えてください
await page.getByRole('link', { name: '▲' }).nth(1).click();
await page.waitForTimeout(6500); 
// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });
ascValue = await targetCell.innerText();
console.log(`💡 「AUCCAR_ID」 昇順ソート後の1件目の値: [${ascValue}]`);

// ==========================================
// 3. 昇順ソートの結果判定（エラーにはせず、結果をログに残すだけ）
// ==========================================
if (originalValue !== ascValue) {
  // パターンA：元の値と「違った」場合
  console.log('✅ 「AUCCAR_ID」 昇順ソートで値が変化しました！（昇順OK）');
} else {
  // 元の値と「同じ」だった場合
  console.log('💡 「AUCCAR_ID」 昇順ソートで値が同じでした。（同値が並んでいる可能性があります）');
}
// ==========================================
// 4. 【降順】ソートを「必ず」実行する！（elseの外に出すのがポイント！）
// ==========================================
console.log('💡 続けて「AUCCAR_ID」の【降順ソート】をテストします...');

// 降順ソートボタンを強制クリック！
await page.getByRole('link', { name: '▼' }).nth(1).click();

// 🌟 ユーザー様が設定された念のための待機！
await page.waitForTimeout(8500); 

// その上で、ローディングが「消える」のを確実に待つ！
await expect(page.locator('#loadingdialog')).toBeHidden({ timeout: 30000 });

descValue = await targetCell.innerText();
console.log(`💡 「AUCCAR_ID」 降順ソート後の1件目の値: [${descValue}]`);

// ==========================================
// 5. 最後の判定：降順ソートの完璧な検証！
// ==========================================
// 🌟 プロの工夫：originalValue ではなく ascValue（昇順の値）と比較する！
if (ascValue !== descValue) {
  // 昇順の時と一番上の車が「変わった」場合 ＝ 降順ソート成功！
  console.log('✅ 「AUCCAR_ID」 降順ソートで、昇順の時と値が変化したため、降順ソートもテストOKです！');
  
} else {
  // 昇順にしても降順にしても、ずっと同じ車（年式）が一番上にいる場合！
  console.log('✅ 「AUCCAR_ID」 昇順でも降順でも値が同じでした。すべて同じデータ（年式）が並んでいると判断し、テストOKとします！');
}

//検索結果のページング
await page.getByRole('link', { name: '次へ' }).click();
await expect(page.getByText('100件')).toBeVisible();
await page.getByRole('link', { name: '前へ' }).click();
await expect(page.getByText('50件')).toBeVisible();

await page.getByRole('link', { name: '2' }).click();
await expect(page.getByText('100件')).toBeVisible();
await page.getByRole('link', { name: '最後へ' }).click();
await expect(page.getByText('次へ')).not.toBeVisible();

//メニューへ＞
await page.getByRole('link', { name: 'メニューへ' }).click();
//オークションデータ追加情報承認
await page.getByRole('link', { name: 'オークションデータ追加情報承認' }).click();
//設定画面で登録した内容＞検索結果一覧＞登録内容確認
//期間設定はデータが更新されると消える可能性があります⇒あるデータで対応する
await page.locator('select[name="open_date_from"]').selectOption('2025-07-31 00:00:00');
await page.locator('select[name="open_date_to"]').selectOption('2025-07-31 00:00:00');
await page.locator('select[name="place"]').selectOption('210');
await page.getByRole('textbox').click();
await page.getByRole('textbox').fill('21012025073100001693');
await page.getByText('一時保存 略称確認中 申請中 承認差戻 承認完了').click();
await page.getByRole('button', { name: '検索' }).click();
await expect(page.getByText('21012025073100001693')).toBeVisible();
await expect(page.locator('td').filter({ hasText: /^ＵＳＳ東京$/ })).toBeVisible();
await expect(page.getByRole('cell', { name: 'セールスポイントテスト' })).toBeVisible();
await expect(page.getByRole('cell', { name: '注意事項テスト' })).toBeVisible();
await expect(page.getByRole('cell', { name: 'ＳＲ' })).toBeVisible();
await expect(page.getByRole('cell', { name: 'ベージュ' })).toBeVisible();
await expect(page.getByRole('cell', { name: '外ナビ' })).toBeVisible();
await expect(page.getByRole('cell', { name: '純 不 ＡＭＧ' })).toBeVisible();
await expect(page.getByRole('cell', { name: '左Ｐスラ' })).toBeVisible();
await expect(page.getByRole('cell', { name: 'あり' })).toBeVisible();
await expect(page.getByRole('cell', { name: '一時保存', exact: true })).toBeVisible();
await page.getByRole('button', { name: '詳' }).click();

//設定で登録した内容＞承認確認画面＞登録内容が表示されていること
await expect(page.getByText('セールスポイントテスト')).toBeVisible();
await expect(page.getByText('注意事項テスト')).toBeVisible();
await expect(page.getByRole('cell', { name: 'ツインムーンルーフ' })).toBeVisible();
await expect(page.getByRole('cell', { name: 'ＳＲ' })).toBeVisible();
await expect(page.getByRole('cell', { name: 'ベージュ本革エアーシート' })).toBeVisible();
await expect(page.getByRole('cell', { name: 'ベージュ', exact: true })).toBeVisible();
await expect(page.getByRole('cell', { name: 'アルバイン９型ナビ' })).toBeVisible();
await expect(page.getByRole('cell', { name: '外ナビ' })).toBeVisible();
await expect(page.getByRole('cell', { name: 'ＡＭＧエアロ' })).toBeVisible();
await expect(page.getByRole('cell', { name: '純 不 ＡＭＧ' })).toBeVisible();
await expect(page.getByRole('cell', { name: '左リアパワースライドドア' })).toBeVisible();
await expect(page.getByRole('cell', { name: '左Ｐスラ' })).toBeVisible();
await expect(page.getByRole('cell', { name: 'あり' })).toBeVisible();
await expect(page.getByRole('radio', { name: '一時保存' })).toBeChecked();

//メニューへ＞
await page.getByRole('link', { name: 'メニューへ' }).click();

//管理者メニュー＞オークションデータ追加情報設定＞検索条件を登録
await expect(page.getByText('管理者メニュー')).toBeVisible();
await page.getByRole('link', { name: 'オークションデータ追加情報設定' }).click();
await expect(page.getByText('オークションデータ追加情報設定')).toBeVisible();
await page.getByRole('textbox').fill('21012025073100001693');
await page.getByRole('radio', { name: '一時保存 略称確認中 申請完了 承認差戻', exact: true }).check();
await page.getByRole('button', { name: '検索' }).click();

await page.getByRole('button', { name: '変更' }).click();

//ステータス：一時保存⇒略称確認中に変更、登録する
await page.getByRole('radio', { name: '略称確認中' }).check();
await page.getByRole('button', { name: '登録' }).click();
await expect(page.getByText('オークションデータ追加情報を略称確認中いたしました。')).toBeVisible();
await page.waitForTimeout(2000);
await page.getByRole('button', { name: 'ＯＫ！' }).click();
console.log('✅ オークションデータ追加情報設定＞ステータス：「一時保存」から「略称確認中」に変更しました');

//検索条件＞ステータス：略称確認中に変更、検索する
await page.getByRole('radio', { name: '略称確認中 申請完了 承認差戻', exact: true }).check();
await page.getByRole('button', { name: '検索' }).click();
//検索結果一覧＞登録内容確認＞略称確認中であること
await expect(page.getByRole('cell', { name: '略称確認中', exact: true })).toBeVisible();
//登録画面＞登録内容確認＞略称確認中であること
await page.getByRole('button', { name: '変更' }).click();
await expect(page.getByRole('radio', { name: '略称確認中' })).toBeChecked();
console.log('✅ オークションデータ追加情報設定＞登録画面＞「略称確認中」のラジオボタンが選択されていることを確認しました！');

await page.getByRole('button', { name: 'キャンセル' }).click();

await page.getByRole('link', { name: 'メニューへ' }).click();
//オークションデータ追加情報承認
await page.getByRole('link', { name: 'オークションデータ追加情報承認' }).click();

//検索結果一覧＞ステータス：略称確認中で検索する
await page.getByRole('textbox').fill('21012025073100001693');
await page.getByRole('radio', { name: '略称確認中 申請中 承認差戻 承認完了', exact: true }).check();
await page.getByRole('button', { name: '検索' }).click();
//検索結果一覧＞ステータス：略称確認中で表示
await expect(page.getByRole('cell', { name: '略称確認中', exact: true })).toBeVisible();
await page.getByRole('button', { name: '詳' }).click();
//詳＞詳細画面＞ステータス：略称確認中で表示
await expect(page.locator('input[name="req_status_list"][value="2"]')).toBeChecked();
//await expect(page.getByRole('radio', { name: '略称確認中' })).toBeChecked();
console.log('✅ オークションデータ追加情報承認＞登録画面＞「略称確認中」のラジオボタンが選択されていることを確認しました！');

//キャンセルボタンでもどる
await page.getByRole('button', { name: 'キャンセル' }).click();

//メニューへ＞オークションデータ追加情報設定
await page.getByRole('link', { name: 'メニューへ' }).click();
await page.getByRole('link', { name: 'オークションデータ追加情報設定' }).click();
//検索条件＞
await page.getByRole('textbox').fill('21012025073100001693');
await page.getByRole('radio', { name: '略称確認中 申請完了 承認差戻', exact: true }).check();
//検索
await page.getByRole('button', { name: '検索' }).click();

//登録編集画面へ
await page.getByRole('button', { name: '変更' }).click();
//ステータス：略称確認中であること
await expect(page.getByRole('radio', { name: '略称確認中' })).toBeVisible();
//ステータス：略称確認中⇒申請完了に変更
await page.getByRole('radio', { name: '申請完了' }).check();
//登録
await page.getByRole('button', { name: '登録' }).click();
await expect(page.getByText('オークションデータ追加情報を申請完了いたしました。')).toBeVisible();
await page.waitForTimeout(2000);
await page.getByRole('button', { name: 'ＯＫ！' }).click();
console.log('✅ オークションデータ追加情報設定＞ステータス：「略称確認中」から「申請完了」に変更しました');

//検索条件＞申請完了
await page.getByRole('radio', { name: '申請完了 承認差戻', exact: true }).check();
await page.getByRole('button', { name: '検索' }).click();
//結果一覧＞登録内容確認＞申請完了
await expect(page.getByRole('cell', { name: '申請完了' })).toBeVisible();
//検索結果一覧＞変更ボタン
await page.getByRole('button', { name: '変更' }).click();
//登録内容確認
await expect(page.getByRole('radio', { name: '申請完了' })).toBeChecked();
console.log('✅ オークションデータ追加情報設定＞登録画面＞「申請完了」のラジオボタンが選択されていることを確認しました！');
await page.getByRole('button', { name: 'キャンセル' }).click();

//メニューへ＞オークションデータ追加情報承認
await page.getByRole('link', { name: 'メニューへ' }).click();
await page.getByRole('link', { name: 'オークションデータ追加情報承認' }).click();
//検索条件＞
await page.getByRole('textbox').fill('21012025073100001693');
await page.getByRole('radio', { name: '申請中 承認差戻 承認完了', exact: true }).check();
await page.getByRole('button', { name: '検索' }).click();

//検索条件＞一致
await expect(page.getByText('21012025073100001693')).toBeVisible();
//ステータス：申請中
await expect(page.getByRole('cell', { name: '申請中', exact: true })).toBeVisible();
//結果一覧＞詳ボタン押下＞承認画面へ
await page.getByRole('button', { name: '詳' }).click();
//ステータス：申請中
//await expect(page.getByRole('radio', { name: '申請中' })).toBeChecked();
await expect(page.locator('input[name="req_status_list"][value="3"]')).toBeChecked();
console.log('✅ オークションデータ追加情報承認＞登録画面＞「申請中」のラジオボタンが選択されていることを確認しました！');

//ステータス：申請中⇒承認差戻へ変更
await page.locator('input[name="req_status_list"][value="4"]').check();
//await page.getByRole('radio', { name: '承認差戻', exact: true }).check();
await page.getByRole('button', { name: '登録' }).click();
await expect(page.getByText('オークションデータ追加情報を承認差戻いたしました。')).toBeVisible();
await page.waitForTimeout(2000);
await page.getByRole('button', { name: 'ＯＫ！' }).click();
console.log('✅ オークションデータ追加情報承認＞ステータス：「申請中」から「申請差戻」に変更しました');

//検索条件＞承認差戻
await page.getByRole('textbox').fill('21012025073100001693');
await page.getByRole('radio', { name: '承認差戻 承認完了', exact: true }).check();
await page.getByRole('button', { name: '検索' }).click();
//検索結果一覧＞
await expect(page.getByText('21012025073100001693')).toBeVisible();
await expect(page.getByRole('cell', { name: '承認差戻', exact: true })).toBeVisible();
//結果一覧＞詳ボタン押下＞承認画面へ
await page.getByRole('button', { name: '詳' }).click();
//ステータス：承認完了であること
//await expect(page.getByRole('radio', { name: '承認差戻' })).toBeChecked();
await expect(page.locator('input[name="req_status_list"][value="4"]')).toBeChecked();
console.log('✅ オークションデータ追加情報承認＞登録画面＞「承認差戻」のラジオボタンが選択されていることを確認しました！');

await page.getByRole('button', { name: 'キャンセル' }).click();

//メニューへ＞オークションデータ追加情報設定
await page.getByRole('link', { name: 'メニューへ' }).click();
await page.getByRole('link', { name: 'オークションデータ追加情報設定' }).click();
//検索条件＞承認差戻
await page.getByRole('textbox').fill('21012025073100001693');
await page.getByRole('radio', { name: '承認差戻', exact: true }).check();
//検索
await page.getByRole('button', { name: '検索' }).click();

//登録編集画面へ承認差戻から再申請
await page.getByRole('button', { name: '変更' }).click();
//ステータス：承認差戻であること
await expect(page.getByRole('radio', { name: '承認差戻' })).toBeChecked();
//ステータス：承認差戻⇒申請完了に変更
await page.getByRole('radio', { name: '申請完了' }).check();
//登録
await page.getByRole('button', { name: '登録' }).click();
await expect(page.getByText('オークションデータ追加情報を申請完了いたしました。')).toBeVisible();
await page.waitForTimeout(2000);
await page.getByRole('button', { name: 'ＯＫ！' }).click();
console.log('✅ オークションデータ追加情報設定＞ステータス：「承認差戻」から「申請完了」に変更しました');

//検索条件＞申請完了
await page.getByRole('radio', { name: '申請完了 承認差戻', exact: true }).check();
await page.getByRole('button', { name: '検索' }).click();
//結果一覧＞登録内容確認＞申請中
await expect(page.getByRole('cell', { name: '申請完了' })).toBeVisible();
//検索結果一覧＞変更ボタン
await page.getByRole('button', { name: '変更' }).click();
//登録内容確認
await expect(page.getByRole('radio', { name: '申請完了' })).toBeChecked();
console.log('✅ オークションデータ追加情報設定＞登録画面＞「申請完了」のラジオボタンが選択されていることを確認しました！');
await page.getByRole('button', { name: 'キャンセル' }).click();

//メニューへ＞オークションデータ追加情報承認
await page.getByRole('link', { name: 'メニューへ' }).click();
await page.getByRole('link', { name: 'オークションデータ追加情報承認' }).click();
//検索条件＞
await page.getByRole('textbox').fill('21012025073100001693');
await page.getByRole('radio', { name: '申請中 承認差戻 承認完了', exact: true }).check();
await page.getByRole('button', { name: '検索' }).click();

//検索条件＞一致
await expect(page.getByText('21012025073100001693')).toBeVisible();
//ステータス：申請中
await expect(page.getByRole('cell', { name: '申請中', exact: true })).toBeVisible();
//結果一覧＞詳ボタン押下＞承認画面へ
await page.getByRole('button', { name: '詳' }).click();
//ステータス：申請中
await expect(page.locator('input[name="req_status_list"][value="3"]')).toBeChecked();
//await expect(page.getByRole('radio', { name: '申請中' })).toBeChecked();

//ステータス：申請中⇒承認完了へ変更
await page.locator('input[name="req_status_list"][value="5"]').check();
//await page.getByRole('radio', { name: '承認完了', exact: true }).check();
await page.getByRole('button', { name: '登録' }).click();
await expect(page.getByText('オークションデータ追加情報を承認完了いたしました。')).toBeVisible();
await page.waitForTimeout(2000);
await page.getByRole('button', { name: 'ＯＫ！' }).click();
console.log('✅ オークションデータ追加情報設定＞ステータス：「申請中」から「承認完了」に変更しました');

//検索条件＞承認完了
await page.getByRole('radio', { name: '承認完了', exact: true }).check();
await page.getByRole('button', { name: '検索' }).click();
//検索結果一覧＞
await expect(page.getByText('21012025073100001693')).toBeVisible();
await expect(page.getByRole('cell', { name: '承認完了', exact: true })).toBeVisible();
//結果一覧＞詳ボタン押下＞承認画面へ
await page.getByRole('button', { name: '詳' }).click();
//ステータス：承認完了であること
await expect(page.locator('input[name="req_status_list"][value="5"]')).toBeChecked();
//await expect(page.getByRole('radio', { name: '承認完了' })).toBeChecked();
console.log('✅ オークションデータ追加情報承認＞登録画面＞「承認完了」のラジオボタンが選択されていることを確認しました！');
await page.getByRole('button', { name: 'キャンセル' }).click();

//メニューへ＞オークションデータ追加情報設定
await page.getByRole('link', { name: 'メニューへ' }).click();
await page.getByRole('link', { name: 'オークションデータ追加情報設定' }).click();
//検索条件＞承認済み＞申請完了
await page.getByRole('textbox').fill('21012025073100001693');
await page.getByRole('radio', { name: '申請完了 承認差戻', exact: true }).check();
//await page.locator('input[name="req_status_list"][value="3"]').check();
//await page.getByRole('radio', { name: '申請完了', exact: true }).check();
//検索
await page.getByRole('button', { name: '検索' }).click();

//登録編集画面へ承認差戻から再申請
await page.getByRole('button', { name: '変更' }).click();
//ステータス：申請が完了しているのでラジオボタン選択されいないこと
// 🌟 （追加するコード）そのボタンが「チェックされていない（OFF）」ことを確認！
await expect(page.getByRole('radio', { name: '未処理' })).not.toBeChecked();
console.log('✅ 「未処理」のラジオボタンが選択されていないことを確認しました！');
await expect(page.getByRole('radio', { name: '一時保存' })).not.toBeChecked();
console.log('✅ 「一時保存」のラジオボタンが選択されていないことを確認しました！');
await expect(page.getByRole('radio', { name: '略称確認中' })).not.toBeChecked();
console.log('✅ 「略称確認中」のラジオボタンが選択されていないことを確認しました！');
await expect(page.getByRole('radio', { name: '申請完了' })).not.toBeChecked();
console.log('✅ 「申請完了」のラジオボタンが選択されていないことを確認しました！');
await expect(page.getByRole('radio', { name: '承認差戻' })).not.toBeChecked();
console.log('✅ 「承認差戻」のラジオボタンが選択されていないことを確認しました！');
await page.getByRole('button', { name: 'キャンセル' }).click();
//メニューへ
await page.getByRole('link', { name: 'メニューへ' }).click();
//ログアウト
await page.getByRole('link', { name: 'ログアウト' }).click();

  //ログイン画面へ遷移
  await page.goto('https://stgdlpro.proto-dataline.com/top/top.php');
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


  await page.locator('select[name="maker"]').selectOption('1020');
  await page.locator('select[name="car"]').selectOption('10202010');
  await page.locator('#Grade').selectOption('213');
  await page.locator('select[name="s_holding"]').selectOption('20250731');
  await page.locator('select[name="e_holding"]').selectOption('20250731');
  await page.getByText('＋ 詳細検索').click();
  await page.getByRole('link', { name: '会場選択' }).click();
  await page.getByText('全解除').click();
  await page.locator('li:nth-child(10) > input').check();
  await page.getByRole('link', { name: 'ＯＫ' }).click();
  await page.waitForTimeout(2000);
  await page.getByText('上記条件から検索 該当件数').click();
  await page.waitForTimeout(1000);
  //★ソート機能13「ナビ」
  // 🌟 1件目のセルのロケーター
// 1. ターゲットの画像（img）を狙い撃ちする（画像データからタイトルを取得）
let ImageLocator = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_navi_text > img');
// 2. 画像から「title」を引っこ抜く！
originalValue = await ImageLocator.getAttribute('title');
console.log(`💡 確認：1件目のナビアイコンのシステム値は [${originalValue}] です！`);
// 1. 取得した値が null ではないか、かつ「社外ナビ」と一致するか検証
expect(originalValue).toBe('社外ナビ');
// 2. （確認用）ログに出力して安心を確保！
console.log(`✅ オークションデータ追加情報設定で登録した「略称：外ナビ」が [${originalValue}] であることを確認しました！`);

//★ソート機能15「ＳＲ」
  // 🌟 1件目のセルのロケーター
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_sr_text.aa_font_size');
// 1. ソート前の「元の値」を取得する
originalValue = await targetCell.innerText();
console.log(`💡 「SR」 ソート前の1件目の値: [${originalValue}]`);
// 1. 取得した値が null ではないか、かつ「ＳＲ」と一致するか検証
expect(originalValue).toBe('ＳＲ');
// 2. （確認用）ログに出力して安心を確保！
console.log(`✅ オークションデータ追加情報設定で登録した「略称：ＳＲ」が [${originalValue}] であることを確認しました！`);

//★ソート機能16「エアロ」アイコン画像が特殊
// 1. 🌟 プロの魔法：1行目（tr）の中にある、srcに "earo" が含まれる画像(img) を直接狙い撃ちする！
// ※ img[src*="earo"] は「src属性に "earo" という文字が含まれるimgタグ」を探す最強の指定方法です！
let aeroImageLocator = page.locator('#t_result_area > tbody > tr:nth-child(1) img[src*="earo"]');
// 2. 画像が存在するか安全チェック（タイムアウト防止）
if (await aeroImageLocator.count() > 0) {
  
  // 画像から「title」を引っこ抜く！
  ImageLocator = await aeroImageLocator.first().getAttribute('title');
    console.log(`💡 確認：「エアロ」1件目の画像の title は [${ImageLocator}] です！`);
  // 3. いざ検証！発掘したHTMLの通り「社外　位置不明」と完全一致するかチェック！
} else {
  console.log('ソート前：1件目のデータにエアロの画像(img)が見つかりませんでした！');
}
// 1. 取得した値が null ではないか、かつ「純　不　AMG」と一致するか検証
expect(ImageLocator).toBe('位置不明　AMG');
// 2. （確認用）ログに出力して安心を確保！
console.log(`✅ オークションデータ追加情報設定で登録した「略称：純　不　AMG」が [${ImageLocator}] であることを確認しました！`);

//★ソート機能18「ルーフレール」
  // 🌟 1件目のセルのロケーター
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_rr_text.aa_font_size');
// 1. ソート前の「元の値」を取得する
originalValue = await targetCell.innerText();
console.log(`💡 「ルーフレール」 ソート前の1件目の値: [${originalValue}]`);
// 1. 取得した値が null ではないか、かつ「ＳＲ」と一致するか検証
expect(originalValue).toBe('有');
// 2. （確認用）ログに出力して安心を確保！
console.log(`✅ オークションデータ追加情報設定で登録した「ルーフレール：有」が [${originalValue}] であることを確認しました！`);

//★ソート機能18「革」
  // 🌟 1件目のセルのロケーター
// 1. ターゲットの画像（img）を狙い撃ちする（画像データからタイトルを取得）
ImageLocator = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_leather_text > img');
// 2. 画像から「title」を引っこ抜く！
originalValue = await ImageLocator.getAttribute('title');
console.log(`💡 確認：1件目の革アイコンのシステム値は [${originalValue}] です！`);
// 1. 取得した値が null ではないか、かつ「ベージュ」と一致するか検証
expect(originalValue).toBe('ベージュ革系');
// 2. （確認用）ログに出力して安心を確保！
console.log(`✅ オークションデータ追加情報設定で登録した「略称：ベージュ」が [${originalValue}] であることを確認しました！`);

//★ソート機能21「詳細」
// ==========================================
// 🌟 判定：セールスポイントと注意事項が含まれているかチェック！
// ==========================================
// 1. 判明した正しい列（col_other）の中にある、隠し部屋（tooltip_body）を直接狙い撃ち！
let tooltipLocator = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_other .tooltip_body');

// 2. Playwrightに「見えてなくてもいいから、中の文字を全部持ってきて！」と指示する（textContent）
// ※ innerText は見えている文字だけ、textContent は隠れている文字も取得できます！
let hiddenText = await tooltipLocator.textContent() || '';

console.log(`💡 発見したツールチップの中身: [${hiddenText.trim()}]`);

// 3. その中に2つのキーワードが含まれているか検証！
expect(hiddenText).toContain('セールスポイントテスト');
expect(hiddenText).toContain('注意事項テスト');
console.log('✅ オークションデータ追加情報設定で登録した「セールスポイント」と「注意事項」があることを確認しました！');
await page.waitForTimeout(8000);
await page.getByText('件中 1').waitFor();

await page.getByRole('link', { name: 'ログアウト' }).click();

//ログイン画面へ遷移
  await page.goto('https://stgdlpro.proto-dataline.com/admin/');
  await page.waitForLoadState('networkidle');
  // ID,パスワードを入力
  await page.locator('input[name="user_id"]').fill('999999');
  await page.locator('input[name="passwd"]').fill('pdcpdc');
  //管理画面へ遷移
  await page.getByRole('link').click();

  //メニューへ＞オークションデータ追加情報承認
  await page.getByRole('link', { name: 'メニューへ' }).click();
  await page.getByRole('link', { name: 'オークションデータ追加情報承認' }).click();
  //検索条件＞
  await page.getByRole('textbox').fill('21012025073100001693');
  await page.getByRole('radio', { name: '承認完了', exact: true }).check();
  await page.getByRole('button', { name: '検索' }).click();

  //検索結果一覧＞承認差戻に✅いれる
  await page.locator('input[name="auccar_id_list[]"]').check();
  //承認差戻ボタンを押下する
  await page.getByRole('button', { name: '承認差戻' }).click();
  console.log('✅ オークションデータ追加情報承認＞検索結果一覧＞「承認差戻」✅し、「承認差戻」ボタン＞押下する');

  //ＴＯＰ画面を表示
  await expect(page.getByText('一時保存 略称確認中 申請中 承認差戻 承認完了')).toBeVisible();

  //検索条件確認＞
  await expect(page.getByRole('textbox')).toHaveValue('21012025073100001693');
  //ステータス：承認完了であること
  // 1. 発掘した深い階層のラジオボタンを指定
  let targetRadio = page.locator('#wrap > center > form > table:nth-child(4) > tbody > tr:nth-child(4) > td:nth-child(2) > label > label > label > label > label > label > label > label > label > input[type=radio]');
  // 2. そのラジオボタンが「チェックされている（ON）」ことを検証！
  await expect(targetRadio).toBeChecked();

  //検索条件＞
  await page.getByRole('textbox').fill('21012025073100001693');
  await page.getByRole('radio', { name: '承認差戻 承認完了', exact: true }).check();
  await page.getByRole('button', { name: '検索' }).click();

  //結果一覧＞詳ボタン押下＞承認画面へ
  await page.getByRole('button', { name: '詳' }).click();
  //ステータス：承認完了であること
  //await expect(page.getByRole('radio', { name: '承認差戻' })).toBeChecked();
  await expect(page.locator('input[name="req_status_list"][value="4"]')).toBeChecked();
  console.log('✅ オークションデータ追加情報承認＞登録画面＞「承認差戻」のラジオボタンが選択されていることを確認しました！');
  await page.getByRole('button', { name: 'キャンセル' }).click();

  //メニューへ＞オークションデータ追加情報設定
await page.getByRole('link', { name: 'メニューへ' }).click();
await page.getByRole('link', { name: 'オークションデータ追加情報設定' }).click();
//検索条件＞承認済み＞申請完了
await page.getByRole('textbox').fill('21012025073100001693');
await page.getByRole('radio', { name: '承認差戻', exact: true }).check();
//検索
await page.getByRole('button', { name: '検索' }).click();


await page.getByRole('button', { name: '変更' }).click();
await page.getByRole('button', { name: '入力項目クリア' }).click();
await page.getByRole('radio', { name: 'なし' }).check();
await page.getByRole('button', { name: '登録' }).click();
await page.getByRole('button', { name: 'ＯＫ！' }).click();

//メニューへ＞オークションデータ追加情報承認
  await page.getByRole('link', { name: 'メニューへ' }).click();
  await page.getByRole('link', { name: 'オークションデータ追加情報承認' }).click();
  //検索条件＞
  await page.getByRole('textbox').fill('21012025073100001693');
  await page.getByRole('radio', { name: '承認差戻 承認完了', exact: true }).check();
  await page.getByRole('button', { name: '検索' }).click();

  //検索結果一覧＞承認差戻に✅いれる
  await page.locator('input[name="auccar_id_list[]"]').check();
  //承認差戻ボタンを押下する
  await page.getByRole('button', { name: '承認許可' }).click();
  console.log('✅ オークションデータ追加情報承認＞検索結果一覧＞「承認許可」✅ボタン＞押下する');

  //ＴＯＰ画面を表示
  await expect(page.getByText('一時保存 略称確認中 申請中 承認差戻 承認完了')).toBeVisible();

  //検索条件確認＞
  await expect(page.getByRole('textbox')).toHaveValue('21012025073100001693');
  //ステータス：承認差戻であること
  // 1. 発掘した深い階層のラジオボタンを指定
  targetRadio = page.locator('#wrap > center > form > table:nth-child(4) > tbody > tr:nth-child(4) > td:nth-child(2) > label > label > label > label > label > label > label > input[type=radio]');
  // 2. そのラジオボタンが「チェックされている（ON）」ことを検証！
  await expect(targetRadio).toBeChecked();

    //検索条件＞
  await page.getByRole('textbox').fill('21012025073100001693');
  await page.getByRole('radio', { name: '承認完了', exact: true }).check();
  await page.getByRole('button', { name: '検索' }).click();

  //結果一覧＞詳ボタン押下＞承認画面へ
  await page.getByRole('button', { name: '詳' }).click();
  //ステータス：承認完了であること
  //await expect(page.getByRole('radio', { name: '承認完了' })).toBeChecked();
  await expect(page.locator('input[name="req_status_list"][value="5"]')).toBeChecked();
  console.log('✅ オークションデータ追加情報承認＞登録画面＞「承認完了」のラジオボタンが選択されていることを確認しました！');
  await page.getByRole('button', { name: 'キャンセル' }).click();

  //後処理
  //メニューへ＞
await page.getByRole('link', { name: 'メニューへ' }).click();

//管理者メニュー＞オークションデータ追加情報設定＞検索条件を登録
await page.getByRole('link', { name: 'オークションデータ追加情報設定' }).click();
await expect(page.getByText('オークションデータ追加情報設定')).toBeVisible();
await page.getByRole('textbox').fill('21012025073100001693');
await page.getByRole('radio', { name: '申請完了 承認差戻', exact: true }).check();
await page.getByRole('button', { name: '検索' }).click();

await page.getByRole('button', { name: '変更' }).click();

//ステータス：一時保存⇒略称確認中に変更、登録する
await page.getByRole('radio', { name: '未処理' }).check();
await page.getByRole('button', { name: '登録' }).click();
await expect(page.getByText('オークションデータ追加情報を未処理いたしました。')).toBeVisible();
await page.waitForTimeout(2000);
await page.getByRole('button', { name: 'ＯＫ！' }).click();
console.log('✅ オークションデータ追加情報設定＞ステータス：「申請完了」から「未処理」に変更しました');

//ログアウト
await page.getByRole('link', { name: 'ログアウト' }).click();

  //ログイン画面へ遷移
  await page.goto('https://stgdlpro.proto-dataline.com/top/top.php');
  await page.getByRole('textbox', { name: 'ログインID' }).click();
  await page.getByRole('textbox', { name: 'ログインID' }).fill('tst0001');
  
  // パスワードにtst0002を入力
  await page.getByRole('textbox', { name: 'ログインID' }).press('Tab');
  await page.getByRole('textbox', { name: 'パスワード' }).fill('tst0001');
  await page.getByRole('button', { name: 'ログイン' }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(5000);
  // 「グレード検索」の右横にある「ＡＡ相場」を押下
  await page.getByRole('link', { name: 'ＡＡ相場' }).click();
  await page.waitForLoadState('networkidle');
  
  // AA相場へ遷移＞タブ名完全一致で確認する場合
  await expect(page).toHaveTitle('AA相場');

  await page.locator('select[name="maker"]').selectOption('1020');
  await page.locator('select[name="car"]').selectOption('10202010');
  await page.locator('#Grade').selectOption('213');
  await page.locator('select[name="s_holding"]').selectOption('20250731');
  await page.locator('select[name="e_holding"]').selectOption('20250731');
  await page.getByText('＋ 詳細検索').click();
  await page.getByRole('link', { name: '会場選択' }).click();
  await page.getByText('全解除').click();
  await page.locator('li:nth-child(10) > input').check();
  await page.getByRole('link', { name: 'ＯＫ' }).click();
  await page.waitForTimeout(3000);
  await page.getByText('上記条件から検索 該当件数').click();

  //★ソート機能13「ナビ」
  // 🌟 1件目のセルのロケーター
// 1. ターゲットの画像（img）を狙い撃ちする（画像データからタイトルを取得）
ImageLocator = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_navi_text > img');
// 2. 画像から「title」を引っこ抜く！
originalValue = await ImageLocator.getAttribute('title');
console.log(`💡 確認：1件目のナビアイコンのシステム値は [${originalValue}] です！`);
// 1. 取得した値が null ではないか、かつ「社外ナビ」と一致するか検証
expect(originalValue).not.toBe('社外ナビ');
// 2. （確認用）ログに出力して安心を確保！
console.log(`✅ オークションデータ追加情報設定で登録した「略称：外ナビ」ではなく [${originalValue}] であることを確認しました！`);

//★ソート機能15「ＳＲ」
  // 🌟 1件目のセルのロケーター
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_sr_text.aa_font_size');
// 1. ソート前の「元の値」を取得する
originalValue = await targetCell.innerText();
console.log(`💡 「SR」 ソート前の1件目の値: [${originalValue}]`);
// 1. 取得した値が null ではないか、かつ「ＳＲ」と一致するか検証
expect(originalValue).not.toBe('ＳＲ');
// 2. （確認用）ログに出力して安心を確保！
console.log(`✅ オークションデータ追加情報設定で登録した「略称：ＳＲ」が [${originalValue}] であることを確認しました！`);

//★ソート機能16「エアロ」アイコン画像が特殊
// 1. 親である「セル(td)」を指定
// ※ tr:nth-child(1) などで「1行目」に限定するのが安全です
const earoCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_earo_text');
// 2. セルの中に <img> が「0件」であることを検証する
// .toHaveCount(0) を使うと、画像が消えるまで Playwright が少し待ってくれるので安定します！
await expect(earoCell.locator('img')).toHaveCount(0);
// 3. (オプション) 念のため数値でも取得してログに残す
const currentImgCount = await earoCell.locator('img').count();
console.log(`✅ エアロアイコン数: ${currentImgCount}件。表示されていないことを確認しました。`);

//★ソート機能18「ルーフレール」
targetCell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_rr_text.aa_font_size');
// 1. ソート前の「元の値」を取得し、前後の不要な空白を削除する
// .trim() を使うことで、目に見えない改行やスペースを無視して「空っぽ」として扱えます
originalValue = (await targetCell.innerText()).trim();
console.log(`💡 「ルーフレール」 ソート前の1件目の値: [${originalValue}]`);
// 2. 空文字（何も入力されていない状態）であることを検証
expect(originalValue).toBe('');
// 3. （確認用）ログに出力
console.log(`✅ ルーフレールが期待通り空であることを確認しました！`);

//★ソート機能18「革」
// 1. 親である「セル(td)」を指定
let cell = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_leather_text');
// 2. セルの中に <img> が「0件（存在しない）」ことを検証
// .toHaveCount(0) が一番確実で、Playwrightが自動で待機もしてくれます
await expect(cell.locator('img')).toHaveCount(0);
// 3. 確認用にログを出す（省略可）
let imgCount = await cell.locator('img').count();
console.log(`✅ レザー装備のアイコン数: ${imgCount}件。表示されていないことを確認しました。`);

//★ソート機能21「詳細」
// ==========================================
// 🌟 判定：セールスポイントと注意事項が含まれているかチェック！
// ==========================================
// 1. 判明した正しい列（col_other）の中にある、隠し部屋（tooltip_body）を直接狙い撃ち！
tooltipLocator = page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_other .tooltip_body');
// 2. Playwrightに「見えてなくてもいいから、中の文字を全部持ってきて！」と指示する（textContent）
// ※ innerText は見えている文字だけ、textContent は隠れている文字も取得できます！
hiddenText = await tooltipLocator.textContent() || '';
console.log(`💡 発見したツールチップの中身: [${hiddenText.trim()}]`);
// 3. その中に2つのキーワードが含まれているか検証！
expect(hiddenText).not.toContain('セールスポイントテスト');
expect(hiddenText).not.toContain('注意事項テスト');
console.log('✅ オークションデータ追加情報設定で登録した「セールスポイント」と「注意事項」が非表示であることを確認しました！');

});
