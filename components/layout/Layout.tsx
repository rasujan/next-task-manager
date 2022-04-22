import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Cookies from "js-cookie";

const Layout = (props: { children: any }) => {
  const { children } = props;

  return (
    <main
      className={classNames({
        dark: Cookies.get("darkMode") === "true",
      })}
    >
      <div className="min-h-screen bg-slate-50 dark:bg-slate-800">
        {children}
      </div>
    </main>
  );
};

export default Layout;
