
import React from 'react';
import ReactDOM from 'react-dom';
import { LeapProvider, withLeapContainer  } from 'react-leap'

import LeapImageSlider from './components/LeapImageSlider';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

const AppShell = () => (
  <div>
    <LeapProvider options={{enableGestures: true}}>
      <LeapImageSlider />
    </LeapProvider>
  </div>
);

ReactDOM.render(<AppShell />, document.getElementById('app'));
