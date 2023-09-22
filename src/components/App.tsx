import React from 'react';
import { Item } from './Item';

export const App = () => {
  return (
    <div>
      <Item title="Hello" />
      <Item title="title" text="text" />
      <Item title="title2" text="text2" />
    </div>
  );
};
