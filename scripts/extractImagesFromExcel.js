import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import AdmZip from 'adm-zip';
import { XMLParser } from 'fast-xml-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置
const EXCEL_FILE = path.join(__dirname, '../data.xlsx');
const OUTPUT_DIR = path.join(__dirname, '../public/images');
const MAPPING_FILE = path.join(__dirname, '../public/imageMapping.json');

// 解析 Excel 中的圖片位置信息
function parseDrawingXML(xmlContent) {
  try {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      textNodeName: '#text'
    });
    const result = parser.parse(xmlContent);
    return result;
  } catch (error) {
    console.warn('解析 XML 時出錯:', error.message);
    return null;
  }
}

// 從 drawing 文件中提取圖片與單元格的對應關係
async function extractImageCellMapping(zip) {
  const mapping = {};
  
  // 查找所有 drawing 文件
  const drawingEntries = zip.getEntries().filter(entry => 
    entry.entryName.startsWith('xl/drawings/drawing') && entry.entryName.endsWith('.xml')
  );

  for (const entry of drawingEntries) {
    try {
      const xmlContent = entry.getData().toString('utf-8');
      const parsed = parseDrawingXML(xmlContent);
      
      // 這裡需要根據實際的 XML 結構來解析
      // Excel 的 drawing XML 結構比較複雜，通常包含：
      // - xdr:twoCellAnchor (定義圖片位置)
      // - xdr:from/xdr:col, xdr:row (起始單元格)
      // - r:embed (引用圖片 ID)
      
      // 簡化版本：如果無法精確解析，我們按順序匹配
      console.log(`📄 找到 drawing 文件: ${entry.entryName}`);
    } catch (error) {
      console.warn(`解析 drawing 文件失敗: ${entry.entryName}`, error.message);
    }
  }

  return mapping;
}

async function extractImagesFromExcel() {
  try {
    // 檢查 Excel 文件是否存在
    try {
      await fs.access(EXCEL_FILE);
    } catch {
      console.error(`❌ 找不到 Excel 文件: ${EXCEL_FILE}`);
      console.log('請確保 data.xlsx 文件在項目根目錄');
      process.exit(1);
    }

    // 創建輸出目錄
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    console.log('📦 正在讀取 Excel 文件...');
    
    // Excel 文件實際上是 ZIP 文件
    const zip = new AdmZip(EXCEL_FILE);
    const zipEntries = zip.getEntries();

    // 查找所有圖片文件（通常在 xl/media/ 目錄中）
    const imageEntries = zipEntries.filter(entry => {
      const entryName = entry.entryName.toLowerCase();
      return entryName.startsWith('xl/media/') && 
             (entryName.endsWith('.png') || 
              entryName.endsWith('.jpg') || 
              entryName.endsWith('.jpeg') || 
              entryName.endsWith('.gif') ||
              entryName.endsWith('.webp'));
    });

    console.log(`📸 找到 ${imageEntries.length} 張圖片`);

    if (imageEntries.length === 0) {
      console.log('⚠️  未找到任何圖片文件');
      console.log('\n💡 提示：');
      console.log('   1. 確保 Excel 文件中第一列包含圖片');
      console.log('   2. 圖片必須是嵌入在單元格中的，而不是鏈接的外部圖片');
      return;
    }

    // 嘗試提取圖片與單元格的對應關係
    console.log('\n🔍 正在分析圖片位置...');
    const cellMapping = await extractImageCellMapping(zip);

    // 提取圖片並創建映射
    const imageMapping = {};
    
    // 按文件名排序（Excel 通常按插入順序命名：image1.png, image2.png...）
    imageEntries.sort((a, b) => {
      const nameA = path.basename(a.entryName);
      const nameB = path.basename(b.entryName);
      return nameA.localeCompare(nameB, undefined, { numeric: true, sensitivity: 'base' });
    });

    for (let i = 0; i < imageEntries.length; i++) {
      const entry = imageEntries[i];
      const originalName = path.basename(entry.entryName);
      
      // 根據索引 + 1 作為行號（假設第一行是標題，從第2行開始是數據）
      // 如果第一列第一行就是圖片，則從第1行開始
      const rowNumber = i + 1;
      const extension = path.extname(originalName);
      const newFileName = `row-${rowNumber}${extension}`;
      const outputPath = path.join(OUTPUT_DIR, newFileName);

      // 提取圖片
      const imageData = entry.getData();
      await fs.writeFile(outputPath, imageData);

      // 記錄映射關係
      imageMapping[rowNumber] = {
        originalName,
        fileName: newFileName,
        path: `/images/${newFileName}`,
        row: rowNumber,
        // 在代碼中使用時的路徑（相對於 public 目錄）
        publicPath: `/images/${newFileName}`
      };

      console.log(`✅ [行 ${rowNumber}] ${newFileName} (原: ${originalName})`);
    }

    // 保存映射文件
    await fs.writeFile(
      MAPPING_FILE, 
      JSON.stringify(imageMapping, null, 2),
      'utf-8'
    );

    console.log(`\n✨ 完成！`);
    console.log(`📁 圖片已保存到: ${OUTPUT_DIR}`);
    console.log(`📋 映射文件已保存到: ${MAPPING_FILE}`);
    console.log(`\n💡 使用說明：`);
    console.log(`   1. 圖片已按順序命名為 row-1, row-2, row-3...`);
    console.log(`   2. 在代碼中使用時，可以這樣引用：`);
    console.log(`      - 直接路徑: /images/row-1.png`);
    console.log(`      - 或從映射文件讀取: imageMapping[1].path`);
    console.log(`   3. 如果圖片順序與 Excel 行號不對應，請手動檢查並調整`);
    console.log(`\n📝 下一步：`);
    console.log(`   更新 data.ts 或相關 JSON 文件中的 imageUrl 字段`);

  } catch (error) {
    console.error('❌ 發生錯誤:', error);
    if (error.code === 'MODULE_NOT_FOUND') {
      console.error('\n💡 請先安裝依賴:');
      console.error('   npm install adm-zip fast-xml-parser');
    }
    process.exit(1);
  }
}

// 執行
extractImagesFromExcel();
