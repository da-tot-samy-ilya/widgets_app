import { EWidgetType } from "../../../entities/widget/model/types.ts";
import { Clock } from "../../../widgets/clock";

export const enumToWidget = (widget: EWidgetType) => {
  switch (widget) {
    case EWidgetType.CLOCK:
      return <Clock />;
  }
};
