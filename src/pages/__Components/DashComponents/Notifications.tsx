import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { reduxStateInt } from "../../../typings/interfaces";
import { Button } from "react-bootstrap";
import { AcceptButton, ClearNotification, RejectButton } from "../Buttons";
import {
  acceptOrRejectUser,
  clearLastNotification,
  getAvatarByUsername,
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
  return (
    <Button
      variant='primary'
      style={{ width: "100%" }}
      id='notification-button'
      className={`${dashClass} px-3 py-1 m-0 mb-2`}>
      <h5>
        {notifLength > 0 && isTask ? (
          <>
            <img
              src={avatar}
              alt={username}
              className='img-fluid dotted-border x-tiny-round'
            />
            <strong>{username}</strong> included you in a shared task: "{title}
            ". Do you accept? <br />
            <AcceptButton handleClick={handleAcceptTask} />
            <RejectButton handleClick={handleRejectTask} />
          </>
        ) : notifLength > 0 && isReq ? (
          <>
            {recentNotif}, do you accept?
            <br />
            <AcceptButton handleClick={handleAccept} />
            <RejectButton handleClick={handleReject} />
          </>
        ) : notifLength > 0 && isAcc ? (
          <>
            <img
              src={getAvatarByUsername(
                followedUsers,
                recentNotif.split(" ")[0]
              )}
              alt={recentNotif.split(" ")[0]}
              className='dotted-border x-tiny-round'
            />{" "}
            {recentNotif}
          </>
        ) : notifLength > 0 && isGift ? (
          <>
            <strong>{recentNotif.split("just")[0]}</strong>
            just {recentNotif.split("just")[1].split(":::")[0]}
            <br />
            <FiGift />
            <br />~{recentNotif.split(":::")[1]} xp~
          </>
        ) : notifLength > 0 ? (
          <>{recentNotif.split(",")[0]}!</>
        ) : (
          <></>
        )}
        {!isReq && !isTask && notifLength > 0 && (
          <ClearNotification handleClick={handleReset} />
        )}
      </h5>
    </Button>
  );
}
