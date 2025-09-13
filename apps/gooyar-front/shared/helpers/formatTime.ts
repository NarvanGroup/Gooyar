import { format, getTime, formatDistanceToNow } from "date-fns";
import moment from "moment-jalaali";
import "moment-timezone";
// ----------------------------------------------------------------------

type InputValue = Date | string | number | null;

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || "dd MMM yyyy";

  return date ? format(new Date(date), fm) : "";
}

export function fPersianDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || "jYYYY/jM/jD - HH:mm:ss";

  return moment(date).tz("Asia/Tehran").format(fm);
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || "dd MMM yyyy p";

  return date ? format(new Date(date), fm) : "";
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : "";
}

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : "";
}
