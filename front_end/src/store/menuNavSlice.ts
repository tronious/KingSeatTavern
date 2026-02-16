import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type MenuNavState = {
    jumpTo: string;
};

const initialState: MenuNavState = {
    jumpTo: ""
}

const menuNavSlice = createSlice({
    name: "menuNav",
    initialState,
    reducers: {
        setJumpTo(state, action: PayloadAction<string>) {
            state.jumpTo = action.payload;
        },
        clearJumpTo(state) {
            state.jumpTo = "";
        }
    }
});

export const { setJumpTo, clearJumpTo } = menuNavSlice.actions;
export default menuNavSlice.reducer;