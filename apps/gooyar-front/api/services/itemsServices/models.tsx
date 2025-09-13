import { WishlistStatusEnum } from "../wishListServices/models";

export interface WishlistItemModel {
  type: ItemTypeEnum;
  id: string;
  link?: string;
  name: string;
  price: string;
  quantity: number;
  where_to_buy?: string | null;
  rate: string | null;
  description?: string;
  image?: string | null;
  wish_list_id: string;
  status?: WishlistStatusEnum;
  completer_info?: CompleterInfoModel[];
  is_upload?: 0 | 1;
  category?: any;
  amount?: number;
  isUnlimited?: boolean;
  remaining?: number;
  filled?: string | number;
}

export interface CompleterInfoModel {
  buyers?: string[];
  content?: string;
  is_public?: boolean;
  is_self_completed?: boolean;
  buyer?: {
    first_name: string | null;
    last_name: string | null;
  }
}

export interface PurchaseItemModel {
  item_id: string;
  content: string;
  is_public: boolean;
  buyers: string[];
}

export enum ItemTypeEnum {
  product = "product",
  experience = "experience",
  cash = "cash",
  charity = "charity",
  diy = "diy",
}
