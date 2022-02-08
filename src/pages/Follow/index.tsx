import { useEffect, useState } from "react";
import { History, Location } from "history";
import { useAppSelector } from "../../redux/hooks";
import { reduxStateInt } from "../../typings/interfaces";
import { Row, Container, Col, Image } from "react-bootstrap";
import {
  // ContactAdminButton,
  SendGiftButton,
} from "../__Components/Buttons";
import ProfileBadge from "../__Components/ProfileBadge";
import { getUserRole } from "../../utils/funcs/f_users";
import "./styles.css";
import FindFollows from "../__Components/FindFollows";
import { useMediaQuery } from "react-responsive";
import returnIco from "../../utils/funcs/f_ico";
import { sendXpGift } from "../../utils/funcs/f_rewards";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TaskButton } from "../__Components/DashComponents/MapTasks";
import { createColorArray } from "../../utils/funcs/f_styling";
import { COMPLETED } from "../../utils/const/str";
import { fillTasksAction } from "../../redux/actions/tasks";
import FollowModal from "../__Components/FollowComponents/FollowModal";
import BambooPoints from "../__Components/XP";

type FollowingPageProps = {
  history: History<unknown> | string[];
  location: Location<unknown>;
};
export default function FollowingPage(props: FollowingPageProps) {
  const dispatch = useDispatch();
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { my_user, followedUsers } = state.currentUser;
  const { categories, awaited, in_progress, completed } = state.currentTasks;
  const allTasks = awaited.concat(in_progress, completed);
  const { customColors } = state.currentSettings;
  const [categoryColors, setCategoryColors] = useState<string | any[]>([]);
  const { history, location } = props;
  const isgt1330 = useMediaQuery({ query: "(min-width: 1330px)" });
  const isgt975 = useMediaQuery({ query: "(min-width: 975px)" });
  const isgt595 = useMediaQuery({ query: "(min-width: 595px)" });
  const [usersToShow, setUsersToShow] = useState(followedUsers);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [gift, setGift] = useState({ username: "", userId: "", xp: 0 });
  const points = my_user.xp;
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setGift({ username: "", userId: "", xp: 0 });
  };
  const handleShow = () => setShow(true);
  const sendGift = async (e: {
    preventDefault: () => void;
    target: { value: any };
  }) => {
    e.preventDefault();
    const value = e.target.value;
    const userId = value.split(" ")[0];
    const username = value.split(" ")[1];
    await setGift({ ...gift, username, userId });
    handleShow();
  };
  const setPoints = (e: {
    preventDefault: () => void;
    target: { value: any };
  }) => {
    e.preventDefault();
    const xp = e.target.value;
    setGift({ ...gift, xp });
  };
  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    await sendXpGift(gift.userId, gift.xp, points, dispatch);
    handleClose();
    setLoading(true);
  }
  const locationSearch = location.search.split("=")[1];
  useEffect(() => {
    dispatch(fillTasksAction());
    createColorArray(customColors, categories, setCategoryColors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (location.search) {
      const filteredUsers = followedUsers.filter(
        (user) => user._id === locationSearch
      );
      setUsersToShow(filteredUsers);
    } else {
      setUsersToShow(followedUsers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  useEffect(() => {
    setLoading(false);
  }, [loading]);
  return (
    <Container fluid>
      <Row className='p-3'>
        <FindFollows history={history} search={search} setSearch={setSearch} />
      </Row>
      <Row className='following-page px-3'>
        {usersToShow?.length < 1 && <p>NO FOLLOWED USERS!</p>}
        {usersToShow?.map((u, i) => (
          <Col
            key={i}
            className={`bamboo-card-x-dark py-2 mr-2 ${
              isgt1330
                ? "col-2"
                : isgt975
                ? "col-3"
                : isgt595
                ? "col-5"
                : "col-12"
            }`}>
            {/* // ${isgt1273 ? "col-2" : isgt1173 ? "col-3" : "col-12"} */}
            <ProfileBadge
              isMine={false}
              avatar={u.avatar}
              admin={u.admin}
              level={u.level}
              total_completed={u.total_completed}
              total_awaited={u.total_awaited}
              total_in_progress={u.total_in_progress}
            />
            <h5>{u.username}</h5>
            {!location.search.includes("?id=") ? (
              <Link to={`/following?id=${u._id}`}>View Tasks Shared</Link>
            ) : (
              <>
                {
                  allTasks.filter((task) =>
                    task.sharedWith?.includes(usersToShow[0]._id)
                  ).length
                }{" "}
                Task
                {allTasks.filter((task) =>
                  task.sharedWith?.includes(usersToShow[0]._id)
                ).length === 1
                  ? ""
                  : "s"}{" "}
                Shared
              </>
            )}
            <div className='py-2'>{u.bio}</div>
            {/* <div className='rewards'>
              {u.admin && (
                <Image
                  roundedCircle
                  src={CROWN}
                  alt='Admin'
                  className='p-1 mr-1 mb-1'
                  style={{ backgroundColor: "white" }}
                  height='35px'
                />
              )}
            </div> */}
            <div className='profile-card__level d-flex justify-content-between px-2 pt-3'>
              <h5 className='w-50'>
                {u.xp}
                <BambooPoints />
              </h5>
              <h5 className='w-50'>{getUserRole(u.level)}</h5>
            </div>
            {/* {u.admin && (
              <>
                <ContactAdminButton
                  value={`${u._id} ${u.username}`}
                  handleClick={sendGift}
                />
              </>
            )} */}
            <div className='py-2'>
              {u.rewards &&
                u.rewards
                  .filter((item) => item.available < 1)
                  .map((item, i) => (
                    <Image
                      key={i}
                      roundedCircle
                      src={returnIco(item.reward)}
                      alt={item.reward}
                      className='p-1 mr-1 mb-1'
                      style={{ backgroundColor: "white" }}
                      height='25px'
                    />
                  ))}
            </div>
            <SendGiftButton
              value={`${u._id} ${u.username}`}
              handleClick={sendGift}
            />
            <FollowModal
              points={points}
              show={show}
              handleClose={handleClose}
              gift={gift}
              setPoints={setPoints}
              handleSubmit={handleSubmit}
            />
          </Col>
        ))}
        {location.search.includes("?id=") && (
          <Col>
            <div className='d-flex'>
              {allTasks
                .filter(
                  (task) =>
                    task.sharedWith?.includes(usersToShow[0]._id) &&
                    task.status === COMPLETED
                )
                .map((task, i) => (
                  <TaskButton
                    i={i}
                    task={task}
                    bgColor={
                      categoryColors[
                        categories.findIndex((cat) => cat === task.category)
                      ]
                    }
                  />
                ))}
              {allTasks
                .filter(
                  (task) =>
                    task.sharedWith?.includes(usersToShow[0]._id) &&
                    task.status !== COMPLETED
                )
                .map((task, i) => (
                  <Link to={`/tasks?id=${task._id}`} key={task._id}>
                    <TaskButton
                      i={i}
                      task={task}
                      bgColor={
                        categoryColors[
                          categories.findIndex((cat) => cat === task.category)
                        ]
                      }
                    />
                  </Link>
                ))}
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
}
