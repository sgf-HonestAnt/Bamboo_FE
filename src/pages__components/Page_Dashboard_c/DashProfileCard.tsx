import { VscGraph } from "react-icons/vsc";
import { Link } from "react-router-dom";

type DashProfileCardProps = {
  avatar: string;
  username: string;
  bio: string;
  level: number | null;
  xp: number | null;
};

const DashProfileCard = (props: DashProfileCardProps) => {
  const { avatar, username, bio, level, xp } = props;
  return (
    <div className='dashboard__profile-card m-1'>
      <div className='dashboard__profile-card__holder'>
        <img
          className='dashboard__profile-card__holder-img'
          alt=''
          src={avatar}
        />
        <div className='dashboard__profile-card__level'>
          <span>{level}</span>
        </div>
      </div>
      <div className='dashboard__profile-card__username'>{username}</div>
      <div className='dashboard__profile-card__holder-xp'>{xp}XP</div>
      <div>{bio}</div>
      <div className='dashboard__profile-card__stats'>
        <div>
          <VscGraph />
        </div>
        <Link to='/stats'>Stats</Link>
      </div>
    </div>
  );
};

export default DashProfileCard;
