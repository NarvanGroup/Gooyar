export interface PhoneNumberModel {
  id?: string;
  phone_number: string;
  country_code?: string;
  is_verified: boolean;
  is_primary?: boolean;
  label?: string; // e.g., "Work", "Personal", "Emergency"
  created_at?: string;
  updated_at?: string;
}

export interface WhatsAppModel {
  id?: string;
  phone_number: string;
  account_name?: string;
  is_connected: boolean;
  qr_code?: string;
  session_data?: string;
  last_connection_check?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TelegramModel {
  id?: string;
  phone_number: string;
  username?: string;
  account_name?: string;
  is_connected: boolean;
  qr_code?: string;
  session_data?: string;
  last_connection_check?: string;
  created_at?: string;
  updated_at?: string;
}

export interface InstagramModel {
  id?: string;
  username: string;
  account_name?: string;
  is_connected: boolean;
  access_token?: string;
  refresh_token?: string;
  last_connection_check?: string;
  created_at?: string;
  updated_at?: string;
}

export interface OTPVerificationModel {
  phone_number: string;
  otp: string;
  verification_id?: string;
}

export interface QRCodeModel {
  qr_code: string;
  expires_at: string;
  session_id: string;
}

export interface ContactPointStatusModel {
  is_connected: boolean;
  last_connection_check: string;
  connection_error?: string;
}

export interface ContactPointResponseModel {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}
