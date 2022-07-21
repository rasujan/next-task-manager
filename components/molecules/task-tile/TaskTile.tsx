import React from "react";
import { Task } from "@/types/task";

interface PropType {
  task: Task;
  onClick: (any) => any;
}

const TaskTile = (props: PropType) => {
  const { task, onClick } = props;
  return (
    <div
      className="task-tile justify-between"
      aria-label="TaskTile"
      role="button"
      onClick={() => onClick(task)}
      aria-hidden
    >
      <div>
        <h3>{task.title} </h3>

        <p> {task.description}</p>
      </div>
      <div className="flex ">
        <h5 className="self-center">
          {" "}
          Status: <b>{task.status}</b>
        </h5>
      </div>
    </div>
  );
};

export default TaskTile;
