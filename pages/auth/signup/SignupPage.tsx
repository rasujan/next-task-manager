import React, { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";

import { motion } from "framer-motion";
import { LoginForm } from "@/components/organism/forms";
import { useForm, Controller } from "react-hook-form";
import { Button, Switch } from "@mantine/core";
import moment from "moment";

import Layout from "@/components/organism/layout/Layout";
import { AUTH_ACTIONS } from "../actions";
import { postRequest } from "store/Actions";
import { loginFieldsType } from "../types";
import { useAppDispatch } from "store/hooks";
import { NextPage } from "next";

const LoginPage: NextPage = () => {
  const dispatch = useAppDispatch();

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

  const handleLogin = async (values: loginFieldsType) => {
    const { login } = AUTH_ACTIONS;
    const { url, asyncActions } = login();

    const postData = {
      username: values.username,
      password: values.password,
    };

    const res: object | any = dispatch(
      postRequest(asyncActions, url, postData)
    );

    if (res.type === asyncActions.success) {
      Cookies.set("authToken", res.payload?.accessToken);
    }
  };

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
              <LoginForm onSubmit={handleLogin} />
            </motion.h1>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
