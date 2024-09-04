import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    addUser: (state: { user: unknown }, action) => {
      state.user = { ...action.payload };
    },

    updateUser: (state: { user: unknown }, action) => {
      (
        state.user as { profile: { profile_photo: unknown } }
      ).profile.profile_photo = action.payload;
    },

    updateNotification: (state: { user: unknown }, action) => {
      (state.user as { notification: unknown[] }).notification.push(
        action.payload
      );
    },
  },
});

export const { addUser, updateUser, updateNotification } = userSlice.actions;
export default userSlice.reducer;
