import { useAppSelector } from "../../app/hooks.ts";
import { selectColumns } from "../../entities/widgetsPanel/model/selectors.ts";
import "./style.scss";
import { enumToWidget } from "./lib/enumToWidget.tsx";
import { AddWidget } from "../../shared/ui/AddWidget";
export const WidgetsPanel = () => {
  const columns = useAppSelector(selectColumns);
  return (
    <div className="columns">
      {columns.map((column, i) => (
        <div key={i} className="columns_item">
          {column.widgets.map((widget) => {
            const Widget = enumToWidget(widget.type);
            return (
              <div key={widget.id} className="widget">
                {Widget}
              </div>
            );
          })}
          <AddWidget currColumn={i} />
        </div>
      ))}
    </div>
  );
};
