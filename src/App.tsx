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
    const updatedTasks = [...tasks, {name: taskName, id: new Date().getTime()}];
    setTasks(updatedTasks);
    setTaskName ('');
  };

  const handleRemove = (task: Task) => {
    const updatedTasks = tasks.filter(item => item.id !== task.id);
    setTasks(updatedTasks);
  }

  const toggleCompleted = (task: Task, completed: boolean) => {
    const updatedTasks = tasks.map(taskItem => taskItem.id === task.id ? {...task, completed} : taskItem);
    setTasks(updatedTasks);
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
          <TaskItem
            key={task.id}
            task={task}
            toggleComplete={(completed)=> {toggleCompleted(task, completed)}}
            onRemove={() => handleRemove(task)} />
        )
      }
      <br />
      <button onClick={clearAllTasks}>Clear All</button>
    </div>
  )
}

export default App
