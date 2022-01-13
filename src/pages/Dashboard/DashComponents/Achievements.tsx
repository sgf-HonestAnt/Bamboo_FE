import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { achievementInt, reduxStateInt } from "../../../typings/interfaces";
import { LinkButton } from "../../__Components/Buttons";
import { attemptPostAchievement } from "../../../utils/f_achievements";
import createSuperlist from "../../../utils/f_superlist";

type AchievementsProps = {};
const Achievements = (props: AchievementsProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { followedUsers, my_user } = state.currentUser;
  const { username } = my_user;
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
    await createSuperlist(super_list, username, dispatch);
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
  return (
    <div className='bamboo-card-dark dashboard__activities'>
      <div className='dashboard__card-header'>Achievements</div>
      {superlist?.length < 1 ? (
        <p>
          You have no achievements yet! Complete a task or follow a friend to
          view achievements.
        </p>
      ) : (
        superlist.map((ach, i) => {
          return (
            <div key={i}>
              {ach.includes("sent you a") || !ach.includes("Send") ? (
                <>
                  <span>{ach.split("|")[0]}</span>
                  <span>{ach.split("|")[1]}</span>
                </>
              ) : (
                <>
                  <span>{ach.split("|")[0]}</span>
                  <LinkButton
                    value={ach}
                    handleClick={handleClick}
                    label={ach.split("|")[1]}
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
