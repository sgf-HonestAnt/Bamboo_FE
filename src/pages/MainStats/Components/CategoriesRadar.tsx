import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

type CategoriesRadarProps = {
  data: any[];
};

const CategoriesRadar = (props: CategoriesRadarProps) => {
  const { data } = props;
  return (
    <RadarChart
      cx={300}
      cy={250}
      outerRadius={150}
      width={500}
      height={500}
      data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey='subject' />
      <PolarRadiusAxis />
      <Radar
        name='Mike'
        dataKey='A'
        stroke='#8884d8'
        fill='#8884d8'
        fillOpacity={0.6}
      />
    </RadarChart>
  );
};

export default CategoriesRadar;
