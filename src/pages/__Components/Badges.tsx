import { AWAITED, COMPLETED, IN_PROGRESS } from "../../utils/constants/str";

type BadgesProps = {
  label: string;
  variant: string;
};
const Badges = (props: BadgesProps) => {
  const { label, variant } = props;
  return (
    <span
      className={`task-badge m-1 ${
        variant === AWAITED
          ? "awaited"
          : variant === IN_PROGRESS
          ? "in-progress"
          : variant === COMPLETED
          ? "completed"
          : ""
      }`}>
      {label}
    </span>
  );
};

export default Badges;
