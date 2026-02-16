import { test, expect } from '@playwright/test';

test('test', async({page, context})=> {
  await page.goto('https://stgdlpro.proto-dataline.com/');

  await page.getByRole('textbox', { name: 'ログインID' }).fill('tst0001');
  await page.getByRole('textbox', { name: 'パスワード' }).fill('tst0001');
  
  await page.waitForTimeout(2000);

  await page.getByRole('button', { name: 'ログイン' }).click();
  await expect.soft(page).toHaveURL('https://stgdlpro.proto-dataline.com/top/top.php'); 

  //No.1
  await page.getByRole('link', { name: 'グレード検索' }).click();
  await page.waitForTimeout(2000);
  await expect.soft(page).toHaveURL('https://stgdlpro.proto-dataline.com/grade/grade.php'); 
  
  await page.waitForTimeout(2000);

 //No.3
  await page.locator('#Maker').selectOption('1010');
  await page.goto('https://stgdlpro.proto-dataline.com/grade/grade.php#19c31f801b8efe4');
  await page.waitForTimeout(2000);
 //No.4 
  await page.locator('#carType').selectOption('10101073');
  await page.goto('https://stgdlpro.proto-dataline.com/grade/grade.php#19c31f81e68ed2b');
    await page.waitForTimeout(2000);
 //No.5
  await page.locator('#Model').selectOption('13');
  await page.goto('https://stgdlpro.proto-dataline.com/grade/grade.php#19c31f8380412c6d');
    await page.waitForTimeout(2000);  
 //No.6
   await page.locator('input[name="frame_for_maker"]').click();
   await page.locator('input[name="frame_for_maker"]').fill('1234');

 //No.7
  await page.waitForTimeout(2000);
  await page.locator('#age_type3').selectOption('2012');
  await page.waitForTimeout(2000);
  await page.locator('#age_type4').selectOption('2023');
  await page.waitForTimeout(2000);  

 //No.8
  await page.locator('#search_maker_btn').click();

 //No.9
  await expect(page.locator('#result_body')).toContainText('Ｇ');
  const gradesearch1 = (await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_g_grade').first().textContent())?.trim();  
  console.log('一つ目のグレードは:', gradesearch1);
 //No.10
  await expect(page.locator('#result_body')).toContainText('Ｓ');
  const gradesearch2 = (await page.locator('#result_body > table > tbody > tr:nth-child(2) > td.col_g_grade').first().textContent())?.trim();  
  console.log('二つ目のグレードは:', gradesearch2);
 //No.11
  await expect(page.locator('#result_body')).toContainText('Ｌ');
  const gradesearch3 = (await page.locator('#result_body > table > tbody > tr:nth-child(3) > td.col_g_grade').first().textContent())?.trim();  
  console.log('三つ目のグレードは:', gradesearch3); 
 //No.12
  await expect(page.locator('#result_body')).toContainText('Ｓスタイルブラック');
  const gradesearch4 = (await page.locator('#result_body > table > tbody > tr:nth-child(4) > td.col_g_grade').first().textContent())?.trim();  
  console.log('四つ目のグレードは:', gradesearch4);


  //No.13
  await page.getByRole('link', { name: 'ＡＡ' }).first().click();await page.waitForTimeout(3000);
  await page.waitForTimeout(1000);
 //No.14
  await expect.soft(page).toHaveURL(/.*aa.php/); 
 //No.15
  await page.waitForTimeout(1000);
  await expect(page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_grade_nm')).toHaveText(gradesearch1!);
  await expect(page.locator('#t_result_area > tbody > tr:nth-child(2) > td.col_grade_nm')).toHaveText(gradesearch1!);
  await expect(page.locator('#t_result_area > tbody > tr:nth-child(3) > td.col_grade_nm')).toHaveText(gradesearch1!);
  await page.waitForTimeout(1000);


  //ブラウザバック
  //await page.goBack();

  //No.16 
  // オプション：ページ遷移が完了するまで待機する場合
  await page.goBack({ waitUntil: 'networkidle' });

  await page.waitForTimeout(1000);
  await expect.soft(page).toHaveURL(/.*grade.php/); 

   //画面のリロード
  await page.reload();

  //ブラウザバック&画面リロードで検索条件が一部変わってしまっているので再度検索条件を入力
  await page.locator('#Maker').selectOption('1010');
  await page.goto('https://stgdlpro.proto-dataline.com/grade/grade.php#19c31f801b8efe4');
    await page.waitForTimeout(2000);
  await page.locator('#carType').selectOption('10101073');
  await page.goto('https://stgdlpro.proto-dataline.com/grade/grade.php#19c31f81e68ed2b');
    await page.waitForTimeout(2000);
  await page.locator('#Model').selectOption('13');
  await page.goto('https://stgdlpro.proto-dataline.com/grade/grade.php#19c31f8380412c6d');
 
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

  //No. 20
   await page.getByRole('row', { name: '(R2)/8～2021(R3)/7 NHP10 アクア Ｇ NHP10AHXEB 5 右 1500 CVT FF 5名 212.63' }).getByRole('checkbox').check();
  //No. 21
   await page.getByRole('row', { name: '(R2)/8～2021(R3)/7 NHP10 アクア Ｓ NHP10AHXNB 5 右 1500 CVT FF 5名 192.17' }).getByRole('checkbox').check();
  //No. 22
   await page.getByRole('row', { name: '(R2)/8～2021(R3)/7 NHP10 アクア Ｌ NHP10AHXCB 5 右 1500 CVT FF 5名 181.83' }).getByRole('checkbox').check();
  //No.23
   await page.getByRole('row', { name: '(R2)/8～2021(R3)/7 NHP10 アクア Ｓスタイルブラック NHP10AHXNBL 5 右 1500 CVT FF 5名 206.8' }).getByRole('checkbox').check();
   
  //No.24
   await expect(page.locator('input[name="diff_check"]')).not.toBeChecked();

    await page.waitForTimeout(1000);
  //No.25 
   await page.getByRole('link', { name: 'チェックしたグレードの装備を比較' }).click();

  await expect(page.getByRole('cell', { name: '販売年月' })).not.toBeVisible();

  //No.26
   //await expect.soft(page.locator('#ResultArea')).toContainText(gradesearch2!);
   await expect.soft(page.locator('#grade_compare > table > tbody > tr:nth-child(1) > td:nth-child(3)')).toHaveText(gradesearch1!);
  //No.27
   //await expect.soft(page.locator('#ResultArea')).toContainText('Ｓ');
   await expect(page.locator('#grade_compare > table > tbody > tr:nth-child(1) > td:nth-child(4)')).toHaveText(gradesearch2!);
  //No.28
   //await expect.soft(page.locator('#ResultArea')).toContainText('Ｌ');
   await expect(page.locator('#grade_compare > table > tbody > tr:nth-child(1) > td:nth-child(5)')).toHaveText(gradesearch3!);  
  //No.29
   //await expect.soft(page.locator('#ResultArea')).toContainText('Ｓスタイルブラック');
   await expect(page.locator('#grade_compare > table > tbody > tr:nth-child(1) > td:nth-child(6)')).toHaveText(gradesearch4!); 

  //No.30
   const page2Promise = page.waitForEvent('popup');
   await page.getByRole('link', { name: '印刷' }).click();
   const page2 = await page2Promise;

   await page.waitForTimeout(1000);
   await page.setViewportSize({ width: 1209, height: 700 });
   await page.waitForTimeout(1000);

  //No.31  
   await page2.getByRole('button', { name: '閉じる' }).click();

 // const targetText2 = (await page.locator('#grade_compare > table > tbody > tr:nth-child(1) > td:nth-child(3)').first().textContent())?.trim();  
 // console.log('取得した値2の中身は:', targetText2);

  //No.32    
   await page.getByRole('link', { name: 'ＡＡ相場' }).first().click();
   await page.waitForTimeout(1000);

  //No.33      
   await expect(page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_grade_nm')).toHaveText(gradesearch1!);
   await expect(page.locator('#t_result_area > tbody > tr:nth-child(2) > td.col_grade_nm')).toHaveText(gradesearch1!);
   await expect(page.locator('#t_result_area > tbody > tr:nth-child(3) > td.col_grade_nm')).toHaveText(gradesearch1!);

  //No.34     
   //ブラウザバック
   await page.goBack();

   //検索結果のリスト（例: .search-item）が表示されるまで最大30秒待つ
  // await page.waitForSelector('.search-item', { state: 'visible' }); 

   await page.locator('#search_maker_btn').click();

   await page.getByRole('row', { name: '(R2)/8～2021(R3)/7 NHP10 アクア Ｇ NHP10AHXEB 5 右 1500 CVT FF 5名 212.63' }).getByRole('checkbox').check();
   await page.getByRole('row', { name: '(R2)/8～2021(R3)/7 NHP10 アクア Ｓ NHP10AHXNB 5 右 1500 CVT FF 5名 192.17' }).getByRole('checkbox').check();
   await page.getByRole('row', { name: '(R2)/8～2021(R3)/7 NHP10 アクア Ｌ NHP10AHXCB 5 右 1500 CVT FF 5名 181.83' }).getByRole('checkbox').check();
   await page.getByRole('row', { name: '(R2)/8～2021(R3)/7 NHP10 アクア Ｓスタイルブラック NHP10AHXNBL 5 右 1500 CVT FF 5名 206.8' }).getByRole('checkbox').check();
   
   await page.waitForTimeout(1000);
   
   await page.getByRole('link', { name: 'チェックしたグレードの装備を比較' }).click();

   //const targetText3 = (await page.locator('#grade_compare > table > tbody > tr:nth-child(1) > td:nth-child(4)').first().textContent())?.trim();  
   //console.log('取得した値3の中身は:', targetText3);

   //No.35  
   await page.getByRole('link', { name: '小売相場' }).nth(2).click();
   await page.waitForTimeout(1000);

   await expect.soft(page).toHaveURL(/.*retail.php/); 
 //No.36
   await expect(page.locator('[id="1002928A30251121W001"] > td.col_p_grade_nm_n')).toHaveText(gradesearch2!);
   await expect(page.locator('[id="0551807A30250923W001"] > td.col_p_grade_nm_n')).toHaveText(gradesearch2!);
   await expect(page.locator('[id="0800785A20251028T001"] > td.col_p_grade_nm_n')).toHaveText(gradesearch2!);
  
  
 //No.37 
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

  // const targetText4 = (await page.locator('#grade_compare > table > tbody > tr:nth-child(1) > td:nth-child(5)').first().textContent())?.trim();  
  // console.log('取得した値4の中身は:', targetText4);

   //No.38 
   await page.getByRole('link', { name: '買取・下取' }).nth(2).click();
   await page.waitForTimeout(1000);

   await expect.soft(page).toHaveURL(/.*tradein_biz.php/); 
  // await expect(page.locator('#result_body')).toContainText('Ｌ');
  // await expect(page.locator('#result_body')).toContainText('Ｌ');
 //No.39
   await expect(page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_g_grade')).toHaveText(gradesearch3!);
   await expect(page.locator('#result_body > table > tbody > tr:nth-child(2) > td.col_g_grade')).toHaveText(gradesearch3!);
//#target > td.col_g_grade

 //No.40 
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

  // const targetText5 = (await page.locator('#grade_compare > table > tbody > tr:nth-child(1) > td:nth-child(6)').first().textContent())?.trim();  
  // console.log('取得した値5の中身は:', targetText5);

 //No.41  
   await page.getByRole('link', { name: '注文販売' }).nth(4).click();
   await page.waitForTimeout(1000);

   await expect.soft(page).toHaveURL(/.*stock_biz.php/); 
 //No.42
   //await expect(page.locator('#result_body')).toContainText('Ｓスタイルブラック');
   //await expect(page.locator('#result_body')).toContainText('Ｓスタイルブラック');

   await expect(page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_sb_grade')).toHaveText(gradesearch4!);
   await expect(page.locator('#result_body > table > tbody > tr:nth-child(2) > td.col_sb_grade')).toHaveText(gradesearch4!);
   await expect(page.locator('#result_body > table > tbody > tr:nth-child(3) > td.col_sb_grade')).toHaveText(gradesearch4!);
   await expect(page.locator('#result_body > table > tbody > tr:nth-child(4) > td.col_sb_grade')).toHaveText(gradesearch4!);
//#target > td.col_g_grade
 
//No.43
   //ブラウザバック
   await page.goBack();
//No.44
  await expect.soft(page).toHaveURL(/.*grade.php/); 

  await page.locator('#search_maker_btn').click();

//No.45~48
  await page.getByRole('row', { name: '(R2)/8～2021(R3)/7 NHP10 アクア Ｇ NHP10AHXEB 5 右 1500 CVT FF 5名 212.63' }).getByRole('checkbox').check();
  await page.getByRole('row', { name: '(R2)/8～2021(R3)/7 NHP10 アクア Ｓ NHP10AHXNB 5 右 1500 CVT FF 5名 192.17' }).getByRole('checkbox').check();
  await page.getByRole('row', { name: '(R2)/8～2021(R3)/7 NHP10 アクア Ｌ NHP10AHXCB 5 右 1500 CVT FF 5名 181.83' }).getByRole('checkbox').check();
  await page.getByRole('row', { name: '(R2)/8～2021(R3)/7 NHP10 アクア Ｓスタイルブラック NHP10AHXNBL 5 右 1500 CVT FF 5名 206.8' }).getByRole('checkbox').check();
  
//No.49
  await page.locator('input[name="diff_check"]').check();
  await expect(page.locator('input[name="diff_check"]')).toBeChecked();

//No.50  
  await page.getByRole('link', { name: 'チェックしたグレードの装備を比較' }).click();
//差分のみ表示されているとことを確認する方法を検討  

await expect(page.getByRole('cell', { name: '販売年月' })).not.toBeVisible();

 //No.51
  //await expect.soft(page.locator('#ResultArea')).toContainText(gradesearch2!);
  await expect.soft(page.locator('#grade_compare > table > tbody > tr:nth-child(1) > td:nth-child(3)')).toHaveText(gradesearch1!);
//No.52
  //await expect.soft(page.locator('#ResultArea')).toContainText('Ｓ');
  await expect(page.locator('#grade_compare > table > tbody > tr:nth-child(1) > td:nth-child(4)')).toHaveText(gradesearch2!);
//No.53
  //await expect.soft(page.locator('#ResultArea')).toContainText('Ｌ');
  await expect(page.locator('#grade_compare > table > tbody > tr:nth-child(1) > td:nth-child(5)')).toHaveText(gradesearch3!);  
//No.54
  //await expect.soft(page.locator('#ResultArea')).toContainText('Ｓスタイルブラック');
  await expect(page.locator('#grade_compare > table > tbody > tr:nth-child(1) > td:nth-child(6)')).toHaveText(gradesearch4!); 

//No.55
   const page1Promise = page.waitForEvent('popup');
   await page.getByRole('link', { name: '印刷' }).click();
   const page1 = await page1Promise;

   await page.waitForTimeout(1000);
   await page.setViewportSize({ width: 1210, height: 700 });
   await page.waitForTimeout(1000);  
//No.56  
  await page1.getByRole('button', { name: '閉じる' }).click();

//No.57 
   await page.getByRole('link', { name: '検索履歴' }).click();

   /*
   await expect(page.locator('#list_history')).toContainText('2012(H24) 〜 2023(R5)');
   await expect(page.locator('#list_history')).toContainText('トヨタ');
   await expect(page.locator('#list_history')).toContainText('アクア');
   await expect(page.locator('#list_history')).toContainText('NHP10');
  */
   await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(6)')).toHaveText('2012(H24) 〜 2023(R5)');
   await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(9)')).toHaveText('トヨタ');
   await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(10)')).toHaveText('アクア');
   await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(11)')).toHaveText('NHP10');   
   await expect(page.locator('#list_history > table > tbody > tr:nth-child(6) > td:nth-child(7)')).toHaveText('1234');   
 

   //ブラウザバックのタイミングで車台番号がクリアされている
   await expect.soft(page.getByRole('cell').filter({ hasText: /^$/ }).nth(2)).toBeVisible();
   await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(7)')).toHaveText('');   
 await page.reload();

/* 
 await page.waitForTimeout(1000);
//ここから商用車のテスト

//await page.getByRole('link', { name: '商用車を検索する' }).click();

await page.getByRole('link', { name: '商用車を検索する' }).click();
 await page.waitForTimeout(2000);

await page.locator('#Maker').selectOption('1015');
await page.goto('https://stgdlpro.proto-dataline.com/grade/grade.php#19c5550e023730');
   await page.waitForTimeout(2000);

   
   await page.getByRole('link', { name: '▲' }).nth(3).click();await page.locator('#carType').selectOption('10157116');
   await page.goto('https://stgdlpro.proto-dataline.com/grade/grade.php#19c555104bab8e8');
   await page.waitForTimeout(1000);

   await page.locator('#Model').selectOption('200');
   await page.goto('https://stgdlpro.proto-dataline.com/grade/grade.php#19c55513c254a29');
   await page.waitForTimeout(1000);

   await page.locator('#age_type3').selectOption('2015');
   await page.waitForTimeout(1000);
   await page.locator('#age_type4').selectOption('');
   await page.waitForTimeout(1000);


   await page.locator('#search_maker_btn').click();
   await page.waitForTimeout(1000);

   await expect(page.locator('#result_body')).toContainText('バネットバン');
   await expect(page.locator('#result_body')).toContainText('SKP2MN');
   const targetText6 = (await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_g_grade').first().textContent())?.trim();  
  
   console.log('取得した値6の中身は:', targetText6);

   await page.getByRole('link', { name: '小売' }).nth(1).click();

   await expect.soft(page).toHaveURL(/.*retail.php/); 

   await expect(page.locator('[id="0205183A30250617W001"] > td.col_p_grade_nm_n')).toHaveText(targetText6!);
   await expect(page.locator('[id="0708952A30240417W001"] > td.col_p_grade_nm_n')).toHaveText(targetText6!);
   await expect(page.locator('[id="0900754A30240601W002"] > td.col_p_grade_nm_n')).toHaveText(targetText6!);
  
  //ブラウザバック
   await page.goBack(); 
   await page.waitForTimeout(1000);

   await page.reload();
    await page.waitForTimeout(1000);
  
    await page.locator('#search_maker_btn').click();
    await expect(page.locator('#result_body')).toContainText('SKP2MN');
    await expect(page.locator('#result_body')).toContainText('バネットバン');
    await expect(page.locator('#result_body')).toContainText('ＧＬ');
    await expect(page.locator('#result_body')).toContainText('HBZNMGFS21SZ5C----');

    await page.getByRole('link', { name: 'グレード検索' }).click();
    await page.locator('input[name="katashiki"]').click();
    await page.locator('input[name="katashiki"]').fill('10656');
 
    await page.locator('#search_type_btn').click();
    await expect(page.locator('#result_body')).toContainText('NCP15AHPNKN');
    await expect(page.locator('#result_body')).toContainText('ヴィッツ');

   const targetText7 = (await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_g_grade').first().textContent())?.trim();  
   console.log('取得した値7の中身は:', targetText7); 
   await page.waitForTimeout(1000);

   // 1. テキストを取得
  const text1 = await page.locator('#paging > span.sum').textContent();

  // 2. 変数の中に「50」が含まれているか検証
  expect(text1).toContain(' 件中 1 -');


   await page.getByRole('link', { name: '次へ>>' }).click();

   await page.waitForTimeout(3000);

   // 1. テキストを取得
  const text2 = await page.locator('#paging > span.sum').textContent();

  // 2. 変数の中に「50」が含まれているか検証
  expect(text2).toContain('件中 51 -');
   

  await page.getByRole('link', { name: '<<前へ' }).click();
   await page.waitForTimeout(3000);

   // 1. テキストを取得
  const text3 = await page.locator('#paging > span.sum').textContent();

  // 2. 変数の中に「1」が含まれているか検証
  expect(text3).toContain(' 件中 1 -');


  await page.getByRole('link', { name: '2' }).click();
  await page.waitForTimeout(3000);

   // 1. テキストを取得
  const text4 = await page.locator('#paging > span.sum').textContent();

  // 2. 変数の中に「50」が含まれているか検証
  expect(text4).toContain('件中 51 -');


  await page.getByRole('link', { name: '▲' }).nth(3).click();
    await page.waitForTimeout(3000);
  await expect(page.locator('#result_body')).toContainText('Ｆ');

  
  //await expect.soft(page.locator('thead')).not.toContainText('1');

  //await expect.soft(page.getByText('1', { exact: true })).not.toBeVisible();

  await expect(page.getByText('1', { exact: true })).toBeVisible();

  await page.getByRole('link', { name: '▼' }).nth(3).click();
    await page.waitForTimeout(3000);     
   await expect(page.locator('#result_body')).toContainText('クラヴィア');


  await page.getByRole('link', { name: 'ソートのクリア' }).click();

  await expect(page.getByText('1', { exact: true })).not.toBeVisible();


  await page.getByRole('link', { name: '買取' }).first().click();
*/
});

