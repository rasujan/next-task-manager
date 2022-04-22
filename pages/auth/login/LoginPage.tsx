import React, { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";

import { motion } from "framer-motion";
import { LoginForm } from "@/components/forms";
import { useForm, Controller } from "react-hook-form";
import { Button, Switch } from "@mantine/core";
import Layout from "@/components/layout/Layout";

const LoginPage = () => {
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

  const cardVariants = {
    hidden: {
      scale: 0,
    },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        duration: 1,
        bounce: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (!darkMode) {
      Cookies.set("darkMode", "true");
    } else {
      Cookies.set("darkMode", "false");
    }
  }, [darkMode]);

  return (
    <Layout>
      <div className="container mx-auto ">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          className="px-4 py-2 mb-8 rounded-lg shadow-lg flex justify-between dark:shadow-orange-200 dark:bg-slate-900"
        >
          <h1>@rasujan - Task Manager</h1>

          <Switch
            title="Dark"
            checked={darkMode}
            onChange={() => setDarkMode((prev) => !prev)}
          />
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="card"
          >
            <motion.h1>
              <LoginForm />
            </motion.h1>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
