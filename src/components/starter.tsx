import React from "react";
import { PropsWithChildren } from "react";
import { ButtonControl } from "./ButtonControl";
import {DropdownControl } from "./DropdownControl";


export enum ControlType {
  Button = "button",
  DropDown = "dropdown",
}

export interface IDropDowmOption {
  title: string;
  reference?: string;
}

export interface IControlDetails {
  title: string;
  reference?: string;
  controlType: ControlType;
  options?: IDropDowmOption[];
  isActive?: boolean;
}

export interface IStarterProps extends PropsWithChildren {
  controls: IControlDetails[];
}

export const Starter: React.FC<IStarterProps> = ({controls, children}) => {
  return (
    <>
      <div className="navbar">
      {
        controls.map((control)=> {
          if (control.controlType === ControlType.Button){
            return <ButtonControl title={control.title} reference={ control.reference} isActive={control.isActive||true}/>
          } else {
            return <DropdownControl title={control.title} isActive={control.isActive||true} options={control.options||[]}/>
          }        
        })
      }
      </div>
      {children}
    </>
    
  )
}
