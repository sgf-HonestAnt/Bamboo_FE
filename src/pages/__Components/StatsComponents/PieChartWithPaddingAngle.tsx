import { PieChart, Pie, Cell } from "recharts";
import { genericTaskInt } from "../../../typings/interfaces";

type PieChartWithPaddingAngleProps = {
  data: genericTaskInt[];
  colors: string[];
  deg360: boolean;
  stat: string;
  innerRadius?: number;
  outerRadius?: number;
};

export default function PieChartWithPaddingAngle(
  props: PieChartWithPaddingAngleProps
) {
  const { data, colors, deg360, innerRadius, outerRadius } = props;
  return (
    <PieChart
      width={
        innerRadius && outerRadius ? 2 * innerRadius + 2 * outerRadius : 350
      }
      height={
        innerRadius && outerRadius ? 2 * innerRadius + 2 * outerRadius : 350
      }
      style={{ margin: "auto" }}>
      {deg360 ? (
        <Pie
          data={data}
          cx={
            innerRadius && outerRadius
              ? (2 * innerRadius + 2 * outerRadius) / 2
              : 100
          }
          cy={
            innerRadius && outerRadius
              ? (2 * innerRadius + 2 * outerRadius) / 2
              : 100
          }
          innerRadius={innerRadius ? innerRadius : 60}
          outerRadius={outerRadius ? outerRadius : 80}
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
