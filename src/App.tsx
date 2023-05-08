import { useEffect, useState } from "react";
import "./App.css";
import { TaskItem } from "./components/task-item/TaskItem";
import { Task } from "./models/task";
import { TaskInput } from "./components/task-input/TaskInput";

const storagedTasks = localStorage.getItem("tasks");
const initialTasks = storagedTasks ? JSON.parse(storagedTasks) : [];

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [taskName, setTaskName] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskName: string) => {
    const updatedTasks = [
      { name: taskName, id: `${new Date().getTime()}` },
      ...tasks,
    ];
    setTasks(updatedTasks);
  };

  const handleRemove = (task: Task) => {
    const updatedTasks = tasks.filter((item) => item.id !== task.id);
    setTasks(updatedTasks);
  };

  const toggleCompleted = (task: Task, completed: boolean) => {
    const updatedTasks = tasks.map((taskItem) =>
      taskItem.id === task.id ? { ...task, completed } : taskItem
    );
    setTasks(updatedTasks);
  };

  function dragstart_handler(ev: React.DragEvent<HTMLDivElement>) {
    (ev.target as HTMLElement).style.opacity = "0.2";
    (ev.target as HTMLElement).classList.add("grabbing");
    ev.dataTransfer.effectAllowed = "copyMove";

    //(ev.target as HTMLElement).style.cursor = 'grab';
    ev.dataTransfer?.setData("text/plain", (ev.target as HTMLElement).id);
    ev.dataTransfer.dropEffect = "copy";
  }

  function dragend_handler(ev: React.DragEvent<HTMLDivElement>) {
    (ev.target as HTMLElement).style.opacity = "1";
  }

  function dragover_handler(ev: any) {
    ev.preventDefault();
  }

  function drop_handler(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text/plain");
    const draggedElem = document.getElementById(data) as HTMLElement;
    (ev.target as HTMLElement).appendChild(draggedElem);
  }

  return (
    <div className="App">
      <h3>Focus on:</h3>
      <div
        className="TaskList"
        onDrop={drop_handler}
        onDragOver={dragover_handler}
      >
        Drop tasks here
      </div>

      <h3>To Do Tasks </h3>

      <div className="TaskList">
        <TaskInput onAdd={(name) => addTask(name)}></TaskInput>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleComplete={(completed) => toggleCompleted(task, completed)}
            onRemove={() => handleRemove(task)}
            onDragStart={dragstart_handler}
            onDragEnd={dragend_handler}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
