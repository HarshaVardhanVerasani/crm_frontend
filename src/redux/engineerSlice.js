import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "engineer slice",
  initialState: {
    data: [],
  },
  reducers: {
    loadEngineerData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default customerSlice.reducer;
export const { loadEngineerData } = customerSlice.actions;
