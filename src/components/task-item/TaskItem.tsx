import clsx from "clsx";
import { IonTrash } from "../../Icons";
import { Task } from "../../models/task";
import { Checkbox } from "../checkbox/Checkbox";
import "./TaskItem.css";
type Props = {
  task: Task;
  toggleComplete: (completed: boolean) => void;
  onRemove: () => void;
  onDragStart: (ev: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: (ev: React.DragEvent<HTMLDivElement>) => void;
};
export const TaskItem = ({
  task,
  toggleComplete,
  onRemove,
  onDragStart,
  onDragEnd,
}: Props) => (
  <div
    className={clsx("TaskItem task", { completed: task.completed })}
    draggable="true"
    onDragStart={onDragStart}
    onDragEnd={onDragEnd}
    id={task.id}
  >
    <Checkbox
      id={'check' + task.id}
      checked={task.completed}
      onChange={(completed) => toggleComplete(completed)}
    />
    <div className="content">{task.name}</div>
    <button onClick={onRemove}>
      <IonTrash />
    </button>
  </div>
);
