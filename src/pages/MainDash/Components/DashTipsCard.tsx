import { ICOURGENT } from "../../../utils/appIcons";

type DashTipsCardProps = {};
const DashTipsCard = (props: DashTipsCardProps) => {
  //   const {} = props;
  return (
    <div className='dashboard__tips-card m-2'>
      <div className='dashboard__card-header'>Hints</div>
      <div className='red'><ICOURGENT/>These need to be written</div>
      <div>Some info</div>
    </div>
  );
};

export default DashTipsCard;
