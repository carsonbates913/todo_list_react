import { useContext, useState } from 'react'
import { TasksContext} from '../data/TaskContent.jsx'
import Task from './Task.jsx'

function TaskList({handleToggle}){
  const [activeTask, setActiveTask] = useState(null);
  const tasks = useContext(TasksContext);

  const handleTaskOptions = (event, id) => {
    handleToggle(event);
    setActiveTask(id)
  }

  return <>
    {tasks.map((task) =>{
      return <Task active={activeTask===task.id} key={task.id} task={task} handleTaskOptions={(event) => {handleToggle(event);
        setActiveTask(task.id);
      }}></Task>
    })}
  </>
}

export default TaskList