import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { resetToken } from "../slices/tokenSlice";

export interface IButtonControlProps {
  title: string;
  reference?: string;
  isActive: boolean;
}

export const ButtonControl: React.FC<IButtonControlProps> = ({title, reference, isActive}) => {
  return (
    <Link to={ reference || '' }> 
      {title}
    </Link>
  )
}

export const ButtonLogOut: React.FC<IButtonControlProps> = ({title, reference, isActive}) => {
  const dispatch = useDispatch();
  const logout = () =>{
    dispatch(resetToken());
  }
  return (
    <button onClick={logout} > 
      {title}
    </button>
  )
}
