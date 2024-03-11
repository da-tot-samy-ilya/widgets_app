import { RootState } from "../../../app/store.ts";

export const selectColumns = (state: RootState) =>
  state.widgetsPanelSlice.columns;

export const selectColumnById = (state: RootState, id: number) =>
  state.widgetsPanelSlice.columns[id];
export const selectCurrentColumn = (state: RootState) => {
  return state.widgetsPanelSlice.currentColumn;
};
