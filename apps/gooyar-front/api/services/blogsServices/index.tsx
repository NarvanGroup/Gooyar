import { api, apiVersion1 } from "@/api";
import { axiosMethods } from "@/shared/constants/axiosMethods";

export const getBlogsService = async (
  pageNo: number = 1,
  pageSize: number = 8
) => {
  try {
    const response = await api({
      method: axiosMethods.get,
      url: `${apiVersion1}/blogs?page=${pageNo}&page_size=${pageSize}`,
      isAuthorizationNeeded: false,
    });
    return response;
  } catch (error) {}
};

export const getBlogByIdService = async (id: string) => {
  try {
    const response = await api({
      method: axiosMethods.get,
      url: `${apiVersion1}/blogs/${id}`,
      isAuthorizationNeeded: false,
    });
    return response;
  } catch (error) {}
};

export const getBlogCategoriesService = async () => {
  try {
    const response = await api({
      method: axiosMethods.get,
      url: `${apiVersion1}/categories`,
      isAuthorizationNeeded: false,
    });
    return response;
  } catch (error) {}
};

export const getBlogsByCategorySlugService = async (slug: string) => {
  try {
    const response = await api({
      method: axiosMethods.get,
      url: `${apiVersion1}/categories/${slug}?include=blogs`,
    });
    return response;
  } catch (error) {}
};
