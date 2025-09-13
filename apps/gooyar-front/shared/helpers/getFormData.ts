import { cleanObject } from "./cleanObject";

export const getFormData = (data: any) => {
  let formData: any = null;

  const cleanData = cleanObject(data);

  formData = new FormData();
  Object.keys(cleanData).map((item: string) =>
    formData.append(item, cleanData[item] as any)
  );

  return formData;
};
