import { useContext, useState, useEffect } from 'react'
import { TasksContext, ActiveTaskContext } from '../data/TaskContent.jsx'
import Task from './Task.jsx'

function TaskList({isPopup, handleToggle}){
  const tasks = useContext(TasksContext);
  const {activeTask, setActiveTask} = useContext(ActiveTaskContext);

  useEffect(()=> {
    console.log('effect activated');
    if(!activeTask){
      console.log(activeTask);
      console.log('active cancel');
      return;
    }
    if(!isPopup){
      console.log(activeTask);
      console.log('unfreeze');
      setActiveTask(null);
    }

  }, [isPopup, activeTask])

  return <>
    {tasks.map((task) =>{
      return <Task active={activeTask===task.id} key={task.id} task={task} handleTaskOptions={(event) => {handleToggle(event);
        setActiveTask(task.id);
      }}></Task>
    })}
  </>
}

export default TaskList