import { Link } from "react-router-dom";
import { followedUserInt } from "../../typings/interfaces";
import getUserRole from "../../utils/f_getUserRole";
import BambooPoints from "../App/XP";
import { ICOACTIVITY, ICORELATE } from "../../utils/icons";
import { EditButton } from "../../utils/buttons";

type DashProfileCardProps = {
  followedUsers: followedUserInt[];
  avatar: string;
  username: string;
  admin: boolean | undefined;
  bio: string;
  level: number | null;
  xp: number | null;
};

const DashProfileCard = (props: DashProfileCardProps) => {
  const { followedUsers, avatar, username, admin, bio, level, xp } = props;
  const role = getUserRole(level);
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
      <div>
        {bio} <EditButton handleClick={null} />
      </div>
      <div className='dashboard__profile-card__stats'>
        <div>
          <ICOACTIVITY />
        </div>
        <Link to='/stats'>Stats</Link>
      </div>
      <div className='dashboard__profile-card__following'>
        <ICORELATE className='mr-1' />
        Following: <Link to='/following'>{followedUsers.length}</Link>
      </div>
    </div>
  );
};

export default DashProfileCard;
