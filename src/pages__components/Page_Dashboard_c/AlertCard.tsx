import { Card } from "react-bootstrap";
import { ClearNotification } from "../../utils/appButtons";
import { History } from "history";
import {
  ICOBELL,
  ICOCHECK,
  ICOCROSS,
  ICOROTATE,
  ICOSMILE,
} from "../../utils/appIcons";
import { clearNotifications } from "../../utils/f_users";

type DashAlertCardProps = {
  notification: string[];
  history: History<unknown> | string[];
};

const DashAlertCard = (props: DashAlertCardProps) => {
  const { notification, history } = props;
  const notifLength = notification.length;
  const recentNotif = notification[notification.length - 1];
  const isReq = recentNotif?.includes("has sent you a request");
  const isAcc = recentNotif?.includes("accepted your request");
  const handleClick = async () => {
    await clearNotifications(notification);
    history.push("/dash");
  };
  return (
    <div className='dashboard__alerts-card'>
      <Card.Title>
        <ICOBELL />{" "}
        {!isReq && notifLength > 0 && (
          <ClearNotification handleClick={handleClick} />
        )}
      </Card.Title>
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
          <>YOU'RE UP-TO-DATE!</>
        )}
      </Card.Text>
    </div>
  );
};

export default DashAlertCard;
