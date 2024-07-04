import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "./feature/error";

const rootReducer = {
    error: errorReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
