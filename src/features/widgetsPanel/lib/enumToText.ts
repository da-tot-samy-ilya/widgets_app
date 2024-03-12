import { EWidgetType } from "../../../entities/widget/model/types.ts";

export const enumToText = (widget: EWidgetType) => {
  switch (widget) {
    case EWidgetType.CLOCK:
      return "Часы";
    case EWidgetType.CURRENCIES:
      return "Курсы валют";
    case EWidgetType.WEATHER:
      return "Погода в городах";
    default:
      return "Часы";
  }
};
