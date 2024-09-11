import { useState, useRef, useContext } from 'react'
import TaskList from './components/TaskList.jsx'
import NavButtons from './components/NavButtons.jsx'
import Date from './components/Date.jsx'
import TaskModal from './components/TaskModal.jsx'
import TaskOptions from './components/TaskOptions.jsx'
import Popup from './components/Popup.jsx'
import SideNav from './components/SideNav.jsx'
import { TaskProvider } from './data/TaskContent.jsx'

import './HomePage.css'

function App() {

  const [isTaskModalActive, setTaskModalActive] = useState(false);
  const [isSideNavActive, setSideNavActive] = useState(false);
  const [activePopup, setActivePopup] = useState('');
  const [popupPosition, setPopupPosition] = useState({top: 0, left: 0});
  const anchorElement = useRef(null);

  const togglePopup = (event, popupId) => {
    event.stopPropagation();
    if(anchorElement.current === event.currentTarget){
      handleClosePopup();
    }else{
      console.log('open');
      setActivePopup(popupId);
      anchorElement.current = event.currentTarget;
      const rect = anchorElement.current.getBoundingClientRect();
      setPopupPosition({top: rect.bottom + 0, left: rect.right - (rect.width/2)})
    }
  }

  const handleClosePopup = () => {
    console.log('close');
    setActivePopup(null);
    anchorElement.current = null;
    setPopupPosition({top: 0, left: 0})
  }

  return (
    <>
    <TaskProvider>
      <SideNav isActive={isSideNavActive} onClose={setSideNavActive}></SideNav>
      <header className='home-header'>
        <Date></Date>
        <NavButtons onAddClick={()=>setTaskModalActive(true)
        } onMenuClick={setSideNavActive}></NavButtons>
      </header>
      <div className='home-content'>
        <div className='task-section container-scroll'>
          <h3 className="task-section-body" >Tasks</h3>
          <TaskList isPopup={activePopup}handleToggle={(event)=>{togglePopup(event, 'task-options')}}></TaskList>
        </div>
        <div className="visual-section"></div>
        <TaskModal isActive={isTaskModalActive} onClose={()=>setTaskModalActive(false)}/>
      </div>
      <div className='popup-container'>
        <Popup id='task-options' isOpen={activePopup==='task-options'} position={popupPosition} onClose={handleClosePopup}>
          <TaskOptions onClose={handleClosePopup} onEdit={setTaskModalActive}></TaskOptions>
        </Popup>
      </div>
      </TaskProvider>
    </>
  )
}

export default App;
