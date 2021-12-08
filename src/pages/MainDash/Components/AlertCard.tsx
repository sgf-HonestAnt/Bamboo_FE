import { Card } from "react-bootstrap";
import {
  AcceptButton,
  ClearNotification,
  RejectButton,
} from "../../../pages__SharedComponents/Buttons";
import { History } from "history";
import { ICOBELL, ICOSMILE } from "../../../utils/appIcons";
import { acceptOrReject, clearLastNotification } from "../../../utils/f_users";
import { fillUserAction } from "../../../redux/actions/user";
import { useDispatch } from "react-redux";
import { removeSelfFromTask } from "../../../utils/f_tasks";
import { followedUserInt } from "../../../typings/interfaces";

type DashAlertCardProps = {
  notification: string[];
  followedUsers: followedUserInt[];
  history: History<unknown> | string[];
};
const DashAlertCard = (props: DashAlertCardProps) => {
  const { notification, followedUsers } = props;
  const dispatch = useDispatch();
  const notifLength = notification.length;
  const recentNotif = notification[notifLength - 1];
  const isTask = recentNotif?.includes("included you in a shared task");
  const isReq = recentNotif?.includes("has sent you a request");
  const isAcc = recentNotif?.includes("accepted your request");
  let username = "";
  let taskId = "";
  let title = "";
  let avatar: string | undefined;
  if (isTask) {
    const taskNotif = recentNotif.split(":::");
    username = taskNotif[0];
    taskId = taskNotif[2];
    title = taskNotif[3];
    const user = followedUsers.find((u) => u.username === username);
    avatar = user?.avatar;
  }
  const dashClass =
    notifLength > 0
      ? "m-2 p-2 dashboard__alerts-card has-alert"
      : "m-2 p-2 dashboard__alerts-card";
  const handleReset = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await clearLastNotification(notification);
    dispatch(fillUserAction());
  };
  const handleAcceptTask = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await clearLastNotification(notification);
    dispatch(fillUserAction());
  };
  const handleRejectTask = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await removeSelfFromTask(taskId, dispatch);
    dispatch(fillUserAction());
  };
  const handleAccept = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const value = recentNotif.split(" ")[0];
    const action = "accept";
    console.log(value, action);
    await acceptOrReject(value, action);
    await clearLastNotification(notification);
    dispatch(fillUserAction());
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
  console.log(recentNotif);
  return (
    <div className={dashClass}>
      <Card.Title>
        <div className='dashboard__card-header'>
          <ICOBELL /> Notifications
        </div>
        {!isReq && !isTask && notifLength > 0 && (
          <ClearNotification handleClick={handleReset} />
        )}
      </Card.Title>
      <Card.Text>
        You have {notifLength} notification
        {notifLength > 1 || notifLength === 0 ? "s" : ""}!
      </Card.Text>
      <Card.Text>
        {notifLength > 0 && isTask ? (
          <span>
            <img src={avatar} alt={username} className='img-fluid tiny-round' />
            {username} included you in a shared task: "{title}". Do you accept?
            <AcceptButton handleClick={handleAcceptTask} />
            <RejectButton handleClick={handleRejectTask} />
          </span>
        ) : notifLength > 0 && isReq ? (
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
