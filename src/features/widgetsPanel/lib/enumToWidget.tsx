import { EWidgetType } from "../../../entities/widget/model/types.ts";
import { Clock } from "../../../widgets/clock";
import { WidgetComponent } from "../model/types.ts";
import { Currencies } from "../../../widgets/currencies";

export const enumToWidget = (widget: EWidgetType): WidgetComponent => {
  switch (widget) {
    case EWidgetType.CLOCK:
      return Clock;
    case EWidgetType.CURRENCIES:
      return Currencies;
    default:
      return Clock;
  }
};
