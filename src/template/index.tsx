import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '../components/App';
import '../fonts/fonts.scss';
import { sum } from '../components/math';

console.log(sum(10, 15));

const root = createRoot(document.getElementById('root') as Element);

root.render(<App />);
