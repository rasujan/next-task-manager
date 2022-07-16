import React from "react";
import { motion } from "framer-motion";
import { useMutation, useQuery } from "react-query";
import { isArray } from "lodash";
import { TaskTile } from "@/components/molecules";
import { Skeleton } from "@mantine/core";
import {orderBy} from "lodash"

import Layout from "@/components/organism/layout/Layout";
import { Header } from "@/components/organism/header";

import { tileVariants, cardVariants } from "./animation";
import { TASK_LIST_ACTIONS } from "./actions";
import { getRequest, postRequest } from "store/Actions";
import { useAppDispatch, useAppSelector } from "store/hooks";

import { Task } from "@/types/task";
import {
  AddTaskForm,
  AddTask,
} from "@/components/organism/forms/add-task-form";

const TaskPage = () => {
  const dispatch = useAppDispatch();
  const { fetchTasks, addTask } = TASK_LIST_ACTIONS;

  const handleFetchTasks = async () => {
    const { url, asyncActions } = fetchTasks();

    dispatch(getRequest(asyncActions, url));
  };

  const { isLoading: fetchingTasks, refetch } = useQuery(
    "fetchTask",
    handleFetchTasks
  );

  const { tasks: taskList }: { tasks: Array<Task> | null } = useAppSelector(
    (state) => state.tasks
  );

  const handleAddTask = async (values: AddTask) => {
    const { url, asyncActions } = addTask();
    const postData = {
      title: values?.title,
      description: values?.description,
    };

    await dispatch(postRequest(asyncActions, url, postData));
    refetch();
  };

  const { mutate, isLoading } = useMutation(handleAddTask);

  return (
    <Layout>
      <Header />

      <section className="flex items-start ">
        <div className="h-screen w-1/3">
          {fetchingTasks ? (
            <div>
              <Skeleton height={36} />
              <Skeleton height={36} mt={6} />
              <Skeleton height={36} mt={6} />
              <Skeleton height={36} mt={6} />
              <Skeleton height={36} mt={6} />
            </div>
          ) : (
            <React.Fragment>
              <h3> Tasks </h3>
              {taskList && isArray(taskList) && (
                <motion.ul
                  variants={cardVariants}
                  initial="hidden"
                  animate="show"
                  className="h-5/6 overflow-y-auto overflow-x-hidden p-4"
                >
                  {orderBy(taskList, ["id"], ['desc']).map((task) => (
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
        </div>

        <div className="card ">
          <h3> Add New Task </h3>
          <AddTaskForm onSubmit={mutate} {...{ isLoading }} />
        </div>
      </section>
    </Layout>
  );
};

export default TaskPage;
