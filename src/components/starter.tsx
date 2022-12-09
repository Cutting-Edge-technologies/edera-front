import React from "react";

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


export class Starter extends React.Component <IStarterProps> {
  constructor(props: IStarterProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (      
<body>
<nav className="navbar">
    <a href="{% url 'lms:manage' %}">Пары учеников</a>
    <a href="{% url 'lms:users' %}">Ученики и семьи</a>
    <div className="dropdown">
      <button className="dropdown-toggle" typeof="link" id="dropdownMenuButton3" data-bs-toggle="dropdown"
       aria-haspopup="true" aria-expanded="false">
        Раписание
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton3">
        <a className="dropdown-item" href="{% url 'lms:timetable' %}">Обычное</a>
        <a className="dropdown-item" href="{% url 'lms:timetable' %}?v=table">Таблица</a>
      </div>
    </div>
    <a href="{% url 'lms:user_copy_lessons' %}">Копировать</a>

    <div className="dropdown">
      <button className="dropdown-toggle" typeof="link" id="dropdownMenuButton" data-bs-toggle="dropdown"
       aria-haspopup="true" aria-expanded="false">
        Настройки
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a className="dropdown-item" href="{% url 'lms:service_info' %}">Service</a>
        <a className="dropdown-item" href="{% url 'lms:zoom_account' %}">Zoom аккаунты</a>
        <a className="dropdown-item" href="{% url 'lms:timezone' %}">Тайм-зоны</a>
        <a className="dropdown-item" href="{% url 'lms:pair_info' %}">Пары и чаты</a>
        <a className="dropdown-item" href="{% url 'lms:mentors' %}">Менторы и менеджеры</a>
        <a className="dropdown-item" href="{% url 'lms:log' %}">Лог создания и удаления</a>
        <a className="dropdown-item" href="{% url 'lms:items' name='currency'%}">Currency</a>
        <a className="dropdown-item" href="{% url 'lms:items' name='servicegroup'%}">Service Group</a>
      </div>
    </div>

    <div className="dropdown">
      <button className="dropdown-toggle" typeof="link" id="dropdownMenuButton2" data-bs-toggle="dropdown"
       aria-haspopup="true" aria-expanded="false">
        Finance
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
        <a className="dropdown-item" href="{% url 'lms:teacher_service' %}">Teacher service cost</a>
        <a className="dropdown-item" href="{% url 'lms:student_service' %}">Student service revenue</a>
      </div>
    </div>
    
    <a href="{% url 'logout' %}">Выйти </a>
</nav>
    {"% block content %"}
    {"% endblock %"}
</body>
    )}
}