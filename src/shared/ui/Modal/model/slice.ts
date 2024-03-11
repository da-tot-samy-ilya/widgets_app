import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
};
export const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    show: (state) => {
      state.isOpen = true;
    },
    hide: (state) => {
      state.isOpen = false;
    },
  },
});

export const MODAL_ACTIONS = modalSlice.actions;

export const modalSliceReducer = modalSlice.reducer;
