import { History } from "history";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { reduxStateInt } from "../../../typings/interfaces";
import { Button, Col, Image, Row } from "react-bootstrap";
import { getUserRole } from "../../../utils/funcs/f_users";
import { FiActivity, FiEdit, FiUsers } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";
import BambooPoints from "../XP";
import ProfileBadge from "../ProfileBadge";
import returnIco from "../../../utils/funcs/f_ico";

type DashProfileCardProps = {
  history: History<unknown> | string[];
};
const DashProfileCard = (props: DashProfileCardProps) => {
  const islt850 = useMediaQuery({ query: "(max-width: 850px)" });
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { followedUsers, my_user } = state.currentUser;
  const { admin, username, bio, level, xp, rewards } = my_user;
  const { history } = props;
  const pushToSettings = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    history.push("/user-settings");
  };
  const role = getUserRole(level);
  return !islt850 ? (
    <div className='bamboo-card-mid'>
      <ProfileBadge isMine={true} />
      <div className='dashboard__card-header'>
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
      <div className='profile-card__level d-flex justify-content-between px-3 pt-3 pb-2'>
        <h3 className='w-50'>
          {xp}
          <BambooPoints />
        </h3>
        <h4 className='w-50'>{role}</h4>
      </div>
      <div className='rewards py-2'>
        {rewards
          .filter((item) => !item.available || item.available < 1)
          .map((item, i) => (
            <Image
              key={i}
              roundedCircle
              src={returnIco(item.reward)}
              alt={item.reward}
              className='tiny-square p-1 mr-1 mb-1'
              style={{ backgroundColor: "white" }}
              height='40px'
            />
          ))}
      </div>
      <div className='dashboard__profile-card__stats'>
        <FiActivity />
        <Link to='/stats'>View Stats</Link>
      </div>
      {admin && (
        <div className='mt-3'>
          <Link to='/admin-dash'>
            <Button variant='info' className='dashboard__admin-card'>
              Go to Admin
            </Button>
          </Link>
        </div>
      )}
    </div>
  ) : (
    <Row className='bamboo-card-mid m-0'>
      <Col className='col-6 border-right m-auto'>
        <ProfileBadge isMine={true} />
        <div className='dashboard__card-header'>
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
      </Col>
      <Col className='col-6'>
        <div className='dashboard__profile-card__following py-3'>
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
        <div className='dashboard__profile-card__level d-flex justify-content-between py-3'>
          <h3 className='w-50'>
            {xp}
            <BambooPoints />
          </h3>
          <h4 className='w-50'>{role}</h4>
        </div>
        <div className='rewards py-3'>
          {rewards
            .filter((item) => !item.available || item.available < 1)
            .map((item, i) => (
              <Image
                key={i}
                roundedCircle
                src={returnIco(item.reward)}
                alt={item.reward}
                className='tiny-square p-1 mr-1 mb-1'
                style={{ backgroundColor: "white" }}
                height='40px'
              />
            ))}
        </div>
        <div className='dashboard__profile-card__stats'>
          <FiActivity />
          <Link to='/stats'>View Stats</Link>
        </div>
        {admin && (
          <div className='mt-3'>
            <Link to='/admin-dash'>
              <Button variant='info' className='dashboard__admin-card'>
                Go to Admin
              </Button>
            </Link>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default DashProfileCard;
