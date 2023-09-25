import React from 'react';
import './moreCode.scss';

//App.tsx : const MoreCode = React.lazy(() => import('./MoreCode'));
const MoreCode = () => {
  console.log("Hello! I'm more code block");
  return <div className="moreCode">1234this code for checking code splitting and lazy load</div>;
};

export default MoreCode;
