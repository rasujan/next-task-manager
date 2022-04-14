import React, { useState } from "react";
import { motion } from "framer-motion";
import { LoginForm } from "@/components/forms";
import { useForm, Controller } from "react-hook-form";

import type { NextPage } from "next";

const LoginPage = (): NextPage => {
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

  return (
    <div className="container mx-auto">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={titleVariants}
        className="px-4 py-2 shadow-md"
      >
        <h1>@rasujan - Task Manager</h1>
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
  );
};

export default LoginPage;
