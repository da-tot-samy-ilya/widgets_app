import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectColumns,
  selectCurrentColumn,
  selectCurrentWidget,
} from "../../entities/widgetsPanel/model/selectors.ts";
import "./style.scss";
import { enumToWidget } from "./lib/enumToWidget.tsx";
import { AddWidget } from "../../shared/ui/AddWidget";
import { DragEvent, DragEventHandler } from "react";
import { Widget } from "../../entities/widget/model/types.ts";
import { WIDGET_ACTIONS } from "../../entities/widgetsPanel/model/slice.ts";
import { widgetMock } from "../../entities/widgetsPanel/model/mocks.ts";

export const WidgetsPanel = () => {
  const columns = useAppSelector(selectColumns);
  const dispatch = useAppDispatch();

  const currColumnId = useAppSelector(selectCurrentColumn);
  const currWidgetId = useAppSelector(selectCurrentWidget);

  const onDragEnd: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };
  const onDragLeave: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };
  const onDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };
  const onDragStart = (
    _: DragEvent<HTMLDivElement>,
    widget: Widget,
    column: number,
  ) => {
    dispatch(WIDGET_ACTIONS.setCurrentColumn(column));
    dispatch(WIDGET_ACTIONS.setCurrentWidget(widget.id));
  };
  const onDrop = (
    e: React.DragEvent<HTMLDivElement>,
    widget: Widget,
    column: number,
  ) => {
    e.preventDefault();
    if (columns[column].widgets.length <= 0) {
      return;
    }

    const currIndex = columns[currColumnId].widgets.findIndex(
      (internalWidget) => internalWidget.id === currWidgetId,
    );

    const dropindex = columns[column].widgets.findIndex(
      (internalWidget) => internalWidget.id === widget.id,
    );

    const currWidgetObject =
      columns[currColumnId].widgets.find(
        (widget) => widget.id === currWidgetId,
      ) || widgetMock;

    dispatch(
      WIDGET_ACTIONS.moveWidget({
        widgetIndexTo: dropindex,
        widgetIndexFrom: currIndex,
        columnIdTo: column,
        columnIdFrom: currColumnId,
        widget: currWidgetObject,
      }),
    );
  };

  function onDropColumn(e: React.DragEvent<HTMLDivElement>, column: number) {
    e.preventDefault();

    if (columns[column].widgets.length > 0) {
      return;
    }

    const currIndex = columns[currColumnId].widgets.findIndex(
      (internalWidget) => internalWidget.id === currWidgetId,
    );

    const currWidgetObject =
      columns[currColumnId].widgets.find(
        (widget) => widget.id === currWidgetId,
      ) || widgetMock;

    dispatch(
      WIDGET_ACTIONS.moveWidget({
        widgetIndexTo: 0,
        widgetIndexFrom: currIndex,
        columnIdTo: column,
        columnIdFrom: currColumnId,
        widget: currWidgetObject,
      }),
    );
  }

  return (
    <div className="columns">
      {columns.map((column, i) => (
        <div
          onDragOver={onDragOver}
          onDrop={(e) => onDropColumn(e, i)}
          key={i}
          className="columns_item"
        >
          {column.widgets.map((widget) => {
            const Widget = enumToWidget(widget.type);

            return (
              <div key={widget.id} className="widget">
                <Widget
                  onDragEnd={onDragEnd}
                  onDragLeave={onDragLeave}
                  onDragOver={onDragOver}
                  onDragStart={(e) => onDragStart(e, widget, i)}
                  onDrop={(e) => onDrop(e, widget, i)}
                  widgetId={widget.id}
                  columnId={i}
                />
              </div>
            );
          })}
          <AddWidget currColumn={i} />
        </div>
      ))}
    </div>
  );
};
