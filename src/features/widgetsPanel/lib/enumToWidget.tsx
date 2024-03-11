import { EWidgetType } from "../../../entities/widget/model/types.ts";
import { Clock } from "../../../widgets/clock";
import { WidgetComponent } from "../model/types.ts";

export const enumToWidget = (widget: EWidgetType): WidgetComponent => {
  switch (widget) {
    case EWidgetType.CLOCK:
      return Clock;
    default:
      return Clock;
  }
};
