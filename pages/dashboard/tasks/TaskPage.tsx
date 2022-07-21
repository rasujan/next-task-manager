import React, { useState, useEffect } from "react";
import { motion, useDragControls } from "framer-motion";
import { useMutation, useQuery } from "react-query";
import { capitalize, isArray } from "lodash";
import { TaskTile } from "@/components/molecules";
import { Skeleton } from "@mantine/core";
import { NextPage } from "next";
import { orderBy } from "lodash";
import { AxiosError } from "axios";
import { showNotification } from "@mantine/notifications";

import { ConfirmationModal } from "@/components/organism/modals";
import Layout from "@/components/organism/layout/Layout";
import { Header } from "@/components/organism/header";

import { tileVariants, listVariants, cardVariants } from "./animation";
import { TASK_LIST_ACTIONS } from "./actions";
import { getRequest, postRequest } from "store/Actions";
import { useAppDispatch, useAppSelector } from "store/hooks";
import api from "constants/api";

import {
  AddTaskForm,
  AddTask,
} from "@/components/organism/forms/add-task-form";
import TaskDetail from "@/components/organism/task-detail/TaskDetail";

import { Task } from "@/types/task";

const TaskPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const appApi = new api();
  const { fetchTasks, addTask, fetchTaskDetail } = TASK_LIST_ACTIONS;

  const { tasks: taskList }: { tasks: Array<Task> | null } = useAppSelector(
    (state) => state.tasks
  );
  const [currentTask, setCurrentTask] = useState(
    orderBy(taskList, ["id"], ["desc"])[0]
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const handleOpenDeleteModal = (val) => {
    setCurrentTask(val);
    setIsDeleteModalOpen(true);
  };

  const controls = useDragControls();

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
  const { mutate: mutAddTask, isLoading } = useMutation(handleAddTask);

  const handleDeleteTask = async (taskId: number) => {
    await appApi.delete(`/tasks/${taskId}`);
  };

  const { mutate: mutDeleteTask, isLoading: deleting } = useMutation(
    handleDeleteTask,
    {
      onError: (_err: AxiosError) => {
        showNotification({
          title: "Error",
          message: capitalize(_err?.response?.data?.message),
          color: "red",
        });
      },
      onSettled: () => {
        setIsDeleteModalOpen(false);
        refetch();
      },
    }
  );

  const handleFetchTaskDetail = (id: string | number) => {
    const { url, asyncActions } = fetchTaskDetail(id);
    if (id) dispatch(getRequest(asyncActions, url));
  };

  const { refetch: refetchTaskDetail } = useQuery(
    ["fetchTaskDetail"],
    () => handleFetchTaskDetail(currentTask?.id || 0),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    refetchTaskDetail();
  }, [currentTask, refetchTaskDetail]);

  return (
    <Layout>
      <ConfirmationModal
        opened={isDeleteModalOpen}
        loading={deleting}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => mutDeleteTask(currentTask.id)}
      />
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
                      drag="x"
                      dragControls={controls}
                      dragConstraints={{
                        right: 1,
                        left: 1,
                      }}
                      dragSnapToOrigin
                      onDragEnd={() => {
                        handleOpenDeleteModal(task);
                      }}
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
          <AddTaskForm onSubmit={mutAddTask} {...{ isLoading }} />
        </motion.div>
      </section>
    </Layout>
  );
};

export default TaskPage;
