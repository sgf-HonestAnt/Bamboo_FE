import { Image } from "react-bootstrap";
import Bamboo1 from "../../media/Bamboo1.svg";

type BambooLogoProps = {
  isAdmin: boolean;
};
export default function BambooLogo(props: BambooLogoProps) {
  // const { isAdmin } = props;
  return (
    <div className='bamboo-logo'>
      <Image fluid src={Bamboo1} width='70%' />
      {/* {!isAdmin && <h3>Bamboo</h3>} */}
    </div>
  );
}
