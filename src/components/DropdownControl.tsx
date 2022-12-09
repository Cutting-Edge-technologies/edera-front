import { Dropdown } from "reactstrap";
import { IDropDowmOption } from "./starter";
import {DropdownOption} from "./DropDowmOption"

export interface IDropdownControlProps {
  title: string;
  options: IDropDowmOption[];
  isActive: boolean;
}

export const DropdownControl: React.FC<IDropdownControlProps> = ({title, options, isActive}) => {
  return (
    <>
      <h1>{title}</h1>
      {options.map((option) => {
        <DropdownOption title={option.title} onClick={option.onClick}/>
      })}
    </>
  )
}