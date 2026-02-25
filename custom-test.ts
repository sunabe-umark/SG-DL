import { test as base, Page, TestInfo, Locator } from '@playwright/test';
import * as fs from 'fs';

// 📸 アクションの日本語訳
const ACTION_MAP: Record<string, string> = {
  click: 'をクリック',
  dblclick: 'をダブルクリック',
  fill: 'を入力',
  check: 'にチェックを入れる',
  uncheck: 'のチェックを外す',
  selectOption: 'を選択',
  hover: 'にカーソルを合わせる',
  press: 'キーを押す',
  setInputFiles: 'ファイルをアップロード',
  goto: 'ページを開く',
  waitFor: 'を確認'
};

// 🔍 監視対象のメソッド
const CHAIN_METHODS = [
  'locator', 'getByRole', 'getByText', 'getByLabel', 
  'getByPlaceholder', 'getByAltText', 'getByTitle', 'getByTestId',
  'first', 'last', 'nth', 'filter'
];

// 📂 ソースコードキャッシュ
const fileCache = new Map<string, string[]>();

const findCommentBeforeLine = (filePath: string, lineNumber: number): string => {
  try {
    if (!fileCache.has(filePath)) {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        fileCache.set(filePath, content.split(/\r?\n/));
      } else { return ''; }
    }
    const lines = fileCache.get(filePath) || [];
    let currentIndex = lineNumber - 2;
    while (currentIndex >= 0) {
      const line = lines[currentIndex].trim();
      if (line === '') { currentIndex--; continue; }
      if (line.startsWith('//')) return line.replace(/^\/\/\s*/, '');
      break;
    }
  } catch (e) {}
  return '';
};

const getCallLineNumber = (filePath: string): number => {
  const stack = new Error().stack || '';
  const lines = stack.split('\n');
  const targetLine = lines.find(line => line.includes(filePath));
  if (!targetLine) return 0;
  const match = targetLine.match(/:(\d+):\d+/);
  return match ? parseInt(match[1]) : 0;
};

const parseArgs = (args: any[]): string => {
  if (args.length === 0) return '';
  const arg = args[0];
  if (typeof arg === 'string') return `「${arg}」`;
  if (typeof arg === 'object') {
    if (arg.hasText) return `(テキスト「${arg.hasText}」を含む)`;
    if (arg.name) return `「${arg.name}」`;
  }
  return '';
};

const getReadableName = (prop: string, args: any[]): string => {
  try {
    if (prop === 'getByRole') {
      const role = args[0] === 'link' ? 'リンク' : args[0] === 'button' ? 'ボタン' : args[0] === 'textbox' ? '入力欄' : args[0];
      const name = args[1]?.name ? `「${args[1].name}」` : '';
      return `${role}${name}`;
    }
    if (prop === 'filter') return parseArgs(args);
    if (prop === 'nth') return `${args[0] + 1}番目の要素`;
    if (prop === 'first') return `最初の要素`;
    if (prop === 'last') return `最後の要素`;
    if (prop === 'locator') {
      let selector = args[0] as string;
      if (selector.startsWith('xpath=')) return '特定の要素(XPath)';
      if (selector.includes('nth-child')) return '特定の要素(位置指定)';
      return `要素「${selector}」`;
    }
    if (prop.startsWith('getBy')) return parseArgs(args);
    return '';
  } catch (e) { return '要素'; }
};

// スクリーンショット撮影の共通処理 (軽量化版)修正前
/*
const takeScreenshot = async (
  page: Page, 
  testInfo: TestInfo, 
  counter: { val: number }, 
  desc: string, 
  actionProp: string
) => {
  try {
    if (page && page.waitForLoadState) await page.waitForLoadState().catch(() => {});
    if (page && page.waitForTimeout) await page.waitForTimeout(500);
    if (page && page.bringToFront) await page.bringToFront().catch(() => {});

    const safeDesc = desc.replace(/[\\/:*?"<>|]/g, '').substring(0, 150);
    const fileName = `${String(counter.val).padStart(3, '0')}-${actionProp}__${safeDesc}`;

    if (page && page.screenshot) {
      // ★ここが軽量化のポイント！
      // type: 'jpeg' -> PNGより軽い
      // quality: 50  -> 画質を50%にする（十分綺麗です）
      // scale: 'css' -> スマホの高解像度(Retina)を無視して見た目のサイズで撮る（超軽量化）
      const buffer = await page.screenshot({ 
        type: 'jpeg', 
        quality: 50, 
        scale: 'css' 
      });
      
      // 添付ファイルの種類も jpeg に設定
      await testInfo.attach(fileName, { body: buffer, contentType: 'image/jpeg' });
      counter.val++;
    }
  } catch (e) {
    console.log('📸 スクショ失敗:', e);
  }
};
*/
// スクリーンショット撮影の共通処理 (軽量化版)修正版
const takeScreenshot = async (
  page: Page, 
  testInfo: TestInfo, 
  counter: { val: number }, 
  desc: string, 
  actionProp: string
) => {
  try {
    // ページが存在しない(null/undefined)場合や、閉じている場合は早期リターン
    if (!page || page.isClosed()) return;

    if (page.waitForLoadState) await page.waitForLoadState().catch(() => {});
    if (page.waitForTimeout) await page.waitForTimeout(500);
    if (page.bringToFront) await page.bringToFront().catch(() => {});

    const safeDesc = desc.replace(/[\\/:*?"<>|]/g, '').substring(0, 150);
    const fileName = `${String(counter.val).padStart(3, '0')}-${actionProp}__${safeDesc}`;

    if (page.screenshot) {
      // ★ここが軽量化のポイント！
      const buffer = await page.screenshot({ 
        type: 'jpeg', 
        quality: 50, 
        scale: 'css' 
      });
      
      await testInfo.attach(fileName, { body: buffer, contentType: 'image/jpeg' });
      counter.val++;
    }
  } catch (e: any) {
    // ▼▼▼ 修正箇所：エラー内容を判定する ▼▼▼

    // 「ページが閉じている」というエラーの場合は、失敗ログを出さずに終了する
    if (e.message && e.message.includes('Target page, context or browser has been closed')) {
      // 必要であればコメントアウトを外してログに出しても良いですが、
      // テスト結果をきれいにしたい場合は何もしないのがおすすめです。
      // console.log('⚠️ 画面が閉じられたため、スクショをスキップしました');
      return;
    }

    // それ以外の「本当のエラー」の場合だけログに出す
    console.log('📸 スクショ失敗:', e);
  }
};
const createProxy = (obj: any, testInfo: TestInfo, counter: { val: number }, currentDesc: string = ''): any => {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      const originalValue = Reflect.get(target, prop, receiver);

      // --- 1. アクション実行時 ---
      if (typeof prop === 'string' && Object.keys(ACTION_MAP).includes(prop)) {
        return async (...args: any[]) => {
          const result = await originalValue.apply(target, args);

          const testFilePath = testInfo.file;
          const lineNum = getCallLineNumber(testFilePath);
          const comment = findCommentBeforeLine(testFilePath, lineNum);

          let extraInfo = '';
          if (prop === 'fill') extraInfo = `「${args[0]}」`;
          if (prop === 'selectOption') extraInfo = `「${args[0]}」`;
          if (prop === 'goto') extraInfo = `「${args[0]}」`;

          // ▼▼▼ ここから追加 ▼▼▼
          if (prop === 'waitFor') {
            const state = args[0]?.state || 'visible'; // 指定がない場合は visible(表示) 扱い
            extraInfo = state === 'hidden' ? 'が消えること' : 'が表示されること';
          }
          // ▲▲▲ ここまで追加 ▲▲▲

          let subject = currentDesc || (prop === 'goto' ? '' : '画面');
          const actionName = ACTION_MAP[prop];
          let description = `${subject}${extraInfo}${actionName}`;
          if (comment) description = `[${comment}] ${description}`;

          const page = obj.page ? obj.page() : obj;
          await takeScreenshot(page, testInfo, counter, description, prop);
          
          return result;
        };
      }

      // --- 2. waitForEvent (別タブ取得) ---
      if (prop === 'waitForEvent') {
        return async (...args: any[]) => {
          const resultPage = await originalValue.apply(target, args);

          const testFilePath = testInfo.file;
          const lineNum = getCallLineNumber(testFilePath);
          const comment = findCommentBeforeLine(testFilePath, lineNum);
          
          let description = '別タブが開きました';
          if (comment) description = `[${comment}] ${description}`;

          await takeScreenshot(resultPage, testInfo, counter, description, 'popup');

          return createProxy(resultPage, testInfo, counter, '別タブ');
        };
      }

      // --- 3. ロケーター連結時 ---
      if (typeof prop === 'string' && CHAIN_METHODS.includes(prop)) {
        return (...args: any[]) => {
          const result = originalValue.apply(target, args);
          const thisDesc = getReadableName(prop, args);
          let nextDesc = thisDesc;
          
          if (currentDesc && thisDesc) {
            if (['filter', 'nth', 'first', 'last'].includes(prop)) {
              nextDesc = `${currentDesc}${thisDesc}`;
            } else {
              nextDesc = `${currentDesc} の ${thisDesc}`;
            }
          } else if (currentDesc) {
             nextDesc = currentDesc;
          }
          return createProxy(result, testInfo, counter, nextDesc);
        };
      }

      return originalValue;
    }
  });
};

export const test = base.extend<{ page: Page }>({
  page: async ({ page }, use, testInfo) => {
    const counter = { val: 1 };
    await use(createProxy(page, testInfo, counter, ''));
  }
});

export { expect } from '@playwright/test';