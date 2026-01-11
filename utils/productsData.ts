export interface ProductCategory {
  name: string;
  subcategories: {
    name: string;
    items: ProductItem[];
  }[];
}

export interface ProductItem {
  儀式名稱?: string;
  課程名稱?: string;
  紅兒價錢?: string | number;
  學費價錢?: string | number;
  課程費用?: string | number;
  儀式內容?: string;
  教學內容?: string;
  課程內容?: string;
  學習內容?: string;
  必修修件?: string;
  修讀條件?: string;
  "Instagram 網址"?: string;
}

export interface ProductsData {
  categories: ProductCategory[];
}

// 緩存 products 數據
let cachedProductsData: ProductsData | null = null;
let isLoading = false;
let loadPromise: Promise<ProductsData> | null = null;

// 從 public 目錄載入 products.json
const loadProductsData = async (): Promise<ProductsData> => {
  if (cachedProductsData) {
    return cachedProductsData;
  }
  
  if (loadPromise) {
    return loadPromise;
  }
  
  loadPromise = fetch('/products.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load products.json');
      }
      return response.json();
    })
    .then(data => {
      cachedProductsData = data as ProductsData;
      return cachedProductsData;
    })
    .catch(error => {
      console.error('Error loading products.json:', error);
      cachedProductsData = { categories: [] };
      return cachedProductsData;
    })
    .finally(() => {
      isLoading = false;
      loadPromise = null;
    });
  
  return loadPromise;
};

// 同步獲取（如果已載入）或返回空數據
export const getProductsData = (): ProductsData => {
  if (cachedProductsData) {
    return cachedProductsData;
  }
  
  // 如果還沒載入，觸發異步載入
  loadProductsData();
  
  // 返回空數據作為初始值
  return { categories: [] };
};

// 異步獲取（確保數據已載入）
export const getProductsDataAsync = async (): Promise<ProductsData> => {
  return await loadProductsData();
};

// 根據 category name 獲取對應的 category
export const getCategoryByName = (data: ProductsData, categoryName: string): ProductCategory | undefined => {
  return data.categories.find(cat => cat.name === categoryName);
};

// 獲取所有 items（扁平化）
export const getAllItems = (data: ProductsData): ProductItem[] => {
  const items: ProductItem[] = [];
  
  data.categories.forEach(category => {
    category.subcategories.forEach(subcategory => {
      items.push(...subcategory.items);
    });
  });
  
  return items;
};

// 根據 category 和 subcategory 獲取 items
export const getItemsByCategoryAndSubcategory = (
  data: ProductsData,
  categoryName: string,
  subcategoryName?: string
): ProductItem[] => {
  const category = getCategoryByName(data, categoryName);
  if (!category) return [];
  
  if (subcategoryName) {
    const subcategory = category.subcategories.find(sub => sub.name === subcategoryName);
    return subcategory ? subcategory.items : [];
  }
  
  // 返回該 category 下所有 subcategories 的 items
  const items: ProductItem[] = [];
  category.subcategories.forEach(sub => {
    items.push(...sub.items);
  });
  
  return items;
};

// 將產品價格轉換為數字
export const parsePrice = (price: string | number | undefined): number => {
  if (typeof price === 'number') return price;
  if (!price) return 0;
  
  // 處理字符串價格，例如 "6800.0" 或 "$3,888/ 兩天工作坊"
  const priceStr = String(price);
  const match = priceStr.match(/[\d,]+\.?\d*/);
  if (match) {
    return parseFloat(match[0].replace(/,/g, ''));
  }
  
  return 0;
};

// 獲取產品名稱
export const getProductName = (item: ProductItem): string => {
  return item.儀式名稱 || item.課程名稱 || '未命名產品';
};

// 獲取產品描述
export const getProductDescription = (item: ProductItem): string => {
  return item.儀式內容 || item.教學內容 || item.課程內容 || item.學習內容 || '';
};

// 獲取產品價格
export const getProductPrice = (item: ProductItem): number => {
  return parsePrice(item.紅兒價錢 || item.學費價錢 || item.課程費用);
};

// 獲取 Instagram URL
export const getInstagramUrl = (item: ProductItem): string | undefined => {
  return item["Instagram 網址"];
};

// 查找產品所屬的子分類
export const getSubcategoryForItem = (
  data: ProductsData,
  categoryName: string,
  item: ProductItem
): string | undefined => {
  const category = getCategoryByName(data, categoryName);
  if (!category) return undefined;
  
  const itemName = getProductName(item);
  for (const sub of category.subcategories) {
    if (sub.items.some(subItem => getProductName(subItem) === itemName)) {
      return sub.name;
    }
  }
  
  return undefined;
};

