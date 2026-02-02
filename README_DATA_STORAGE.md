# 數據存儲說明

## 概述

這個項目**沒有使用數據庫**，而是使用 **JSON 文件**來存儲所有數據。所有數據都保存在 `public/` 目錄下的 JSON 文件中。

## 數據存儲位置

所有數據文件都位於：`/public/` 目錄

```
public/
├── services.json          # 服務數據
├── courses.json           # 課程數據
├── blog.json              # 博客文章數據
├── blogCategories.json    # 博客分類
├── blogTags.json          # 博客標籤
├── products.json          # 產品數據
├── memberships.json       # 會員申請數據
├── imageMapping.json      # 圖片映射（從 Excel 提取）
└── images/                # 上傳的圖片文件
    ├── service-xxx.jpg
    ├── course-xxx.png
    └── row-1.jpg (從 Excel 提取)
```

## 數據文件說明

### 1. `services.json`
- **用途**: 存儲所有服務（Services）數據
- **格式**: JSON 數組
- **結構**:
```json
[
  {
    "id": "s1",
    "name": "和合法事",
    "price": 6800,
    "category": "感情修復",
    "description": "...",
    "imageUrl": "/images/service-xxx.jpg",
    "tags": ["感情", "姻緣"],
    "instagramUrl": "..."
  }
]
```

### 2. `courses.json`
- **用途**: 存儲所有課程（Courses）數據
- **格式**: JSON 數組
- **結構**:
```json
[
  {
    "id": "c1",
    "name": "六壬課程入門簡介班",
    "price": 3888,
    "duration": "兩天",
    "level": "入門",
    "description": "...",
    "imageUrl": "/images/course-xxx.jpg",
    "instagramUrl": "..."
  }
]
```

### 3. `blog.json`
- **用途**: 存儲博客文章數據
- **格式**: JSON 數組

### 4. `products.json`
- **用途**: 存儲產品數據
- **格式**: JSON 對象（包含 categories 和 subcategories）

### 5. `memberships.json`
- **用途**: 存儲會員申請數據
- **格式**: JSON 數組

## 數據讀寫流程

### 讀取數據
1. 前端調用 `utils/servicesStorage.ts` 或 `utils/coursesStorage.ts` 中的函數
2. 這些函數通過 API 請求後端：`GET /api/services` 或 `GET /api/courses`
3. 後端 `server/api.js` 讀取對應的 JSON 文件
4. 返回 JSON 數據給前端

### 保存數據
1. 前端調用保存函數（如 `saveService()`）
2. 通過 API 請求後端：`POST /api/services` 或 `POST /api/courses`
3. 後端將整個數組寫入對應的 JSON 文件
4. 返回成功/失敗狀態

## 後端 API 端點

所有數據操作都通過後端 API (`server/api.js`) 進行：

| 端點 | 方法 | 說明 |
|------|------|------|
| `/api/services` | GET | 讀取所有服務 |
| `/api/services` | POST | 保存所有服務（覆蓋整個文件） |
| `/api/courses` | GET | 讀取所有課程 |
| `/api/courses` | POST | 保存所有課程（覆蓋整個文件） |
| `/api/blog` | GET | 讀取所有博客文章 |
| `/api/blog` | POST | 保存所有博客文章 |
| `/api/memberships` | GET | 讀取所有會員申請 |
| `/api/memberships` | POST | 保存所有會員申請 |
| `/api/upload-image` | POST | 上傳圖片文件 |
| `/api/delete-image/:filename` | DELETE | 刪除圖片文件 |

## 數據文件路徑

後端代碼中，文件路徑的構建方式：

```javascript
// server/api.js
const getFilePath = (filename) => {
  return path.join(__dirname, '../public', filename);
};
```

實際路徑示例：
- `services.json` → `/Users/leungkeith/projects/toto_v2/toto/public/services.json`
- `courses.json` → `/Users/leungkeith/projects/toto_v2/toto/public/courses.json`

## 優點和缺點

### ✅ 優點
- **簡單**: 不需要設置數據庫
- **易於備份**: 直接複製 JSON 文件即可
- **易於查看**: 可以直接打開 JSON 文件查看數據
- **版本控制**: JSON 文件可以納入 Git 版本控制
- **快速開發**: 適合小型項目和原型開發

### ⚠️ 缺點
- **性能**: 每次讀寫都要讀取/寫入整個文件
- **併發**: 多個用戶同時修改可能導致數據丟失
- **擴展性**: 數據量大時性能會下降
- **查詢**: 無法進行複雜的查詢操作
- **關係**: 無法建立數據之間的關係（外鍵等）

## 數據備份建議

由於沒有數據庫，建議定期備份 JSON 文件：

```bash
# 備份所有數據文件
cp -r public/ backups/public-$(date +%Y%m%d-%H%M%S)/
```

## 遷移到數據庫

如果未來需要遷移到數據庫（如 MongoDB, PostgreSQL），需要：

1. 選擇數據庫系統
2. 創建數據模型（Schema）
3. 編寫遷移腳本，將 JSON 數據導入數據庫
4. 修改後端 API，從數據庫讀寫而不是 JSON 文件
5. 更新前端代碼（通常不需要改動，因為 API 接口保持一致）

## 當前數據位置總結

| 數據類型 | 存儲位置 | 文件格式 |
|---------|---------|---------|
| 服務 (Services) | `public/services.json` | JSON 數組 |
| 課程 (Courses) | `public/courses.json` | JSON 數組 |
| 博客 (Blog) | `public/blog.json` | JSON 數組 |
| 產品 (Products) | `public/products.json` | JSON 對象 |
| 會員申請 | `public/memberships.json` | JSON 數組 |
| 上傳的圖片 | `public/images/` | 圖片文件 |
| Excel 提取的圖片 | `public/images/row-*.jpg` | 圖片文件 |

## 注意事項

1. **文件權限**: 確保 `public/` 目錄有讀寫權限
2. **文件鎖定**: 避免同時修改同一個 JSON 文件
3. **數據驗證**: 在保存前驗證數據格式
4. **備份**: 定期備份 JSON 文件
5. **文件大小**: 如果 JSON 文件過大（>10MB），考慮遷移到數據庫
