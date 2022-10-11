import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { IOrderInfo } from "../../api/api_request";
import { refreshTokenCookieName } from "../../helpers/const";

interface IToken {
  accessToken: string;
  refreshToken: string;
}

interface IFetchingData {
  fetchingToken: boolean;
  isfetchingFailed: boolean;
  fetchingOrders: boolean;
  accessToken: string;
  refreshToken: string;
  ordersInfo: IOrderInfo[];
}

export const defaultFetchingData: IFetchingData = {
  fetchingToken: false,
  isfetchingFailed: false,
  fetchingOrders: false,
  accessToken: "",
  refreshToken: Cookies.get(refreshTokenCookieName) ?? "",
  ordersInfo: [],
};

export const dataFetchingReducerSlice = createSlice({
  name: "fetchingData",
  initialState: defaultFetchingData,
  reducers: {
    changeFetchingTokenStatus(state) {
      state.isfetchingFailed = false;
      state.fetchingToken = true;
    },
    saveAccessRefreshToken(state, action: PayloadAction<IToken>) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    deleteAccessRefreshToken(state) {
      state.accessToken = "";
      state.refreshToken = "";
      state.fetchingToken = false;
    },
    isFetchingAccessTokenFailed(state) {
      state.isfetchingFailed = true;
      state.fetchingToken = false;
    },
    changeFetchingOrderStatus(state) {
      state.fetchingOrders = true;
    },
    saveOrdersInfo(state, action: PayloadAction<IOrderInfo[]>) {
      state.fetchingOrders = false;
      state.ordersInfo = action.payload;
    },
    addOrdersInfo(state, action: PayloadAction<IOrderInfo[]>) {
      state.fetchingOrders = false;
      state.ordersInfo = [...state.ordersInfo, ...action.payload];
    },
  },
});

export default dataFetchingReducerSlice.reducer;
