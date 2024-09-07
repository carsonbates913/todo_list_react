import { useState, useContext } from 'react'
import './Date.css'

function Date() {
  const [Time, setTime] = useState()
  return <>
    <div className='header-welcome'>
      <h1 className='header-date'>September 3rd</h1>
      <h3 className='header-time'>1:00 pm</h3>
    </div>
  </>
}

export default Date