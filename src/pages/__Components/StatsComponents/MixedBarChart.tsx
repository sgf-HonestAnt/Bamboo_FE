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
import { STATUS_COLORS } from "../../../utils/const/arr";

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
      width={width || 200}
      height={height || 400}
      data={data}
      margin={{
        top: marginTop || 30,
        right: marginRight || 50,
        left: marginLeft || 10,
        bottom: marginBottom || 30,
      }}
      className='m-auto'>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='category' />
      <YAxis />
      <Tooltip />
      <Legend />
      {/* <Bar dataKey='total' fill='#000' /> */}
      <Bar dataKey='completed' stackId='a' fill={STATUS_COLORS[0]} />
      <Bar dataKey='awaited' stackId='a' fill={STATUS_COLORS[1]} />
      <Bar dataKey='in_progress' stackId='a' fill={STATUS_COLORS[2]} />
    </BarChart>
  );
}
