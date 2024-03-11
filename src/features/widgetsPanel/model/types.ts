import { FC } from "react";

interface WidgetProps {
  widgetId: string;
  columnId: number;
}

export type WidgetComponent = FC<WidgetProps>;
