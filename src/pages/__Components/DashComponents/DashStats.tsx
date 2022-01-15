import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { useAppSelector } from "../../../redux/hooks";
import { genericTaskInt, reduxStateInt } from "../../../typings/interfaces";
import { STATUS_COLORS } from "../../../utils/const/str";
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
  const { awaited, in_progress, completed } = currentTasks;
  const allTasks = awaited.concat(in_progress, completed);
  const isBigScreen = useMediaQuery({ query: "(min-width: 1660px)" });
  const [allByStatus, setAllByStatus] = useState<genericTaskInt[]>([]);
  const mapData = async () => {
    const allByStatus = await mapByStatus(currentTasks);
    setAllByStatus(allByStatus);
  };
  useEffect(() => {
    mapData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className={`bamboo-card dashboard__dash-stats ${isBigScreen && "my-3"}`}>
      <Row>
        <Col sm={12}>
          <PieChartWithPaddingAngle
            deg360={true}
            data={allByStatus}
            colors={STATUS_COLORS}
            stat='status'
            innerRadius={20}
            outerRadius={50}
          />
        </Col>
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
  );
}
