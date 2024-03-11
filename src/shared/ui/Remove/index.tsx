import "./styles.scss";
import remove from "../../static/remove.png";

interface Props {
  onClick: () => void;
}

export const Remove = ({ onClick }: Props) => {
  return (
    <button onClick={onClick} className="icon__remove">
      <img src={remove} alt="" />
    </button>
  );
};
