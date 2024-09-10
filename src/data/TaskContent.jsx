import { useState, createContext, useContext, useReducer } from 'react'
export const TasksContext = createContext(null);
export const DispatchTasksContext = createContext(null);

export function TaskProvider({children}){

  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks)

  return <>
    <TasksContext.Provider value={tasks}>
      <DispatchTasksContext.Provider value={dispatch}>
         {children}
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

let initialTasks = [
  {
    id: 1, 
    details: {
    title: 'task',
    description: '',
    dueDate: '',
    workTime: '',
    progress: '',
    tag: '',
  }}
]