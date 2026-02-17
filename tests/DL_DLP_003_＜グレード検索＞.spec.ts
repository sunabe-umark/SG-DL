import { test, expect } from '@playwright/test';

test('test', async({page, context})=> {
  test.setTimeout(300000);
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
 await expect(page.locator('#result_body')).toContainText('NHP10');

 //No.10
 await expect(page.locator('#result_body')).toContainText('アクア');
  //No.11
  await expect(page.locator('#result_body')).toContainText('Ｇ');
  const gradesearch1 = (await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_g_grade').first().textContent())?.trim();  
  console.log('gradesearch1のグレードは:', gradesearch1);  
 //No.12

  await expect(page.locator('#result_body')).toContainText('Ｓ');
  const gradesearch1_2 = (await page.locator('#result_body > table > tbody > tr:nth-child(2) > td.col_g_grade').first().textContent())?.trim();  
  console.log('gradesearch1_2のグレードは:', gradesearch1_2);
 //No.13
  await expect(page.locator('#result_body')).toContainText('Ｌ');
  const gradesearch1_3 = (await page.locator('#result_body > table > tbody > tr:nth-child(3) > td.col_g_grade').first().textContent())?.trim();  
  console.log('gradesearch1_3のグレードは:', gradesearch1_3); 
 //No.14
  await expect(page.locator('#result_body')).toContainText('Ｓスタイルブラック');
  const gradesearch1_4 = (await page.locator('#result_body > table > tbody > tr:nth-child(4) > td.col_g_grade').first().textContent())?.trim();  
  console.log('gradesearch1_4のグレードは:', gradesearch1_4);


 //No.15
  await page.getByRole('link', { name: 'ＡＡ' }).first().click();await page.waitForTimeout(3000);
  await page.waitForTimeout(1000);
  await expect.soft(page).toHaveURL(/.*aa.php/); 
 //No.16
 await expect(page).toHaveTitle('AA相場');

  await page.waitForTimeout(1000);
//No.17
   await expect(page.locator('#t_result_area > tbody > tr:nth-child(1) > td.col_grade_nm')).toHaveText(gradesearch1!);
   await expect(page.locator('#t_result_area > tbody > tr:nth-child(2) > td.col_grade_nm')).toHaveText(gradesearch1!);
   await expect(page.locator('#t_result_area > tbody > tr:nth-child(3) > td.col_grade_nm')).toHaveText(gradesearch1!);

  //ブラウザバック
  //await page.goBack();

//No.18
  // オプション：ページ遷移が完了するまで待機する場合
  await page.goBack({ waitUntil: 'networkidle' });

  //No.19
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

  await expect(page.getByRole('cell', { name: '販売年月' })).toBeVisible();

  //No.26
   //await expect.soft(page.locator('#ResultArea')).toContainText(gradesearch2!);
   await expect.soft(page.locator('#grade_compare > table > tbody > tr:nth-child(1) > td:nth-child(3)')).toHaveText(gradesearch1!);
  //No.27
   //await expect.soft(page.locator('#ResultArea')).toContainText('Ｓ');
   await expect(page.locator('#grade_compare > table > tbody > tr:nth-child(1) > td:nth-child(4)')).toHaveText(gradesearch1_2!);
  //No.28
   //await expect.soft(page.locator('#ResultArea')).toContainText('Ｌ');
   await expect(page.locator('#grade_compare > table > tbody > tr:nth-child(1) > td:nth-child(5)')).toHaveText(gradesearch1_3!);  
  //No.29
   //await expect.soft(page.locator('#ResultArea')).toContainText('Ｓスタイルブラック');
   await expect(page.locator('#grade_compare > table > tbody > tr:nth-child(1) > td:nth-child(6)')).toHaveText(gradesearch1_4!); 

  //No.30
   const page2Promise = page.waitForEvent('popup');
   await page.getByRole('link', { name: '印刷' }).click();
      const page2 = await page2Promise;

   await page.waitForTimeout(1000);
   await page.setViewportSize({ width: 1250, height: 800 });
   await page.waitForTimeout(1000);
   await expect.soft(page2).toHaveURL(/.*is_grade_only=/);  

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
   await expect(page.locator('[id="1002928A30251121W001"] > td.col_p_grade_nm_n')).toHaveText(gradesearch1_2!);
   await expect(page.locator('[id="0551807A30250923W001"] > td.col_p_grade_nm_n')).toHaveText(gradesearch1_2!);
   await expect(page.locator('[id="0800785A20251028T001"] > td.col_p_grade_nm_n')).toHaveText(gradesearch1_2!);
  
  
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
   await expect(page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_g_grade')).toHaveText(gradesearch1_3!);
   await expect(page.locator('#result_body > table > tbody > tr:nth-child(2) > td.col_g_grade')).toHaveText(gradesearch1_3!);
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
   await expect(page).toHaveTitle('注文販売');

 //No.42
   //await expect(page.locator('#result_body')).toContainText('Ｓスタイルブラック');
   //await expect(page.locator('#result_body')).toContainText('Ｓスタイルブラック');

   await expect(page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_sb_grade')).toHaveText(gradesearch1_4!);
   await expect(page.locator('#result_body > table > tbody > tr:nth-child(2) > td.col_sb_grade')).toHaveText(gradesearch1_4!);
   await expect(page.locator('#result_body > table > tbody > tr:nth-child(3) > td.col_sb_grade')).toHaveText(gradesearch1_4!);
   await expect(page.locator('#result_body > table > tbody > tr:nth-child(4) > td.col_sb_grade')).toHaveText(gradesearch1_4!);
//#target > td.col_g_grade
 
//No.43
   //ブラウザバック
   await page.goBack();
//No.44
  await expect.soft(page).toHaveURL(/.*grade.php/); 
  await expect(page).toHaveTitle('グレード検索');
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
  await expect(page.locator('#grade_compare > table > tbody > tr:nth-child(1) > td:nth-child(4)')).toHaveText(gradesearch1_2!);
//No.53
  //await expect.soft(page.locator('#ResultArea')).toContainText('Ｌ');
  await expect(page.locator('#grade_compare > table > tbody > tr:nth-child(1) > td:nth-child(5)')).toHaveText(gradesearch1_3!);  
//No.54
  //await expect.soft(page.locator('#ResultArea')).toContainText('Ｓスタイルブラック');
  await expect(page.locator('#grade_compare > table > tbody > tr:nth-child(1) > td:nth-child(6)')).toHaveText(gradesearch1_4!); 

//No.55
   const page3Promise = page.waitForEvent('popup');
   await page.getByRole('link', { name: '印刷' }).click();
   const page3 = await page3Promise;

   await page.waitForTimeout(1000);
   await page.setViewportSize({ width: 1251, height: 800 });

   await expect.soft(page3).toHaveURL(/.*is_grade_only=/);  
//No.56  
  await page3.getByRole('button', { name: '閉じる' }).click();

//No.57 
   await page.getByRole('link', { name: '検索履歴' }).click();
   await expect(page.getByRole('heading')).toContainText('検索履歴'); 
   /*
   await expect(page.locator('#list_history')).toContainText('2012(H24) 〜 2023(R5)');
   await expect(page.locator('#list_history')).toContainText('トヨタ');
   await expect(page.locator('#list_history')).toContainText('アクア');
   await expect(page.locator('#list_history')).toContainText('NHP10');
  */
 
//No.58
   await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(9)')).toHaveText('トヨタ');
//No.59
   await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(10)')).toHaveText('アクア');
//No.60
   await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(11)')).toHaveText('NHP10');   
//No.61
   await expect(page.locator('#list_history > table > tbody > tr:nth-child(6) > td:nth-child(7)')).toHaveText('1234');   
//No.62
   await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(6)')).toHaveText('2012(H24) 〜 2023(R5)');

//ブラウザバックのタイミングで車台番号がクリアされている
  // await expect.soft(page.getByRole('cell').filter({ hasText: /^$/ }).nth(2)).toBeVisible();
   await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(7)')).toHaveText('');   
   await page.reload();
 //No.63
  await page.getByRole('link', { name: 'グレード検索' }).click();

   await page.waitForTimeout(1000);
//ここから商用車のテスト

//Node.64
   await page.getByRole('link', { name: '商用車を検索する' }).click();
   await page.waitForTimeout(2000);
//No.65
   await page.locator('#Maker').selectOption('1015');
   await page.goto('https://stgdlpro.proto-dataline.com/grade/grade.php#19c5550e023730');
   await page.waitForTimeout(2000);
//No.66
   await page.locator('#carType').selectOption('10157116');
   await page.goto('https://stgdlpro.proto-dataline.com/grade/grade.php#19c6454873e14b2b');
   await page.waitForTimeout(1000);
//No.67
   await page.locator('#Model').selectOption('200');
   await page.goto('https://stgdlpro.proto-dataline.com/grade/grade.php#19c55513c254a29');
   await page.waitForTimeout(1000);
//No.68
   await page.locator('#age_type3').selectOption('2015');
   await page.waitForTimeout(1000);
   await page.locator('#age_type4').selectOption('');
   await page.waitForTimeout(1000);
//No.69
   await page.locator('#search_maker_btn').click();
   await page.waitForTimeout(1000);
//No.70
   await expect(page.locator('#result_body')).toContainText('バネットバン');
   await page.waitForTimeout(1000);
//No.71    
   await expect(page.locator('#result_body')).toContainText('SKP2MN');
//No.72   
   const gradesearch2 = (await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_g_grade').first().textContent())?.trim();  
  
   console.log('gradesearch2のグレードは:', gradesearch2);
//No.73
   await page.getByRole('link', { name: '小売' }).nth(1).click();
   await expect.soft(page).toHaveURL(/.*retail.php/); 
//No.74
  await expect(page).toHaveTitle('小売相場');
//No.75
   await expect(page.locator('[id="0205183A30250617W001"] > td.col_p_grade_nm_n')).toHaveText(gradesearch2!);
   await expect(page.locator('[id="0708952A30240417W001"] > td.col_p_grade_nm_n')).toHaveText(gradesearch2!);
   await expect(page.locator('[id="0900754A30240601W002"] > td.col_p_grade_nm_n')).toHaveText(gradesearch2!);
//No.76
  //ブラウザバック
   await page.goBack(); 
   await page.waitForTimeout(1000);
//No.78
  await expect.soft(page).toHaveURL(/.*grade.php/); 

   await page.reload();
   await page.waitForTimeout(1000);
  
 /* 
   await page.locator('#search_maker_btn').click();
   await expect(page.locator('#result_body')).toContainText('SKP2MN');
   await expect(page.locator('#result_body')).toContainText('バネットバン');
   await expect(page.locator('#result_body')).toContainText('ＧＬ');
   await expect(page.locator('#result_body')).toContainText('HBZNMGFS21SZ5C----');
*/
   await page.getByRole('link', { name: 'グレード検索' }).click();
   await page.waitForTimeout(1000);   
   await page.locator('input[name="katashiki"]').click();
   await page.locator('input[name="katashiki"]').fill('10656');
//No.85
   await page.locator('#search_type_btn').click();
   await page.waitForTimeout(1000);  
//No.86   
  await expect(page.locator('#result_body')).toContainText('NCP15');
  await expect(page.locator('#result_body')).toContainText('NCP15');
  await expect(page.locator('#result_body')).toContainText('NCP15AHPNKN');
//No.87
   await expect(page.locator('#result_body')).toContainText('ヴィッツ');
   await expect(page.locator('#result_body')).toContainText('ヴィッツ');
//No.88
   const gradesearch3 = (await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_g_grade').first().textContent())?.trim();  
   console.log('gradesearch3のグレードは:', gradesearch3); 
   await page.waitForTimeout(1000);

   // 1. テキストを取得
  const text1 = await page.locator('#paging > span.sum').textContent();

  // 2. 変数の中に「50」が含まれているか検証
  expect(text1).toContain(' 件中 1 -');

//No.90
   await page.getByRole('link', { name: '次へ>>' }).click();

   await page.waitForTimeout(3000);

   // 1. テキストを取得
  const text2 = await page.locator('#paging > span.sum').textContent();

  // 2. 変数の中に「50」が含まれているか検証
  expect(text2).toContain('件中 51 -');
   
//No.91
  await page.getByRole('link', { name: '<<前へ' }).click();
   await page.waitForTimeout(4000);

   // 1. テキストを取得
  const text3 = await page.locator('#paging > span.sum').textContent();

  // 2. 変数の中に「1」が含まれているか検証
  expect(text3).toContain(' 件中 1 -');

//No.92
  await page.getByRole('link', { name: '2' }).click();
  await page.waitForTimeout(4000);

   // 1. テキストを取得
  const text4 = await page.locator('#paging > span.sum').textContent();

  // 2. 変数の中に「51」が含まれているか検証
  expect(text4).toContain('件中 51 -');

//No.93
  await page.getByRole('link', { name: '▲' }).nth(3).click();
    await page.waitForTimeout(3000);
  await expect(page.locator('#result_body')).toContainText('Ｆ');

  
  //await expect.soft(page.locator('thead')).not.toContainText('1');

  //await expect.soft(page.getByText('1', { exact: true })).not.toBeVisible();

  await expect(page.getByText('1', { exact: true })).toBeVisible();
//No.94
  await page.getByRole('link', { name: '▼' }).nth(3).click();
    await page.waitForTimeout(3000); 

 
 //No.95
 await page.getByRole('link', { name: '▲' }).nth(4).click();
 await expect(page.locator('#result_body')).toContainText('クラヴィア');

 await expect(page.getByText('1', { exact: true })).toBeVisible();

 await expect(page.locator('#result_head').getByText('2', { exact: true })).toBeVisible();
 
//No.96
  await page.getByRole('link', { name: 'ソートのクリア' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('1', { exact: true })).not.toBeVisible();
   await expect(page.locator('#result_head').getByText('2', { exact: true })).not.toBeVisible();
//No.97
  await page.getByRole('link', { name: '買取' }).first().click();
  await page.waitForTimeout(1000);
  await expect.soft(page).toHaveURL(/.*tradein_biz.php/); 
//No.98
  await expect(page).toHaveTitle('買取・下取');
//No.99
  await expect(page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_g_grade')).toHaveText(gradesearch3!);
//No.100
  //ブラウザバック
   await page.goBack(); 
   await page.waitForTimeout(1000);
//No.101
  await expect.soft(page).toHaveURL(/.*grade.php/); 
//No.102 
   await page.getByRole('link', { name: '検索履歴' }).click();
   await page.getByRole('heading', { name: '検索履歴' }).click();
//No.103 
  await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(4)')).toHaveText('10656');
 //No.104
   await page.locator('#search_type_btn').click();
   await page.waitForTimeout(1000);  
//No.105
  await page.locator('#tusyo_katashiki').click();
  await page.locator('#tusyo_katashiki').fill('AZK10BEXQB');
//No.106
  await page.locator('#search_tsusyo_btn').click();
  await page.waitForTimeout(1000); 

//No.107
  await expect(page.getByRole('cell', { name: 'AZK10' }).nth(1)).toBeVisible();
//No.108
  await expect(page.getByRole('cell', { name: 'ＳＡＩ' }).first()).toBeVisible();
//No.109
  await expect(page.getByRole('cell', { name: 'Ｓ' }).nth(1)).toBeVisible();
//No.110
  await page.getByRole('link', { name: '注文' }).nth(1).click();
  await page.waitForTimeout(1000);
 await expect.soft(page).toHaveURL(/.*stock_biz.php/); 
//No.111
 await expect(page).toHaveTitle('注文販売');
//No.112
   const gradesearch4 = (await page.locator('#result_body > table > tbody > tr:nth-child(1) > td.col_sb_grade').first().textContent())?.trim();  
  
   console.log('gradesearch2のグレードは:', gradesearch4);

//No.113
  //ブラウザバック
 await page.goBack(); 
 await page.waitForTimeout(1000);

//No.114
 await expect(page).toHaveTitle('グレード検索');
 await expect.soft(page).toHaveURL(/.*grade.php/); 
//No.115
  await page.getByRole('link', { name: '検索履歴' }).click();
  await expect(page.getByRole('heading')).toContainText('検索履歴');
//No.116
  await expect(page.locator('#list_history')).toContainText('AZK10BEXQB');//No.116

//No.117
await expect(page.getByRole('list')).toContainText('全 200 件中 1 - 50件');
   // 1. テキストを取得
  let text = await page.locator('#btnarea > tbody > tr > td > ul > li:nth-child(7)').textContent();
   console.log('表示中の件数は:', text); 
  // 2. 変数の中に「1」が含まれているか検証
  expect(text).toContain(' 件中 1 -');

//No.118
  await page.getByRole('link', { name: '次へ>>' }).click();
  //await page.waitForTimeout(4000);
  //遷移後、一行目”No”が「51」になるまでまつ
  await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(1)').first()).toHaveText('51')
  text = await page.locator('#btnarea > tbody > tr > td > ul > li:nth-child(7)').textContent();
   console.log('表示中の件数は:', text); 
  // 2. 変数の中に「1」が含まれているか検証
  expect(text).toContain(' 件中 51 -');

//No.119  
  await page.getByRole('link', { name: '<<前へ' }).click();
  //await page.waitForTimeout(4000);
  //遷移後、一行目”No”が「1」になるまでまつ
  await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(1)').first()).toHaveText('1')
   // 1. テキストを取得
  text = await page.locator('#btnarea > tbody > tr > td > ul > li:nth-child(7)').textContent();
   console.log('表示中の件数は:', text); 
  // 2. 変数の中に「1」が含まれているか検証
  expect(text).toContain(' 件中 1 -');

//No.120
  await page.getByRole('link', { name: '2' }).click();
  //await page.waitForTimeout(4000);
  //遷移後、一行目”No”が「51」になるまでまつ
  await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(1)').first()).toHaveText('51')
  text = await page.locator('#btnarea > tbody > tr > td > ul > li:nth-child(7)').textContent();
   console.log('表示中の件数は:', text); 
  // 2. 変数の中に「1」が含まれているか検証
  expect(text).toContain(' 件中 51 -');
//No.121
  await page.getByRole('link', { name: '1' }).click();
  //await page.waitForTimeout(4000);
  //遷移後、一行目”No”が「1」になるまでまつ
  await expect(page.locator('#list_history > table > tbody > tr:nth-child(2) > td:nth-child(1)').first()).toHaveText('1')
   // 1. テキストを取得
  text = await page.locator('#btnarea > tbody > tr > td > ul > li:nth-child(7)').textContent();
   console.log('表示中の件数は:', text); 
  // 2. 変数の中に「1」が含まれているか検証
  expect(text).toContain(' 件中 1 -');
//No.122
   await page.getByRole('link', { name: 'グレード検索' }).click();
  await expect.soft(page).toHaveURL(/.*grade.php/); 
//No.123
  await page.locator('#Maker').selectOption('1010');
  await page.goto('https://stgdlpro.proto-dataline.com/grade/grade.php#19c31f801b8efe4');
  await page.waitForTimeout(2000);
 //No.124 
  await page.locator('#carType').selectOption('10101073');
  await page.goto('https://stgdlpro.proto-dataline.com/grade/grade.php#19c31f81e68ed2b');
    await page.waitForTimeout(2000);
 //No.125
  await page.locator('#Model').selectOption('13');
  await page.goto('https://stgdlpro.proto-dataline.com/grade/grade.php#19c31f8380412c6d');
    await page.waitForTimeout(2000);  
 //No.126
   await page.locator('input[name="frame_for_maker"]').click();
   await page.locator('input[name="frame_for_maker"]').fill('1234');

 //No.127
  await page.waitForTimeout(2000);
  await page.locator('#age_type3').selectOption('2012');
  await page.waitForTimeout(2000);
  await page.locator('#age_type4').selectOption('2023');
  await page.waitForTimeout(2000);  
//No.128
  await page.waitForTimeout(2000);  
 await page.locator('input[name="katashiki"]').click();
 await page.locator('input[name="katashiki"]').fill('10656');
  await page.waitForTimeout(2000);
 //No.129
 await page.locator('input[name="ruibetsu"]').click();
 await page.locator('input[name="ruibetsu"]').fill('123456');
 await page.locator('input[name="ruibetsu"]').press('Enter');
  await page.waitForTimeout(2000);
 await page.locator('#age_type1').selectOption('2020');
  await page.waitForTimeout(2000);
 //No.130
 await page.locator('input[name="frame_for_type"]').click();
 await page.locator('input[name="frame_for_type"]').fill('12345678');
  await page.waitForTimeout(2000);
 await page.locator('#tusyo_katashiki').click();
 //No.132
 await page.locator('#tusyo_katashiki').fill('AZK10BEXQB');
  await page.waitForTimeout(2000);

//No.133
  await page.getByRole('link', { name: 'クリア' }).click();
  await page.waitForTimeout(2000);

//No.134
  await expect.soft(page.locator('#Maker')).toContainText('メーカー *必須 レクサス トヨタ 日産 ホンダ マツダ ユーノス 日本フォード 三菱 スバル ダイハツ スズキ ミツオカ いすゞ メルセデス・ベンツ ＡＭＧ メルセデスＡＭＧ メルセデスマイバッハ マイバッハ スマート ＢＭＷ ＢＭＷアルピナ アウディ フォルクスワーゲン オペル ポルシェ ヨーロッパフォード イエス！ ロールスロイス ベントレー ジャガー デイムラー ランドローバー ＭＧ ＭＩＮＩ ローバー ロータス アストンマーティン モーガン ＴＶＲ フィアット アバルト フェラーリ ランチア アルファロメオ マセラティ ランボルギーニ アウトビアンキ ルノー アルピーヌ プジョー シトロエン ＤＳオートモビル ヴェンチュリー ボルボ サーブ ドンカーブート キャデラック シボレー ポンテアック ビュイック サターン ハマー リンカーン フォード マーキュリー クライスラー クライスラー・ジープ ダッジ スタークラフト ティアラ テスラ ヒョンデ 起亜 大宇 ＧＭマティス ＣＴ＆Ｔ バーキン ＢＹＤ');

//No.135
  await expect.soft(page.locator('#carType')).toContainText('車種 *必須');
//No.136
  await expect.soft(page.locator('#Model')).toContainText('全て');

//No.137
  await expect.soft(page.locator('input[name="frame_for_maker"]')).toHaveValue('（任意）');
//No.138
  await expect(page.locator('#age_type3')).toContainText('全年式');
  await expect(page.locator('#age_type4')).toContainText('範囲指定なし');

//No.139
  await expect.soft(page.locator('input[name="katashiki"]')).toHaveValue('※必須(5桁)');
//No.140
  await expect.soft(page.locator('input[name="ruibetsu"]')).toHaveValue('（任意）');
//No.141
await expect(page.locator('#age_type1')).toContainText('全年式 2026(R8) 2025(R7) 2024(R6) 2023(R5) 2022(R4) 2021(R3) 2020(R2) 2019(H31・R1) 2018(H30) 2017(H29) 2016(H28) 2015(H27) 2014(H26) 2013(H25) 2012(H24) 2011(H23) 2010(H22) 2009(H21) 2008(H20) 2007(H19) 2006(H18) 2005(H17) 2004(H16) 2003(H15) 2002(H14) 2001(H13) 2000(H12) 1999(H11) 1998(H10) 1997(H9) 1996(H8) 1995(H7) 1994(H6) 1993(H5) 1992(H4) 1991(H3) 1990(H2) 1989(H1)');
await expect(page.locator('#age_type2')).toContainText('範囲指定なし 2026(R8) 2025(R7) 2024(R6) 2023(R5) 2022(R4) 2021(R3) 2020(R2) 2019(H31・R1) 2018(H30) 2017(H29) 2016(H28) 2015(H27) 2014(H26) 2013(H25) 2012(H24) 2011(H23) 2010(H22) 2009(H21) 2008(H20) 2007(H19) 2006(H18) 2005(H17) 2004(H16) 2003(H15) 2002(H14) 2001(H13) 2000(H12) 1999(H11) 1998(H10) 1997(H9) 1996(H8) 1995(H7) 1994(H6) 1993(H5) 1992(H4) 1991(H3) 1990(H2) 1989(H1)');
//No.142
  await expect.soft(page.locator('input[name="frame_for_type"]')).toHaveValue('例:12345678(数値のみ入力)');
//No.143
  await expect.soft(page.locator('#tusyo_katashiki')).toHaveValue('例:ABC-DEFGHHJKLMMN');

});