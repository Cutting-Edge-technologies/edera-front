export interface IButtonControlProps {
  title: string;
  onClick: () => void;
  isActive: boolean;
}

export const ButtonControl: React.FC<IButtonControlProps> = ({title, onClick, isActive}) => {
  return (
    <button onClick={onClick} disabled={!isActive}> 
      {title}
    </button>
  )
}