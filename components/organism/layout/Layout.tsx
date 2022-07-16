import React from "react";
import classNames from "classnames";

import { useAppSelector } from "store/hooks";

const Layout = (props: { children: any }) => {
  const { children } = props;

  const { darkMode } = useAppSelector((state) => state.auth);

  return (
    <main
      className={classNames({
        dark: darkMode,
      })}
    >
      <div className="min-h-screen max-h-screen bg-slate-50 dark:bg-slate-800 scroll-smooth">
        <div className="container  mx-auto ">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
