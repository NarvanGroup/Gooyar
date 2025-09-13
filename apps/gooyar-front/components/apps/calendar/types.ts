export interface Availability {
  days: string[];
  time_span: string;
}

export interface Calendar {
  id: string;
  title: string;
  description: string;
  start_time: string;
  end_time?: string;
  availabilities: Availability[];
  created_at: Date;
  updated_at: Date;
  google_email: string;
  is_google_connected: boolean;
}

export interface CalendarFormData {
  title: string;
  description: string;
  start_time: string;
  end_time?: string;
  availabilities: Availability[];
  google_email: string;
  is_google_connected: boolean;
}

export interface AvailabilityFormData {
  days: string[];
  time_span: string;
}

export const DAYS_OF_WEEK = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

export const DAYS_OF_WEEK_FA = [
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
  "شنبه",
] as const;

export const DAYS_OF_WEEK_SHORT_FA = [
  "یک",
  "دو",
  "سه",
  "چهار",
  "پنج",
  "جمعه",
  "شنبه",
] as const;

export type DayOfWeek = (typeof DAYS_OF_WEEK)[number];
