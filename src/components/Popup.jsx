import { useState, useRef, useLayoutEffect, useEffect } from 'react'

function Popup({isOpen, position, onClose, children}) {
  const [popupPosition, setPopupPosition] = useState({top: 0, left: 0});
  const popupRef = useRef(null);

  useLayoutEffect(()=> {
    if(position && isOpen){
      adjustLocation();
    }
  }, [position]);

  useEffect(()=> {
    event.stopPropagation();
    if (!isOpen) return;
    function handleClickOutside(event){
      if(popupRef.current && !popupRef.current.contains(event.target)){
        onClose();
      }
    }
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  if(isOpen){
    return <>
    <div 
      ref={popupRef}
      style={{
        position: 'absolute',
        top: `${popupPosition.top}px`,
        left: `${popupPosition.left}px`,
    }}
    >
      {children}
    </div>
  </>
  }else{
    return null;
  }


  function adjustLocation() {
    setPopupPosition({top: position.top, left: position.left});
  }
}

export default Popup