import React from 'react';
import ReactDOM from 'react-dom';
import Inject from './Inject'

declare global {
  interface Window { zhaohu: Zhaohu; }
}

class Zhaohu {
  init (token: string, from: string, env?: string) {
    const container = document.createElement('div')
    container.id = "zhaohu"
    document.body.appendChild(container)

    ReactDOM.render(<Inject
      token={token}
      from={from}
      env={env}
      />, container);
  }
}


window.zhaohu = new Zhaohu()