import { useState, useEffect, useContext } from 'react'
import { DispatchTasksContext } from '../data/TaskContent.jsx'

function TaskModal({onClose}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [workTime, setWorkTime] = useState('');
  const [progress, setProgress] = useState('');
  const [tag, setTag] = useState('');
  const [errors, setErrors] = useState({});

  const dispatch = useContext(DispatchTasksContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors); 
    if(Object.keys(validationErrors).length === 0){
      dispatch({
        type: 'added',
        task: {
          id: 1,
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
            handleChange={(e)=>setTitle(e.target.value)}
            error={errors.title}
          />
          <FormField 
            inputId='description-input'
            labelText='Description'
            inputType='textarea'
            value={description}
            handleChange={(e)=>setDescription(e.target.value)}
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
            handleChange={(e)=>setDueDate(e.target.value)}
            error={errors.dueDate}
          />
          <FormField 
            inputId='work-time-input'
            labelText='Work Time'
            inputType='time'
            hasToggle={true}
            value={workTime}
            handleChange={(e)=>setWorkTime(e.target.value)}
            error={errors.workTime}
          />
          <FormField 
            inputId='progress-input'
            labelText='Progress'
            inputType='select'
            selectorOptions={progressOptions}
            value={progress}
            handleChange={(e)=>setProgress(e.target.value)}
            error={errors.progress}
          />
          <FormField 
            inputId='tag-input'
            labelText='Tag'
            inputType='select'
            selectorOptions={tagOptions}
            value={tag}
            handleChange={(e)=>setTag(e.target.value)}
            error={errors.tag}
            />
          <button className='submit-button' type='submit'>Submit</button>
        </div>
        <button className='cancel-button' type='button' onClick={onClose}>X</button>
      </form>
    </div>
  </>
}

function FormField({inputId, labelText, inputType, hasToggle = false, selectorOptions = [], isRequired = false, value, handleChange, error}) {
  const [isVisible, setIsVisible] = useState(!hasToggle);
  const handleOnToggle = (event) => {
    setIsVisible(event.target.checked);
  }

  const renderInputElement = () => {
    switch (inputType) {
      case 'select':
        return (
          <select
            id={inputId} 
            name={inputId}
            required={isRequired}
            style={{display: isVisible ? 'inline-block' : 'none'}}
            value={value}
            onChange={handleChange}
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
            style={{display: isVisible ? 'inline-block' : 'none'}}
            value={value}
            onChange={handleChange}
          />);
      default: 
        return (
          <input 
            type={inputType} 
            id={inputId} 
            name={inputId}
            required={isRequired}
            style={{display: isVisible ? 'inline-block' : 'none'}}
            value={value}
            onChange={handleChange}
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
            <input type='checkbox' id={`${inputId}-checker`} onChange={handleOnToggle}/>
          </label>
        )}
      </div>
    </>

}

export default TaskModal
