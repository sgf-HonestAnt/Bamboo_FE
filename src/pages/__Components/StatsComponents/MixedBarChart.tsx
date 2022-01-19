import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { categoryTaskInt } from "../../../typings/interfaces";

type MixedBarChartProps = {
  data: categoryTaskInt[];
  stat: string;
  height?: number;
  width?: number;
  marginTop?: number;
  marginRight?: number;
  marginLeft?: number;
  marginBottom?: number;
};

export default function MixedBarChart(props: MixedBarChartProps) {
  const {
    data,
    width,
    height,
    marginTop,
    marginRight,
    marginLeft,
    marginBottom,
  } = props;
  return (
    <BarChart
      width={width || 350}
      height={height || 350}
      data={data}
      margin={{
        top: marginTop || 0,
        right: marginRight || 0,
        left: marginLeft || 0,
        bottom: marginBottom || 0,
      }}
      className='m-auto'>
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
