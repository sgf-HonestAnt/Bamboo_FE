import { PieChart, Pie, Cell } from "recharts";
import { genericTaskInt } from "../../../typings/interfaces";

type PieChartWithPaddingAngleProps = {
  data: genericTaskInt[];
  colors: string[];
  deg360: boolean;
  stat: string;
  width?: number;
  height?: number;
  cx?: number;
  cy?: number;
  innerRadius?: number;
  outerRadius?: number;
};

export default function PieChartWithPaddingAngle(
  props: PieChartWithPaddingAngleProps
) {
  const { data, colors, deg360, width, height, cx, cy, innerRadius, outerRadius } =
    props;
  return (
    <PieChart
      width={width || 350}
      height={height || 350}
      style={{ margin: "auto" }}>
      {deg360 ? (
        <Pie
          data={data}
          cx={cx||100}
          cy={cy||100}
          innerRadius={innerRadius||60}
          outerRadius={outerRadius||80}
          fill='#8884d8'
          paddingAngle={5}
          dataKey='total'>
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      ) : (
        <Pie
          data={data}
          cx={100}
          cy={100}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          fill='#8884d8'
          paddingAngle={5}
          dataKey='total'>
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      )}
    </PieChart>
  );
}
