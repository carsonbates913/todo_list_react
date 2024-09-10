import { useContext } from 'react'
import { DispatchTasksContext, ActiveTaskContext } from '../data/TaskContent.jsx'

function TaskOptions({onClose}) {

  const dispatch = useContext(DispatchTasksContext)
  const {activeTask, setActiveTask} = useContext(ActiveTaskContext);

  const handleEdit = () => {
    console.log('edit');
  }

  const handleDelete = (taskId) => {
    onClose();
    dispatch({
      type: 'deleted',
      id: taskId,
    })
  }

  return <>
    <div className='popup-options'>
      <button className='options-button' id='edit-button' onClick={handleEdit}>Edit</button>
      <button className='options-button' id='delete-button' onClick={()=>{handleDelete(activeTask)}}>Delete</button>
    </div>
  </>
}

export default TaskOptions
