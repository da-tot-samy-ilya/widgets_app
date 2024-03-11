import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Column } from "../../column/model/types.ts";
import { Widget } from "../../widget/model/types.ts";

interface WidgetsPanelState {
  columns: Column[];
  currentColumn: number;
  currentWidget: string;
}

const initialState: WidgetsPanelState = {
  columns: [{ widgets: [] }, { widgets: [] }, { widgets: [] }],
  currentColumn: 1,
  currentWidget: "",
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
    setCurrentWidget: (state, { payload }: PayloadAction<string>) => {
      state.currentWidget = payload;
    },

    moveWidget: (
      state,
      {
        payload,
      }: PayloadAction<{
        columnIdFrom: number;
        columnIdTo: number;
        widgetIndexFrom: number;
        widgetIndexTo: number;
        widget: Widget;
      }>,
    ) => {
      state.columns = state.columns.map((column, i) => {
        if (payload.columnIdFrom === i) {
          column.widgets.splice(payload.widgetIndexFrom, 1);
        }
        if (payload.columnIdTo === i) {
          column.widgets.splice(payload.widgetIndexTo, 0, payload.widget);
        }

        return column;
      });
    },
  },
});

export const WIDGET_ACTIONS = widgetsPanelSlice.actions;

export const widgetSlice = widgetsPanelSlice.reducer;
