import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { isArray } from "lodash";
import { TaskTile } from "@/components/molecules";
import { Skeleton } from "@mantine/core";

import Layout from "@/components/organism/layout/Layout";
import { Header } from "@/components/organism/header";

import { tileVariants, cardVariants } from "./animation";
import { TASK_LIST_ACTIONS } from "./actions";
import { getRequest } from "store/Actions";
import { useAppDispatch, useAppSelector } from "store/hooks";

import { Task } from "@/types/task";

const TaskPage = () => {
  const dispatch = useAppDispatch();

  const handleFetchTasks = async () => {
    const { fetchTasks } = TASK_LIST_ACTIONS;
    const { url, asyncActions } = fetchTasks();

    const res: object | any = await dispatch(getRequest(asyncActions, url));

    return res.payload;
  };

  const { isFetching } = useQuery("fetchTask", handleFetchTasks);

  const { tasks: taskList }: { tasks: Array<Task> | null } = useAppSelector(
    (state) => state.tasks
  );

  return (
    <Layout>
      <Header />

      {isFetching ? (
        <>
          <Skeleton mb="xl" />
          <Skeleton height={24} radius="xl" />
          <Skeleton height={24} mt={6} radius="xl" />
          <Skeleton height={24} mt={6} width="70%" radius="xl" />
        </>
      ) : (
        <React.Fragment>
          {taskList && isArray(taskList) && (
            <motion.ul
              className="max-w-lg"
              variants={cardVariants}
              initial="hidden"
              animate="show"
            >
              {taskList.map((task) => (
                <motion.li
                  variants={tileVariants}
                  key={task.id}
                  whileHover={{ scale: 1.02 }}
                >
                  <TaskTile task={task} />
                </motion.li>
              ))}
            </motion.ul>
          )}
        </React.Fragment>
      )}
    </Layout>
  );
};

export default TaskPage;
