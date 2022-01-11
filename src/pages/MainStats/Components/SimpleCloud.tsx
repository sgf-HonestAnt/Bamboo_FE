import { TagCloud } from "react-tagcloud";

export default function SimpleCloud(props: any) {
  const { data } = props;
  return (
    <TagCloud
      minSize={14}
      maxSize={50}
      tags={data}
      onClick={(tag: { value: string }) => alert(`'${tag.value}' was selected!`)}
    />
  );
}
