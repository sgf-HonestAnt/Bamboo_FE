import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { reduxStateInt } from "../../../typings/interfaces";
import { Button } from "react-bootstrap";
import { AcceptButton, ClearNotification, RejectButton } from "../Buttons";
import { ICOSMILE } from "../../../utils/appIcons";
import {
  acceptOrRejectUser,
  clearLastNotification,
} from "../../../utils/funcs/f_users";
import { removeSelfFromTask } from "../../../utils/funcs/f_tasks";
import { fillUserAction } from "../../../redux/actions/user";
import { FiGift } from "react-icons/fi";

type DashNotificationsProps = {};

export default function DashNotifications(props: DashNotificationsProps) {
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
  const isGift = recentNotif?.includes("sent you a gift");
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
      ? "dashboard__alerts-card has-alert"
      : "dashboard__alerts-card";
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
    <Button variant='link' style={{width:"100%"}} id="notification-button" className={`${dashClass} px-3 py-1 m-0 mb-2`}>
      {notifLength > 0 && isTask ? (
        <span>
          <img src={avatar} alt={username} className='img-fluid x-tiny-round' />
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
      ) : notifLength > 0 && isGift ? (
        <span>
          <strong>{recentNotif.split("just")[0]}</strong>
          just {recentNotif.split("just")[1].split(":::")[0]}
          <br />
          <FiGift />
          <br />
          ~{recentNotif.split(":::")[1]} xp~
        </span>
      ) : notifLength > 0 ? (
        <span>{recentNotif.split(",")[0]}!</span>
      ) : (
        <></>
      )}
      {!isReq && !isTask && notifLength > 0 && (
        <ClearNotification handleClick={handleReset} />
      )}
    </Button>
  );
}
