import React from "react";
import { Task } from "@/types/task";

import { useAppSelector } from "store/hooks";

const TaskDetail = () => {
  const task: Task | null = useAppSelector((state) => state.tasks?.taskDetail);

  return (
    <div>
      {Object.keys(task || {}).length ? (
        <>
          <div>
            <h3>{task?.title} </h3>

            <p> {task?.description}</p>
          </div>
          <div className="flex ">
            <h5 className="self-center">
              Status: <b>{task?.status}</b>
            </h5>
          </div>
        </>
      ) : (
        <span> Select a task</span>
      )}
    </div>
  );
};

export default TaskDetail;
