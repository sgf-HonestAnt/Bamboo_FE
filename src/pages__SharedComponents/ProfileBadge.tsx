import { useAppSelector } from "../redux/hooks";
import { reduxStateInt } from "../typings/interfaces";
import { AWAITED, COMPLETED, IN_PROGRESS } from "../utils/appConstants";
import Badge from "./Badge";

type ProfileBadgeProps = {
  isMine: boolean;
  avatar?: string;
  level?: number | null;
  total_completed?: number;
  total_awaited?: number;
  total_in_progress?: number;
};
const ProfileBadge = (props: ProfileBadgeProps) => {
  console.log("FIX NEEDED ON PROFILEBADGE") // 🔨 FIX NEEDED: STYLING
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const {
    isMine,
    avatar,
    level,
    total_completed,
    total_awaited,
    total_in_progress,
  } = props;
  const { my_user } = state.currentUser;
  const currentTasks = state.currentTasks;
  return (
    <>
      {!isMine ? (
        <div>
          <Badge label={`${total_awaited}`} variant={AWAITED} />
          <Badge label={`${total_in_progress}`} variant={IN_PROGRESS} />
          <Badge label={`${total_completed}`} variant={COMPLETED} />
        </div>
      ) : (
        <div>
          <Badge label={`${currentTasks.awaited.length}`} variant={AWAITED} />
          <Badge
            label={`${currentTasks.in_progress.length}`}
            variant={IN_PROGRESS}
          />
          <Badge label={`${my_user.total_completed}`} variant={COMPLETED} />
        </div>
      )}
      <div className='profile-badge__holder m-1'>
        <img
          className='profile-badge__holder-img'
          alt=''
          src={avatar ? avatar : my_user.avatar}
        />
        <div className='profile-badge__level'>
          <span>{level ? level : my_user.level}</span>
        </div>
      </div>
    </>
  );
};

export default ProfileBadge;
