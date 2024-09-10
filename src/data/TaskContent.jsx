import { createContext, useEffect, useReducer, useState } from 'react'
export const TasksContext = createContext(null);
export const DispatchTasksContext = createContext(null);
export const ActiveTaskContext = createContext(null);
export const TaskIdContext = createContext(null);


export function TaskProvider({children}){
  const [activeTask, setActiveTask] = useState(null);
  const [idCounter, setIdCounter] = useState(loadFromStorage('storage-id-counter'));

  const [tasks, dispatch] = useReducer(tasksReducer, loadFromStorage('storage-tasks'));

  useEffect(()=>{
    localStorage.setItem('storage-tasks', JSON.stringify(tasks));
  }, [tasks])

  useEffect(()=>{
    localStorage.setItem('storage-id-counter', JSON.stringify(idCounter));
  }, [idCounter])

  return <>
    <TasksContext.Provider value={tasks}>
      <DispatchTasksContext.Provider value={dispatch}>
        <ActiveTaskContext.Provider value={{activeTask, setActiveTask}}>
          <TaskIdContext.Provider value={{idCounter, setIdCounter}}>
            {children}
          </TaskIdContext.Provider>
        </ActiveTaskContext.Provider>
      </DispatchTasksContext.Provider>
    </TasksContext.Provider>
  </>
}

function tasksReducer(tasks, action){
  switch(action.type){
    case 'added': {
      return [
        ...tasks, 
        {
          details: action.task.details,
          id: action.task.id
        }
      ]
    }
    case 'deleted': {
      return tasks.filter(task => task.id !== action.id)
    }
    case 'edited': {
      return tasks.map(task => {
        if(task.id === action.task.id){
          return action.task;
        }else{
          return task;
        }
      })
    }
  }
} 

function loadFromStorage(item){
  const storedInfo = JSON.parse(localStorage.getItem(item)) || [];
  return storedInfo; 
}
