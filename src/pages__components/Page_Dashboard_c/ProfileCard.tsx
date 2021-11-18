import { VscGraph } from "react-icons/vsc";
import { Link } from "react-router-dom";
import userRole from "../../utils/funcRole";
import { ICOACTIVITY } from "../../utils/icons";
import BambooPoints from "../XP";

type DashProfileCardProps = {
  avatar: string;
  username: string;
  admin: boolean | undefined;
  bio: string;
  level: number | null;
  xp: number | null;
};

const DashProfileCard = (props: DashProfileCardProps) => {
  const { avatar, username, admin, bio, level, xp } = props;
  const role = userRole(level);
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
      <div className='dashboard__profile-card__username'>
        {username} {admin && "(admin)"}
      </div>
      <div>{role}</div>
      <div className='dashboard__profile-card__holder-xp'>
        {xp} <BambooPoints />
      </div>
      <div>{bio}</div>
      <div className='dashboard__profile-card__stats'>
        <div>
          <ICOACTIVITY />
        </div>
        <Link to='/stats'>Stats</Link>
      </div>
    </div>
  );
};

export default DashProfileCard;
