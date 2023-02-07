import { Task } from "../../models/task"
import './TaskItem.css';
type Props = {
  task: Task;
  onRemove: () => void
}
export const TaskItem = ({task, onRemove}: Props) => (
  <div className="TaskItem">
    <label>
      <input type="checkbox"/>
      {task.name}
    </label>
    <button onClick={onRemove}>X</button>
  </div>

)