import React from 'react';
import ReactDOM from 'react-dom';
import FloatingButton from './FloatingButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FloatingButton 
    key="floating"
    logo={require('./logo.svg')}
    onClick={() => {}}
    brand="召乎 ZHAOHU" />, div);
  ReactDOM.unmountComponentAtNode(div);
});
