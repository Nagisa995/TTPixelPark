import { format } from "date-fns";
import { IDeliveryAddress } from "../api/api_request";
import {
  apiAccessTokenURL,
  apiOrdersURL,
  apiRefreshTokenURL,
  takingOrders,
} from "./const";
var sha1 = require("sha1");

export const getAccessTokenURL = (
  requestToken: string,
  publicKey: string,
  privateKey: string
): string => {
  return `${apiAccessTokenURL}?oauth_token=${requestToken}&grant_type=api&username=${publicKey}&password=${getHashSHA1(
    requestToken,
    privateKey
  )}`;
};

const getHashSHA1 = (requestToken: string, privateKey: string): string => {
  return sha1(requestToken + privateKey);
};

export const getOrdersURL = (accessToken: string, skipQty: number): string => {
  return `${apiOrdersURL}?oauth_token=${accessToken}&take=${takingOrders}&skip=${skipQty}`;
};

export const getRefreshAccessTokenURL = (refreshToken: string): string => {
  return `${apiRefreshTokenURL}?refreshToken=${refreshToken}`;
};

export const isNotEmpty = (parametr: any): boolean => {
  return parametr !== null;
};

export const limitSizeTitle = (string: string): string => {
  const stringLength = string.length;

  if (stringLength > 20) {
    return string.slice(0, 20) + "...";
  }

  return string;
};

export const transformDate = (date: string): string => {
  const dateTimestamp = date.slice(6, -2);

  return format(new Date(+dateTimestamp), "d MMM yyyy");
};

export const configureDeliveryAdress = (
  address: IDeliveryAddress | null
): string => {
  if (address !== null) {
    return `Delivery Address: ${address.ZipCode}, ${address.Country}, ${address.City}, ${address.AddressLine1} ${address.AddressLine2}`;
  }
  return "";
};
