import { Image } from "react-bootstrap";
import { BAMBOO } from "../../utils/const/ico";

type BambooLogoProps = {
  isAdmin: boolean;
};
export default function BambooLogo(props: BambooLogoProps) {
  const { isAdmin } = props;
  return (
    <div className='bamboo-logo'>
      <Image fluid src={BAMBOO} width='50%' />
      {!isAdmin && <h3>Bamboo</h3>}
    </div>
  );
}
