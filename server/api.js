import 'dotenv/config';
import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// 從環境變量讀取端口，移除可能的協議前綴
const PORT = parseInt(process.env.API_PORT?.replace(/[^0-9]/g, '') || '3002', 10);
// API_HOST 應該只是主機名，不包含協議或端口
let HOST = process.env.API_HOST || 'localhost';
// 移除可能的協議前綴 (http://, https://)
HOST = HOST.replace(/^https?:\/\//, '');
// 移除可能的端口號
HOST = HOST.split(':')[0];

// 啟用 CORS 和 JSON 解析
app.use(cors());
app.use(express.json());

// 配置 multer 用於文件上傳
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../public/images');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error, null);
    }
  },
  filename: (req, file, cb) => {
    // 生成唯一文件名：類型-時間戳-原始文件名
    const type = req.body.type || 'general'; // service, course, 或 general
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '-');
    const filename = `${type}-${timestamp}-${name}${ext}`;
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB 限制
  },
  fileFilter: (req, file, cb) => {
    // 只允許圖片文件
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('只允許上傳圖片文件 (JPEG, JPG, PNG, GIF, WEBP)'));
    }
  }
});

// 獲取 JSON 文件路徑
const getFilePath = (filename) => {
  return path.join(__dirname, '../public', filename);
};

// 獲取 blog.json 文件路徑（向後兼容）
const getBlogFilePath = (filename) => {
  return getFilePath(filename);
};

// 讀取 Blog 文章
app.get('/blog', async (req, res) => {
  try {
    const filePath = getBlogFilePath('blog.json');
    const data = await fs.readFile(filePath, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading blog.json:', error);
    res.status(500).json({ error: 'Failed to read blog data' });
  }
});

// 保存 Blog 文章
app.post('/blog', async (req, res) => {
  try {
    const posts = req.body;
    const filePath = getBlogFilePath('blog.json');
    await fs.writeFile(filePath, JSON.stringify(posts, null, 2), 'utf-8');
    res.json({ success: true, message: 'Blog posts saved successfully' });
  } catch (error) {
    console.error('Error saving blog.json:', error);
    res.status(500).json({ error: 'Failed to save blog data' });
  }
});

// 讀取 Categories
app.get('/blog/categories', async (req, res) => {
  try {
    const filePath = getBlogFilePath('blogCategories.json');
    const data = await fs.readFile(filePath, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading blogCategories.json:', error);
    res.status(500).json({ error: 'Failed to read categories' });
  }
});

// 保存 Categories
app.post('/blog/categories', async (req, res) => {
  try {
    const categories = req.body;
    const filePath = getBlogFilePath('blogCategories.json');
    await fs.writeFile(filePath, JSON.stringify(categories, null, 2), 'utf-8');
    res.json({ success: true, message: 'Categories saved successfully' });
  } catch (error) {
    console.error('Error saving blogCategories.json:', error);
    res.status(500).json({ error: 'Failed to save categories' });
  }
});

// 讀取 Tags
app.get('/blog/tags', async (req, res) => {
  try {
    const filePath = getBlogFilePath('blogTags.json');
    const data = await fs.readFile(filePath, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading blogTags.json:', error);
    res.status(500).json({ error: 'Failed to read tags' });
  }
});

// 保存 Tags
app.post('/blog/tags', async (req, res) => {
  try {
    const tags = req.body;
    const filePath = getBlogFilePath('blogTags.json');
    await fs.writeFile(filePath, JSON.stringify(tags, null, 2), 'utf-8');
    res.json({ success: true, message: 'Tags saved successfully' });
  } catch (error) {
    console.error('Error saving blogTags.json:', error);
    res.status(500).json({ error: 'Failed to save tags' });
  }
});

// 讀取 Services
app.get('/services', async (req, res) => {
  try {
    const filePath = getBlogFilePath('services.json');
    const data = await fs.readFile(filePath, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading services.json:', error);
    res.status(500).json({ error: 'Failed to read services data' });
  }
});

// 保存 Services
app.post('/services', async (req, res) => {
  try {
    const services = req.body;
    const filePath = getBlogFilePath('services.json');
    await fs.writeFile(filePath, JSON.stringify(services, null, 2), 'utf-8');
    res.json({ success: true, message: 'Services saved successfully' });
  } catch (error) {
    console.error('Error saving services.json:', error);
    res.status(500).json({ error: 'Failed to save services data' });
  }
});

// 讀取 Courses
app.get('/courses', async (req, res) => {
  try {
    const filePath = getBlogFilePath('courses.json');
    const data = await fs.readFile(filePath, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading courses.json:', error);
    res.status(500).json({ error: 'Failed to read courses data' });
  }
});

// 保存 Courses
app.post('/courses', async (req, res) => {
  try {
    const courses = req.body;
    const filePath = getBlogFilePath('courses.json');
    await fs.writeFile(filePath, JSON.stringify(courses, null, 2), 'utf-8');
    res.json({ success: true, message: 'Courses saved successfully' });
  } catch (error) {
    console.error('Error saving courses.json:', error);
    res.status(500).json({ error: 'Failed to save courses data' });
  }
});

// Memberships 路由
app.get('/memberships', async (req, res) => {
  try {
    const filePath = getFilePath('memberships.json');
    const data = await fs.readFile(filePath, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    // 如果文件不存在，返回空數組
    if (error.code === 'ENOENT') {
      res.json([]);
      return;
    }
    console.error('Error reading memberships.json:', error);
    res.status(500).json({ error: 'Failed to read memberships data' });
  }
});

app.post('/memberships', async (req, res) => {
  try {
    const memberships = req.body;
    const filePath = getFilePath('memberships.json');
    await fs.writeFile(filePath, JSON.stringify(memberships, null, 2), 'utf-8');
    res.json({ success: true, message: 'Memberships saved successfully' });
  } catch (error) {
    console.error('Error saving memberships.json:', error);
    res.status(500).json({ error: 'Failed to save memberships data' });
  }
});

// 圖片上傳端點
app.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: '沒有上傳文件' });
    }

    // 返回圖片 URL（相對於 public 目錄）
    const imageUrl = `/images/${req.file.filename}`;
    
    res.json({
      success: true,
      imageUrl: imageUrl,
      filename: req.file.filename,
      message: '圖片上傳成功'
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: '圖片上傳失敗: ' + error.message });
  }
});

// 刪除圖片端點
app.delete('/delete-image/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, '../public/images', filename);
    
    // 安全檢查：確保文件名不包含路徑遍歷字符
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return res.status(400).json({ error: '無效的文件名' });
    }

    try {
      await fs.unlink(imagePath);
      res.json({ success: true, message: '圖片刪除成功' });
    } catch (error) {
      if (error.code === 'ENOENT') {
        res.status(404).json({ error: '圖片不存在' });
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: '圖片刪除失敗: ' + error.message });
  }
});

app.listen(PORT, HOST, () => {
  console.log(`API server running on http://${HOST}:${PORT}`);
});

