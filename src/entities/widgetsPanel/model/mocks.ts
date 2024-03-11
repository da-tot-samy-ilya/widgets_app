import { EWidgetType, Widget } from "../../widget/model/types.ts";
import { Column } from "../../column/model/types.ts";

export const widgetMock: Widget = {
  type: EWidgetType.CURRENCIES,
  id: "1",
};

export const widgetsMock: Widget[] = [
  {
    type: EWidgetType.CURRENCIES,
    id: "1",
  },
  {
    type: EWidgetType.CLOCK,
    id: "2",
  },
];

export const columnMock: Column = {
  widgets: widgetsMock,
};
