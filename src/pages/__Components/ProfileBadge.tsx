import { useAppSelector } from "../../redux/hooks";
import { reduxStateInt } from "../../typings/interfaces";

type ProfileBadgeProps = {
  isMine: boolean;
  avatar?: string;
  admin?: boolean;
  level?: number | null;
  total_completed?: number;
  total_awaited?: number;
  total_in_progress?: number;
};
const ProfileBadge = (props: ProfileBadgeProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { isMine, avatar, level } = props;
  const { my_user } = state.currentUser;
  return (
    <>
      {!isMine ? <div></div> : <div></div>}
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
