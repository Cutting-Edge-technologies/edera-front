import React from "react";
import { ButtonControl } from "./ButtonControl";
import {DropdownControl } from "./DropdownControl";
import { ControlType, IStarterProps } from "./starter";

export const StarterOther: React.FC<IStarterProps> = ({controls}) => {
  return (
    <div className="main">
      {
        controls.map((control)=> {
          if (control.controlType === ControlType.Button){
            return <ButtonControl title={control.title} onClick={control.onClick||(()=>console.log("NOOOO"))} isActive={control.isActive||true}/>
          } else {
            return <DropdownControl title={control.title} isActive={control.isActive||true} options={control.options||[]}/>
          }        
        })
      }
    </div>
  )
}

