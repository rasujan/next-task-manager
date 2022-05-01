import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import { motion } from "framer-motion";
import { LoginForm } from "@/components/organism/forms";

import Layout from "@/components/organism/layout/Layout";
import { AUTH_ACTIONS } from "../actions";
import { postRequest } from "store/Actions";
import { loginFieldsType } from "../types";
import { useAppDispatch } from "store/hooks";
import { Header } from "@/components/organism/header";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

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

  const handleLogin = async (values: loginFieldsType) => {
    const { login } = AUTH_ACTIONS;
    const { url, asyncActions } = login();

    const postData = {
      username: values.username,
      password: values.password,
    };

    const res: object | any = await dispatch(
      postRequest(asyncActions, url, postData)
    );

    if (res.type === asyncActions.success) {
      Cookies.set("authToken", res.payload?.accessToken);
      console.log("push");
      router.push("/dashboard/tasks");
    }
  };

  return (
    <Layout>
      <Header />
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
    </Layout>
  );
};

export default LoginPage;
