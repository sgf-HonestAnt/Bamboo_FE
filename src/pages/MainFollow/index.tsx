import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { reduxStateInt } from "../../typings/interfaces";
import { Row, Card, Button, Modal } from "react-bootstrap";
import {
  LinkButton,
  SendGiftButton,
} from "../../pages__SharedComponents/Buttons";
import ProfileBadge from "../../pages__SharedComponents/ProfileBadge";
import BambooPoints from "../../pages__SharedComponents/XP";
import { getUserRole } from "../../utils/f_users";
import "./styles.css";

type FollowingPageProps = {};
const FollowingPage = (props: FollowingPageProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { my_user, followedUsers } = state.currentUser;
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
  return (
    <Row className='following-page p-1'>
      {followedUsers?.length < 1 && <p>NO FOLLOWED USERS!</p>}
      {followedUsers?.map((u, i) => (
        <div key={i} className='following-page__profile-card col-3 m-1'>
          <ProfileBadge
            isMine={false}
            avatar={u.avatar}
            level={u.level}
            total_completed={u.total_completed}
            total_awaited={u.total_awaited}
            total_in_progress={u.total_in_progress}
          />
          {/* <Card.Img variant='top' src={u.avatar} className="following-page__profile-card__avatar"/> */}
          <Card.Title>{u.username}</Card.Title>
          <div>{u.bio}</div>
          <div>{getUserRole(u.level)}</div>
          <SendGiftButton
            value={`${u._id} ${u.username}`}
            handleClick={sendGift}
          />
          {points! < 100 ? (
            <Modal show={show} onHide={handleClose}>
              <Modal.Header>
                <Modal.Title>You have {points} Bamboo Points</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                You need a minimum of 100 Bamboo Points before you can send{" "}
                {gift.username} a gift. Come back later after completing some
                tasks!
              </Modal.Body>
              <Modal.Footer>
                {/* <Button variant='primary' onClick={handleDelete}>
                Yes, delete my account
              </Button> */}
                <Button variant='secondary' onClick={handleClose}>
                  Go back
                </Button>
              </Modal.Footer>
            </Modal>
          ) : (
            <Modal show={show} onHide={handleClose}>
              <Modal.Header> {/* 🔨 FIX NEEDED: implement gift-giving feature! */}
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
                  How many will <BambooPoints /> Bamboo Points will you give to{" "}
                  <strong>{gift.username}</strong>?
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
  );
};

export default FollowingPage;
