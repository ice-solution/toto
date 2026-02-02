# 圖片無法顯示問題修復

## 問題描述

在 build 後的生產環境中，運行時上傳的圖片無法顯示。例如：
- 圖片 URL: `/images/general-1770048626797-row-8.jpg`
- 問題：build 後前端是靜態文件，圖片保存在服務器的 `public/images/`，但不在 `dist/images/` 中

## 解決方案

### 1. 後端提供靜態文件服務

在 `server/api.js` 中添加了靜態文件服務：

```javascript
// 提供靜態文件服務 - 提供 public/images 目錄的圖片
const imagesDir = path.join(__dirname, '../public/images');
app.use('/images', express.static(imagesDir));
```

這樣後端可以直接提供 `public/images/` 目錄中的圖片。

### 2. Apache 配置代理

在 Apache 配置文件中添加了圖片代理：

```apache
# 圖片文件代理 - 將 /images 請求代理到後端
ProxyPass /images/ http://localhost:3002/images/
ProxyPassReverse /images/ http://localhost:3002/images/
```

這樣當前端請求 `/images/xxx.jpg` 時：
1. 首先檢查 `dist/images/xxx.jpg`（build 時已存在的圖片）
2. 如果不存在，則代理到後端 `http://localhost:3002/images/xxx.jpg`
3. 後端從 `public/images/` 提供圖片

## 工作流程

### 開發環境
1. 圖片上傳到 `public/images/`
2. Vite 開發服務器直接提供 `public/` 目錄
3. 圖片通過 `/images/xxx.jpg` 訪問

### 生產環境（Build 後）
1. 圖片上傳到服務器的 `public/images/`
2. 前端請求 `/images/xxx.jpg`
3. Apache 首先檢查 `dist/images/xxx.jpg`
   - 如果存在（build 時的圖片），直接提供
   - 如果不存在（運行時上傳的圖片），代理到後端
4. 後端從 `public/images/` 提供圖片

## 已更新的文件

1. **server/api.js**
   - 添加了 `express.static` 中間件提供圖片服務

2. **apache2-virtualhost.conf**
   - 添加了 `/images/` 代理配置

3. **toto.brandactivation.hk.conf**
   - 添加了 `/images/` 代理配置

## 測試步驟

1. **重啟後端服務**：
   ```bash
   npm run dev:api
   ```

2. **重啟 Apache**（如果已部署）：
   ```bash
   sudo systemctl reload apache2
   # 或
   sudo service apache2 reload
   ```

3. **測試圖片訪問**：
   - 上傳一張新圖片
   - 訪問 `/images/xxx.jpg` 應該可以正常顯示

## 注意事項

1. **優先級**：build 時的圖片（在 `dist/images/`）優先於運行時上傳的圖片
2. **性能**：運行時上傳的圖片通過後端提供，性能略低於靜態文件
3. **備份**：記得定期備份 `public/images/` 目錄
4. **權限**：確保 `public/images/` 目錄有寫入權限

## 替代方案（如果代理不工作）

如果 Apache 代理配置有問題，可以考慮：

1. **使用符號鏈接**：
   ```bash
   ln -s /var/www/toto/public/images /var/www/toto/dist/images
   ```

2. **修改圖片 URL**：
   使用 `/api/images/` 路徑，完全通過後端提供

3. **定期同步**：
   編寫腳本定期將 `public/images/` 同步到 `dist/images/`
