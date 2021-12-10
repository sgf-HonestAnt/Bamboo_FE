import { AWAITED, COMPLETED, IN_PROGRESS } from "../utils/appConstants";

type BadgeProps = {
  label: string;
  variant: string;
};
const Badge = (props: BadgeProps) => {
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

export default Badge;
