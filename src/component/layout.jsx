import { Outlet } from "react-router";
import Navbar from "./navbar";

import React from "react";

function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout__content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;