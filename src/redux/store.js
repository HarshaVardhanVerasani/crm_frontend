import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./adminSlice";
import customerSlice from "./customerSlice";
import engineerSlice from "./engineerSlice";

const store = configureStore({
  reducer: {
    customerSlice,
    engineerSlice,
    adminSlice,
  },
});

export default store;
