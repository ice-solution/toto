# 部署說明

## 項目結構

這個項目包含：
- **Frontend**: React + Vite 應用（端口 3001）
- **Backend**: Express API 服務器（端口 3002）

## 環境變量配置

### 1. 創建 .env 文件

複製 `.env.example` 並根據需要修改：

```bash
cp ENV_EXAMPLE.txt .env
```

### 2. 環境變量說明

#### Frontend 配置
- `VITE_FRONTEND_PORT`: 前端開發服務器端口（默認: 3001）
- `VITE_FRONTEND_HOST`: 前端開發服務器主機（默認: 0.0.0.0）
- `VITE_API_BASE_URL`: 生產環境 API 完整 URL（可選，留空則使用相對路徑 `/api`）

#### Backend 配置
- `API_PORT`: 後端 API 服務器端口（默認: 3002）
- `API_HOST`: 後端 API 服務器主機（默認: localhost）

#### Admin 配置
- `ADMIN_USERNAME`: Admin 登入用戶名（默認: admin）
- `ADMIN_PASSWORD`: Admin 登入密碼（默認: admin123）

#### 其他
- `GEMINI_API_KEY`: Gemini API 密鑰

## 開發環境

### 啟動所有服務

```bash
npm run dev:all
```

這會同時啟動：
- Frontend (Vite): http://localhost:3001
- Backend (Express API): http://localhost:3002

### 分別啟動

**終端 1 - Frontend:**
```bash
npm run dev
```

**終端 2 - Backend:**
```bash
npm run dev:api
```

## 生產環境部署（Apache2 + Cloudflare Flexible SSL）

### 前提條件

1. 服務器已安裝 Node.js 和 npm
2. 服務器已安裝並運行 Apache2
3. 域名已配置 Cloudflare，並設置 SSL/TLS 為 **Flexible** 模式
4. 域名 DNS 已指向服務器 IP

### 1. 上傳代碼到服務器

```bash
# 在本地構建前端
npm run build

# 上傳到服務器（使用 scp 或 rsync）
scp -r dist/ user@your-server:/var/www/toto/
scp -r server/ user@your-server:/var/www/toto/
scp -r public/ user@your-server:/var/www/toto/
scp package.json user@your-server:/var/www/toto/
scp .env user@your-server:/var/www/toto/
```

或使用 Git：

```bash
# 在服務器上
cd /var/www/toto
git pull origin main
npm install --production
npm run build
```

### 2. 配置 Apache2

#### 複製 virtualhost 配置

```bash
sudo cp apache2-virtualhost.conf /etc/apache2/sites-available/toto.brandactivation.hk.conf
```

#### 啟用必要的模塊

```bash
sudo a2enmod ssl rewrite proxy proxy_http headers expires deflate remoteip
sudo systemctl reload apache2
```

#### 修改配置文件

編輯 `/etc/apache2/sites-available/toto.brandactivation.hk.conf`，根據實際情況修改：

- `ServerName`: 您的域名
- `DocumentRoot`: 指向 `dist/` 目錄的完整路徑（例如：`/var/www/toto/dist`）
- API Proxy 端口（如果後端運行在不同端口，默認是 3002）

#### 啟用站點

```bash
sudo a2ensite toto.brandactivation.hk.conf
sudo a2dissite 000-default  # 禁用默認站點（可選）
sudo apache2ctl configtest  # 測試配置
sudo systemctl reload apache2
```

### 3. 設置後端服務（使用 PM2 - 推薦）

#### 安裝 PM2

```bash
npm install -g pm2
```

#### 啟動 API 服務器

```bash
cd /var/www/toto
pm2 start server/api.js --name toto-api
```

#### 設置開機自啟

```bash
pm2 startup
# 按照提示執行生成的命令
pm2 save
```

#### PM2 常用命令

```bash
pm2 list              # 查看運行中的進程
pm2 logs toto-api     # 查看日誌
pm2 restart toto-api  # 重啟服務
pm2 stop toto-api     # 停止服務
pm2 delete toto-api   # 刪除服務
```

### 4. 使用 systemd（替代 PM2）

創建 `/etc/systemd/system/toto-api.service`:

```ini
[Unit]
Description=Toto API Server
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/toto
Environment=NODE_ENV=production
EnvironmentFile=/var/www/toto/.env
ExecStart=/usr/bin/node /var/www/toto/server/api.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

啟用服務：

```bash
sudo systemctl daemon-reload
sudo systemctl enable toto-api
sudo systemctl start toto-api
sudo systemctl status toto-api  # 檢查狀態
```

### 5. 文件權限設置

```bash
# 設置文件所有權
sudo chown -R www-data:www-data /var/www/toto

# 設置目錄權限
sudo chmod -R 755 /var/www/toto

# 設置 JSON 文件權限（可讀寫）
sudo chmod -R 644 /var/www/toto/public/*.json
sudo chmod 755 /var/www/toto/public

# PM2 需要在用戶目錄，所以可能需要調整
# 如果使用 www-data 用戶，可能需要額外配置
```

### 6. 防火牆配置

```bash
# 只開放 HTTP（Cloudflare 會處理 HTTPS）
sudo ufw allow 80/tcp
sudo ufw allow 22/tcp  # SSH
# 不需要開放 443（Cloudflare Flexible SSL）
# 不需要開放 3002（API 只本地訪問）
```

### 7. Cloudflare 設置

1. **SSL/TLS 設置**：設置為 **Flexible** 模式
   - Cloudflare → Browser: HTTPS
   - Cloudflare → Server: HTTP (Port 80)

2. **DNS 設置**：確保 A 記錄指向服務器 IP

3. **Page Rules（可選）**：
   - 可以設置緩存規則
   - API 路徑 (`/api/*`) 應該設置為 "Bypass Cache"

### 8. 環境變量配置（生產環境）

在服務器上創建 `/var/www/toto/.env`:

```bash
# Backend API Configuration
API_PORT=3002
API_HOST=localhost

# Admin Login Credentials
ADMIN_USERNAME=your_secure_username
ADMIN_PASSWORD=your_secure_password

# Gemini API Key（如果需要）
GEMINI_API_KEY=your_gemini_api_key_here

# Frontend 不需要設置 VITE_API_BASE_URL（使用相對路徑 /api）
# 或者可以設置為完整 URL：VITE_API_BASE_URL=https://toto.brandactivation.hk
```

**重要**：生產環境中，前端會通過 Apache proxy 訪問 API（`/api`），所以通常不需要設置 `VITE_API_BASE_URL`。

### 9. 驗證部署

1. **檢查前端**：訪問 `https://your-domain.com`
2. **檢查 API**：訪問 `https://your-domain.com/api/blog`（應該返回 JSON）
3. **檢查後端服務**：`pm2 list` 或 `systemctl status toto-api`
4. **檢查 Apache 日誌**：`sudo tail -f /var/log/apache2/toto_error.log`
5. **檢查 PM2 日誌**：`pm2 logs toto-api`

## 部署步驟總結

1. ✅ 構建前端：`npm run build`
2. ✅ 上傳代碼到服務器
3. ✅ 在服務器上安裝依賴：`npm install --production`
4. ✅ 配置 Apache2 virtualhost
5. ✅ 啟用 Apache2 模塊和站點
6. ✅ 設置後端服務（PM2 或 systemd）
7. ✅ 配置文件權限
8. ✅ 配置防火牆
9. ✅ 配置 Cloudflare（SSL 為 Flexible 模式）
10. ✅ 設置生產環境 `.env` 文件
11. ✅ 測試和驗證

## 更新部署

當需要更新代碼時：

```bash
# 在服務器上
cd /var/www/toto
git pull origin main
npm install --production
npm run build

# 重啟後端服務
pm2 restart toto-api
# 或
sudo systemctl restart toto-api

# 重載 Apache（通常不需要）
sudo systemctl reload apache2
```

## 注意事項

1. **Cloudflare Flexible SSL**：
   - Cloudflare 到瀏覽器使用 HTTPS
   - Cloudflare 到服務器使用 HTTP（Port 80）
   - Apache2 只需監聽 Port 80，不需要 SSL 證書
   - X-Forwarded-Proto header 會自動設置

2. **API 訪問**：
   - 前端通過 Apache proxy (`/api`) 訪問後端
   - 後端 API 只監聽 localhost:3002
   - 不需要直接暴露後端端口到互聯網

3. **環境變量**：
   - 生產環境 `.env` 文件應設置安全的密碼
   - 不要將 `.env` 文件提交到 Git

4. **文件備份**：
   - 定期備份 `public/*.json` 文件（會員申請、博客、服務、課程數據）
   - 建議設置自動備份腳本

5. **日誌監控**：
   - 定期檢查 Apache 錯誤日誌
   - 監控 PM2/systemd 服務狀態
   - 設置日誌輪轉防止日誌文件過大

6. **安全建議**：
   - 使用強密碼
   - 定期更新依賴包：`npm audit` 和 `npm update`
   - 限制 SSH 訪問
   - 考慮設置 fail2ban

## 故障排除

### API 無法訪問

```bash
# 檢查後端服務是否運行
pm2 list
# 或
systemctl status toto-api

# 檢查端口是否被占用
sudo netstat -tulpn | grep 3002

# 檢查 Apache proxy 配置
sudo apache2ctl configtest

# 查看 Apache 錯誤日誌
sudo tail -f /var/log/apache2/toto_error.log

# 查看後端日誌
pm2 logs toto-api
```

### 前端路由 404

- 確保 Apache `mod_rewrite` 已啟用
- 檢查 virtualhost 中的 RewriteRule 配置
- 檢查 `.htaccess` 文件（如果使用）

### 權限問題

```bash
# 檢查文件所有權
ls -la /var/www/toto

# 重新設置權限
sudo chown -R www-data:www-data /var/www/toto
sudo chmod -R 755 /var/www/toto
```

### Cloudflare 相關問題

- 確保 SSL/TLS 設置為 **Flexible** 模式
- 檢查 DNS 記錄是否正確
- 清除 Cloudflare 緩存（如果需要）

### 前端無法連接 API

- 檢查瀏覽器控制台錯誤
- 確認 Apache proxy 配置正確
- 確認後端服務正在運行
- 檢查 CORS 設置（應該沒問題，因為通過 proxy）

## 性能優化建議

1. **啟用 Cloudflare 緩存**：對靜態資源啟用緩存
2. **使用 CDN**：圖片等大文件可以使用 CDN
3. **啟用 Gzip**：Apache 配置中已包含
4. **監控資源使用**：使用 `pm2 monit` 監控 Node.js 服務
