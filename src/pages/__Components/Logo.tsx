import { Image } from "react-bootstrap";
import { BAMBOO } from "../../utils/const/ico";

type BambooLogoProps = {
  isAdmin: boolean;
};
export default function BambooLogo(props: BambooLogoProps) {
  const { isAdmin } = props;
  return (
    <div className='bamboo-logo'>
      <Image fluid src={BAMBOO} />
      {!isAdmin && <h3>Bamboo tasks</h3>}
    </div>
  );
}
