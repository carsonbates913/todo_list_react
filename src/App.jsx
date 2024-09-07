import { useState } from 'react'
import TaskList from './components/TaskList.jsx'
import NavButtons from './components/NavButtons.jsx'
import Date from './components/Date.jsx'
import TaskModal from './components/TaskModal.jsx'
import { TaskProvider } from './data/TaskContent.jsx'

import './HomePage.css'

function App() {
  const [isTaskModalActive, setTaskModalActive] = useState(false);

  return (
    <>
    <TaskProvider>
      <header className='home-header'>
        <Date></Date>
        <NavButtons onAddClick={()=>setTaskModalActive(true)
        }></NavButtons>
      </header>
      <div className='home-content'>
        <div className='task-section container-scroll'>
          <h3 className="task-section-body">Tasks</h3>
          <div className="task-container">
          <TaskList></TaskList>
          </div>
        </div>
        <div className="visual-section"></div>
        {isTaskModalActive && <TaskModal onClose={()=>setTaskModalActive(false)}/>}
      </div>
      </TaskProvider>
    </>
  )
}

export default App;
