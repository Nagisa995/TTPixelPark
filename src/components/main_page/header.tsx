import Cookies from "js-cookie";
import { FC } from "react";
import { apiRefreshAccessToken } from "../../api/api_request";
import { refreshTokenCookieName } from "../../helpers/const";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { dataFetchingReducerSlice } from "../../store/reducers/data_fetching";
import "../../style/main_page_header_style.css";

export const MainPageHeader: FC = () => {
  const { refreshToken } = useAppSelector((state) => state.fetchingReducer);
  const dispatch = useAppDispatch();

  return (
    <header className="header">
      <button
        onClick={() => {
          dispatch(apiRefreshAccessToken(refreshToken));
        }}
      >
        Refresh order list
      </button>
      <button
        onClick={() => {
          Cookies.remove(refreshTokenCookieName);
          dispatch(dataFetchingReducerSlice.actions.deleteAccessRefreshToken());
        }}
      >
        Exit
      </button>
    </header>
  );
};
