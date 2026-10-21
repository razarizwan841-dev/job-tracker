import { Outlet } from "react-router";
import Navbar from "./navbar";

import React from "react";

function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
