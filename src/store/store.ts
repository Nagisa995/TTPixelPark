import { combineReducers, configureStore } from "@reduxjs/toolkit";
import fetchingReducer from "./reducers/data_fetching";

const rootReducer = combineReducers({
  fetchingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
