# Blog JSON API 使用說明

## 資料存儲位置

所有 Blog 資料現在存儲在 JSON 文件中，而不是 localStorage：

- **Blog 文章**: `public/blog.json`
- **Categories**: `public/blogCategories.json`
- **Tags**: `public/blogTags.json`

## 啟動方式

### 方式 1: 同時啟動前端和 API 服務器（推薦）

```bash
npm run dev:all
```

這會同時啟動：
- Vite 開發服務器（端口 3001）
- API 服務器（端口 3002）

### 方式 2: 分別啟動

**終端 1 - 啟動前端：**
```bash
npm run dev
```

**終端 2 - 啟動 API 服務器：**
```bash
npm run dev:api
```

## API 端點

API 服務器運行在 `http://localhost:3002`

### Blog 文章
- `GET /api/blog` - 讀取所有文章
- `POST /api/blog` - 保存所有文章

### Categories
- `GET /api/blog/categories` - 讀取所有分類
- `POST /api/blog/categories` - 保存分類

### Tags
- `GET /api/blog/tags` - 讀取所有標籤
- `POST /api/blog/tags` - 保存標籤

## 優勢

1. ✅ **資料同步**: 所有用戶看到相同的資料
2. ✅ **易於備份**: JSON 文件可以直接備份
3. ✅ **版本控制**: JSON 文件可以加入 Git
4. ✅ **簡單維護**: 可以直接編輯 JSON 文件

## 注意事項

- 確保 API 服務器在編輯文章前已啟動
- JSON 文件會自動保存，無需手動操作
- 如果 API 服務器未運行，讀取會失敗（會返回空數組）

