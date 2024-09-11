import './NavButtons.css'

function NavButtons ({onAddClick, onMenuClick}) {
  return <>
    <nav className='header-nav'>
      <button className='nav-button'>
        <svg className='nav-button-icon' viewBox='0 0 512 513'>
          <path 
          d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"
          fill="url(#menuGradient)">
          </path>
          <defs>
          <linearGradient
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                  id="menuGradient"
                  gradientTransform="rotate(0)"
                >
                  <stop offset="0%" stopColor="blue"></stop>
                  <stop offset="100%" stopColor="pink"></stop>
                </linearGradient>
          </defs>
        </svg>
      </button>
      <button className='button-menu nav-button' onClick={()=>{onMenuClick(true)}}>
        <svg className='nav-button-icon' viewBox='0 0 448 512'>
          <path
          d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
          fill="url(#menuGradient)">
          </path>
        </svg>
      </button>
      <button className='button-add-task nav-button' onClick={onAddClick}>
        <svg className='nav-button-icon'  viewBox='0 0 448 512'>
          <path
          d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
          fill="url(#menuGradient)">
          </path>
        </svg>
      </button>
    </nav>
  </>
}

export default NavButtons