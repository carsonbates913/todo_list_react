function TaskOptions() {

  const handleEdit = () => {
    console.log('edit');
  }

  const handleDelete = () => {
    console.log('delete');
  }

  return <>
    <div className='popup-options'>
      <button className='options-button' id='edit-button' onClick={handleEdit}>Edit</button>
      <button className='options-button' id='delete-button' onClick={handleDelete}>Delete</button>
    </div>
  </>
}

export default TaskOptions
