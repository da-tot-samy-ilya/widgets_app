import "./styles.scss";
import remove from "../../static/remove.png";

interface Props {
  onClick: () => void;
}

export const Remove = ({ onClick }: Props) => {
  return (
    <div onClick={onClick} className="icon__remove">
      <img src={remove} alt="" />
    </div>
  );
};
