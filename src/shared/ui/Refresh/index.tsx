import img from "./../../static/refresh.png";
import "./style.scss";
interface Props {
  onClick: () => void;
}
export const Refresh = ({ onClick }: Props) => {
  return <img onClick={onClick} className="refresh" src={img} alt="" />;
};
