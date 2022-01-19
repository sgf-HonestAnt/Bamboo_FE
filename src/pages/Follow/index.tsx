import { useEffect, useState } from "react";
import { History, Location } from "history";
import { useAppSelector } from "../../redux/hooks";
import { reduxStateInt } from "../../typings/interfaces";
import {
  Row,
  Card,
  Button,
  Modal,
  Container,
  Col,
  Image,
} from "react-bootstrap";
import {
  // ContactAdminButton,
  LinkButton,
  SendGiftButton,
} from "../__Components/Buttons";
import ProfileBadge from "../__Components/ProfileBadge";
import BambooPoints from "../__Components/XP";
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
  useEffect(() => {
    createColorArray(customColors, categories, setCategoryColors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTasks]);
  const { history, location } = props;
  const islt836 = useMediaQuery({
    query: "(max-width: 835px)",
  });
  const isgt1261 = useMediaQuery({ query: "(min-width: 1261px)" });
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
    if (location.search) {
      // console.log(location.search);
      const filteredUsers = followedUsers.filter(
        (user) => user._id === locationSearch
      );
      setUsersToShow(filteredUsers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  useEffect(() => {
    setLoading(false);
  }, [loading]);
  useEffect(() => {
    if (!location.search) {
      setUsersToShow(followedUsers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
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
            className={`following-page__profile-card m-1 p-1 ${
              islt836 ? "col-5" : isgt1261 ? "col-2" : "col-3"
            }`}>
            <ProfileBadge
              isMine={false}
              avatar={u.avatar}
              admin={u.admin}
              level={u.level}
              total_completed={u.total_completed}
              total_awaited={u.total_awaited}
              total_in_progress={u.total_in_progress}
            />
            <Card.Title>{u.username} </Card.Title>
            <Link to={`/following?id=${u._id}`}>
              {location.search.includes("?id=") &&
                allTasks.filter((task) =>
                  task.sharedWith?.includes(usersToShow[0]._id)
                ).length}{" "}
              Tasks Shared
            </Link>
            <div className='dashboard__profile-card__bio m-2'>{u.bio}</div>
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
            <div className='mb-2'>
              {/* {u.admin && "Admin: "} */}
              {getUserRole(u.level)}
            </div>
            {/* {u.admin && (
              <>
                <ContactAdminButton
                  value={`${u._id} ${u.username}`}
                  handleClick={sendGift}
                />
              </>
            )} */}
            <SendGiftButton
              value={`${u._id} ${u.username}`}
              handleClick={sendGift}
            />
            <div className='my-2'>
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
            {points! < 100 ? (
              <Modal show={show} onHide={handleClose}>
                {/* {u.admin && (
                  <Modal.Header>
                    Send message to <strong>{gift.username}</strong>
                  </Modal.Header>
                */}
                <>
                  <Modal.Header>
                    <Modal.Title>You have {points} Bamboo Points</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    You need a minimum of 100 Bamboo Points before you can send{" "}
                    <strong>{gift.username}</strong> a gift. Come back later
                    after completing some tasks!
                  </Modal.Body>
                  <Modal.Footer>
                    {/* <Button variant='primary' onClick={handleDelete}>
                Yes, delete my account
              </Button> */}
                    <Button variant='secondary' onClick={handleClose}>
                      Go back
                    </Button>
                  </Modal.Footer>
                </>
              </Modal>
            ) : (
              <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                  {" "}
                  {/* 🔨 FIX NEEDED: implement gift-giving feature! */}
                  {gift.xp === 0 ? (
                    <Modal.Title>
                      You have {points} Bamboo Points To Give
                    </Modal.Title>
                  ) : (
                    <Modal.Title>Are you sure?</Modal.Title>
                  )}
                </Modal.Header>
                {gift.xp === 0 ? (
                  <Modal.Body>
                    How many will <BambooPoints /> Bamboo Points will you give
                    to <strong>{gift.username}</strong>?
                  </Modal.Body>
                ) : (
                  <div className='p-3'>
                    You are about to send <strong>{gift.username}</strong>{" "}
                    {gift.xp}
                    <BambooPoints />
                    Bamboo points. Continue?
                  </div>
                )}
                {gift.xp === 0 ? (
                  <Modal.Footer>
                    <LinkButton
                      value={10}
                      variant='primary'
                      label='10'
                      handleClick={setPoints}
                    />
                    <LinkButton
                      value={20}
                      variant='primary'
                      label='20'
                      handleClick={setPoints}
                    />
                    <LinkButton
                      value={30}
                      variant='primary'
                      label='30'
                      handleClick={setPoints}
                    />
                    <Button variant='secondary' onClick={handleClose}>
                      None, go back
                    </Button>
                  </Modal.Footer>
                ) : (
                  <Modal.Footer>
                    <Button variant='primary' onClick={handleSubmit}>
                      Yes, send
                    </Button>
                    <Button variant='secondary' onClick={handleClose}>
                      No, go back
                    </Button>
                  </Modal.Footer>
                )}
              </Modal>
            )}
          </Col>
        ))}
        {location.search.includes("?id=") && (
          <Col>
            <div className='d-flex'>
              {allTasks
                .filter((task) => task.sharedWith?.includes(usersToShow[0]._id))
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
