export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
  image_url?: string;
  created_at: string;
  tags?: string[];
  sub_category?: string;
  is_special_offer?: boolean;
  original_price?: number;
}

export interface Category {
  id: string;
  name: string;
  created_at: string;
  order_index?: number;
}

export interface NewsEvent {
  id: string;
  title: string;
  content: string;
  type: 'news' | 'event';
  active: boolean;
  event_date?: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
}

export type MenuItemInput = Omit<MenuItem, 'id' | 'created_at'>;
export type CategoryInput = Omit<Category, 'id' | 'created_at'>;
export type NewsEventInput = Omit<NewsEvent, 'id' | 'created_at' | 'updated_at'>;