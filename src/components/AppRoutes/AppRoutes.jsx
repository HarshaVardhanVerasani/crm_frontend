import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminPage from "../AdminPage/AdminPage";
import Authenticate from "../AuthenticationPage/Authenticate";
import CustomerPage from "../CustomerPage/CustomerPage";
import Engineer from "../EngineerPage/EngineerPage";
import PageNotFound from "../PageNotFound/PageNotFound";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/"  element={<Authenticate />} />
      <Route path="/customer" element={<CustomerPage />} />
      <Route path="/engineer" element={<Engineer />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
  );
}

export default AppRoutes;
