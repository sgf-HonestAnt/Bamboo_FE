import { Modal, Button } from "react-bootstrap";
import { LinkButton } from "../Buttons";
import BambooPoints from "../XP";

type GiftProps = { username: string; userId: string; xp: number };
type FollowModalProps = {
  points: number;
  show: any;
  handleClose: any;
  gift: GiftProps;
  setPoints: any;
  handleSubmit: any;
};
export default function FollowModal(props: FollowModalProps) {
  const { points, show, handleClose, gift, setPoints, handleSubmit } = props;
  return points! < 100 ? (
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
          <strong>{gift.username}</strong> a gift. Come back later after
          completing some tasks!
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Go back
          </Button>
        </Modal.Footer>
      </>
    </Modal>
  ) : (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        {gift.xp === 0 ? (
          <Modal.Title>You have {points} Bamboo Points To Give</Modal.Title>
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
        <div className='p-3'>
          You are about to send <strong>{gift.username}</strong> {gift.xp}
          <BambooPoints />
          Bamboo points. Continue?
        </div>
      )}
      {gift.xp === 0 ? (
        <Modal.Footer>
          <LinkButton value={10} label='10' handleClick={setPoints} />
          <LinkButton value={20} label='20' handleClick={setPoints} />
          <LinkButton value={30} label='30' handleClick={setPoints} />
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
  );
}
