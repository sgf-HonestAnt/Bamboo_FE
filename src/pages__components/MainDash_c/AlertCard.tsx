import { Card } from "react-bootstrap";
import { ClearNotification } from "../Buttons";
import { History } from "history";
import {
  ICOBELL,
  ICOCHECK,
  ICOCROSS,
  ICOROTATE,
  ICOSMILE,
  ICOURGENT,
} from "../../utils/appIcons";
import { clearNotifications } from "../../utils/f_users";
import { fillUserAction } from "../../redux/actions/user";
import { useDispatch } from "react-redux";

type DashAlertCardProps = {
  notification: string[];
  history: History<unknown> | string[];
};

const DashAlertCard = (props: DashAlertCardProps) => {
  const { notification } = props;
  const dispatch = useDispatch();
  const notifLength = notification.length;
  const recentNotif = notification[notification.length - 1];
  const isReq = recentNotif?.includes("has sent you a request");
  const isAcc = recentNotif?.includes("accepted your request");
  const dashClass =
    notifLength > 0
      ? "m-2 p-2 dashboard__alerts-card has-alert"
      : "m-2 p-2 dashboard__alerts-card";
  const handleClick = async () => {
    await clearNotifications(notification);
    dispatch(fillUserAction());
  };
  return (
    <div className={dashClass}>
      <Card.Title>
        <div className='dashboard__card-header'>
          <ICOBELL /> Notifications
        </div>
        {!isReq && notifLength > 0 && (
          <ClearNotification handleClick={handleClick} />
        )}
      </Card.Title>
      <Card.Text>
        You have {notifLength} notification
        {notifLength > 1 || notifLength === 0 ? "s" : ""}!
      </Card.Text>
      <div className='red'>
        <ICOURGENT />
        Upon function that may add notification, ensure dispatch notification
      </div>
      <Card.Text>
        {notifLength > 0 && isReq ? (
          <span>
            {recentNotif}, do you accept?
            <ICOCHECK className='mx-2' />
            <ICOCROSS className='mx-2' />
          </span>
        ) : notifLength > 0 && isAcc ? (
          <span>
            {recentNotif} <ICOSMILE />
          </span>
        ) : notifLength > 0 ? (
          <span>{recentNotif}</span>
        ) : (
          <></>
        )}
      </Card.Text>
    </div>
  );
};

export default DashAlertCard;
