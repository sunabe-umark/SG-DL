import { test, expect } from '@playwright/test';


test('test', async({page, context})=> {
  await page.goto('https://devdlpro.proto-dataline.com/');

  await page.getByRole('textbox', { name: 'ログインID' }).fill('tst0001');
  await page.getByRole('textbox', { name: 'パスワード' }).fill('tst0001');
  
  await page.waitForTimeout(3000);

  await page.getByRole('button', { name: 'ログイン' }).click();

  //ホーム画面ボタン表示の確認
  await expect.soft(page.getByRole('link', { name: 'グレード検索' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: 'ＡＡ相場' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: '小売相場' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: '商談ツール' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: '仕入リサーチ' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: '注文販売' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: '流通レポート' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: '業界ニュース' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: '陸送' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: '販促・事務用品' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: '基準価格' })).toBeVisible();
  

  await page.getByRole('link', { name: 'グレード検索' }).click();
  await expect.soft(page).toHaveURL('https://devdlpro.proto-dataline.com/grade/grade.php'); 
  await page.getByRole('link', { name: 'Data Line PRO' }).click();

  await page.getByRole('link', { name: 'ＡＡ相場' }).click();
  await expect.soft(page).toHaveURL('https://devdlpro.proto-dataline.com/aa/aa.php');
  await page.getByRole('link', { name: 'Data Line PRO' }).click();

  await page.getByRole('link', { name: '小売相場' }).click();
  await expect.soft(page).toHaveURL('https://devdlpro.proto-dataline.com/retail/retail.php');
  await page.getByRole('link', { name: 'Data Line PRO' }).click();

  await page.getByRole('link', { name: '商談ツール' }).click();
  await expect.soft(page).toHaveURL('https://devdlpro.proto-dataline.com/tradein_biz/tradein_biz.php');
  await page.getByRole('link', { name: 'Data Line PRO' }).click();

  await page.getByRole('link', { name: '仕入リサーチ' }).click();
  await expect.soft(page).toHaveURL('https://devdlpro.proto-dataline.com/stock/stock.php'); 
  await page.getByRole('link', { name: 'Data Line PRO' }).click();

  await page.getByRole('link', { name: '注文販売' }).click();
  await expect.soft(page).toHaveURL('https://devdlpro.proto-dataline.com/stock_biz/stock_biz.php'); 
  await page.getByRole('link', { name: 'Data Line PRO' }).click();

  await page.getByRole('link', { name: '流通レポート' }).click();
  await expect.soft(page).toHaveURL('https://devdlpro.proto-dataline.com/info/info.php');  
  await page.getByRole('link', { name: 'Data Line PRO' }).click();
 
  //タブを開いたままにする場合はこの命令
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '業界ニュース' }).click();
  const page2 = await page2Promise;
  
  await expect.soft(page2).toHaveURL('https://www.goonews.jp/'); 

  //タブを開いたままにする場合はこの命令、pege＝ホーム画面を開いていたタブ、ホーム画面のタブに戻る操作
  /*ここから
  await page.bringToFront();
  ここまで*/
  
//タブを閉じる場合
  await page2.close();
  
 //新しいタブを開いて陸送を表示 
  const page3Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '陸送', exact: true }).click();
  const page3 = await page3Promise;
  await expect.soft(page3).toHaveURL('https://devdlpro.proto-dataline.com/transport/transport.php'); 

 //タブを開いたままにする場合はこの命令、pege＝ホーム画面を開いていたタブ、ホーム画面のタブに戻る操作
  /*ここから
  await page.bringToFront(); 
ここまで*/
 
//タブを閉じる場合
  await page3.close();

//新しいタブを開いて販促・事務用品を開く
const page4Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '販促・事務用品' }).click();
  const page4 = await page4Promise;
  await expect.soft(page4).toHaveURL('https://marus-net.com/'); 

//タブを閉じる場合
  await page4.close();

  await page.getByRole('link', { name: '基準価格' }).click();
  await expect.soft(page).toHaveURL('https://devdlpro.proto-dataline.com/spg/spg.php'); 

  await page.getByRole('link', { name: 'グレード検索' }).click();
  await expect.soft(page).toHaveURL('https://devdlpro.proto-dataline.com/grade/grade.php'); 

  await page.getByRole('link', { name: 'AA相場' }).click();
   await expect.soft(page).toHaveURL('https://devdlpro.proto-dataline.com/aa/aa.php');

  await page.getByRole('link', { name: '小売相場' }).click();
  await expect.soft(page).toHaveURL('https://devdlpro.proto-dataline.com/retail/retail.php');

  await page.getByRole('link', { name: '仕入リサーチ' }).click();
  await expect.soft(page).toHaveURL('https://devdlpro.proto-dataline.com/stock/stock.php');
  
  await page.getByRole('link', { name: '注文販売' }).click();
  await expect.soft(page).toHaveURL('https://devdlpro.proto-dataline.com/stock_biz/stock_biz.php');

  await page.getByRole('link', { name: '流通レポート' }).click();
  await expect.soft(page).toHaveURL('https://devdlpro.proto-dataline.com/info/info.php');  

  const page5Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '業界ニュース' }).click();
  const page5 = await page5Promise;
  await expect.soft(page5).toHaveURL('https://www.goonews.jp/');
  await page5.close();


  const page6Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '陸送' }).click();
  const page6 = await page6Promise;
  await expect.soft(page6).toHaveURL('https://devdlpro.proto-dataline.com/transport/transport.php'); 
  await page6.close();

 
  const page7Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '販促' }).click();
  const page7 = await page7Promise;
  await expect.soft(page7).toHaveURL('https://marus-net.com/'); 
  await page7.close();

    await page.getByRole('link', { name: '基準価格' }).click();

 await page.getByRole('link', { name: 'Data Line PRO' }).click();
/*お知らせの確認テストここから(未完成)*/
  // --- 1. 値の取得と保存 ---
  // 例：商品リストの最初のアイテムの名前を取得する
  // .trim() をつけると、前後の余計な空白を削除してきれいに取れます（推奨）
  const targetText1 = (await page.locator('#info > div.info_slide.slick-initialized.slick-slider.slick-dotted').first().textContent())?.trim();  

  // 念のため、ちゃんと取れたかログに出しておく
  console.log(`取得した値: ${targetText1}`);
 // もし値が空（null/undefined）ならテストを失敗させるガード
  if (!targetText1) throw new Error('値が取得できませんでした');
 await page.getByRole('img', { name: '←' }).click();

  await expect(page.getByRole('listbox')).not.toContainText(targetText1);
await page.getByRole('img', { name: '←' }).click();

// --- 3. 検証（アサーション） ---
  // 詳細画面のタイトル要素(#detail-title)が、さっき保存した targetText と同じか？
  const detailTitle = page.locator('#info > div.info_slide.slick-initialized.slick-slider.slick-dotted');
  
  // 不一致を確認する場合
  await expect(detailTitle).toHaveText(targetText1);

  // （または）その文字を含んでいるか確認する場合（"商品名：〇〇" などの場合）
  await expect(detailTitle).toContainText(targetText1);

  await page.getByRole('img', { name: '→' }).click();
/*ここまで*/

await page.getByRole('combobox', { name: 'メーカー' }).click();
await page.getByRole('treeitem', { name: 'トヨタ', exact: true }).click();
await page.waitForTimeout(3000);
await page.getByRole('textbox', { name: '車種 *必須' }).click();
await page.waitForTimeout(3000);
await page.getByRole('treeitem', { name: 'Ｃ－ＨＲ' }).click();
await page.waitForTimeout(2000);

await page.getByRole('textbox', { name: 'グレード' }).click();
await page.waitForTimeout(3000);
await page.getByRole('treeitem', { name: 'Ｓ', exact: true }).click();
await page.waitForTimeout(2000);
await page.getByRole('textbox', { name: '年式' }).click();
await page.waitForTimeout(3000);
await page.getByRole('treeitem', { name: '(H29)' }).click();
await page.waitForTimeout(2000);
await page.getByText('ＡＡ相場で検索 該当件数83件').click();
await page.waitForTimeout(3000);
await expect(page.locator('#t_result_area')).toContainText('Ｓ');
//0206コミット2
});
