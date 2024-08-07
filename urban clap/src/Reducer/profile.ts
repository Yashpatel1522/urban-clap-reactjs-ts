import { createSlice, nanoid } from "@reduxjs/toolkit";
import userT from "../types/userT";

const initialState = {
  user: null,
  totalQuantity: 0,
  showCart: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    addUser: (state: { user: unknown }, action) => {
      const user = {
        id: nanoid(),
        text: action.payload,
      };
      state.user = user;
    },
    updateUser: (state: { user: any }, action) => {
      state.user.text.profile.profile_photo = action.payload;
    },
    updateNotification: (state: { user: any }, action) => {
      console.log(state.user?.text?.notification);
      state.user?.text?.notification.push(action.payload);
    },
  },
});

export const { addUser, updateUser, updateNotification } = userSlice.actions;
export default userSlice.reducer;
