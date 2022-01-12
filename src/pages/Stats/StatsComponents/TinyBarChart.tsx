import { BarChart, Bar } from "recharts";
import { genericTaskInt } from "../../../typings/interfaces";

type TinyBarChartProps = {
  data: genericTaskInt[];
  stat: string;
};

export default function TinyBarChart(props: TinyBarChartProps) {
  const { data } = props;
  return (
    <BarChart width={350} height={350} data={data}>
      <Bar dataKey='value' fill='#8884d8' />
    </BarChart>
  );
}
