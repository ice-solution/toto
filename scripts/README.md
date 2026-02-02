# 從 Excel 提取圖片腳本

這個腳本可以從 `data.xlsx` 文件中提取第一列的圖片，並保存到 `public/images` 目錄。

## 使用方法

### 1. 安裝依賴

```bash
npm install
```

### 2. 運行腳本

```bash
npm run extract-images
```

或者直接運行：

```bash
node scripts/extractImagesFromExcel.js
```

## 工作原理

1. **讀取 Excel 文件**：Excel (.xlsx) 文件實際上是一個 ZIP 壓縮包
2. **提取圖片**：從 `xl/media/` 目錄中提取所有圖片文件
3. **重命名**：按順序命名為 `row-1.png`, `row-2.png`, `row-3.png` 等
4. **保存映射**：生成 `public/imageMapping.json` 文件，記錄圖片與行號的對應關係

## 輸出結構

```
public/
  images/
    row-1.png
    row-2.jpg
    row-3.png
    ...
  imageMapping.json
```

## imageMapping.json 格式

```json
{
  "1": {
    "originalName": "image1.png",
    "fileName": "row-1.png",
    "path": "/images/row-1.png",
    "row": 1,
    "publicPath": "/images/row-1.png"
  },
  "2": {
    "originalName": "image2.jpg",
    "fileName": "row-2.jpg",
    "path": "/images/row-2.jpg",
    "row": 2,
    "publicPath": "/images/row-2.jpg"
  }
}
```

## 在代碼中使用

### 方法 1: 直接使用路徑

```typescript
// 假設第 5 行的圖片
const imageUrl = '/images/row-5.png';
```

### 方法 2: 從映射文件讀取

```typescript
import imageMapping from '../public/imageMapping.json';

// 獲取第 5 行的圖片
const imageUrl = imageMapping[5]?.path || '/images/placeholder.png';
```

### 方法 3: 使用輔助函數

```typescript
import { getImageByRow } from '../utils/imageHelper';

// 獲取第 5 行的圖片
const imageUrl = getImageByRow(5);
```

## 注意事項

1. **圖片順序**：腳本按圖片在 Excel 中的插入順序提取，如果順序與行號不對應，需要手動檢查
2. **第一行**：如果 Excel 第一行是標題行，那麼 `row-1` 對應的是標題行的圖片
3. **圖片格式**：支持 PNG, JPG, JPEG, GIF, WEBP 格式
4. **嵌入圖片**：只提取嵌入在 Excel 中的圖片，不包含外部鏈接的圖片

## 疑難排解

### 問題：找不到圖片

- 確保圖片是嵌入在 Excel 單元格中的，而不是外部鏈接
- 檢查 Excel 文件是否正確保存在項目根目錄
- 確認圖片在第一列

### 問題：圖片順序不對

- 檢查 `imageMapping.json` 文件
- 手動調整圖片文件名或更新映射文件
- 可以根據 Excel 的實際內容手動匹配

### 問題：模塊未找到

```bash
npm install adm-zip fast-xml-parser
```
