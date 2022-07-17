import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMutation, useQuery } from "react-query";
import { isArray } from "lodash";
import { TaskTile } from "@/components/molecules";
import { Skeleton } from "@mantine/core";
import { orderBy } from "lodash";

import Layout from "@/components/organism/layout/Layout";
import { Header } from "@/components/organism/header";

import { tileVariants, listVariants, cardVariants } from "./animation";
import { TASK_LIST_ACTIONS } from "./actions";
import { getRequest, postRequest } from "store/Actions";
import { useAppDispatch, useAppSelector } from "store/hooks";

import {
  AddTaskForm,
  AddTask,
} from "@/components/organism/forms/add-task-form";
import TaskDetail from "@/components/organism/task-detail/TaskDetail";

import { Task } from "@/types/task";

const TaskPage = () => {
  const dispatch = useAppDispatch();
  const { fetchTasks, addTask, fetchTaskDetail } = TASK_LIST_ACTIONS;

  const { tasks: taskList }: { tasks: Array<Task> | null } = useAppSelector(
    (state) => state.tasks
  );
  const [currentTask, setCurrentTask] = useState(
    orderBy(taskList, ["id"], ["desc"])[0]
  );

  const handleFetchTasks = async () => {
    const { url, asyncActions } = fetchTasks();

    dispatch(getRequest(asyncActions, url));
  };

  const { isLoading: fetchingTasks, refetch } = useQuery(
    "fetchTask",
    handleFetchTasks
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

  const handleFetchTaskDetail = (id: string | number) => {
    const { url, asyncActions } = fetchTaskDetail(id);

    dispatch(getRequest(asyncActions, url));
  };

  const { refetch: refetchTaskDetail } = useQuery(
    ["fetchTaskDetail"],
    () => handleFetchTaskDetail(currentTask.id),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    refetchTaskDetail();
  }, [currentTask, refetchTaskDetail]);

  return (
    <Layout>
      <Header />

      <section className="flex items-start ">
        <div className="w-full max-w-xl">
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
              {taskList && isArray(taskList) && (
                <motion.ul
                  variants={listVariants}
                  initial="hidden"
                  animate="show"
                  className="h-[80vh] overflow-y-auto overflow-x-hidden px-4"
                >
                  {orderBy(taskList, ["id"], ["desc"]).map((task) => (
                    <motion.li
                      variants={tileVariants}
                      key={task.id}
                      whileHover={{ scale: 1.02 }}
                    >
                      <TaskTile
                        task={task}
                        onClick={(val) => {
                          setCurrentTask(val);
                        }}
                      />
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </React.Fragment>
          )}
        </div>

        <motion.div
          className="card "
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <h3> Task Detail </h3>
          <TaskDetail />
        </motion.div>

        <motion.div
          className="card "
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <h3> Add New Task </h3>
          <AddTaskForm onSubmit={mutate} {...{ isLoading }} />
        </motion.div>
      </section>
    </Layout>
  );
};

export default TaskPage;
