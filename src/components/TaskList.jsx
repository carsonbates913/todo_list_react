import { useContext, useState, useEffect } from 'react'
import { TasksContext, ActiveTaskContext } from '../data/TaskContent.jsx'
import Task from './Task.jsx'

function TaskList({isPopup, handleToggle}){
  const tasks = useContext(TasksContext);
  const {activeTask, setActiveTask} = useContext(ActiveTaskContext);

  useEffect(()=> {
    console.log('active task checker activate')
    if(!activeTask){
      console.log('no active task so cancel');
      return;
    }
    if(!isPopup){
      console.log('remove active task');
      setActiveTask(null);
    }

  }, [isPopup, activeTask])

  return <>
    <div className={`task-container ${activeTask ? 'no-hover' : ''}`}>
      {tasks.map((task) =>{
       return <Task active={activeTask===task.id} key={task.id} task={task} handleTaskOptions={(event) => {handleToggle(event);
          setActiveTask(task.id);
        }}></Task>
     })}
    </div>
  </>
}

export default TaskList