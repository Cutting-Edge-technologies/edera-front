export interface IDropdownOptionProps {
  title: string;
  onClick: () => void;
}

export const DropdownOption: React.FC<IDropdownOptionProps> = ({title, onClick}) => {
  return (
    <button onClick={onClick}> {title} </button>
  )
}