/**
 * 圖片輔助函數
 * 用於從 Excel 提取的圖片映射中獲取圖片路徑
 */

// 動態導入映射文件（在運行時加載）
let imageMapping: Record<string, any> | null = null;

/**
 * 加載圖片映射文件
 */
async function loadImageMapping() {
  if (imageMapping) return imageMapping;
  
  try {
    const response = await fetch('/imageMapping.json');
    imageMapping = await response.json();
    return imageMapping;
  } catch (error) {
    console.warn('無法加載 imageMapping.json:', error);
    return {};
  }
}

/**
 * 根據行號獲取圖片路徑
 * @param rowNumber Excel 行號（從 1 開始）
 * @returns 圖片路徑，如果不存在則返回占位符
 */
export async function getImageByRow(rowNumber: number): Promise<string> {
  const mapping = await loadImageMapping();
  return mapping?.[rowNumber]?.path || `/images/row-${rowNumber}.png` || '/images/placeholder.png';
}

/**
 * 同步獲取圖片路徑（需要預先加載映射）
 * @param rowNumber Excel 行號（從 1 開始）
 * @param mapping 預先加載的映射對象
 * @returns 圖片路徑
 */
export function getImageByRowSync(rowNumber: number, mapping?: Record<string, any>): string {
  const map = mapping || imageMapping || {};
  return map[rowNumber]?.path || `/images/row-${rowNumber}.png` || '/images/placeholder.png';
}

/**
 * 獲取所有圖片映射
 */
export async function getAllImageMappings(): Promise<Record<string, any>> {
  return await loadImageMapping();
}

/**
 * 預加載映射文件（在應用啟動時調用）
 */
export async function preloadImageMapping() {
  await loadImageMapping();
}
