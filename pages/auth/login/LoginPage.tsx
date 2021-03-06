import React from "react";
import Cookies from "js-cookie";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { motion } from "framer-motion";

import { LoginForm } from "@/components/organism/forms";
import Layout from "@/components/organism/layout/Layout";
import { Header } from "@/components/organism/header";
import { postRequest } from "store/Actions";
import { useAppDispatch } from "store/hooks";
import { loginFieldsType } from "../types";
import { AUTH_ACTIONS } from "../actions";

const LoginPage: NextPage = () => {
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

  const { mutate, isLoading } = useMutation(handleLogin);

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
          <LoginForm onSubmit={mutate} {...{ isLoading }} />
        </motion.div>
      </div>
    </Layout>
  );
};

export default LoginPage;
