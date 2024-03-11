import { getCurrTime } from "./utils/time.ts";
import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import "./style.scss";
import { WidgetComponent } from "../../features/widgetsPanel/model/types.ts";
import { useAppDispatch } from "../../app/hooks.ts";
import { WIDGET_ACTIONS } from "../../entities/widgetsPanel/model/slice.ts";
import { EWidgetType } from "../../entities/widget/model/types.ts";
import { Remove } from "../../shared/ui/Remove";

export const Clock: WidgetComponent = ({ widgetId, columnId }) => {
  const initTime = getCurrTime();
  const dispatch = useAppDispatch();

  const [time, setTime] = useState<dayjs.Dayjs>(initTime);

  useEffect(() => {
    setTimeout(() => {
      const seconds = time.second();
      setTime(time.second(seconds + 1));
    }, 1000);
  }, [time]);

  const removeWidget = useCallback(() => {
    dispatch(
      WIDGET_ACTIONS.removeWidget({
        columnId: columnId,
        widget: { id: widgetId, type: EWidgetType.CLOCK },
      }),
    );
  }, []);

  return (
    <div className="clock__container">
      <div className="clock__data">
        <div className="clock__time">{time.format("HH:mm:ss")}</div>
        <div className="clock__date">{time.format("D of MMMM")}</div>
      </div>
      <div className="clock__manage">
        <Remove onClick={removeWidget} />
      </div>
    </div>
  );
};
