export interface InitializationModel {
  national_id: string;
  mobile: string;
  birthdate: string;
  card_number?: string;
}

export interface finalizationModel {
  national_id: string;
  otp: string;
}

export interface CardVerificationModel {
  national_id: string;
  birthdate: string;
  card_number?: string;
}
