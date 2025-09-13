export const validationMessages = {
  required: "این فیلد الزامی است.",
  nationalId: "فرمت کدملی وارد شده صحیح نیست.",
  string: "این فیلد باید حروف باشد.",
  persianString: "این فیلد باید حروف فارسی باشد.",
  number: "این فیلد باید عدد باشد.",
  email: "این فیلد باید یک آدرس ایمیل باشد.",
  sheba: "فرمت شبا درست نیست.",
  user_name:
    "نام کاربری فقط می‌تواند شامل حروف و اعداد انگلیسی و کاراکترهای خاص باشد.",
  mobile: "فرمت شماره موبایل صحیح نیست.",
  phone: "فرمت شماره تلفن صحیح نیست.",
  positive: "نمیتواند کمتر از صفر باشد.",
  requiredCustom: (word: string) => `وارد کردن ${word} الزامی می‌باشد`,
  minCanNotBeBiggerThanMax: (min: number, max: number) =>
    min && max
      ? `${min} نمی‌تواند از ${max} بیشتر باشد`
      : "حداقل مقدار نمی‌تواند از حداکثر مقدار بیشتر باشد",
  min: (min: number) => `حداقل باید ${min} باشد`,
};
