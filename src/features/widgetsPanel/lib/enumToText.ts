import { EWidgetType } from "../../../entities/widget/model/types.ts";
import currenciesImg from "./../static/currencies.png";
import weatherImg from "./../static/weather.png";
import clockImg from "./../static/clock.png";
export const enumToText = (widget: EWidgetType) => {
  switch (widget) {
    case EWidgetType.CLOCK:
      return { name: "Часы", img: clockImg };
    case EWidgetType.CURRENCIES:
      return { name: "Курсы валют", img: currenciesImg };
    case EWidgetType.WEATHER:
      return { name: "Погода в городах", img: weatherImg };
    default:
      return { name: "Погода в городах", img: weatherImg };
  }
};
