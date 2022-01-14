import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { achievementInt, reduxStateInt } from "../../../typings/interfaces";
import { LinkButton } from "../../__Components/Buttons";
import { attemptPostAchievement } from "../../../utils/funcs/f_achievements";
import createSuperlist from "../../../utils/funcs/f_superlist";
import {
  getAvatarByUsername,
  getIdByUsername,
} from "../../../utils/funcs/f_users";
import { Link } from "react-router-dom";

type AchievementsProps = {};
const Achievements = (props: AchievementsProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { followedUsers, my_user } = state.currentUser;
  const { _id, username, avatar } = my_user;
  const achievements = state.currentAchievements;
  const { list, superlist } = achievements;
  const dispatch = useDispatch();
  const loadAchievementCard = async () => {
    let super_list: achievementInt[] = [];
    followedUsers.map((user, i) => {
      return user.achievements.map((ach, i) => {
        return super_list.push(ach);
      });
    });
    list.map((ach, i) => {
      return super_list.push(ach);
    });
    super_list.sort(function (a, b) {
      const date_a = new Date(a.createdAt).getTime();
      const date_b = new Date(b.createdAt).getTime();
      return date_b - date_a;
    });
    await createSuperlist(super_list, _id, followedUsers, dispatch);
  };
  const handleClick = async (e: {
    preventDefault: () => void;
    target: { value: any };
  }) => {
    e.preventDefault();
    const ach = e.target.value;
    const congrats = `${username} sent you a ${ach.split("|")[1]}`;
    await attemptPostAchievement(congrats, "congrats", dispatch, list);
  };
  useEffect(() => {
    loadAchievementCard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {}, [superlist]);
  return (
    <div className='bamboo-card dashboard__activities'>
      <div className='dashboard__card-header'>Achievements</div>
      <hr />
      {superlist?.length < 1 ? (
        <p>
          You have no achievements yet! Complete a task or follow a friend to
          view achievements.
        </p>
      ) : (
        superlist.map((ach, i) => {
          return (
            <div key={i}>
              {ach.includes("completed") && ach.split(" ")[0] !== "you" ? (
                // ach.includes("sent you a") ||
                // !ach.includes("Send")
                <>
                  <Link
                    to={`/following?id=${getIdByUsername(
                      followedUsers,
                      ach.split(" ")[0]
                    )}`}>
                    <img
                      src={getAvatarByUsername(
                        followedUsers,
                        ach.split(" ")[0]
                      )}
                      alt={ach.split(" ")[0]}
                      className='dashboard__activities__img mr-1' 
                    />
                  </Link>
                  <strong>{ach.split(" ")[0]}</strong>
                  <span> completed a task on </span>
                  <em>{ach.split(" task on ")[1]}</em>
                  <hr />
                </>
              ) : ach.split(" ")[0] === "you" ? (
                // ach.includes("sent you a") ||
                // !ach.includes("Send")
                <>
                  <img
                    src={avatar}
                    alt={username}
                    className='x-tiny-round mr-1'
                  />
                  <strong>{ach.split(" ")[0]}</strong>
                  <span> completed a task:</span>
                  <strong>
                    <em>{ach.split("task:")[1].split(" on ")[0]}</em>
                  </strong>
                  <span> on </span>
                  <em>{ach.split("on")[1].split("|")[0]}</em>
                  <hr />
                  {/* <span>{ach.split("|")[0]}</span>
                  <span>{ach.split("|")[1]}</span> */}
                </>
              ) : (
                <>
                  <div>{ach.split("|")[0]}</div>
                  <LinkButton
                    value={ach}
                    handleClick={handleClick}
                    label={`${ach.split("|")[0]}`}
                  />
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Achievements;
