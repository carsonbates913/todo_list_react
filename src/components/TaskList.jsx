import { useContext } from 'react'
import { TasksContext} from '../data/TaskContent.jsx'
import Task from './Task.jsx'

function TaskList(){
  const tasks = useContext(TasksContext);

  return <>
    {tasks.map((task, index) =>{
      return <Task key={index} task={task}></Task>
    })}
  </>
}

export default TaskList