import { api } from "@/api";
import { apiVersion1 } from "@/api/config";
import { axiosMethods } from "@/shared/constants/axiosMethods";
import {
  CardVerificationModel,
  finalizationModel,
  InitializationModel,
} from "./models";

export const initializationService = async ({
  data,
}: {
  data: InitializationModel;
}) => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: `${apiVersion1}/customers/initialization`,
      isAuthorizationNeeded: true,
      data,
    });
    return response;
  } catch (error) {}
};

export const finalizationService = async ({
  data,
}: {
  data: finalizationModel;
}) => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: `${apiVersion1}/customers/finalization`,
      isAuthorizationNeeded: true,
      data,
    });
    return response;
  } catch (error) {}
};

export const cardVerificationService = async ({
  data,
}: {
  data: CardVerificationModel;
}) => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: `${apiVersion1}/customers/verifyCard`,
      isAuthorizationNeeded: true,
      data,
    });
    return response;
  } catch (error) {}
};
