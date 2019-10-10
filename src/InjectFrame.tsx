import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { cm2tn } from './utils'
import './Inject.css'


interface InjectFrameProps {
  token: string
  from: string
  version?: string
  env?: string
  open: boolean
}

const InjectFrame: React.FC<InjectFrameProps> = (props: InjectFrameProps) => {
  const url = `https://agora.${props.env || 'mesoor'}.com/?platform=web_sdk&token=${encodeURIComponent(props.token)}&from=${encodeURIComponent(props.from)}${props.version ? `&version=${props.version}` : ''}`
  
  return (
    <CSSTransition
      in={props.open}
      classNames={cm2tn('frame')}
      timeout={200}
    >
      <iframe title="agora" className="frame" src={url}/>
    </CSSTransition>
  )
}

export default InjectFrame
