
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import { IDropDowmOption } from "./starter";

export interface IDropdownControlProps {
  title: string;
  options: IDropDowmOption[];
  isActive: boolean;
}

export const DropdownControl: React.FC<IDropdownControlProps> = ({title, options, isActive}) => {
  const navigate = useNavigate();
  return (
    <Dropdown>
    <Dropdown.Toggle variant="succefull">
      {title}
    </Dropdown.Toggle>

    <Dropdown.Menu>
    {options.map((option) => {
      return(
        <Dropdown.Item  onClick={()=>option.onClick && option.onClick(navigate)}>{option.title}</Dropdown.Item>
      )})}
    </Dropdown.Menu>
  </Dropdown>
);
}
