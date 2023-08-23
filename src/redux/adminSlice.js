import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "admin slice",
  initialState: {
    allTickets: [],
    allUsers: [],
  },
  reducers: {
    loadAdminTickets: (state, action) => {
      state.allTickets = action.payload;
    },
    loadAdminUsers: (state, action) => {
      state.allUsers = action.payload;
    },
  },
});

export default customerSlice.reducer;
export const { loadAdminTickets, loadAdminUsers } = customerSlice.actions;
