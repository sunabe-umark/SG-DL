import { test, expect } from '@playwright/test';

//DLP回帰テスト-AA相場検索-グレード検索＞AA相場検索
//ログイン画面

test('test', async ({ page }) => {
// ▼ この行を追加（テストの制限時間を60秒に変更）
  test.setTimeout(120000);

  //ログイン画面へ遷移
  await page.goto('https://devdlpro.proto-dataline.com/top/top.php');
  await page.getByRole('textbox', { name: 'ログインID' }).click();
  await page.getByRole('textbox', { name: 'ログインID' }).fill('tst0002');
  
  // パスワードにtst0002を入力
  await page.getByRole('textbox', { name: 'ログインID' }).press('Tab');
  await page.getByRole('textbox', { name: 'パスワード' }).fill('tst0002');
  await page.getByRole('button', { name: 'ログイン' }).click();
  await page.waitForLoadState('networkidle');
  
  // 「グレード検索」の右横にある「ＡＡ相場」を押下
  await page.getByRole('link', { name: 'ＡＡ相場' }).click();
  await page.waitForLoadState('networkidle');
  
  // メーカー「トヨタ」を選択
  const makerSelect = page.locator('select').first();
  await makerSelect.selectOption({ label: 'トヨタ' });
  await page.waitForTimeout(500);
  // 車種「アクア」を選択
await page.locator('select[name="car"]').selectOption('10101073');
await page.goto('https://devdlpro.proto-dataline.com/aa/aa.php#19c1ca72e9c4e1c');

await page.locator('#Model').selectOption('13');
await page.locator('#Model').selectOption([]);
await page.goto('https://devdlpro.proto-dataline.com/aa/aa.php#19c1cb572c31573f');
await page.locator('#Grade').selectOption('15');
await page.goto('https://devdlpro.proto-dataline.com/aa/aa.php#19c1cb5c0bb9552');
await page.locator('select[name="s_year"]').selectOption('2011');
await page.locator('select[name="s_tmonth"]').selectOption('1');

await page.locator('select[name="e_year"]').selectOption('2018');
await page.locator('select[name="e_year2"]').selectOption('3');

await page.locator('select[name="s_running"]').selectOption('1');
await page.locator('select[name="e_running"]').selectOption('150');
await page.locator('#Shift').selectOption('1');
await page.locator('#Color').selectOption('10');
await page.locator('select[name="s_out_kantei_aa"]').selectOption('200');
await page.locator('select[name="e_out_kantei_aa"]').selectOption('2000');
await page.locator('select[name="s_in_kantei_aa"]').selectOption('C');
await page.locator('select[name="e_in_kantei_aa"]').selectOption('S');
await page.getByText('＋ 詳細検索').click();
await page.getByText('有').first().click();
await page.locator('#Exhaust').selectOption('24');
await page.locator('#Drive').selectOption('0');
await page.locator('#Door').selectOption('5');
await page.getByText('無').nth(3).click();
await page.getByText('有').nth(3).click();
await page.getByText('無', { exact: true }).nth(4).click();
await page.getByText('無', { exact: true }).nth(5).click();
await page.getByText('無').nth(4).click();
await page.getByText('右').click();
await page.locator('.left.checked').first().click();
await page.getByRole('link', { name: '会場選択' }).click();
await page.getByRole('cell', { name: 'ＵＳＳ', exact: true }).locator('input[name="series[]"]').check();
await page.getByRole('link', { name: 'ＯＫ' }).click();
await page.locator('input[name="s_price"]').click();
await page.locator('input[name="s_price"]').fill('50');
await page.locator('input[name="s_price"]').press('Enter');
await page.locator('input[name="e_price"]').click();
await page.locator('input[name="e_price"]').fill('2000');
await page.locator('tr:nth-child(7) > td:nth-child(6) > .aa_radio > .right').click();
await page.getByText('落札', { exact: true }).click();
await page.getByText('上記条件から検索 該当件数288件').click();


//検索結果の確認　型式＝NHP10、内装評価＝Ｓが表示されていること0205
await expect(page.getByRole('cell', { name: 'NHP10' }).first()).toBeVisible({ timeout: 15000 });
await expect(page.getByRole('cell', { name: 'Ｓ' }).nth(1)).toBeVisible({ timeout: 15000 });

//印刷画面の確認　トヨタ、アクアが表示されていること
const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '印刷' }).click();
  const page1 = await page1Promise;
await expect(page1.getByText('トヨタ')).toBeVisible();
await expect(page1.getByText('アクア')).toBeVisible();
await page1.getByRole('button', { name: '閉じる' }).click();

//カスタマイズ表示　非表示の確認
await page.getByText('カスタマイズ').click({ timeout: 15000 });
await expect(page.locator('._btn').first()).toBeVisible();
await expect(page.locator('._btn.js_soat_switch.is-off')).toBeVisible();
await page.locator('.soat_pop_close').click();

// お気に入り登録、削除の確認
await page.getByRole('link', { name: 'お気に入り' }).click();
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
await page.waitForTimeout(1000);

await page.locator('#favorite').getByRole('link', { name: 'お気に入り' }).click();

await expect(page.getByRole('cell', { name: 'トヨタ' }).nth(1)).toBeVisible();
await expect(page.getByRole('cell', { name: 'アクア' }).nth(1)).toBeVisible();
await page.waitForTimeout(1000);
await page.getByRole('link', { name: '全てクリア' }).click({ timeout: 15000 });
await page.waitForTimeout(1000);
await page.getByRole('link', { name: 'お気に入り' }).first().click({ timeout: 15000 });
await page.waitForTimeout(1000);
await page.getByRole('link', { name: '選択', exact: true }).first().click();
await expect(page.locator('select[name="maker"]')).toBeVisible();
await expect(page.locator('select[name="car"]')).toBeVisible();
await page.getByRole('link', { name: '全てクリア' }).click();

// AA相場検索－検索履歴の確認
await page.waitForTimeout(10000);
await page.getByRole('link', { name: '検索履歴' }).first().click({ timeout: 15000 });
await page.waitForTimeout(10000);

await expect(page.getByRole('heading', { name: '検索履歴' })).toBeVisible({ timeout: 15000 });

await page.waitForTimeout(1000);
// await page.evaluate(() => window.scrollTo(0, 0));

await expect(page.getByRole('cell', { name: 'トヨタ' }).first()).toBeVisible({ timeout: 15000 });
await expect(page.getByRole('cell', { name: 'アクア' }).first()).toBeVisible();

await page.getByRole('link', { name: '選択', exact: true }).first().click();
await expect(page.locator('select[name="maker"]')).toBeVisible();
await expect(page.locator('select[name="car"]')).toBeVisible();

// await page.evaluate(() => window.scrollTo(0, 0));

await page.waitForTimeout(10000);
await page.getByRole('link', { name: '検索履歴' }).first().click({ timeout: 15000 });
await page.waitForTimeout(10000);
await expect(page.getByRole('heading', { name: '検索履歴' })).toBeVisible();

await page.waitForTimeout(5000);
// ページングの確認
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
});
