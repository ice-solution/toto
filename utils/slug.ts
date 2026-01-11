// 將標題轉換為 URL 友好的 slug
// 由於使用 HashRouter，URL 會是 #/blog/{{slug}}
// React Router 會自動處理 URL 編碼，所以我們不需要手動 encodeURIComponent
export const createSlug = (title: string): string => {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^\u4e00-\u9fa5a-z0-9\s-]/g, '') // 移除特殊字符，保留中文、英文、數字、空格和連字號
    .replace(/\s+/g, '-') // 將空格替換為連字號
    .replace(/-+/g, '-') // 將多個連字號合併為一個
    .replace(/^-|-$/g, ''); // 移除開頭和結尾的連字號
};

// 根據 slug 查找文章
export const findPostBySlug = (posts: any[], slug: string) => {
  return posts.find(post => createSlug(post.title) === slug);
};

