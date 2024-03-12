import "./style.scss";
import { createPortal } from "react-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { EWidgetType } from "../../../entities/widget/model/types.ts";
import { useCallback } from "react";
import { MODAL_ACTIONS } from "./model/slice.ts";
import { WIDGET_ACTIONS } from "../../../entities/widgetsPanel/model/slice.ts";
import { selectCurrentColumn } from "../../../entities/widgetsPanel/model/selectors.ts";
import { enumToText } from "../../../features/widgetsPanel/lib/enumToText.ts";

export const WidgetsModal = () => {
  const currColumn = useAppSelector(selectCurrentColumn);
  const dispatch = useAppDispatch();

  const addWidget = useCallback((widgetType: string) => {
    const id = Date.now();

    dispatch(
      WIDGET_ACTIONS.addWidget({
        columnId: currColumn,
        widget: {
          id: String(id),
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
        <h1>Выберите виджет</h1>
        <ul className="modal__widgets-list">
          {Object.keys(EWidgetType).map((widgetType) => {
            const item = enumToText(
              EWidgetType[widgetType as keyof typeof EWidgetType],
            );
            return (
              <div
                className="modal__widget"
                onClick={() => addWidget(widgetType)}
              >
                <p key={widgetType}>{item.name}</p>
                <img src={item.img} alt="" />
              </div>
            );
          })}
        </ul>
        <button className="modal__close" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>,
    document.body,
  );
};
