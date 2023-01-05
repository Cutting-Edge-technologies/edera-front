import React from "react";
import { IHaveToken } from "../shared/typings";
import { IUser } from "./activate";

export interface IUserLesson {
  id:string;
  cancel:boolean;
  start: string;
  end: string;
  name: string;
  teacher: string;
}

export interface IUserCopyLessonsProps extends IHaveToken {
  users: IUser[];
  weeks_from: number[][];
  weeks_to: number[][];
}

export interface IUserCopyLessonsState {
  user_id: string;
  week_from: number;
  week_to: number;
  lessons: IUserLesson[];
}

export class UserCopyLessons extends React.Component <IUserCopyLessonsProps, IUserCopyLessonsState> {
  constructor(props: IUserCopyLessonsProps) {
    super(props);
    this.state = {
      user_id: this.props.users && this.props.users[0] ? this.props.users[0].user_id : "",
      week_from: this.props.weeks_from && this.props.weeks_from[0] && this.props.weeks_from[0][0]? this.props.weeks_from[0][0] : 0,
      week_to: this.props.weeks_to && this.props.weeks_to[0] && this.props.weeks_to[0][0]? this.props.weeks_to[0][0] : 0,
      lessons:[]
    };
  }
  
  get_lessons(){
    var formData = new FormData()
    formData.append("csrfmiddlewaretoken", this.props.token);
    formData.append("get_lessons", this.state.user_id);
    formData.append("start", `${this.state.week_from}`);
    fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
      console.log(resp);
      this.setState({lessons:resp.lessons});
    });
  }

  select_lesson(index:number){
    var lessons = this.state.lessons.slice();
    lessons[index].cancel = !lessons[index].cancel;
    this.setState({lessons:lessons});
  }

  copy_lessons(){
    var i=0;
    var ids = []
    for(i=0;i<this.state.lessons.length;i++){
        let lesson = this.state.lessons[i];
        if(!lesson.cancel){ids.push(lesson.id)}
    }
    var formData = new FormData()
    formData.append("csrfmiddlewaretoken", this.props.token);
    formData.append("copy_lessons", `${ids}`);
    formData.append("week_from", `${this.state.week_from}`);
    formData.append("week_to", `${this.state.week_to}`);
    fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
      console.log(resp);
      this.setState({lessons:[]});
    });
  }

  render() {
    return (
      <div className="container">
        <h2>Выберите ученика для копирования</h2>
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="user">Ученик</label>
            <select id="user" className="form-control form-control-lg"
              onChange={(e) => this.setState({user_id: e.target.value})}
              value = {this.state.user_id}>
                {this.props.users.map((user, index) =>
                    <option value={user.user_id}>{user.name}</option>)
                }
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="week_from">Неделя</label>
            <select id="week_from" className="form-control form-control-lg"
              onChange={(e) => this.setState({week_from: parseInt(e.target.value)})}
              value={this.state.week_from}>
                {this.props.weeks_from.map((week, index) =>
                  <option value={week[0]}>{week[0]} &ndash; {week[1]}</option>)
                }
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="get_lessons">Список уроков</label><br/>
            <button className="btn btn-info btn-lg" onClick={()=>this.get_lessons()}>
               Получить
            </button>
          </div>
        </div>
        <br/>
        {this.state.lessons.map((el, index)=>
          <div className="row">
            <div className="col-12 click" onClick={()=>{this.select_lesson(index)}}>
              {el.cancel ?<span>X</span> : <span>&#10003;</span>} &nbsp;
              {el.start} - {el.end} {el.name} ({el.teacher})
            </div>
          </div>)
        }
        <br/>
        {this.state.lessons.length>0?
          <div className="row">
            <div className="col-md-4">
              <label htmlFor="week_to">Неделя куда</label>
              <select id="week_to" className="form-control form-control-lg"
                onChange={(e) => this.setState({week_to: parseInt(e.target.value)})}
                value={this.state.week_to}>
                  {this.props.weeks_to.map((week, index) =>
                    <option value={week[0]}>{week[0]} &ndash; {week[1]}</option>)
                  }
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="get_lessons">Выбранные уроки скопируются</label><br/>
              <button className="btn btn-success btn-lg" onClick={()=>this.copy_lessons()}>
                Копировать
              </button>
            </div>
          </div>:"Получите список уроков/ Уроков нет"
        }
      </div>
    )
  }
}
