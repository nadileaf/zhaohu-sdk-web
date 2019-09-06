import React, { useState } from 'react';
import './FloatingButton.css';
import Draggable from 'react-draggable';

interface AppProps {
 onClick: () => void 
 logo: string
 brand: string
}

const FloatingButton: React.FC<AppProps> = (props) => {
  const [isDraging, setDraging] = useState(false)
  const [timeoutHandler, setTimeoutHandler] = useState<NodeJS.Timer | undefined>(undefined)
  function handleDrag() {
    if (timeoutHandler) clearTimeout(timeoutHandler)
  }
  function handleStart() {
    setDraging(true)
  }
  function handleStop() {
    setDraging(false)
  }
  function handleMouseDown() {
    setTimeoutHandler(setTimeout(props.onClick, 300))
  }
  return (
    <Draggable
      axis="y"
      handle=".handle"
      defaultPosition={{x: 0, y: 0}}
      grid={[1, 1]}
      onStart={handleStart}
      onDrag={handleDrag}
      onStop={handleStop}
      onMouseDown={handleMouseDown}
      bounds="body">
      <div className={`float-bg handle ${isDraging ? 'float__drag' : ''}`}/>
    </Draggable>
  );
}

export default FloatingButton