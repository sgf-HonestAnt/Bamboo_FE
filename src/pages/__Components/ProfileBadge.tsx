import { useAppSelector } from "../../redux/hooks";
import { reduxStateInt } from "../../typings/interfaces";
import "../../styles/hexagon.css";

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
  const {
    isMine,
    avatar,
    // level
  } = props;
  const { my_user } = state.currentUser;
  return (
    <>
      {!isMine ? <div></div> : <div></div>}
      <div className='profile-badge__holder m-1'>
        <img
          className='profile-badge__holder-img img-fluid'
          alt=''
          src={avatar ? avatar : my_user.avatar}
        />
      </div>
    </>
  );
};

export default ProfileBadge;
