import { taskInt } from "../../typings/interfaces";
import {
  FINANCE,
  FITNESS,
  HOUSEHOLD,
  NONE,
  PETS,
  RELATIONSHIPS,
  SHOPPING,
  URGENT,
  WELLBEING,
  WORK,
} from "../../utils/appConstants";
import {
  ICOEMPTY,
  ICOFINANCE,
  ICOFIT,
  ICOHOUSE,
  ICOPETS,
  ICORELATE,
  ICOSHOP,
  ICOSTAR,
  ICOURGENT,
  ICOWELLNESS,
  ICOWORK,
} from "../../utils/appIcons";

type NonDraggableTaskProps = {
  task: taskInt | undefined;
  i: number;
};
const NonDraggableTask = (props: NonDraggableTaskProps) => {
  const { task, i } = props;
  const taskClass = "tasks-page__list-task completed"
  const icon =
    task!.category === URGENT ? (
      <ICOURGENT />
    ) : task!.category === HOUSEHOLD ? (
      <ICOHOUSE />
    ) : task!.category === SHOPPING ? (
      <ICOSHOP />
    ) : task!.category === WORK ? (
      <ICOWORK />
    ) : task!.category === RELATIONSHIPS ? (
      <ICORELATE />
    ) : task!.category === FINANCE ? (
      <ICOFINANCE />
    ) : task!.category === FITNESS ? (
      <ICOFIT />
    ) : task!.category === PETS ? (
      <ICOPETS />
    ) : task!.category === WELLBEING ? (
      <ICOWELLNESS />
    ) : task!.category === NONE ? (
      <ICOEMPTY />
    ) : (
      <ICOSTAR />
    );
  return (
    <div className={taskClass} key={i}> 
      <div>
        <div>
          {icon}
          <span className='pl-1'>
            {task!.title} ({task!.value}XP)
          </span>
        </div>
      </div>
    </div>
  );
};

export default NonDraggableTask;
