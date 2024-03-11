import { RootState } from "../../../../app/store.ts";

export const selectIsOpenModal = (state: RootState) => state.modalSlice.isOpen;
