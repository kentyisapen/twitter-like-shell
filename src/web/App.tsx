import React from 'react';
import './App.css';

export const App =  () => {
  (window as any).electronAPI.execCommand("logaaa").then((res: any) => console.log(res));
  return (
    <div className="container">
      <h1>Hellooo.</h1>
    </div>
  );
};