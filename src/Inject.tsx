import React, { useState } from 'react'
import FloatingButton from './FloatingButton'
import { CSSTransition } from 'react-transition-group'
import { cm2tn, InjectProps } from './utils'
import './Inject.css'

const Inject: React.FC<InjectProps> = (props: InjectProps) => {
  const [open, setOpen] = useState(false)
  
  const url = `https://agora.${props.env || 'mesoor'}.com/?platform=web_sdk&token=${encodeURIComponent(props.token)}&from=${encodeURIComponent(props.from)}${props.version ? `&version=${props.version}` : ''}`
  props.channel.onmessage = msg => {
    if (msg.data === 'close') {
      setOpen(false)
    }
  }
  
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


export default Inject
