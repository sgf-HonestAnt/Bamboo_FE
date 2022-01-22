import { History, Location } from "history";
import { useAppSelector } from "../../../redux/hooks";
import { dataInt, reduxStateInt } from "../../../typings/interfaces";
import { Row, Col, Card } from "react-bootstrap";
import { getDayMonthYearAsString } from "../../../utils/funcs/f_dates";
import { FiCalendar } from "react-icons/fi";
// import { useMediaQuery } from "react-responsive";
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
import SimpleCloud from "../StatsComponents/SimpleCloud";
import SimpleBarChart from "../StatsComponents/SimpleBarChart";
import PieChartWithPaddingAngle from "../StatsComponents/PieChartWithPaddingAngle";
import { STATUS_COLORS } from "../../../utils/const/str";
import PieChartWithCustomizedLabel from "../StatsComponents/PieChartWithCustomizedLabel";
import CustomActiveShapePieChart from "../StatsComponents/CustomActiveShapePieChart";
import { Link } from "react-router-dom";
import DashChallCard from "./ChallengeCard";

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
  // const CATEGORY_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  // const TYPE_COLORS = ["#000", "#FFF"];
  //const timeSpecific = "overall"; // this week / last week
  useEffect(() => {
    mapData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  const dayMonthYearAsString = getDayMonthYearAsString(new Date());
  return !loading ? (
    <div className='dashboard__at-a-glance-stats m-2'>
      <Row className='dashboard__alt__card-header'>
        <Col className='m-1'>
          At A Glance | <Link to='/dash'>Tasks</Link>{" "}
          {total_xp < 1 || (awaited.length < 1 && in_progress.length < 1) ? (
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
        <Row>
          {/* <Col sm={12} className='m-0 p-0'>
            <Card className='stats-card dashboard__dash-stats'>
              <Card.Body>
                <SimpleCloud history={props.history} data={taskData.tagCloud} />
              </Card.Body>
            </Card>
          </Col> */}
          <Col sm={12} md={4} className='m-0 p-0'>
            <Card className='border-0 dashboard__dash-stats'>
              <div className='stats-card'>
                <PieChartWithPaddingAngle
                  deg360={true}
                  data={taskData.allByStatus}
                  colors={STATUS_COLORS}
                  stat='status'
                  width={200}
                  height={200}
                  innerRadius={40}
                  outerRadius={80}
                />
              </div>
              <Card.Body className='m-auto'>
                {/* <Card.Title>
                  {
                    findMostCommonStatus(
                      taskData.allByStatus,
                      allTasks.length
                    ).split("|")[0]
                  }
                </Card.Title> */}
                <Card.Text>
                  <h5>
                    {
                      findMostCommonStatus(
                        taskData.allByStatus,
                        allTasks.length
                      ).split("|")[1]
                    }
                  </h5>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={4} className='m-0 p-0'>
            <Card className='border-0 dashboard__dash-stats'>
              <div className='stats-card'>
                <PieChartWithCustomizedLabel
                  data={taskData.allByType}
                  colors={STATUS_COLORS}
                  stat='type'
                  width={200}
                  height={200}
                />
              </div>
              <Card.Body className='m-auto'>
                {/* <Card.Title>
                  {
                    findMostUsedType(taskData.allByType, allTasks.length).split(
                      "|"
                    )[0]
                  }
                </Card.Title> */}
                <Card.Text>
                  <h5>
                    {
                      findMostUsedType(
                        taskData.allByType,
                        allTasks.length
                      ).split("|")[1]
                    }
                  </h5>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={4} className='m-0 p-0'>
            <Card className='border-0 dashboard__dash-stats'>
              <div className='stats-card'>
                <CustomActiveShapePieChart
                  data={taskData.allByDueDate}
                  stat='deadline'
                  width={200}
                  height={200}
                  innerRadius={50}
                  outerRadius={80}
                />
              </div>
              <Card.Body className='m-auto'>
                {/* <Card.Title>
                    {
                      findMostUsedDeadline(
                        taskData.allByDueDate,
                        allTasks.length
                      ).split("|")[0]
                    }
                </Card.Title> */}
                <Card.Text>
                  <h5>
                    {
                      findMostUsedDeadline(
                        taskData.allByDueDate,
                        allTasks.length
                      ).split("|")[1]
                    }
                  </h5>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6} className='m-0 p-0'>
            <Card className='border-0 dashboard__dash-stats'>
              <div className='stats-card'>
                <MixedBarChart
                  data={taskData.allByCategory}
                  stat='category'
                  width={300}
                  height={200}
                />
              </div>
              <Card.Body className='m-auto'>
                {/* <Card.Title>
                  {categories.length / allTasks.length <= 0.7
                    ? "Minimalist"
                    : categories.length / allTasks.length > 0.7 &&
                      categories.length / allTasks.length < 1
                    ? "Prepper"
                    : "Accumulator"}
                </Card.Title> */}
                <Card.Text>
                  <h5>
                    You're using{" "}
                    {taskData.allByCategory.length -
                      taskData.unusedCategories.length}{" "}
                    {taskData.allByCategory.length -
                      taskData.unusedCategories.length >
                    1
                      ? "categories"
                      : "category"}{" "}
                    to organise {allTasks.length}{" "}
                    {allTasks.length > 1 ? "tasks" : "task"}.
                    {taskData.unusedCategories.length > 0 &&
                      ` You have ${taskData.unusedCategories.length} unused ${
                        taskData.unusedCategories.length > 1
                          ? "categories."
                          : "category."
                      }`}
                  </h5>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6} className='m-0 p-0'>
            <Card className='border-0 dashboard__dash-stats'>
              <div className='stats-card'>
                <SimpleBarChart
                  data={taskData.allByValue}
                  stat='value'
                  width={300}
                  height={200}
                />
              </div>
              <Card.Body className='m-auto'>
                {/* <Card.Title>
                  {
                    findMostUsedValue(
                      taskData.allByValue,
                      allTasks.length
                    ).split("|")[0]
                  }
                </Card.Title> */}
                <Card.Text>
                  <h5>
                    {
                      findMostUsedValue(
                        taskData.allByValue,
                        allTasks.length
                      ).split("|")[2]
                    }
                  </h5>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <></>
      )}
      <Row>
        <Col className='col-12 py-3'>
          <DashChallCard />
        </Col>
      </Row>
    </div>
  ) : (
    <></>
  );
}
