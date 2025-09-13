export interface BlogPostModel {
  category_id: string;
  description: string;
  content: string;
  id: string;
  images: string[];
  keywords: string[];
  name_en: string;
  name_fa: string;
  slug: string;
  sub_category_id: string;
  tags: string[];
  user_id: string;
  updated_at: string;
  created_at: string;
}

export interface BlogCategoryModel {
  name_en: string;
  name_fa: string;
  slug: string;
  updated_at: string;
  created_at: string;
}
