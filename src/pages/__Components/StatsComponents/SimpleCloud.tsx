import { TagCloud } from "react-tagcloud";

export default function SimpleCloud(props: any) {
  const { data } = props;
  function viewCategory(tag: { value: string }) {
    console.log(`/tasks?category=${tag.value}`);
  }
  return (
    <>
      <TagCloud
        minSize={14}
        maxSize={30}
        tags={data}
        onClick={(tag: { value: string }) => viewCategory(tag)}
      />
    </>
  );
}
