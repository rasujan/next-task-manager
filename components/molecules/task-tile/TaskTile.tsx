import React from "react";
import { Task } from "@/types/task";

interface PropType {
  task: Task;
}

const TaskTile = (props: PropType) => {
  const { task } = props;
  return (
    <div className="task-tile justify-between" role="button">
      <div>
        <h2>{task.title} </h2>

        <p> {task.description}</p>
      </div>
      <div className="flex ">
        <h2 className="self-center"> {task.status}</h2>
      </div>
    </div>
  );
};

export default TaskTile;
