import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { genericTaskInt } from "../../../typings/interfaces";

type SimpleBarChartProps = {
  data: genericTaskInt[];
  stat: string;
}; 

export default function SimpleBarChart(props: SimpleBarChartProps) {
  const { data } = props;
  return (
    <BarChart
      width={350}
      height={350}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='name' />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey='total' fill='#000' />
    </BarChart>
  );
}
