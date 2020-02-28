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
  reload?: number
  adJobId?: number
  mode?: string
  chatId?: number
}

type UrlParams = {
  platform: string
  token: string
  from: string
  reload: number
  version?: string
  ad_job_id?: number
  chat_id?: number
  mode?: string
}

const InjectFrame: React.FC<InjectFrameProps> = (props: InjectFrameProps) => {
  const host = `https://agora.${props.env || 'mesoor'}.com/`

  const params: UrlParams = {
    platform: 'web_sdk',
    token: encodeURIComponent(props.token),
    from: encodeURIComponent(props.from),
    reload: props.reload || 0
  }
  if (props.version) params.version = props.version
  if (props.adJobId) params.ad_job_id = props.adJobId
  if (props.chatId) params.chat_id = props.chatId
  if (props.mode) params.mode = props.mode

  const url = host + '?' + Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&')

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
