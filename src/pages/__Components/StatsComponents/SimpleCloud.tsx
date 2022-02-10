import { TagCloud } from "react-tagcloud";

export default function SimpleCloud(props: any) {
  const { history, data } = props;
  function viewCategory(tag: { value: string }) {
    history.push(`/tasks?category=${tag.value}`);
  }
  return (
    <>
      <TagCloud
        minSize={14}
        maxSize={30}
        tags={data}
        onClick={(tag: { value: string }) => viewCategory(tag)}
        className='tagcloud'
      />
    </>
  );
}
