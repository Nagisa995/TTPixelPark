import { FC } from "react";
import { useAppSelector } from "../hooks/redux";
import { Authorization } from "./authorization";
import { MainPage } from "./main_page/main_page";

export const App: FC = () => {
  const { refreshToken } = useAppSelector((state) => state.fetchingReducer);

  const haveRefreshToken = refreshToken !== "";

  return <>{(haveRefreshToken && <MainPage />) || <Authorization />}</>;
};
