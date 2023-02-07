import { Task } from "../../models/task"
import './TaskItem.css';
type Props = {
  task: Task;
  toggleComplete: (completed: boolean) => void;
  onRemove: () => void;
}
export const TaskItem = ({task, toggleComplete, onRemove}: Props) => (
  <div className="TaskItem">
    <label>
      <input type="checkbox" checked={task.completed} onChange={(e) => toggleComplete(e.target.checked)} />
      {task.name}
    </label>
    <button onClick={onRemove}>X</button>
  </div>

)