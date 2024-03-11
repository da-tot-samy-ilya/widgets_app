import "./style.scss";
import { createPortal } from "react-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { EWidgetType } from "../../../entities/widget/model/types.ts";
import { useCallback } from "react";
import { MODAL_ACTIONS } from "./model/slice.ts";
import { WIDGET_ACTIONS } from "../../../entities/widgetsPanel/model/slice.ts";
import { selectCurrentColumn } from "../../../entities/widgetsPanel/model/selectors.ts";

export const WidgetsModal = () => {
  const currColumn = useAppSelector(selectCurrentColumn);
  const dispatch = useAppDispatch();

  const addWidget = useCallback((widgetType: string) => {
    console.log(currColumn);
    dispatch(
      WIDGET_ACTIONS.addWidget({
        columnId: currColumn,
        widget: {
          id: String(Date.now()),
          type: EWidgetType[widgetType as keyof typeof EWidgetType],
        },
      }),
    );
    dispatch(MODAL_ACTIONS.hide());
  }, []);

  const closeModal = useCallback(() => {
    dispatch(MODAL_ACTIONS.hide());
  }, []);

  return createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <h1>Choose widget</h1>
        <ul>
          {Object.keys(EWidgetType).map((widgetType) => (
            <div key={widgetType} onClick={() => addWidget(widgetType)}>
              {widgetType}
            </div>
          ))}
        </ul>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>,
    document.body,
  );
};