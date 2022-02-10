import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { useAppSelector } from "../../../redux/hooks";
import { genericTaskInt, reduxStateInt } from "../../../typings/interfaces";
import {
  findMostCommonStatus,
  mapByStatus,
} from "../../../utils/funcs/f_statistics";
import PieChartWithPaddingAngle from "../StatsComponents/PieChartWithPaddingAngle";

type DashStatsProps = {};

export default function DashStats(props: DashStatsProps) {
  // const {} = props;
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { currentTasks } = state;
  const [loading, setLoading] = useState(true);
  const { total_xp, notification } = state.currentUser.my_user;
  const { awaited, in_progress, completed } = currentTasks;
  const allTasks = awaited.concat(in_progress, completed);
  const islt1660 = useMediaQuery({ query: "(max-width: 1559px)" });
  const [allByStatus, setAllByStatus] = useState<genericTaskInt[]>([]);
  const mapData = async () => {
    const allByStatus = await mapByStatus(currentTasks);
    setAllByStatus(allByStatus);
  };
  useEffect(() => {
    mapData();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTasks]);
  return !loading ? (
    <div
      className={`bamboo-card ${
        islt1660 && notification.length > 0 ? "m-1" : "m-0"
      }`}
      id='dashboard__dash-stats'>
      {" "}
      {/* ${isBigScreen && "my-3"} */}
      <Row>
        {(total_xp > 0 || awaited.length > 0 || in_progress.length > 0) && (
          <Col sm={12}>
            <PieChartWithPaddingAngle
              deg360={true}
              data={allByStatus}
              stat='status'
              width={200}
              height={200}
              innerRadius={40}
              outerRadius={80}
            />
          </Col>
        )}
        <Col sm={12}>
          <div className='dashboard__card-header'>
            {findMostCommonStatus(allByStatus, allTasks.length).split("|")[0]}
          </div>
          <div className='mb-1'>
            {findMostCommonStatus(allByStatus, allTasks.length).split("|")[1]}
          </div>
        </Col>
      </Row>
    </div>
  ) : (
    <></>
  );
}
