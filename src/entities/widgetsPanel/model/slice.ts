import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Column } from "../../column/model/types.ts";
import { Widget } from "../../widget/model/types.ts";

interface WidgetsPanelState {
  columns: Column[];
  currentColumn: number;
}

const initialState: WidgetsPanelState = {
  columns: [{ widgets: [] }, { widgets: [] }, { widgets: [] }],
  currentColumn: 1,
};
export const widgetsPanelSlice = createSlice({
  name: "widgetsPanel",
  initialState,
  reducers: {
    addWidget: (
      state,
      { payload }: PayloadAction<{ columnId: number; widget: Widget }>,
    ) => {
      state.columns = state.columns.map((column, i) => {
        if (i === payload.columnId) {
          column.widgets.push(payload.widget);
        }

        return column;
      });
    },
    removeWidget: (
      state,
      { payload }: PayloadAction<{ columnId: number; widget: Widget }>,
    ) => {
      state.columns = state.columns.map((column, i) => {
        if (i === payload.columnId) {
          column.widgets = column.widgets.filter((widget) => {
            return widget.id !== payload.widget.id;
          });
        }

        return column;
      });
    },
    setCurrentColumn: (state, { payload }: PayloadAction<number>) => {
      state.currentColumn = payload;
    },
  },
});

export const WIDGET_ACTIONS = widgetsPanelSlice.actions;

export const widgetSlice = widgetsPanelSlice.reducer;
