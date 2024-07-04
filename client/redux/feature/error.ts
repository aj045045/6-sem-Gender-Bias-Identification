import { createSlice } from "@reduxjs/toolkit";

interface errorState {
    type: "alert" | "" | "question" | "warning" | "success";
    setError: boolean;
    data: string;
}

const errorValue: errorState = {
    data: "",
    type: "",
    setError: false,
};

export const errorSlice = createSlice({
    name: "error",
    initialState: errorValue,
    reducers: {
        toggle_error: (state, action) => {
            state.data = action.payload.data;
            state.setError = true;
            state.type = action.payload.type;
        },
        remove_error: (state) => {
            state.data = "";
            state.setError = false;
            state.type = "";
        },
    },
});

export const { toggle_error, remove_error } = errorSlice.actions;

export default errorSlice.reducer;
