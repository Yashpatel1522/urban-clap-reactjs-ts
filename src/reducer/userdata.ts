import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  credentials: null,
};

export const credentialsSlice = createSlice({
  name: "creads",
  initialState,

  reducers: {
    addCredentials: (state: { credentials: unknown }, action) => {
      state.credentials = { ...action.payload };
    },
    removeCredentials: (state: { credentials: unknown }, action) => {
      state.credentials = action.payload;
    },
  },
});

export const { addCredentials, removeCredentials } = credentialsSlice.actions;
export default credentialsSlice.reducer;
