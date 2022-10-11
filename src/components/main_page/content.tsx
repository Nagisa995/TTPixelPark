import React, { FC, useState } from "react";
import { apiGetOrders, IOrderInfo } from "../../api/api_request";
import { limitSizeTitle, transformDate } from "../../helpers/utils";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { DetailedOrder } from "./detailed_order";
//@ts-ignore
import LoaderIcon from "../../source/loader.svg";
import "../../style/main_page_content_style.css";

export const MainPageContent: FC = () => {
  const { ordersInfo, accessToken, fetchingOrders } = useAppSelector(
    (state) => state.fetchingReducer
  );
  const dispatch = useAppDispatch();
  const [isDetailsActive, setIsDetailsActive] = useState(false);
  const [detailedOrder, setIsDetailedOrder] = useState({} as IOrderInfo);

  const haveAccessToken = accessToken !== "";

  const ordersOnUI = ordersInfo.map((order) => (
    <OrderInfo order={order} key={order.CustomId} />
  ));

  const handleClick = (e: React.MouseEvent) => {
    const targetID = (e.target as HTMLDivElement).id;
    const requestedOrder = ordersInfo.find(
      (order) => order.CustomId === targetID
    );
    setIsDetailedOrder(requestedOrder ?? ({} as IOrderInfo));
    setIsDetailsActive(true);
  };

  const handleScroll = (e: React.UIEvent) => {
    const scrollSize =
      e.currentTarget.scrollHeight - e.currentTarget.clientHeight;

    const fullScrolling = scrollSize === e.currentTarget.scrollTop;

    if (fullScrolling) {
      dispatch(apiGetOrders(accessToken, ordersInfo.length));
    }
  };
  return (
    <div className="main_page_content_container">
      <div className="order_conteiner">
        <span className="title">Title</span>
        <span className="title">Created</span>
        <span className="title">Payment Status</span>
        <span className="title">Current Status</span>
        <span className="title">User ID</span>
      </div>
      {(haveAccessToken && (
        <div
          className="content_container"
          onClick={handleClick}
          onScroll={handleScroll}
        >
          <div className="content_block">{ordersOnUI}</div>
        </div>
      )) || <Loader fetching={fetchingOrders} />}

      {isDetailsActive && (
        <DetailedOrder order={detailedOrder} onClose={setIsDetailsActive} />
      )}
    </div>
  );
};

interface IOrderComponent {
  order: IOrderInfo;
}

const OrderInfo: FC<IOrderComponent> = ({ order }) => {
  return (
    <div className="order_conteiner">
      <span>{limitSizeTitle(order.Title)}</span>
      <span>{transformDate(order.DateCreated)}</span>
      <span>{order.PaymentStatus}</span>
      <span>{order.Status}</span>
      <span>{order.UserId}</span>
      <div className="handle_id" id={order.CustomId} />
    </div>
  );
};

interface ILoader {
  fetching: boolean;
}

const Loader: FC<ILoader> = ({ fetching }) => {
  return (
    <div className="loader">
      {(fetching && <img src={LoaderIcon} alt="Loading ..." />) ||
        "Click Refresh Button"}
    </div>
  );
};
