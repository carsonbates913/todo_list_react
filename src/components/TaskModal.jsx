import { useState, useEffect, useContext } from 'react'
import { DispatchTasksContext, TaskIdContext, TasksContext, ActiveTaskContext } from '../data/TaskContent.jsx'

function TaskModal({isEditing, handleEditing, isActive, onClose}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [workTime, setWorkTime] = useState('');
  const [progress, setProgress] = useState('');
  const [tag, setTag] = useState('');
  const [errors, setErrors] = useState({});

  const [editingTaskId, setEditingTaskId] = useState(null);

  const tasks = useContext(TasksContext)
  const dispatch = useContext(DispatchTasksContext);
  const {activeTask, setActiveTask}= useContext(ActiveTaskContext)
  const {idCounter, setIdCounter} = useContext(TaskIdContext);

  useEffect(()=>{
    console.log('task modal use Effect');
    if(isEditing && activeTask){
      console.log(activeTask);
      const editTask = tasks.find(task => task.id === activeTask);
      setTitle(editTask.details.title);
      setDescription(editTask.details.description);
      setDueDate(editTask.details.dueDate);
      setWorkTime(editTask.details.workTime);
      setProgress(editTask.details.progress);
      setTag(editTask.details.tag);
      setEditingTaskId(activeTask); 
    }
  }, [isActive, activeTask])

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors); 
    if(Object.keys(validationErrors).length === 0){
      if(!editingTaskId){
        dispatch({
          type: 'added',
          task: {
            id: idCounter,
            details: {
              title: title,
              description: description,
              dueDate: dueDate,
              workTime: workTime,
              progress: progress,
              tag: tag,
            }
          }
        })
        setIdCounter(idCounter + 1);
      }else{
        console.log('editing');
        console.log(editingTaskId);
        dispatch({
          type: 'edited',
          task: {
            id: editingTaskId,
            details: {
              title: title,
              description: description,
              dueDate: dueDate,
              workTime: workTime,
              progress: progress,
              tag: tag,
            }
          }
        })
        setEditingTaskId(null);
        handleEditing();
      }
      clearInputs();
      onClose();
    }
  };

  const clearInputs = () => {
    setTitle('')
    setDescription('')
    setDueDate('')
    setWorkTime('')
    setProgress('')
    setTag('')
    setErrors({})
  }

  const validateForm = ()=> {
    const newErrors = {};
    if(!title) newErrors.title = 'required*';
    if(!description) newErrors.description = 'required*'
    console.log(newErrors);
    return newErrors;
  }

  /*Form Data*/
  const tagOptions = [ 'Academics', 'Work', 'Health', 'Personal', 'Chore'];
  const progressOptions = [ 'Not Started', 'Starting', 'Halfway', 'Almost', 'Complete'];

  if(!isActive){
    return null;
  }else{
  return <>
    <div className='task-modal'>
      <form className='create-task-form' onSubmit={handleSubmit} noValidate>
        <div className='form-section'>
          <h2>New Task</h2>
          <FormField 
            inputId='title-input'
            labelText='Title'
            inputType='text'
            isRequired={true}
            value={title}
            handleChange={(value)=>setTitle(value)}
            error={errors.title}
          />
          <FormField 
            inputId='description-input'
            labelText='Description'
            inputType='textarea'
            value={description}
            handleChange={(value)=>setDescription(value)}
            error={errors.description}
          />
        </div>
        <div className='form-section'>
          <FormField 
            inputId='due-date-input'
            labelText='Due Date'
            inputType='date'
            hasToggle={true}
            value={dueDate}
            handleChange={(value)=>setDueDate(value)}
            error={errors.dueDate}
          />
          <FormField 
            inputId='work-time-input'
            labelText='Work Time'
            inputType='time'
            hasToggle={true}
            value={workTime}
            handleChange={(value)=>setWorkTime(value)}
            error={errors.workTime}
          />
          <FormField 
            inputId='progress-input'
            labelText='Progress'
            inputType='select'
            selectorOptions={progressOptions}
            value={progress}
            handleChange={(value)=>setProgress(value)}
            error={errors.progress}
          />
          <FormField 
            inputId='tag-input'
            labelText='Tag'
            inputType='select'
            selectorOptions={tagOptions}
            value={tag}
            handleChange={(value)=>setTag(value)}
            error={errors.tag}
            />
          <button className='submit-button' type='submit'>Submit</button>
        </div>
        <button className='cancel-button' type='button' onClick={()=>{
          clearInputs();handleEditing();onClose();}}>X</button>
      </form>
    </div>
  </>
  }
}

function FormField({inputId, labelText, inputType, hasToggle = false, selectorOptions = [], isRequired = false, value, handleChange, error}) {
  const [isVisible, setIsVisible] = useState(null);

  const handleOnToggle = (event) => {
    if(event.target.checked){
      handleChange('');
    }
    setIsVisible(event.target.checked);
  }

  useEffect(()=>{
    setIsVisible(!!value);
  }, [value])


  const renderInputElement = () => {
    switch (inputType) {
      case 'select':
        return (
          <select
            id={inputId} 
            name={inputId}
            required={isRequired}
            style= {{display: !hasToggle ? 'inline-block' : (isVisible ? 'inline-block' : 'none')}}
            onChange={(e)=>{handleChange(e.target.value)}}
            defaultValue={value}
          >
            <option value='' disabled hidden/>
            {selectorOptions.map(option=> (
              <option value={option} key={option}>{option}</option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea 
            id={inputId} 
            name={inputId}
            required={isRequired}
            style= {{display: !hasToggle ? 'inline-block' : (isVisible ? 'inline-block' : 'none')}}
            value={value}
            onChange={(e)=>{handleChange(e.target.value)}}
          />);
      default: 
        return (
          <input 
            type={inputType} 
            id={inputId} 
            name={inputId}
            required={isRequired}
            style= {{display: !hasToggle ? 'inline-block' : (isVisible ? 'inline-block' : 'none')}}
            value={value}
            onChange={(e)=>{handleChange(e.target.value)}}
          />);
    }
  }
    return <>
      <div className='form-div'>
        <label htmlFor={inputId}>
          {labelText}
          <span className={`validation-error js-validation-error-${inputId}`}>{error}</span>
        </label>
        {renderInputElement()}
        {hasToggle && (
          <label className='toggle-button' htmlFor={`${inputId}-checker`}>
            <input type='checkbox' id={`${inputId}-checker`} onChange={handleOnToggle} checked={isVisible}/>
          </label>
        )}
      </div>
    </>

}

export default TaskModal