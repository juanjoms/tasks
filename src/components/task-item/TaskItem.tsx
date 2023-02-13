import { Task } from "../../models/task";
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
    className="TaskItem"
    draggable="true"
    onDragStart={onDragStart}
    onDragEnd={onDragEnd}
    id={task.id}
  >
    <label>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={(e) => toggleComplete(e.target.checked)}
      />

      {task.name}
    </label>
    <button onClick={onRemove}>X</button>
  </div>
);
