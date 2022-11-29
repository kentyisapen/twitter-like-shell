import React, { useEffect, useState } from 'react';
import classes from "../styles/InputArea.module.css"
import TextAreaAutoSize from 'react-textarea-autosize'
import { RiSendPlane2Line } from 'react-icons/ri'

export const InputArea = () => {
  const [value, setValue] = useState<string>("");

  const execCommand = (cmd: string) => {
    console.log((window as any).electronAPI.execCommand(cmd))
    setValue("")
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    execCommand(value)
    event.preventDefault();
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      setValue(value + "\n")
      return
    }
    if (e.key === 'Enter') {
      execCommand(value)
      return
    }
    return
  }

  const handleOnChange = (value: string) => {
    if (value.slice(-1) === "\n") {
      return
    }
    setValue(value)
  }

  return ( 
    <div className={classes.input_area}>
      <TextAreaAutoSize
        maxRows={6}
        value={value}
        onChange={e => handleOnChange(e.target.value)}
        onKeyDown={e => handleKeyDown(e)}
        className={classes.text_area}></TextAreaAutoSize>
      <button className={`${classes.submit_button}`} onClick={(e) => handleSubmit(e)}><RiSendPlane2Line></RiSendPlane2Line></button>
      
    </div>
  )
}