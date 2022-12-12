import React from "react";
import { ButtonControl } from "./ButtonControl";
import {DropdownControl } from "./DropdownControl";


export enum ControlType {
  Button = "button",
  DropDown = "dropdown",
}

export interface IDropDowmOption {
  title: string;
  onClick: () => void;
}

export interface IControlDetails {
  title: string;
  onClick?: () => void;
  controlType: ControlType;
  options?: IDropDowmOption[];
  isActive?: boolean;
}

export interface IStarterProps {
  controls: IControlDetails[]
}

export const Starter: React.FC<IStarterProps> = ({controls}) => {
  return (
    <div className="navbar">
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
