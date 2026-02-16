import { configureStore } from "@reduxjs/toolkit";
import menuNavReducer from "../store/menuNavSlice";

export const store = configureStore({
    reducer: {
        menuNav: menuNavReducer
    }
});

// Helpful types for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;