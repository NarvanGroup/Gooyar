import { api, apiVersion1 } from "@/api";
import { axiosMethods } from "@/shared/constants/axiosMethods";
import { PurchaseItemModel, WishlistItemModel } from "./models";
// import { getFormData } from "@/utils/getFormData";

export const getItemsByListIdService = async (id: string) => {
  try {
    const response = await api({
      method: axiosMethods.get,
      url: `${apiVersion1}/wish-lists/${id}`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const CreateItemService = async (data: WishlistItemModel) => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: `${apiVersion1}/items`,
      isAuthorizationNeeded: true,
      data,
      // data: data.image ? getFormData(data) : data,
    });
    return response;
  } catch (error) {}
};

export const editItemService = async (id: string, data: WishlistItemModel) => {
  try {
    const response = await api({
      method: axiosMethods.put,
      url: `${apiVersion1}/items/${id}`,
      isAuthorizationNeeded: true,
      data,
    });
    return response;
  } catch (error) {}
};

export const deleteItemService = async (id: string) => {
  try {
    const response = await api({
      method: axiosMethods.delete,
      url: `${apiVersion1}/items/${id}`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const purchaseItemService = async (data: PurchaseItemModel) => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: `${apiVersion1}/items/purchase`,
      isAuthorizationNeeded: true,
      data,
    });
    return response;
  } catch (error) {}
};

export const redirectToGatewayService = async (data: PurchaseItemModel) => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: `${apiVersion1}/items/purchase`,
      isAuthorizationNeeded: true,
      data,
    });
    return response;
  } catch (error) {}
};

export const fetchItemByLinkService = async (data: { url: string }) => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: `${apiVersion1}/getPrice`,
      isAuthorizationNeeded: true,
      data,
    });
    return response;
  } catch (error) {}
};
