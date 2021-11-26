import { Card } from "react-bootstrap";
import { AcceptButton, ClearNotification, RejectButton } from "../Buttons";
import { History } from "history";
import { ICOBELL, ICOSMILE } from "../../utils/appIcons";
import { acceptOrReject, clearLastNotification } from "../../utils/f_users";
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
  const handleReset = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await clearLastNotification(notification);
    dispatch(fillUserAction());
  };
  const handleAccept = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const value = recentNotif.split(" ")[0];
    const action = "accept";
    console.log(value, action);
    await acceptOrReject(value, action);
  };
  const handleReject = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const value = recentNotif.split(" ")[0];
    const action = "reject";
    console.log(value, action);
    await acceptOrReject(value, action);
    await clearLastNotification(notification);
    dispatch(fillUserAction());
  };
  return (
    <div className={dashClass}>
      <Card.Title>
        <div className='dashboard__card-header'>
          <ICOBELL /> Notifications
        </div>
        {!isReq && notifLength > 0 && (
          <ClearNotification handleClick={handleReset} />
        )}
      </Card.Title>
      <Card.Text>
        You have {notifLength} notification
        {notifLength > 1 || notifLength === 0 ? "s" : ""}!
      </Card.Text>
      <Card.Text>
        {notifLength > 0 && isReq ? (
          <span>
            {recentNotif}, do you accept?
            <AcceptButton handleClick={handleAccept} />
            <RejectButton handleClick={handleReject} />
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
