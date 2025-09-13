// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import {
  DatePicker,
  DatePickerProps,
  LocalizationProvider,
} from "@mui/x-date-pickers";

import moment from "moment-jalaali";

import { AdapterMomentJalaali } from "@mui/x-date-pickers/AdapterMomentJalaali";

moment.loadPersian({ usePersianDigits: false, dialect: "persian-modern" });

// ----------------------------------------------------------------------

type Props = DatePickerProps<any> & {
  name: string;
  helperText?: string;
  placeholder?: string;
};

export default function RHFDataPicker({
  name,
  label,
  placeholder,
  ...other
}: Props) {
  const { control } = useFormContext();

  const maxDate = moment().subtract(18, "years");

  moment.loadPersian({ usePersianDigits: false, dialect: "persian-modern" });

  const farsiLocaleText = {
    okButtonLabel: "تأیید",
    cancelButtonLabel: "لغو",
    todayButtonLabel: "امروز",
    clearButtonLabel: "پاک کردن",
    datePickerToolbarTitle: "انتخاب تاریخ",
    openDatePickerDialogueLabel: "باز کردن انتخابگر تاریخ",
    cancelText: "لغو",
    okText: "تأیید",
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterMomentJalaali}
      localeText={farsiLocaleText}
    >
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            label={label}
            slotProps={{
              textField: {
                helperText: error?.message,
                error: !!error?.message,
                placeholder,
              },
            }}
            {...field}
            value={field.value ? moment(field.value) : null}
            maxDate={maxDate}
            {...other}
            sx={{
              width: "100%",
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}
