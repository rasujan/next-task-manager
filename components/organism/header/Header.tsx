import React from "react";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { setTheme, toggleTheme } from "pages/auth/actions";
import { useAppDispatch, useAppSelector } from "store/hooks";

import { Switch } from "@mantine/core";

const Header = () => {
  const dispatch = useAppDispatch();

  dispatch({ type: setTheme, payload: Cookies.get("darkMode") === "true" });

  const { darkMode: isDark } = useAppSelector((state) => state.auth);

  const titleVariants = {
    hidden: { opacity: 0, x: "-50vh" },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        duration: 2,
        bounce: 0.5,
      },
    },
  };

  const handleToggleTheme = () => {
    dispatch({ type: toggleTheme });
    if (Cookies.get("darkMode") === "false") {
      Cookies.set("darkMode", "true");
    } else {
      Cookies.set("darkMode", "false");
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={titleVariants}
      className="px-4 py-2 mb-8 rounded-lg shadow-lg flex justify-between dark:shadow-orange-200 dark:bg-slate-900"
    >
      <span>@rasujan - Task Manager</span>

      <Switch title="Dark" checked={isDark} onChange={handleToggleTheme} />
    </motion.div>
  );
};

export default Header;
