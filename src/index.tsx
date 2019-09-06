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
    notNull(param.token, 'token')
    notNull(param.from, 'from')
    notNull(param.basicInfoRequest, 'basicInfoRequest')

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

function notNull (value: any, name?: string) {
  if (value === null || value === undefined) throw new Error((name || "") + " cannot be null")
}


window.zhaohu = new Zhaohu()