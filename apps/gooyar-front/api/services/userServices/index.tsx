import { api } from "@/api";
import { axiosMethods } from "@/shared/constants/axiosMethods";
import {
  UserModel,
  OTPModel,
  OTPLoginDataModel,
  PasswordLoginDataModel,
  cardModel,
  ResetPasswordModel,
} from "./models";
import { apiVersion1 } from "@/api/config";
import { getFormData } from "@/shared/helpers/getFormData";

const userServiceBaseURL = `${apiVersion1}/users`;

export const logoutService = async () => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: `${userServiceBaseURL}/logout`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const loginPasswordService = async (data: PasswordLoginDataModel) => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: `${apiVersion1}/loginPassword`,
      data: data,
    });
    return response;
  } catch (error) {}
};

export const loginOTPService = async (data: OTPLoginDataModel) => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: `${apiVersion1}/loginOtp`,
      data: data,
    });
    return response;
  } catch (error) {}
};

export const sendOTPService = async (data: OTPModel) => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: `${apiVersion1}/sendOtp`,
      data: data,
    });
    return response;
  } catch (error) {}
};

export const userProfileService = async ({ data }: { data?: UserModel }) => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: `${userServiceBaseURL}/profile`,
      data,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const updateUserAvatarService = async (data: any) => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: `${userServiceBaseURL}/profile?_method=PUT`,
      isAuthorizationNeeded: true,
      data: data.image ? getFormData(data) : data,
    });
    return response;
  } catch (error) {}
};

export const authenticationService = async (data: UserModel) => {
  const form = new FormData();
  Object.keys(data).map((item: string) => form.append(item, data[item]));

  try {
    const response = await api({
      method: axiosMethods.post,
      url: `${userServiceBaseURL}/authentication`,
      data: form,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const resetPasswordService = async (data: ResetPasswordModel) => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: `${apiVersion1}/users/resetPassword`,
      data: data,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

//card
export const postUserCardService = async (data: cardModel) => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: `${apiVersion1}/cards`,
      data: data,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const deleteUserCardService = async (id: string | number) => {
  try {
    const response = await api({
      method: axiosMethods.delete,
      url: `${apiVersion1}/cards/${id}`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const getCustomersListService = async () => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: `${userServiceBaseURL}/customers`,
      isAuthorizationNeeded: true,
    });

    return response;
  } catch (error) {}
};

export const getInquiriesListService = async () => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: `${userServiceBaseURL}/inquiries`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const getCardsListService = async () => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: `${userServiceBaseURL}/cards`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

// Notifications

export const getAllNotificationsService = async () => {
  try {
    const response = await api({
      method: axiosMethods.get,
      url: `${userServiceBaseURL}/notifications`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const getUnreadNotificationsService = async () => {
  try {
    const response = await api({
      method: axiosMethods.get,
      url: `${userServiceBaseURL}/unreadNotifications`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const markAllAsReadService = async () => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: `${userServiceBaseURL}/markAsReadAllNotifications`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const markAllAsUnreadService = async () => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: `${userServiceBaseURL}/markAsUnreadAllNotifications`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const markAsReadService = async (id: string) => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: `${userServiceBaseURL}/markAsReadNotification/${id}`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const markAsUnreadService = async (id: string) => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: `${userServiceBaseURL}/markAsUnreadNotification/${id}`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};
