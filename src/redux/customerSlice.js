import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customer slice",
  initialState: {
    data: [],
  },
  reducers: {
    loadCustomerData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default customerSlice.reducer;
export const { loadCustomerData } = customerSlice.actions;

