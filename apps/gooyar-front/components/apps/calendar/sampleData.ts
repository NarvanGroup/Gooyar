import { Calendar } from "./types";

export const sampleCalendars: Calendar[] = [
  {
    id: "1",
    title: "برنامه کاری",
    description: "ساعات کاری منظم و زمان‌های جلسه",
    start_time: "2024-01-01T00:00:00.000Z",
    end_time: "2024-12-31T23:59:59.000Z",
    availabilities: [
      {
        days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
        time_span: "09:00 - 17:00",
      },
      {
        days: ["monday", "wednesday", "friday"],
        time_span: "14:00 - 15:00",
      },
    ],
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01"),
  },
  {
    id: "2",
    title: "تقویم شخصی",
    description: "ملاقات‌ها و فعالیت‌های شخصی",
    start_time: "2024-01-01T00:00:00.000Z",
    availabilities: [
      {
        days: ["saturday", "sunday"],
        time_span: "10:00 - 18:00",
      },
      {
        days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
        time_span: "18:00 - 20:00",
      },
    ],
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01"),
  },
  {
    id: "3",
    title: "برنامه باشگاه",
    description: "جلسات تمرین و کلاس‌های تناسب اندام",
    start_time: "2024-01-01T00:00:00.000Z",
    end_time: "2024-06-30T23:59:59.000Z",
    availabilities: [
      {
        days: ["monday", "wednesday", "friday"],
        time_span: "07:00 - 08:30",
      },
      {
        days: ["tuesday", "thursday"],
        time_span: "19:00 - 20:30",
      },
    ],
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01"),
  },
];
