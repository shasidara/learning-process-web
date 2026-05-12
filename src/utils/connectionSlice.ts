import { createSlice } from "@reduxjs/toolkit";
import type { User } from "./types";
import type { PayloadAction } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connections",
    initialState: null as User[] | null,
    reducers: {
        addConnection: (_state, action: PayloadAction<User[]>) => {
            return action.payload;
        },
        removeConnection: () => null,
    },
});

export const { addConnection, removeConnection } = connectionSlice.actions;
export default connectionSlice.reducer;