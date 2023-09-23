import React from 'react';
import { Item } from './Item';

export const App = () => {
  const imgStyle = {
    width: 50,
    height: 50,
  };
  return (
    <div>
      <img style={imgStyle} src={require('../img/jpg.jpg')} alt="jpg" />
      <img style={imgStyle} src={require('../img/png.png')} alt="png" />
      <img style={imgStyle} src={require('../img/svg.svg')} alt="svg" />
      <Item title="Hello" />
      <Item title="title" text="text" />
      <Item title="title2" text="text2" />
    </div>
  );
};
