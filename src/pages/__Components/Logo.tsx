import { Image } from "react-bootstrap";
import { BAMBOO } from "../../utils/const/ico";

export default function BambooLogo() {
  return (
    <div className="bamboo-logo">
      <Image fluid src={BAMBOO} />
      <h3>Bamboo</h3> 
    </div>
  );
}
