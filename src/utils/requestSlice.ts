import { createSlice } from "@reduxjs/toolkit";
import type { Request } from "./types";
import type { PayloadAction } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "requests",
    initialState: null as Request[] | null,
    reducers: {
        addRequests: (_state, action: PayloadAction<Request[]>) => {
            return action.payload;
        },
          removeRequests: (state, action: PayloadAction<string>) => {
            if (!state) return state;
            return state.filter((r: Request) => r._id !== action.payload);
        },
    },
});

export const { addRequests, removeRequests } = requestSlice.actions;
export default requestSlice.reducer;