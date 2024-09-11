function SideNav({ isActive, onClose }){

  return <>
    <div className={`container-side-nav ${isActive ? 'nav-active' : ''}`}>
      <div className='side-nav-overlay' onClick={()=>{onClose(false)}}></div>
      <nav className='side-nav'>
        <div className='nav-section-logo'></div>
        <ul className='nav-section-pages'>
          <li className='nav-section-pages-item'>Home</li>
          <li className='nav-section-pages-item'>Tasks</li>
          <li className='nav-section-pages-item'>Calendar</li>
          <li className='nav-section-pages-item'>Analytics</li>
        </ul>
        <button className='nav-button-exit' onClick={()=>{onClose(false)}}>X</button>
      </nav>
    </div>
  </>
}

export default SideNav