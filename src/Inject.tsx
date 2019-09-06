import React, { useState } from 'react'
import FloatingButton from './FloatingButton'
import { CSSTransition } from 'react-transition-group'
import './Inject.css'

interface InjectProps {
  token: string
  from: string
  env?: string
}

const Inject: React.FC<InjectProps> = (props: InjectProps) => {
  const [open, setOpen] = useState(false)
  
  const url = `https://agora.${props.env || 'mesoor'}.com/?token=${encodeURIComponent(props.token)}&from=${encodeURIComponent(props.from)}`
  
  return (
    <div>
      <CSSTransition
        in={open}
        classNames={cm2tn('mask')}
        timeout={200}
        unmountOnExit={true}
      >
        <div className="mask" onClick={() => setOpen(false)} />
      </CSSTransition>
      <CSSTransition
        in={open}
        classNames={cm2tn('frame')}
        timeout={200}
      >
        <iframe title="agora" className="frame" src={url}/>
      </CSSTransition>
      <CSSTransition
        in={!open}
        classNames={cm2tn('floating')}
        timeout={200}
        unmountOnExit={false}
      >
        <FloatingButton 
          key="floating"
          logo={require('./logo.svg')}
          onClick={() => setOpen(!open)}
          brand="召乎 ZHAOHU"
        />
      </CSSTransition>
    </div>
  )
}

function cm2tn (base: string) {
  return {
    appear: base + '-appear',
    appearActive: base + '-active-appear',
    enter: base + '-enter',
    enterActive: base + '-active-enter',
    enterDone: base + '-done-enter',
    exit: base + '-exit',
    exitActive: base + '-active-exit',
    exitDone: base + '-done-exit',
  }
}

export default Inject
