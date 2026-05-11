import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    age?: number;
    gender?: string;
    photoURL?: string;
    about?: string;
}

const userSlice = createSlice({
    name: "user",
    initialState: null as User | null,
    reducers: {
        addUser: (_state, action: PayloadAction<User>) => {
            return action.payload;
        },
        removeUser: () => {
            return null;
        },
    },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;