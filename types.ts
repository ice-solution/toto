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