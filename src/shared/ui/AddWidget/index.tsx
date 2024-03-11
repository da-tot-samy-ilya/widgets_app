import "./style.scss";
import img from "./img/plus.png";
import { useCallback } from "react";
import { useAppDispatch } from "../../../app/hooks.ts";
import { MODAL_ACTIONS } from "../Modal/model/slice.ts";
import { WIDGET_ACTIONS } from "../../../entities/widgetsPanel/model/slice.ts";

interface Props {
  currColumn: number;
}

export const AddWidget = ({ currColumn }: Props) => {
  const dispatch = useAppDispatch();

  const addWidget = useCallback(() => {
    dispatch(MODAL_ACTIONS.show());
    dispatch(WIDGET_ACTIONS.setCurrentColumn(currColumn));
  }, []);

  return (
    <div onClick={addWidget} className="column__add">
      <img className="add_widget" src={img} alt="" />
    </div>
  );
};
