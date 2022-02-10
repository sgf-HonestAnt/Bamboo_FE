import { History, Location } from "history";
import { useAppSelector } from "../../../redux/hooks";
import { dataInt, reduxStateInt } from "../../../typings/interfaces";
import { Row, Col, Card } from "react-bootstrap";
import { getDayMonthYearAsString } from "../../../utils/funcs/f_dates";
import { FiCalendar } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import {
  createDataForTagCloud,
  findMostCommonStatus,
  findMostUsedDeadline,
  findMostUsedType,
  findMostUsedValue,
  getUnusedCategories,
  mapByCategory,
  mapByDeadline,
  mapByStatus,
  mapByType,
  mapByValue,
} from "../../../utils/funcs/f_statistics";
import MixedBarChart from "../StatsComponents/MixedBarChart";
// import SimpleCloud from "../StatsComponents/SimpleCloud";
import SimpleBarChart from "../StatsComponents/SimpleBarChart";
import PieChartWithPaddingAngle from "../StatsComponents/PieChartWithPaddingAngle";
import PieChartWithCustomizedLabel from "../StatsComponents/PieChartWithCustomizedLabel";
import CustomActiveShapePieChart from "../StatsComponents/CustomActiveShapePieChart";
import { Link } from "react-router-dom";
import DashHowToCard from "./DashHowToCard";
import { ResponsiveContainer } from "recharts";
import { CUSTOM_COLORS } from "../../../utils/const/arr";

type AtAGlanceStatsProps = {
  today: string;
  history: History<unknown> | string[];
  location: Location<unknown>;
};

export default function AtAGlanceStats(props: AtAGlanceStatsProps) {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { currentTasks } = state;
  const { categories, awaited, in_progress, completed } = currentTasks;
  const { total_xp } = state.currentUser.my_user;
  const allTasks = awaited.concat(in_progress, completed);
  const [taskData, setTaskData] = useState<dataInt>({
    allByStatus: [],
    allByCategory: [],
    allByValue: [],
    allByCreatedAt: [],
    allByUpdatedAt: [],
    allByType: [],
    allByDueDate: [],
    tagCloud: [],
    unusedCategories: [],
  });
  const [loading, setLoading] = useState(true);
  const isgt1265 = useMediaQuery({ query: "(min-width: 1265px)" });
  const isLt1238 = useMediaQuery({ query: "(max-width: 1238px)" });
  const isgt850 = useMediaQuery({ query: "(min-width: 850px)" });
  const isgt756 = useMediaQuery({ query: "(min-width: 756px)" });
  const mapData = async () => {
    const allByStatus = await mapByStatus(currentTasks);
    const allByType = await mapByType(allTasks);
    const allByValue = await mapByValue(allTasks);
    const allByCategory = await mapByCategory(allTasks, categories);
    const allByDueDate = await mapByDeadline(allTasks);
    const tagCloud = await createDataForTagCloud(allByCategory);
    const unusedCategories = await getUnusedCategories(allByCategory);
    setTaskData({
      ...taskData,
      allByStatus,
      allByType,
      allByValue,
      allByCategory,
      allByDueDate,
      tagCloud,
      unusedCategories,
    });
    setLoading(false);
  };
  const statsPieCards = `m-0 p-0 ${
    isgt1265 ? "col-4" : isgt850 ? "col-4" : isgt756 ? "col-6" : "col-6"
  }`;
  const statsGraphsCards = `m-0 p-0 ${
    isgt1265 ? "col-6" : isgt850 ? "col-6" : isgt756 ? "col-12" : "col-12"
  }`;
  useEffect(() => {
    mapData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  const dayMonthYearAsString = getDayMonthYearAsString(new Date());
  return !loading ? (
    <div
      className={`dashboard__at-a-glance-stats ${isLt1238 ? "px-2" : "px-3"}`}>
      <Row className='dashboard__alt__card-header'>
        <Col className='m-1 py-2'>
          At A Glance | <Link to='/dash'>Tasks</Link>{" "}
          {total_xp < 1 ||
          (awaited.length < 1 &&
            in_progress.length < 1 &&
            completed.length < 1) ? (
            <></>
          ) : (
            <>
              | <Link to='/stats'>Stats</Link>
            </>
          )}
          <h5>
            <FiCalendar />
            &nbsp;{dayMonthYearAsString}
          </h5>
        </Col>
      </Row>
      {total_xp > 0 || awaited.length > 0 || in_progress.length > 0 ? (
        <>
          <Row>
            {/* <Col sm={12} className='m-0 p-0'>
            <Card className='stats-card dashboard__dash-stats'>
              <Card.Body>
                <SimpleCloud history={props.history} data={taskData.tagCloud} />
              </Card.Body>
            </Card>  
          </Col> */}
            <Col className={statsPieCards}>
              <Card className='border-0 dashboard__dash-stats pt-0'>
                <div className='p-0' id='stats-card'>
                  <ResponsiveContainer>
                    <PieChartWithPaddingAngle
                      deg360={true}
                      data={taskData.allByStatus}
                      stat='status'
                    />
                  </ResponsiveContainer>
                </div>
                <Card.Body className='m-auto'>
                  <h5>
                    {
                      findMostCommonStatus(
                        taskData.allByStatus,
                        allTasks.length
                      ).split("|")[1]
                    }
                  </h5>
                </Card.Body>
              </Card>
            </Col>
            <Col className={statsPieCards}>
              <Card className='border-0 dashboard__dash-stats pt-0'>
                <div className='p-0' id='stats-card'>
                  <ResponsiveContainer>
                    <PieChartWithCustomizedLabel
                      data={taskData.allByType}
                      stat='type'
                      colors={CUSTOM_COLORS}
                    />
                  </ResponsiveContainer>
                </div>
                <Card.Body className='m-auto'>
                  <h5>
                    {
                      findMostUsedType(
                        taskData.allByType,
                        allTasks.length
                      ).split("|")[1]
                    }
                  </h5>
                </Card.Body>
              </Card>
            </Col>
            <Col className={statsPieCards}>
              <Card className='border-0 dashboard__dash-stats pt-0'>
                <div className='p-0' id='stats-card'>
                  <ResponsiveContainer>
                    <CustomActiveShapePieChart
                      data={taskData.allByDueDate}
                      stat='deadline'
                    />
                  </ResponsiveContainer>
                </div>
                <Card.Body className='m-auto'>
                  <h5>
                    {
                      findMostUsedDeadline(
                        taskData.allByDueDate,
                        allTasks.length
                      ).split("|")[1]
                    }
                  </h5>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className={statsGraphsCards}>
              <Card className='border-0 dashboard__dash-stats pt-0'>
                <div className='p-0' id='stats-card'>
                  <ResponsiveContainer>
                    <MixedBarChart
                      data={taskData.allByCategory}
                      stat='category'
                    />
                  </ResponsiveContainer>
                </div>
                <Card.Body className='m-auto'>
                  <h5>
                    You're using{" "}
                    {taskData.allByCategory.length -
                      taskData.unusedCategories.length}{" "}
                    {taskData.allByCategory.length -
                      taskData.unusedCategories.length >
                    1
                      ? "active categories"
                      : "active category"}{" "}
                    to organise {allTasks.length}{" "}
                    {allTasks.length > 1 ? "tasks" : "task"}.
                    {taskData.unusedCategories.length > 0 &&
                      ` You also have ${
                        taskData.unusedCategories.length
                      } inactive ${
                        taskData.unusedCategories.length > 1
                          ? "categories."
                          : "category."
                      }`}
                  </h5>
                </Card.Body>
              </Card>
            </Col>
            <Col className={statsGraphsCards}>
              <Card className='border-0 dashboard__dash-stats pt-0'>
                <div className='p-0' id='stats-card'>
                  <ResponsiveContainer>
                    <SimpleBarChart data={taskData.allByValue} stat='value' />
                  </ResponsiveContainer>
                </div>
                <Card.Body className='m-auto'>
                  <h5>
                    {
                      findMostUsedValue(
                        taskData.allByValue,
                        allTasks.length
                      ).split("|")[2]
                    }
                  </h5>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        <Row>
          <Col className='m-1'>
            No tasks completed. Create or progress some tasks to view your stats
          </Col>
        </Row>
      )}
      <Row>
        <Col className='col-12 py-3'>
          <DashHowToCard />
        </Col>
      </Row>
    </div>
  ) : (
    <></>
  );
}
