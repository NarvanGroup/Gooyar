import { api } from "@/api";
import { axiosMethods } from "@/shared/constants/axiosMethods";
import {
  PhoneNumberModel,
  WhatsAppModel,
  TelegramModel,
  InstagramModel,
  OTPVerificationModel,
  QRCodeModel,
} from "./models";
import { apiVersion1 } from "@/api/config";

const contactPointsServiceBaseURL = `${apiVersion1}/contact-points`;

// Phone Number Services
export const getPhoneNumbersService = async () => {
  try {
    const response = await api({
      method: axiosMethods.get,
      url: `${contactPointsServiceBaseURL}/phone-numbers`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const addPhoneNumberService = async (data: PhoneNumberModel) => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: `${contactPointsServiceBaseURL}/phone-numbers`,
      data: data,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const updatePhoneNumberService = async (
  id: string,
  data: PhoneNumberModel
) => {
  try {
    const response = await api({
      method: axiosMethods.put,
      url: `${contactPointsServiceBaseURL}/phone-numbers/${id}`,
      data: data,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const deletePhoneNumberService = async (id: string) => {
  try {
    const response = await api({
      method: axiosMethods.delete,
      url: `${contactPointsServiceBaseURL}/phone-numbers/${id}`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const sendPhoneOTPService = async (phoneNumber: string) => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: `${contactPointsServiceBaseURL}/phone-numbers/send-otp`,
      data: { phone_number: phoneNumber },
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const verifyPhoneOTPService = async (data: OTPVerificationModel) => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: `${contactPointsServiceBaseURL}/phone-numbers/verify-otp`,
      data: data,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

// WhatsApp Services
export const getWhatsAppAccountsService = async () => {
  try {
    const response = await api({
      method: axiosMethods.get,
      url: `${contactPointsServiceBaseURL}/whatsapp`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const addWhatsAppAccountService = async (data: WhatsAppModel) => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: `${contactPointsServiceBaseURL}/whatsapp`,
      data: data,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const updateWhatsAppAccountService = async (
  id: string,
  data: WhatsAppModel
) => {
  try {
    const response = await api({
      method: axiosMethods.put,
      url: `${contactPointsServiceBaseURL}/whatsapp/${id}`,
      data: data,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const deleteWhatsAppAccountService = async (id: string) => {
  try {
    const response = await api({
      method: axiosMethods.delete,
      url: `${contactPointsServiceBaseURL}/whatsapp/${id}`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const getWhatsAppQRCodeService = async (id: string) => {
  try {
    const response = await api({
      method: axiosMethods.get,
      url: `${contactPointsServiceBaseURL}/whatsapp/${id}/qr-code`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const checkWhatsAppConnectionService = async (id: string) => {
  try {
    const response = await api({
      method: axiosMethods.get,
      url: `${contactPointsServiceBaseURL}/whatsapp/${id}/status`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

// Telegram Services
export const getTelegramAccountsService = async () => {
  try {
    const response = await api({
      method: axiosMethods.get,
      url: `${contactPointsServiceBaseURL}/telegram`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const addTelegramAccountService = async (data: TelegramModel) => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: `${contactPointsServiceBaseURL}/telegram`,
      data: data,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const updateTelegramAccountService = async (
  id: string,
  data: TelegramModel
) => {
  try {
    const response = await api({
      method: axiosMethods.put,
      url: `${contactPointsServiceBaseURL}/telegram/${id}`,
      data: data,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const deleteTelegramAccountService = async (id: string) => {
  try {
    const response = await api({
      method: axiosMethods.delete,
      url: `${contactPointsServiceBaseURL}/telegram/${id}`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const getTelegramQRCodeService = async (id: string) => {
  try {
    const response = await api({
      method: axiosMethods.get,
      url: `${contactPointsServiceBaseURL}/telegram/${id}/qr-code`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const checkTelegramConnectionService = async (id: string) => {
  try {
    const response = await api({
      method: axiosMethods.get,
      url: `${contactPointsServiceBaseURL}/telegram/${id}/status`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

// Instagram Services
export const getInstagramAccountsService = async () => {
  try {
    const response = await api({
      method: axiosMethods.get,
      url: `${contactPointsServiceBaseURL}/instagram`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const addInstagramAccountService = async (data: InstagramModel) => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: `${contactPointsServiceBaseURL}/instagram`,
      data: data,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const updateInstagramAccountService = async (
  id: string,
  data: InstagramModel
) => {
  try {
    const response = await api({
      method: axiosMethods.put,
      url: `${contactPointsServiceBaseURL}/instagram/${id}`,
      data: data,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const deleteInstagramAccountService = async (id: string) => {
  try {
    const response = await api({
      method: axiosMethods.delete,
      url: `${contactPointsServiceBaseURL}/instagram/${id}`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};

export const checkInstagramConnectionService = async (id: string) => {
  try {
    const response = await api({
      method: axiosMethods.get,
      url: `${contactPointsServiceBaseURL}/instagram/${id}/status`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {}
};
