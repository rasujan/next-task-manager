import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { isArray } from "lodash";

import Layout from "@/components/organism/layout/Layout";
import { Header } from "@/components/organism/header";
import { TaskTile } from "@/components/molecules";

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

  useQuery("Task", handleFetchTasks);

  const { tasks: taskList }: { tasks: Array<Task> } = useAppSelector(
    (state) => state.tasks
  );

  return (
    <Layout>
      <Header />
      <div className="flex justify-center">
        <React.Fragment>
          {isArray(taskList) && (
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="show"
              className="card"
            >
              {taskList.map((task) => (
                <motion.div
                  variants={tileVariants}
                  key={task.id}
                  whileHover={{ scale: 1.02 }}
                >
                  <TaskTile task={task} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </React.Fragment>
      </div>
    </Layout>
  );
};

export default TaskPage;
