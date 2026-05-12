import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./types";

const feedSlice = createSlice({
    name: "feed",
    initialState: null as User[] | null,
    reducers: {
        addFeed: (_state, action: PayloadAction<User[]>) => {
            return action.payload;
        },
    },
});

export const { addFeed } = feedSlice.actions;
export default feedSlice.reducer;