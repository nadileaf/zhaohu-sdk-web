import React from 'react';
import ReactDOM from 'react-dom';
import Inject from './Inject'

declare global {
  interface Window { zhaohu: Zhaohu; }
}

interface InitParam {
  token: string
  from: string
  env?: string
  basicInfoRequest: () => Promise<any>
}

class Zhaohu {
  init (param: InitParam) {
    mustObject(param, 'param')
    notNull(param.token, 'param.token')
    notNull(param.from, 'param.from')
    notNull(param.basicInfoRequest, 'param.basicInfoRequest')

    const container = document.createElement('div')
    container.id = "zhaohu"
    document.body.appendChild(container)

    ReactDOM.render(<Inject
      token={param.token}
      from={param.from}
      env={param.env}
      />, container);
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