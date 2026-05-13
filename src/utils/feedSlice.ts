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
        removeUserFromFeed: (_state, action: PayloadAction<string>) => {
            if(!_state) return _state;
            return _state.filter((f: User) => f._id !== action.payload)
        },
    },
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;