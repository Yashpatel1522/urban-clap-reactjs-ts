import { Link, useNavigate } from "react-router-dom";
interface menuT {
  link: string;
  name: string;
  icon_classes?: string;
}
const Sidebarnavlist = (props: { item: menuT }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{ cursor: "pointer" }}
      className="div d-flex gap-5 p-2"
      onClick={() => {
        navigate(props.item.link);
      }}
    >
      <i className={props.item?.icon_classes}></i>
      <div className="mt-1 text-white link-offset-2 link-underline link-underline-opacity-0">
        {props.item.name}
      </div>
    </div>
  );
};

export default Sidebarnavlist;
