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
  

  //await page.waitForTimeout(3000);
  });