import { Link } from "react-router-dom";

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