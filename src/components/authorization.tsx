import React, { FC, useRef } from "react";
import "../style/authorization_style.css";
//@ts-ignore
import Loader from "../source/loader.svg";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { apiAuthorization } from "../api/api_request";

export const Authorization: FC = () => {
  const { fetchingToken, isfetchingFailed } = useAppSelector(
    (state) => state.fetchingReducer
  );
  const dispatch = useAppDispatch();

  const publicKeyField = useRef(null as unknown as HTMLInputElement);
  const privateKeyField = useRef(null as unknown as HTMLInputElement);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      apiAuthorization(
        publicKeyField.current.value,
        privateKeyField.current.value
      )
    );
  };
  return (
    <div className="modal_window">
      <form className="authorization_container" onSubmit={handleSubmit}>
        <h1>Enter data to gain access</h1>

        <h2>Public key:</h2>
        <input
          type="text"
          ref={publicKeyField}
          disabled={fetchingToken}
          className={isfetchingFailed ? "failed" : ""}
          placeholder={isfetchingFailed ? "Access denied" : ""}
        />

        <h2>Private key:</h2>
        <input
          type="text"
          ref={privateKeyField}
          disabled={fetchingToken}
          className={isfetchingFailed ? "failed" : ""}
          placeholder={isfetchingFailed ? "Try again" : ""}
        />

        <div className="submit">
          <button disabled={fetchingToken}>
            {(fetchingToken && (
              <img src={Loader} alt="Loading..." className="loader" />
            )) ||
              "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};
