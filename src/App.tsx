import { useEffect, useState } from 'react'
import './App.css'
import { TaskItem } from './components/task-item/TaskItem'
import { Task } from './models/task'


const storagedTasks = localStorage.getItem('tasks');
const initialTasks = storagedTasks ? JSON.parse(storagedTasks) : [];

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [taskName, setTaskName] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask: Task = {name: taskName, id: new Date().getTime()};
    setTasks([...tasks, newTask]);
    setTaskName ('');
  };

  const handleRemove = (task: Task) => {
    setTasks(tasks.filter(item => item.id !== task.id))
  }

  const clearAllTasks = () => {
    setTasks([]);
  }

  return (
    <div className="App">
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
      </form>
      {
        tasks.map(task =>
          <TaskItem key={task.id} task={task} onRemove={() => handleRemove(task)}></TaskItem>
        )
      }
      <br />
      <button onClick={clearAllTasks}>Clear All</button>
    </div>
  )
}

export default App
