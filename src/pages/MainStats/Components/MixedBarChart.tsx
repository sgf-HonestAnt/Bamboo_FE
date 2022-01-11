import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useAppSelector } from "../../../redux/hooks";
import { reduxStateInt } from "../../../typings/interfaces";

type MixedBarChartProps = {
  data: any;
  stat: string;
};

export default function MixedBarChart(props: MixedBarChartProps) {
  const { data, stat } = props;
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { categories } = state.currentTasks;
  return (
    <BarChart
      width={stat === "category" && categories.length > 4 ? categories.length * 75 : 300}
      height={350}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='category' />
      <YAxis />
      <Tooltip />
      <Legend />
      {/* <Bar dataKey='total' fill='#000' /> */}
      <Bar dataKey='completed' stackId='a' fill='#ffc658' />
      <Bar dataKey='awaited' stackId='a' fill='#8884d8' />
      <Bar dataKey='in_progress' stackId='a' fill='#82ca9d' />
    </BarChart>
  );
}
