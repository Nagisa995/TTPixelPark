import axios from "axios";
import Cookies from "js-cookie";
import { apiRequestTokenURL, refreshTokenCookieName } from "../helpers/const";
import {
  getAccessTokenURL,
  getOrdersURL,
  getRefreshAccessTokenURL,
  isNotEmpty,
} from "../helpers/utils";
import { dataFetchingReducerSlice } from "../store/reducers/data_fetching";
import { AppDispatch } from "../store/store";

interface IToken {
  RequestToken: string;
  AccessToken: string;
  RefreshToken: string;
}

interface IOrderApiAnswer {
  Result: IOrderInfo[];
}

export interface IOrderInfo {
  CustomId: string;
  DateCreated: string;
  DeliveryAddress: IDeliveryAddress | null;
  DownloadLink: string | null;
  PaymentStatus: string;
  Status: string;
  StatusDate: string;
  Title: string;
  UserId: number;
}

export interface IDeliveryAddress {
  AddressLine1: string;
  AddressLine2: string;
  City: string;
  Country: string;
  Description: string;
  FullName: string;
  Phone: string;
  ZipCode: string;
}

export const apiAuthorization =
  (publicKey: string, privateKey: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(dataFetchingReducerSlice.actions.changeFetchingTokenStatus());

      const requestToken = await axios.get<IToken>(apiRequestTokenURL);

      const accessToken = await axios.get<IToken>(
        getAccessTokenURL(requestToken.data.RequestToken, publicKey, privateKey)
      );

      if (!isNotEmpty(accessToken.data.RefreshToken)) {
        throw new Error();
      }

      dispatch(
        dataFetchingReducerSlice.actions.saveAccessRefreshToken({
          accessToken: accessToken.data.AccessToken,
          refreshToken: accessToken.data.RefreshToken,
        })
      );

      Cookies.set(refreshTokenCookieName, accessToken.data.RefreshToken, {
        expires: 7,
      });

      dispatch(dataFetchingReducerSlice.actions.changeFetchingTokenStatus());
      dispatch(apiGetOrders(accessToken.data.AccessToken, 0));
    } catch (error) {
      dispatch(dataFetchingReducerSlice.actions.isFetchingAccessTokenFailed());
    }
  };

export const apiGetOrders =
  (accessToken: string, skipQty: number) => async (dispatch: AppDispatch) => {
    try {
      const orders = await axios.get<IOrderApiAnswer>(
        getOrdersURL(accessToken, skipQty)
      );

      if (skipQty > 0) {
        dispatch(
          dataFetchingReducerSlice.actions.addOrdersInfo(orders.data.Result)
        );
      } else {
        dispatch(
          dataFetchingReducerSlice.actions.saveOrdersInfo(orders.data.Result)
        );
      }
    } catch (error) {}
  };

export const apiRefreshAccessToken =
  (refreshToken: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(dataFetchingReducerSlice.actions.changeFetchingOrderStatus());

      const accessToken = await axios.get<IToken>(
        getRefreshAccessTokenURL(refreshToken)
      );

      if (!isNotEmpty(accessToken.data.RefreshToken)) {
        throw new Error();
      }

      dispatch(
        dataFetchingReducerSlice.actions.saveAccessRefreshToken({
          accessToken: accessToken.data.AccessToken,
          refreshToken: accessToken.data.RefreshToken,
        })
      );

      Cookies.set(refreshTokenCookieName, accessToken.data.RefreshToken, {
        expires: 7,
      });

      dispatch(apiGetOrders(accessToken.data.AccessToken, 0));
    } catch (error) {
      dispatch(dataFetchingReducerSlice.actions.deleteAccessRefreshToken());
    }
  };
