import { test, expect } from '@playwright/test';


test('test', async({page, context})=> {
  await page.goto('https://devdlpro.proto-dataline.com/');

  await page.getByRole('textbox', { name: 'ログインID' }).fill('tst0001');
  await page.getByRole('textbox', { name: 'パスワード' }).fill('tst0001');
  
  await page.waitForTimeout(3000);

  await page.getByRole('button', { name: 'ログイン' }).click();
  await expect.soft(page).toHaveURL('https://devdlpro.proto-dataline.com/top/top.php'); 

  await page.getByRole('link', { name: 'グレード検索' }).click();
  await page.waitForTimeout(3000);
  await expect.soft(page).toHaveURL('https://devdlpro.proto-dataline.com/grade/grade.php'); 
  
  await page.waitForTimeout(3000);


  await page.locator('#Maker').selectOption('1010');
  await page.goto('https://devdlpro.proto-dataline.com/grade/grade.php#19c31f801b8efe4');
    await page.waitForTimeout(3000);
  await page.locator('#carType').selectOption('10101073');
  await page.goto('https://devdlpro.proto-dataline.com/grade/grade.php#19c31f81e68ed2b');
    await page.waitForTimeout(3000);
  await page.locator('#Model').selectOption('13');
  await page.goto('https://devdlpro.proto-dataline.com/grade/grade.php#19c31f8380412c6d');
  
  await page.locator('input[name="frame_for_maker"]').fill('1234');

    await page.waitForTimeout(3000);
  await page.locator('#age_type3').selectOption('2012');
    await page.waitForTimeout(3000);
  await page.locator('#age_type4').selectOption('2023');
    await page.waitForTimeout(3000);
  await page.locator('#search_maker_btn').click();
//FURUGENブランチでコミット
  });