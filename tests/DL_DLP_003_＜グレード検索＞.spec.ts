import { test, expect } from '@playwright/test';

test('test', async({page, context})=> {
  await page.goto('https://devdlpro.proto-dataline.com/');

  await page.getByRole('textbox', { name: 'ログインID' }).fill('tst0001');
  await page.getByRole('textbox', { name: 'パスワード' }).fill('tst0001');
  
  await page.waitForTimeout(2000);

  await page.getByRole('button', { name: 'ログイン' }).click();
  await expect.soft(page).toHaveURL('https://devdlpro.proto-dataline.com/top/top.php'); 

  await page.getByRole('link', { name: 'グレード検索' }).click();
  await page.waitForTimeout(2000);
  await expect.soft(page).toHaveURL('https://devdlpro.proto-dataline.com/grade/grade.php'); 
  
  await page.waitForTimeout(2000);

  await page.locator('#Maker').selectOption('1010');
  await page.goto('https://devdlpro.proto-dataline.com/grade/grade.php#19c31f801b8efe4');
    await page.waitForTimeout(2000);
  await page.locator('#carType').selectOption('10101073');
  await page.goto('https://devdlpro.proto-dataline.com/grade/grade.php#19c31f81e68ed2b');
    await page.waitForTimeout(2000);
  await page.locator('#Model').selectOption('13');
  await page.goto('https://devdlpro.proto-dataline.com/grade/grade.php#19c31f8380412c6d');
 
   await page.waitForTimeout(2000);  
   await page.locator('input[name="frame_for_maker"]').click();
   await page.locator('input[name="frame_for_maker"]').fill('1234');

   await page.waitForTimeout(2000);
  await page.locator('#age_type3').selectOption('2012');
   await page.waitForTimeout(2000);
  await page.locator('#age_type4').selectOption('2023');
    await page.waitForTimeout(2000);  
 
  await page.locator('#search_maker_btn').click();


  await expect(page.locator('#result_body')).toContainText('Ｇ');
  await expect(page.locator('#result_body')).toContainText('Ｓ');
  await expect(page.locator('#result_body')).toContainText('Ｌ');
  await expect(page.locator('#result_body')).toContainText('Ｓスタイルブラック');

  await page.getByRole('link', { name: 'ＡＡ' }).first().click();await page.waitForTimeout(3000);
    await page.waitForTimeout(1000);
 await expect.soft(page).toHaveURL(/.*aa.php/); 

    await expect(page.locator('#t_result_area')).toContainText('Ｇ');
    await expect(page.locator('#t_result_area')).toContainText('Ｇ');
    await expect(page.locator('#t_result_area')).toContainText('Ｇ');
    await expect(page.locator('#t_result_area')).toContainText('Ｇ');
    await page.waitForTimeout(1000);

   //ブラウザバック
   await page.goBack();

   // オプション：ページ遷移が完了するまで待機する場合
   await page.goBack({ waitUntil: 'networkidle' });

   await page.waitForTimeout(2000);
   await expect.soft(page).toHaveURL(/.*grade.php/); 

   //画面のリロード
 //await page.reload();

/*いったんコメントアウト

  //ブラウザバック&画面リロードで検索条件が一部変わってしまっているので再度検索条件を入力
  await page.locator('#Maker').selectOption('1010');
  await page.goto('https://devdlpro.proto-dataline.com/grade/grade.php#19c31f801b8efe4');
    await page.waitForTimeout(3000);
  await page.locator('#carType').selectOption('10101073');
  await page.goto('https://devdlpro.proto-dataline.com/grade/grade.php#19c31f81e68ed2b');
    await page.waitForTimeout(3000);
  await page.locator('#Model').selectOption('13');
  await page.goto('https://devdlpro.proto-dataline.com/grade/grade.php#19c31f8380412c6d');
 
   await page.waitForTimeout(2000);  
   await page.locator('input[name="frame_for_maker"]').click();
   await page.locator('input[name="frame_for_maker"]').fill('1234');

   await page.waitForTimeout(2000);
  await page.locator('#age_type3').selectOption('2012');
   await page.waitForTimeout(2000);
  await page.locator('#age_type4').selectOption('2023');
    await page.waitForTimeout(2000);  
//ここまで


   // 検索結果のリスト（例: .search-item）が表示されるまで最大30秒待つ
   //await page.waitForSelector('.search-item', { state: 'visible' }); 


   await page.waitForTimeout(2000);  
   await page.locator('#search_maker_btn').click();

   await page.getByRole('row', { name: '(R2)/8～2021(R3)/7 NHP10 アクア Ｇ NHP10AHXEB 5 右 1500 CVT FF 5名 212.63' }).getByRole('checkbox').check();
   await page.getByRole('row', { name: '(R2)/8～2021(R3)/7 NHP10 アクア Ｓ NHP10AHXNB 5 右 1500 CVT FF 5名 192.17' }).getByRole('checkbox').check();
   await page.getByRole('row', { name: '(R2)/8～2021(R3)/7 NHP10 アクア Ｌ NHP10AHXCB 5 右 1500 CVT FF 5名 181.83' }).getByRole('checkbox').check();
   await page.getByRole('row', { name: '(R2)/8～2021(R3)/7 NHP10 アクア Ｓスタイルブラック NHP10AHXNBL 5 右 1500 CVT FF 5名 206.8' }).getByRole('checkbox').check();
   
    await page.waitForTimeout(1000);
   
    await page.getByRole('link', { name: 'チェックしたグレードの装備を比較' }).click();


   await expect(page.locator('#ResultArea')).toContainText('Ｇ');
   await expect(page.locator('#ResultArea')).toContainText('Ｓ');
   await expect(page.locator('#ResultArea')).toContainText('Ｌ');
   await expect(page.locator('#ResultArea')).toContainText('Ｓスタイルブラック');


   const page1Promise = page.waitForEvent('popup');
   await page.getByRole('link', { name: '印刷' }).click();
   const page1 = await page1Promise;

   await page.waitForTimeout(1000);
   await page.setViewportSize({ width: 1209, height: 700 });

   await page1.getByRole('button', { name: '閉じる' }).click();

  const targetText1 = (await page.locator('#grade_compare > table > tbody > tr:nth-child(1) > td:nth-child(3)').first().textContent())?.trim();  

   await page.getByRole('link', { name: 'ＡＡ相場' }).first().click();

   await page.waitForTimeout(1000);
 await expect(page.locator('#t_result_area > tbody > tr.baiyaku > td.col_grade_nm')).toHaveText(targetText1!);

  // await expect(page.locator('#t_result_area')).toContainText(targetText1);
   //await expect(page.locator('#t_result_area')).toContainText(targetText1);


   //ブラウザバック
   await page.goBack();
await page.goBack({ waitUntil: 'domcontentloaded' });
// その後、手動で必要な要素を待機
await page.waitForLoadState('networkidle');


   // 検索結果のリスト（例: .search-item）が表示されるまで最大30秒待つ
   //await page.waitForSelector('.search-item', { state: 'visible' }); 

 await page.locator('#search_maker_btn').click();

   await page.getByRole('row', { name: '(R2)/8～2021(R3)/7 NHP10 アクア Ｇ NHP10AHXEB 5 右 1500 CVT FF 5名 212.63' }).getByRole('checkbox').check();
   await page.getByRole('row', { name: '(R2)/8～2021(R3)/7 NHP10 アクア Ｓ NHP10AHXNB 5 右 1500 CVT FF 5名 192.17' }).getByRole('checkbox').check();
   await page.getByRole('row', { name: '(R2)/8～2021(R3)/7 NHP10 アクア Ｌ NHP10AHXCB 5 右 1500 CVT FF 5名 181.83' }).getByRole('checkbox').check();
   await page.getByRole('row', { name: '(R2)/8～2021(R3)/7 NHP10 アクア Ｓスタイルブラック NHP10AHXNBL 5 右 1500 CVT FF 5名 206.8' }).getByRole('checkbox').check();
   
   await page.waitForTimeout(1000);
   
   await page.getByRole('link', { name: 'チェックしたグレードの装備を比較' }).click();
   await page.getByRole('link', { name: '小売相場' }).nth(2).click();
   await page.waitForTimeout(1000);

   await expect.soft(page).toHaveURL(/.*retail.php/); 

   await expect(page.locator('[id="1002928A30251121W001"]')).toContainText('Ｓ');
   await expect(page.locator('[id="0551807A30250923W001"]')).toContainText('Ｓ');
   await expect(page.locator('[id="0800785A20251028T001"]')).toContainText('Ｓ');

   //ブラウザバック
   await page.goBack();

   // 検索結果のリスト（例: .search-item）が表示されるまで最大30秒待つ
   //await page.waitForSelector('.search-item', { state: 'visible' });

   await page.locator('#search_maker_btn').click();

   await page.getByRole('row', { name: '(R2)/8～2021(R3)/7 NHP10 アクア Ｇ NHP10AHXEB 5 右 1500 CVT FF 5名 212.63' }).getByRole('checkbox').check();
   await page.getByRole('row', { name: '(R2)/8～2021(R3)/7 NHP10 アクア Ｓ NHP10AHXNB 5 右 1500 CVT FF 5名 192.17' }).getByRole('checkbox').check();
   await page.getByRole('row', { name: '(R2)/8～2021(R3)/7 NHP10 アクア Ｌ NHP10AHXCB 5 右 1500 CVT FF 5名 181.83' }).getByRole('checkbox').check();
   await page.getByRole('row', { name: '(R2)/8～2021(R3)/7 NHP10 アクア Ｓスタイルブラック NHP10AHXNBL 5 右 1500 CVT FF 5名 206.8' }).getByRole('checkbox').check();
   
   await page.waitForTimeout(1000);
   
   await page.getByRole('link', { name: 'チェックしたグレードの装備を比較' }).click();
   await page.getByRole('link', { name: '買取・下取' }).nth(2).click();
   await page.waitForTimeout(1000);

   await expect.soft(page).toHaveURL(/.*tradein_biz.php/); 
   await expect(page.locator('#result_body')).toContainText('Ｌ');
   await expect(page.locator('#result_body')).toContainText('Ｌ');


   //ブラウザバック
   await page.goBack();
   

   // 検索結果のリスト（例: .search-item）が表示されるまで最大30秒待つ
   //await page.waitForSelector('.search-item', { state: 'visible' });

   await page.locator('#search_maker_btn').click();

   await page.getByRole('row', { name: '(R2)/8～2021(R3)/7 NHP10 アクア Ｇ NHP10AHXEB 5 右 1500 CVT FF 5名 212.63' }).getByRole('checkbox').check();
   await page.getByRole('row', { name: '(R2)/8～2021(R3)/7 NHP10 アクア Ｓ NHP10AHXNB 5 右 1500 CVT FF 5名 192.17' }).getByRole('checkbox').check();
   await page.getByRole('row', { name: '(R2)/8～2021(R3)/7 NHP10 アクア Ｌ NHP10AHXCB 5 右 1500 CVT FF 5名 181.83' }).getByRole('checkbox').check();
   await page.getByRole('row', { name: '(R2)/8～2021(R3)/7 NHP10 アクア Ｓスタイルブラック NHP10AHXNBL 5 右 1500 CVT FF 5名 206.8' }).getByRole('checkbox').check();
   
   await page.waitForTimeout(1000);
   await page.getByRole('link', { name: 'チェックしたグレードの装備を比較' }).click();
   await page.getByRole('link', { name: '注文販売' }).nth(4).click();
   await page.waitForTimeout(1000);

   await expect.soft(page).toHaveURL(/.*stock_biz.php/); 

   await expect(page.locator('#result_body')).toContainText('Ｓスタイルブラック');
   await expect(page.locator('#result_body')).toContainText('Ｓスタイルブラック');

   //ブラウザバック
   await page.goBack();

   await page.getByRole('link', { name: '検索履歴' }).click();


   await expect(page.locator('#list_history')).toContainText('2012(H24) 〜 2023(R5)');
   await expect(page.locator('#list_history')).toContainText('トヨタ');
   await expect(page.locator('#list_history')).toContainText('アクア');
   await expect(page.locator('#list_history')).toContainText('NHP10');
   //ブラウザバックのタイミングで車台番号がクリアされている
   await expect.soft(page.getByRole('cell').filter({ hasText: /^$/ }).nth(2)).toBeVisible();
*/
});

