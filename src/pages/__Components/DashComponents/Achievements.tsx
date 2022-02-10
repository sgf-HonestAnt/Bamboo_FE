import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { achievementInt, reduxStateInt } from "../../../typings/interfaces";
import { LinkButton } from "../Buttons";
import { attemptPostAchievement } from "../../../utils/funcs/f_achievements";
import createSuperlist from "../../../utils/funcs/f_superlist";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

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
    <div
      className='bamboo-card dashboard__activities p-0'
      id='dashboard__activities'>
      {superlist?.length < 1 && (
        <Table>
          <tbody>
            <tr>
              <td>
                You have no achievements yet! Complete a task or follow a friend
                to view achievements.
              </td>
            </tr>
          </tbody>
        </Table>
      )}
      {superlist?.length > 0 && (
        <Table striped hover>
          <tbody>
            {superlist.map((ach, i) => {
              return ach.includes("completed") &&
                ach.split(" ")[0] !== "you" ? (
                <tr key={i} id={i.toString()}>
                  <td>
                    <Link to={`/following?id=${ach.split("||")[1]}`}>
                      <img
                        src={ach.split("||")[2]}
                        alt={ach.split("||")[0].split(" ")[0]}
                        className='dotted-border dashboard__activities__img mr-1'
                      />
                      {ach.split("||")[0].split(" ")[0]} completed a task on{" "}
                      {ach.split("||")[0].split(" task on ")[1]}
                    </Link>
                  </td>
                </tr>
              ) : ach.includes("completed") && ach.split(" ")[0] === "you" ? (
                <tr key={i} id={i.toString()}>
                  <td>
                    {" "}
                    <img
                      src={avatar}
                      alt={username}
                      className='dotted-border dashboard__activities__img mr-1'
                    />
                    you completed task:{" "}
                    <em>
                      {ach
                        .split("you completed task:")[1]
                        .split("|")[0]
                        .split(" ")
                        .slice(0, -8)
                        .toString()
                        .replace(/,/g, " ")}
                    </em>{" "}
                    {ach
                      .split("you completed task:")[1]
                      .split("|")[0]
                      .split(" ")
                      .slice(-8)
                      .toString()
                      .replace(/,/g, " ")}
                    {/* {ach.split("|")[1]} */}
                  </td>
                </tr>
              ) : (
                <tr key={i} id={i.toString()}>
                  <td>
                    {" "}
                    <span>{ach.split("|")[0]}</span>
                    <LinkButton
                      value={ach}
                      handleClick={handleClick}
                      label={`${ach.split("|")[0]}`}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Achievements;
