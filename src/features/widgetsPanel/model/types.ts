import { DragEventHandler, FC } from "react";

interface WidgetProps {
  widgetId: string;
  columnId: number;

  onDragOver: DragEventHandler<HTMLDivElement>;
  onDragLeave: DragEventHandler<HTMLDivElement>;
  onDragStart: DragEventHandler<HTMLDivElement>;
  onDragEnd: DragEventHandler<HTMLDivElement>;
  onDrop: DragEventHandler<HTMLDivElement>;
}

export type WidgetComponent = FC<WidgetProps>;
