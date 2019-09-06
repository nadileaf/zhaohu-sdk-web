import React from 'react';
import ReactDOM from 'react-dom';
import FloatingButton from './FloatingButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FloatingButton />, div);
  ReactDOM.unmountComponentAtNode(div);
});
