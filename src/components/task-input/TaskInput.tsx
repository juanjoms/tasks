import { FormEvent, useState } from "react";
import { IonAdd } from "../../Icons";
import "./TaskInput.css";
import clsx from "clsx";

type Props = {
  onAdd: (name: string) => void;
};
export const TaskInput = ({ onAdd }: Props) => {
  const [taskName, setTaskName] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleNewTask = (event: FormEvent) => {
    event.preventDefault();
    const trimmedTaskName = taskName.trim();
    if (trimmedTaskName) {
      onAdd(trimmedTaskName);
    }
    setTaskName("");
  };

  return (
    <form
      className={clsx("TaskInput task", { active: isActive })}
      onSubmit={handleNewTask}
    >
      <button>
        <IonAdd />
      </button>
      <label>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          placeholder="Add a new task..."
        />
      </label>
    </form>
  );
};
