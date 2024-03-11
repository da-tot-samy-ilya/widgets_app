import { configureStore } from "@reduxjs/toolkit";
import { widgetSlice } from "../entities/widgetsPanel/model/slice.ts";
import { modalSliceReducer } from "../shared/ui/Modal/model/slice.ts";

function makeStore() {
  return configureStore({
    reducer: {
      widgetsPanelSlice: widgetSlice,
      modalSlice: modalSliceReducer,
    },
  });
}

export const appStore = makeStore();

export type RootState = ReturnType<typeof appStore.getState>;

export type AppDispatch = typeof appStore.dispatch;
