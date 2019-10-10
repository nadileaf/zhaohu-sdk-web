import React from 'react';
import ReactDOM from 'react-dom';
import Inject from './Inject'
import InjectFrame from './InjectFrame'

declare global {
  interface Window { 
    zhaohu: Zhaohu;
    ZhaohuFrame: typeof ZhaohuFrame;
  }
}

interface InitParam {
  token: string
  from: string
  version?: string
  env?: string
  hash?: string
  basicInfoRequest: () => Promise<any>
}

export default class Zhaohu {
  init (param: InitParam) {
    mustObject(param, 'param')
    notNull(param.token, 'param.token')
    notNull(param.from, 'param.from')
    notNull(param.basicInfoRequest, 'param.basicInfoRequest')

    const env = param.env || 'mesoor'

    const container = document.createElement('div')
    container.id = "zhaohu"
    if (param.hash) container.className = param.hash
    document.body.appendChild(container)

    const stateChannel = new BroadcastChannel('state_channel');

    window.addEventListener('message', function (event: MessageEvent) {
      if (event.origin !== `https://agora.${env}.com`) return
      const port = event.ports[0]
      port.onmessage = async function (event: MessageEvent) {
        switch (event.data.type) {
          case 'USER_DENIED':
            stateChannel.postMessage("close")
            break
          case 'USER_INFO_REQUEST':
            const resume = await param.basicInfoRequest()
            port.postMessage({ type: 'USER_INFO_REPLY', data: resume })
            break
          case 'USER_INFO_ERROR':
            console.error(event.data);
            break
          default:
            console.warn("???", event.data)
            break
        }
      }
      port.postMessage({ type: 'ACK' })
    })

    const injectComponent = <Inject
      token={param.token}
      from={param.from}
      channel={stateChannel}
      version={param.version}
      env={env}
    />
    ReactDOM.render(injectComponent, container);
  }

  remove() {
    const container = document.getElementById('zhaohu')
    if (container) {
      ReactDOM.unmountComponentAtNode(container)
      container.remove()
    }
  }
}

export class ZhaohuFrame {
  private container: HTMLElement
  private env: string
  private param: InitParam
  constructor (param: InitParam) {
    mustObject(param, 'param')
    notNull(param.token, 'param.token')
    notNull(param.from, 'param.from')
    notNull(param.basicInfoRequest, 'param.basicInfoRequest')
    this.param = param
   
    this.env = param.env || 'mesoor'

    this.container = document.createElement('div')
    this.container.id = "zhaohu"
    document.body.appendChild(this.container)

    window.addEventListener('message', (event: MessageEvent) => {
      if (event.origin !== `https://agora.${this.env}.com`) return
      const port = event.ports[0]
      port.onmessage = async (event: MessageEvent) => {
        switch (event.data.type) {
          case 'USER_DENIED':
            this.hide();
            break
          case 'USER_INFO_REQUEST':
            const resume = await param.basicInfoRequest()
            port.postMessage({ type: 'USER_INFO_REPLY', data: resume })
            break
          case 'USER_INFO_ERROR':
            console.error(event.data);
            break
          default:
            console.warn("???", event.data)
            break
        }
      }
      port.postMessage({ type: 'ACK' })
    })

    ReactDOM.render(<InjectFrame
      token={this.param.token}
      from={this.param.from}
      version={this.param.version}
      env={this.env}
      open={false}
    />, this.container)
  }

  show() {
    ReactDOM.render(<InjectFrame
      token={this.param.token}
      from={this.param.from}
      version={this.param.version}
      env={this.env}
      open={true}
    />, this.container)
  }

  hide() {
    ReactDOM.render(<InjectFrame
      token={this.param.token}
      from={this.param.from}
      version={this.param.version}
      env={this.env}
      open={false}
    />, this.container)
  }

  remove() {
    const container = document.getElementById('zhaohu')
    if (container) {
      ReactDOM.unmountComponentAtNode(container)
      container.remove()
    }
  }
}

function notNull(value: any, name?: string) {
  if (value === undefined ||value === null) throw new Error((name || "") + " cannot be null!")
}

function mustObject(value: any, name?: string) {
  if (value === null || value === undefined) throw new Error((name || "") + " cannot be null!")
  if (typeof value !== "object") throw new Error((name || "") + " must be an object!")
}

window.zhaohu = new Zhaohu()
window.ZhaohuFrame = ZhaohuFrame