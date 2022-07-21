import React, { useState } from "react";
import classNames from "classnames";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import { useAppSelector } from "store/hooks";

const Layout = (props: { children: any }) => {
  const { children } = props;

  const { darkMode } = useAppSelector((state) => state.auth);

  const colorScheme: ColorScheme = darkMode ? "dark" : "light";

  return (
    <main
      className={classNames({
        dark: darkMode,
      })}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider>
          <div className="min-h-screen max-h-screen bg-slate-50 dark:bg-gray-800 scroll-smooth">
            <div className="container  mx-auto ">{children}</div>
          </div>
        </NotificationsProvider>
      </MantineProvider>
    </main>
  );
};

export default Layout;
