export interface ServiceItem {
  id: string;
  name: string;
  price: number | string; // Changed to allow string for "Set price" or ranges
  category: string;
  description: string;
  imageUrl: string;
  instagramUrl?: string;
  tags: string[];
}

export interface CourseItem {
  id: string;
  name: string;
  price: number | string;
  duration: string;
  level: string;
  description: string;
  imageUrl: string;
  instagramUrl?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  series: string;
  description: string;
  imageUrl: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  tags: string[];
  category?: string; // 添加分類字段
}

export interface MemberTier {
  id: string;
  name: string;
  price: number;
  color: string;
  features: string[];
  discount: number; // e.g., 0.9 for 10% off
  pointsMultiplier: number;
  isPopular?: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'service' | 'course' | 'product';
}

export interface UserProfile {
  name: string;
  points: number;
  tier: string;
}

export type MembershipStatus = 'pending' | 'paid' | 'cancelled' | 'expired';

export interface MembershipApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string; // 出生日期
  time?: string; // 出生時間（選填）
  tier: string; // 會員等級 ID
  status: MembershipStatus;
  createdAt: string; // ISO 日期字符串
  updatedAt: string; // ISO 日期字符串
  paidAt?: string; // 付款日期（ISO 日期字符串）
  notes?: string; // 備註
}