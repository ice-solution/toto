# 圖片上傳功能說明

## 功能概述

現在 Services 和 Courses 的 CMS 管理界面都支持圖片上傳功能。管理員可以直接上傳圖片，圖片會自動保存到 `public/images` 目錄，並將 URL 記錄到對應的數據中。

## 使用方法

### 1. 在 Services CMS 中上傳圖片

1. 進入 Admin 管理界面
2. 選擇「服務管理」標籤
3. 創建新服務或編輯現有服務
4. 在「圖片」區域：
   - 點擊「上傳圖片」按鈕選擇本地圖片文件
   - 或直接在「圖片 URL」輸入框中輸入外部圖片鏈接
5. 上傳成功後，圖片 URL 會自動填入
6. 保存服務數據

### 2. 在 Courses CMS 中上傳圖片

1. 進入 Admin 管理界面
2. 選擇「課程管理」標籤
3. 創建新課程或編輯現有課程
4. 在「圖片」區域：
   - 點擊「上傳圖片」按鈕選擇本地圖片文件
   - 或直接在「圖片 URL」輸入框中輸入外部圖片鏈接
5. 上傳成功後，圖片 URL 會自動填入
6. 保存課程數據

## 技術細節

### 後端 API

- **上傳端點**: `POST /api/upload-image`
  - 接受 `multipart/form-data` 格式
  - 參數：
    - `image`: 圖片文件
    - `type`: 圖片類型 (`service`, `course`, 或 `general`)
  - 返回：
    ```json
    {
      "success": true,
      "imageUrl": "/images/service-1234567890-image.jpg",
      "filename": "service-1234567890-image.jpg",
      "message": "圖片上傳成功"
    }
    ```

- **刪除端點**: `DELETE /api/delete-image/:filename`
  - 用於刪除已上傳的圖片

### 文件存儲

- 圖片保存在: `public/images/` 目錄
- 文件命名格式: `{type}-{timestamp}-{originalName}.{ext}`
  - 例如: `service-1703123456789-和合法事.jpg`
  - 例如: `course-1703123456789-六壬課程.png`

### 前端組件

- **ImageUpload 組件**: `components/ImageUpload.tsx`
  - 支持拖拽上傳（可選）
  - 實時預覽
  - 文件類型驗證（JPEG, JPG, PNG, GIF, WEBP）
  - 文件大小限制（10MB）
  - 支持手動輸入 URL

## 配置要求

### 安裝依賴

```bash
npm install
```

需要安裝 `multer` 用於處理文件上傳：

```bash
npm install multer
```

### 環境變量

確保 `.env` 文件中配置了正確的 API 地址（如果需要）：

```env
VITE_API_BASE_URL=http://localhost:3002/api
API_PORT=3002
API_HOST=localhost
```

## 注意事項

1. **文件大小限制**: 單個圖片文件最大 10MB
2. **支持格式**: JPEG, JPG, PNG, GIF, WEBP
3. **文件命名**: 自動生成唯一文件名，避免衝突
4. **圖片路徑**: 上傳的圖片路徑為 `/images/{filename}`，對應 `public/images/` 目錄
5. **刪除圖片**: 目前刪除服務/課程時不會自動刪除對應的圖片文件，需要手動清理

## 故障排除

### 問題：上傳失敗

1. 檢查後端 API 服務是否運行 (`npm run dev:api`)
2. 檢查 `public/images` 目錄是否存在且有寫入權限
3. 檢查文件大小是否超過 10MB
4. 檢查文件格式是否支持

### 問題：圖片無法顯示

1. 檢查圖片路徑是否正確（應為 `/images/...`）
2. 確認圖片文件確實存在於 `public/images` 目錄
3. 檢查瀏覽器控制台是否有錯誤信息

### 問題：API 請求失敗

1. 檢查 `VITE_API_BASE_URL` 環境變量配置
2. 確認後端服務正在運行
3. 檢查 CORS 設置是否正確

## 未來改進

- [ ] 添加圖片裁剪功能
- [ ] 添加圖片壓縮功能
- [ ] 支持批量上傳
- [ ] 添加圖片管理界面（查看、刪除所有上傳的圖片）
- [ ] 自動清理未使用的圖片
- [ ] 支持拖拽上傳
