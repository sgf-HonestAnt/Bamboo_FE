import { History } from "history";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { reduxStateInt } from "../../../typings/interfaces";
import { Button, Image } from "react-bootstrap";
import { getUserRole } from "../../../utils/funcs/f_users";
import BambooPoints from "../XP";
import ProfileBadge from "../ProfileBadge";
import returnIco from "../../../utils/funcs/f_ico";
import { FiActivity, FiEdit, FiUsers } from "react-icons/fi";

type DashProfileCardProps = {
  isBigScreen?: boolean;
  history: History<unknown> | string[];
};
const DashProfileCard = (props: DashProfileCardProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { followedUsers, my_user } = state.currentUser;
  const { username, bio, level, xp, rewards } = my_user;
  const { isBigScreen, history } = props;
  const pushToSettings = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    history.push("/user-settings");
  };
  const role = getUserRole(level);
  return (
    <div className='bamboo-card-mid'>
      <ProfileBadge isMine={true} />
      <div className='dashboard__card-header'>
        {/* {admin && (
          <Image
            roundedCircle
            src={CROWN}
            alt='Admin'
            className='p-1'
            height='35px'
          />
        )}
        <br /> */}
        <h4 className='mt-3'>
          {username}
          <Button
            className='p-1 dashboard__profile-card__edit-btn'
            variant='link'
            onClick={pushToSettings}>
            <FiEdit />
          </Button>{" "}
        </h4>
      </div>
      <div className='pb-2'>
        <span>{bio}</span>
      </div>
      <div className='dashboard__profile-card__following py-2'>
        My Team: <Link to='/following'>{followedUsers.length}</Link>{" "}
        <FiUsers className='mr-1' />
        <div>
          {followedUsers.length > 3 ? (
            <>
              {followedUsers.slice(0, 3).map((user, i) => {
                const avatar = user.avatar;
                const username = user.username;
                return (
                  <Link to={`/following?id=${user._id}`} key={i}>
                    <img
                      src={avatar}
                      alt={username}
                      className='dotted-border x-tiny-round mr-1'
                    />
                  </Link>
                );
              })}
              <Link to='/following'>+{followedUsers.length - 3}</Link>
            </>
          ) : followedUsers.length > 0 ? (
            followedUsers.map((user, i) => {
              const avatar = user.avatar;
              const username = user.username;
              return (
                <Link to={`/following?id=${user._id}`} key={i}>
                  <img
                    src={avatar}
                    alt={username}
                    className='dotted-border x-tiny-round mr-1'
                  />
                </Link>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className='dashboard__profile-card__level d-flex justify-content-between px-3 py-3'>
        <h3 className='w-50'>
          {xp}
          <BambooPoints />
        </h3>
        <h4 className='w-50'>{role}</h4>
      </div>
      <div className='rewards py-2'>
        {rewards
          .filter((item) => item.available < 1)
          .map((item, i) => (
            <Image
              key={i}
              roundedCircle
              src={returnIco(item.reward)}
              alt={item.reward}
              className='p-1 mr-1 mb-1'
              style={{ backgroundColor: "white" }}
              height='40px'
            />
          ))}
      </div>
      <div className='dashboard__profile-card__stats'>
        <FiActivity />
        <Link to='/stats'>View Stats</Link>
      </div>
    </div>
  );
};

export default DashProfileCard;
