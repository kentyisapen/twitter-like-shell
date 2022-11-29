import React from 'react';
import classes from "../styles/InputArea.module.css"
import TextAreaAutoSize from 'react-textarea-autosize'

export const InputArea = () => {

  return  (
    <div className={classes.input_area}>
      <TextAreaAutoSize className={classes.text_area}></TextAreaAutoSize>
    </div>
  );
}