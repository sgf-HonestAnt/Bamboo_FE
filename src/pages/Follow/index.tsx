import { useEffect, useState } from "react";
import { History, Location } from "history";
import { useAppSelector } from "../../redux/hooks";
import { reduxStateInt } from "../../typings/interfaces";
import { Row, Card, Button, Modal } from "react-bootstrap";
import {
  ContactAdminButton,
  LinkButton,
  SendGiftButton,
} from "../__Components/Buttons";
import ProfileBadge from "../__Components/ProfileBadge";
import BambooPoints from "../__Components/XP";
import { getUserRole } from "../../utils/funcs/f_users";
import "./styles.css";
import { ICOCROWN } from "../../utils/appIcons";
import FindTeam from "../__Components/FindTeam";

type FollowingPageProps = {
  history: History<unknown> | string[];
  location: Location<unknown>;
};
export default function FollowingPage(props: FollowingPageProps) {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { my_user, followedUsers } = state.currentUser;
  const { history, location } = props;
  const [usersToShow, setUsersToShow] = useState(followedUsers);
  const [search, setSearch] = useState("");
  const [gift, setGift] = useState({ username: "", userId: "", xp: 0 });
  const points = my_user.xp;
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setGift({ username: "", userId: "", xp: 0 });
    setShow(false);
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
  const locationSearch = location.search.split("=")[1];
  useEffect(() => {
    if (location.search) {
      console.log(location.search);
      const filteredUsers = followedUsers.filter(
        (user) => user._id === locationSearch
      );
      setUsersToShow(filteredUsers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  return (
    <>
      <FindTeam history={history} search={search} setSearch={setSearch} />
      <Row className='following-page p-1'>
        {usersToShow?.length < 1 && <p>NO FOLLOWED USERS!</p>}
        {usersToShow?.map((u, i) => (
          <div key={i} className='following-page__profile-card col-3 m-1'>
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
            <div>{u.bio}</div>
            <div>
              {u.admin && (
                <span style={{ color: "gold" }}>
                  <ICOCROWN />
                </span>
              )}
              {u.admin ? "Team Admin" : getUserRole(u.level)}{" "}
            </div>
            {u.admin ? (
              <ContactAdminButton
                value={`${u._id} ${u.username}`}
                handleClick={sendGift}
              />
            ) : (
              <SendGiftButton
                value={`${u._id} ${u.username}`}
                handleClick={sendGift}
              />
            )}

            {points! < 100 ? (
              <Modal show={show} onHide={handleClose}>
                {u.admin ? (
                  <Modal.Header>Send message to {gift.username}</Modal.Header>
                ) : (
                  <>
                    <Modal.Header>
                      <Modal.Title>You have {points} Bamboo Points</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      You need a minimum of 100 Bamboo Points before you can
                      send {gift.username} a gift. Come back later after
                      completing some tasks!
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
                )}
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
                  <>
                    <div className='red'>NEEDS TO BE DONE</div>
                  </>
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
                    <Button variant='primary' onClick={handleClose}>
                      Yes, send
                    </Button>
                    <Button variant='secondary' onClick={handleClose}>
                      No, go back
                    </Button>
                  </Modal.Footer>
                )}
              </Modal>
            )}
          </div>
        ))}
      </Row>
    </>
  );
};