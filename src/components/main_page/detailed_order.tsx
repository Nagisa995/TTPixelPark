import { FC } from "react";
import { IOrderInfo } from "../../api/api_request";
import {
  configureDeliveryAdress,
  isNotEmpty,
  transformDate,
} from "../../helpers/utils";
import "../../style/main_page_detailed_order_style.css";
//@ts-ignore
import CloseIcon from "../../source/icons_close.svg";

interface IDetailedOrder {
  order: IOrderInfo;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DetailedOrder: FC<IDetailedOrder> = ({ order, onClose }) => {
  const handleCloseClick = () => {
    onClose(false);
  };

  return (
    <div className="modal_window background" onClick={handleCloseClick}>
      <div className="detailed_order" onClick={(e) => e.stopPropagation()}>
        <div className="detailed_order_title">{order.Title}</div>

        <span>Order ID: {order.CustomId}</span>

        <span>
          Created {transformDate(order.DateCreated)} by User: {order.UserId}
        </span>

        <span>
          Current status: {order.Status}/{transformDate(order.StatusDate)}
        </span>

        <span>Payment Status: {order.PaymentStatus}</span>

        <span>{configureDeliveryAdress(order.DeliveryAddress)}</span>

        {isNotEmpty(order.DeliveryAddress) && (
          <>
            <span>Contact Person: {order.DeliveryAddress?.FullName}</span>
            <span>Contact Phone: {order.DeliveryAddress?.Phone}</span>
          </>
        )}

        {isNotEmpty(order.DownloadLink) && (
          <a href={`${order.DownloadLink}`}>Click for detailed info</a>
        )}

        <img
          src={CloseIcon}
          alt="x"
          className="close_icon"
          onClick={handleCloseClick}
        />
      </div>
    </div>
  );
};
