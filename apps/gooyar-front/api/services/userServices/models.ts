export interface OTPLoginDataModel {
  mobile: string;
  otp: string;
}

export interface PasswordLoginDataModel {
  mobile: string;
  password: string;
}
export interface OTPModel {
  mobile: string;
}

export interface UserInquiryModel {
  mobile: string;
}

export interface WalletModel {
  name: string;
  slug: string;
  description?: string;
  meta?: string;
  balance: string | number;
  deductible_balance: string | number;
}

export interface UserModel {
  [key: string]: any;
  id?: string;
  first_name: string;
  last_name: string;
  father_name: string;
  national_id: string;
  birthdate: string;
  image?: string;
  mobile?: string;
  email?: string;
  // addresses?: AddressModel[];
  cards?: cardModel[];
  hasPassword?: boolean;
  isLoggedIn?: boolean;
  authentication?: string;
  wallets?: WalletModel[];
  instagram: string;
  inquiries_count: number;
  inquiries_remaining: number;
  ended_at: string;
  started_at: string;
}

export interface cardModel {
  id?: string | number;
  bank_name?: string;
  card_number?: string;
  iban?: string;
}

export interface ResetPasswordModel {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface InterestsModel {
  upper_body_size: string;
  lower_body_size: string;
  shoe_size: string;
  favorite_color: string[];
  favorite_food: string[];
  interests: { label: string; value: string }[];
  personality: string;
  fashion_style: string[];
  gift_type: string[];
  description: string;
}
