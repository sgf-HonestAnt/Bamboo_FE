import { PieChart, Pie, Cell } from "recharts";
import { genericTaskInt } from "../../../typings/interfaces";
import { STATUS_COLORS } from "../../../utils/const/arr";

type PieChartWithPaddingAngleProps = {
  data: genericTaskInt[];
  deg360: boolean;
  stat: string;
  width?: number;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
};

export default function PieChartWithPaddingAngle(
  props: PieChartWithPaddingAngleProps
) {
  const { data, deg360, width, height, innerRadius, outerRadius } =
    props;
  return (
    <PieChart
      width={width || 200}
      height={height || 200}
      style={{ margin: "auto" }}>
      {deg360 ? (
        <Pie
          data={data}
          cx='50%'
          cy='50%'
          innerRadius={innerRadius || "30%"}
          outerRadius={outerRadius || "100%"}
          fill='#8884d8'
          paddingAngle={5}
          dataKey='total'>
          {data.map((entry: any, index: number) => (
            <Cell
              key={`cell-${index}`}
              fill={STATUS_COLORS[index % STATUS_COLORS.length]}
            />
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
            <Cell
              key={`cell-${index}`}
              fill={STATUS_COLORS[index % STATUS_COLORS.length]}
            />
          ))}
        </Pie>
      )}
    </PieChart>
  );
}
