import React from 'react';
import ReactDOM from 'react-dom';
import Inject from './Inject'

declare global {
  interface Window { zhaohu: Zhaohu; }
}

interface InitParam {
  token: string
  from: string
  version?: string
  env?: string
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
      ReactDOM.unmountComponentAtNode(container);
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