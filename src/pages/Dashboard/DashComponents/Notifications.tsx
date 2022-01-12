import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { reduxStateInt } from "../../../typings/interfaces";
import { Card } from "react-bootstrap";
import {
  AcceptButton,
  ClearNotification,
  RejectButton,
} from "../../__Components/Buttons";
import { ICOBELL, ICOSMILE } from "../../../utils/appIcons";
import {
  acceptOrRejectUser,
  clearLastNotification,
} from "../../../utils/f_users";
import { removeSelfFromTask } from "../../../utils/f_tasks";
import { fillUserAction } from "../../../redux/actions/user";

type DashNotificationsProps = {};
const DashNotifications = (props: DashNotificationsProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { followedUsers, my_user } = state.currentUser;
  const { currentTasks } = state;
  const { notification } = my_user;
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
    dispatch(fillUserAction()); // 👈HERE!
  };
  const handleAcceptTask = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await clearLastNotification(notification);
    dispatch(fillUserAction()); // 👈HERE!
  };
  const handleRejectTask = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await removeSelfFromTask(taskId, currentTasks, dispatch);
    await clearLastNotification(notification);
    dispatch(fillUserAction()); // 👈HERE!
  };
  const handleAccept = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const value = recentNotif.split(" ")[0];
    const action = "accept";
    await acceptOrRejectUser(value, action);
    await clearLastNotification(notification);
    dispatch(fillUserAction()); // 👈HERE!
  };
  const handleReject = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const value = recentNotif.split(" ")[0];
    const action = "reject";
    await acceptOrRejectUser(value, action);
    await clearLastNotification(notification);
    dispatch(fillUserAction()); // 👈HERE!
  };
  //console.log("FIX NEEDED ON NOTIFICATIONS"); // 🔨 FIX NEEDED: WHEN ACCEPT A TASK, NEEDS TO ADD TASK TO STATE SO SIDEBAR REFLECTS CORRECT NUMBER
  return (
    <div className={dashClass}>
      <Card.Title>
        <div className='dashboard__card-header'>
          <ICOBELL /> You have {notifLength} notification
          {notifLength > 1 || notifLength === 0 ? "s" : ""}!
        </div>
        {!isReq && !isTask && notifLength > 0 && (
          <ClearNotification handleClick={handleReset} />
        )}
      </Card.Title>
      <Card.Text>
        {notifLength > 0 && isTask ? (
          <span>
            <img
              src={avatar}
              alt={username}
              className='img-fluid x-tiny-round'
            />
            <strong>{username}</strong> included you in a shared task: "{title}
            ". Do you accept? <AcceptButton handleClick={handleAcceptTask} />
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

export default DashNotifications;
