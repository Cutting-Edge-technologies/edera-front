import React from "react";
import { IHaveToken } from "../shared/typings";
import {ILesson, LessonEditor, } from "./lessonEditor"
import { initialLesson, initialLessonInfo } from "./timetable_table";

export interface IAddUserUser{
  name: string;
  user_id: number;
  tg: number;
  role: string;

}
export interface IAddUserPair{
  name: string;
  user_id: number;
  chat_id: number;
  pair_id: number;
  send_timetable: number;
}

export interface IAddUserAdd_Pair{
  student: number;
  teacher: number;
}

export interface IAddUserChat{
  chat_id: number;
  text: string;
  date: string;
}

export interface IAddUserAdd_Chat{
  chat_id: number;
  text: string;
  date: string;
}
export interface IAddUserService {
    note_id: number;
    name: string;
    group: {
        id: number;
        name: string;
    },
    cost: number;
    earn: number;
}
export interface IAddUserLesson extends ILesson{
} 

export interface IAddUserProps extends IHaveToken {
  users:IAddUserUser[];
  pairs:IAddUserPair[];
  chats:IAddUserChat[];
  services:IAddUserService[];
  responsibles:string[];
  today: string;
}

export interface IAddUserState {
  childKey: number;
  users:IAddUserUser[];
  pairs:IAddUserPair[];
  chats:IAddUserChat[];
  services:IAddUserService[];
  add_user:IAddUserUser;
  add_pair:IAddUserAdd_Pair;
  add_chat:IAddUserAdd_Chat;
  add_lesson:IAddUserLesson;
  user_id: number;
  user_tg: number;
  timetable_text: string;
}

export class AddUser extends React.Component<IAddUserProps, IAddUserState>{
  constructor(props:IAddUserProps) {
    super(props);
    this.state={childKey:0,
      users:this.props.users,
      pairs:this.props.pairs,
      chats:this.props.chats,
      services:this.props.services,
      add_user:{ user_id:0, tg:0, role:"", name:""},
      add_pair:{student:0, teacher:0},
      add_chat:{chat_id:0, date:'', text:''},
      add_lesson: initialLesson,
      user_id:this.props.users[0] ? this.props.users[0].user_id : 0,
      user_tg:this.props.users[0] ? this.props.users[0].tg : 0,
      timetable_text:""
    };
    this.save_lesson=this.save_lesson.bind(this);
    this.cancel_lesson = this.cancel_lesson.bind(this);
    this.edit_lesson= this.edit_lesson.bind(this);
    console.log(this.state.chats);
  }

  add_lessonUpdate(fieldDifirense: Partial<ILesson>){
    const lesson = {...this.state.add_lesson, ...fieldDifirense};
    return lesson;
  }

  add_user(role:string="student"){
    var name = prompt("Please enter " + role + " name", "Mark Ivanov");
    if(name!=null){
      var formData = new FormData();
      formData.append("csrfmiddlewaretoken", this.props.token);
      formData.append("name", name);
      formData.append("role", role);
      formData.append("add_user", `1`);
      fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
        console.log(resp);
        var users = this.state.users.slice();
        users.push(resp.user)
        this.setState({users:users})
      });
    }
  }

  add_pair(){
    console.log(this.state.add_pair);
    var formData = new FormData();
    formData.append("csrfmiddlewaretoken", this.props.token);
    formData.append("user_id", `${this.state.add_pair.student}`);
    formData.append("teacher", `${this.state.add_pair.teacher}`);
    formData.append("add_pair", `1`);
    fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
      console.log(resp)
      var pairs = this.state.pairs.slice()
      if(resp.ok){pairs.push(resp.pair);}
      this.setState({add_pair:{student:0, teacher:0}, pairs:pairs});
    });
  }

  add_chat(){
    console.log(this.state.add_chat);
    var formData = new FormData();
    formData.append("csrfmiddlewaretoken", this.props.token);
    formData.append("pair_id",`${this.state.add_chat.chat_id}`);
    formData.append("chat_id", `${this.state.add_chat.chat_id}`);
    formData.append("add_chat", `1`);
    fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
      console.log(resp);
      if (resp.ok) {
        var pairs = this.state.pairs.slice();
        var pair_id = this.state.add_chat.chat_id
        var index = pairs.findIndex(function(el){return el.pair_id===pair_id})
        pairs[index]= resp.chat_id;
        var chats = this.state.chats.slice();
        chats.splice(this.state.add_chat.chat_id, 1)
        this.setState({add_chat: {chat_id:0, date:'', text:''}, pairs: pairs, chats: chats});
      }
    })
  }

  pair_id_info(pair_id: number){
    var formData = new FormData();
    formData.append("csrfmiddlewaretoken", this.props.token);
    formData.append("pair_id_info", `${pair_id}`);
    fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
      console.log(resp);
      const emptyAdd_Lesson = this.add_lessonUpdate({pair_id:0, info:initialLessonInfo, old_info:initialLessonInfo});
      this.setState({childKey:this.state.childKey+1, add_lesson:emptyAdd_Lesson});
      const respAdd_Lesson = this.add_lessonUpdate({pair_id:pair_id, id:0, info:resp.info, old_info:resp.old_info});
      this.setState({add_lesson:respAdd_Lesson});
    })
  }
    

  save_lesson(resp:ILesson){
    let pair_id = this.state.add_lesson.pair_id;
    const emptyAdd_Lesson = this.add_lessonUpdate({pair_id:0, info:initialLessonInfo, old_info:initialLessonInfo});
    this.setState({childKey:this.state.childKey+1, add_lesson:emptyAdd_Lesson});
    const respAdd_Lesson = this.add_lessonUpdate({pair_id:pair_id, id:0, info:resp.info,
      old_info: this.state.add_lesson.old_info});
    this.setState({add_lesson:respAdd_Lesson, childKey:this.state.childKey+1});
  }

  edit_lesson(lesson:ILesson){
    lesson.pair_id = this.state.add_lesson.pair_id;
    lesson.info = this.state.add_lesson.info;
    lesson.old_info = this.state.add_lesson.old_info;
    //this.setState({add_lesson:{pair_id:0, date:0}});
    //console.log(lesson);
    this.setState({childKey:this.state.childKey+1});
    this.setState({add_lesson:lesson});
  }
/*
  edit_pair(v, pair_id, index){
    console.log(v, pair_id);
    var formData = new FormData()
    formData.append("csrfmiddlewaretoken", this.props.token);
    formData.append("edit_pair",pair_id);
    formData.append("send_timetable",v ? 1 : 0);
    fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
      console.log(resp);
      var pairs = this.state.pairs.slice();
      pairs[index] = resp.pair;
      this.setState({pairs:pairs});
    })
  }
*/  
  cancel_lesson(lesson_id:number, single:number=0){
    var msg;
    if(single){
      msg = "Этот урок будет одноразово отменен, но если включено повторение, следующие останутся.\n"
    }
    else{msg = "Урок и его повторы будeт удалены.\n"}
      var confirm = prompt(msg + "Для подтверждения введите: yes", "no")
    if(confirm === "yes"){
      var formData = new FormData();
      formData.append("csrfmiddlewaretoken", this.props.token);
      formData.append("cancel_lesson", `${lesson_id}`);
      formData.append("single", `${single}`);
      fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
        console.log(resp);
        const respAdd_Lesson = this.add_lessonUpdate({pair_id:this.state.add_lesson.pair_id, info:resp.info, old_info: this.state.add_lesson.old_info});
        this.setState({add_lesson:respAdd_Lesson})
      });
    }
  }

  send_notification(lesson_id:number){
    var confirm = prompt("Для подтверждения введите: yes", "no")
    if(confirm=== "yes"){
      var formData = new FormData();
      formData.append("csrfmiddlewaretoken", this.props.token);
      formData.append("notification", `${lesson_id}`);
      fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
        console.log(resp);
        const respAdd_Lesson = this.add_lessonUpdate({pair_id:this.state.add_lesson.pair_id, info:resp.info, old_info: this.state.add_lesson.old_info});
        this.setState({add_lesson:respAdd_Lesson})
      });
    }
  }

  delete_user(user_id:number){
    var confirm = prompt("Для подтверждения введите: yes", "no")
    if(confirm=== "yes"){
      var formData = new FormData()
      formData.append("csrfmiddlewaretoken", this.props.token);
      formData.append("delete_user", `${user_id}`);
      fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
        console.log(resp);
        this.setState({users:resp.users});
      });
    }
  }

  delete_pair(pair_id:number){
    var confirm = prompt("Для подтверждения введите: yes", "no")
    if(confirm=== "yes"){
      var formData = new FormData()
      formData.append("csrfmiddlewaretoken", this.props.token);
      formData.append("delete_pair", `${pair_id}`);
      fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
        console.log(resp);
        const emptyAdd_Lesson = this.add_lessonUpdate({pair_id:0, date:`0`});
        this.setState({pairs:resp.pairs, add_lesson:emptyAdd_Lesson});
      });
    }
  }
/*
  change_lesson(field, value){
    var add_lesson=this.state.add_lesson;
    add_lesson[field]=value;
    this.setState({add_lesson: add_lesson});
  }
*/
  get_timetable_text(source:string){
    var formData = new FormData();
    formData.append("csrfmiddlewaretoken", this.props.token);
    formData.append("user_id",`${this.state.user_id}`);
    formData.append("timetable_text", source);
    fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
      console.log(resp);
      this.setState({timetable_text:resp.text});
    });
  }

  choose_user(user_id:number){
    let targetUser = this.state.users.filter(function (user) {return user.user_id == user_id})[0];    
    this.setState({user_id:user_id, user_tg:targetUser?.tg || 0, timetable_text:""})
  }

  render(){     
    return (
      <div className="container">
        <h2>Добавить урок для пары учитель ученик</h2>
        <div className="row">
          <div className="col-md-6">
            <select className="form-control form-control-lg"
              onChange={(e)=>this.choose_user(parseInt(e.target.value))}>
              {this.state.users.filter(function (user) {return user.role === "student"}).map((user, index)=>
                <option value={user.user_id}>{user.name}</option>)
              }
            </select>
          </div>
          <div className="col-md-6">
            <h5>{this.state.user_tg ?<a href={"https://t.me/"+this.state.user_tg}>{this.state.user_tg}</a> :"Выберите ученика"} </h5>
          </div>
          <div className="col-md-12">
            {this.state.user_id ?
              <div className="btn-group my-1">      
                <button  type="button" className="btn btn-info" onClick={(e)=>this.get_timetable_text("telegram")}>Telegram timetable</button>
                <button  type="button" className="btn btn-success"  onClick={(e)=>this.get_timetable_text("whatsapp")}>Whats App timetable</button>
                {this.state.timetable_text ? 
                  <button  type="button" className="btn btn-warning"  onClick={(e)=>this.setState({timetable_text:""})}>Close</button> : ""}
              </div>:""
            }
            {this.state.timetable_text ? 
              <div className="row">
                <div className="col-md-6">
                  <h5>Студенту</h5>
                  <textarea value={this.state.timetable_text[0]} cols={50} rows={30}></textarea>
                </div>
                <div className="col-md-6">
                  <h5>Учителю</h5>
                  <textarea value={this.state.timetable_text[1]}  cols={50} rows={30}></textarea>
                </div>
              </div>:""
            }
          </div>
          {this.state.pairs.map((pair, index)=>
            this.state.user_id==pair.user_id?
            <div className="col-md-3">
              <div className={pair.pair_id===this.state.add_lesson.pair_id?"element-card selected":"element-card"}
                onClick={()=>this.pair_id_info(pair.pair_id)}>{pair.name}
                {pair.chat_id ? "": <span> &#10007;</span>}
              </div>
              {this.state.add_lesson.pair_id===pair.pair_id ?
              <div>
              </div>:""}
            </div>:""
          )}
        </div>
        <br/>
        {this.state.add_lesson.pair_id ?
          <div>
            <LessonEditor 
            key={this.state.childKey}
            services={this.state.services}
            responsibles={this.props.responsibles}
            token={this.props.token}
            manage_url='/manage/'
            add_lesson={this.state.add_lesson}
            save_lesson={this.save_lesson}
            today={this.props.today}
           // edit_lesson={this.edit_lesson}
            //cancel_lesson={this.cancel_lesson}
            />
            <div>
              <table className="table table-striped">
                <thead>
                  <tr><th>Текст</th><th>Повтор</th><th>Уведомление<br/> отправлено</th><th>Timezone</th><th>Действие</th></tr>
                </thead>
                <tbody>
                    <tr><td>{this.state.add_lesson.info.start} - {this.state.add_lesson.info.end} {this.state.add_lesson.info.name}
                     {this.state.add_lesson.info.break ? ", перерыв "+this.state.add_lesson.info.break :""}
                      {parseInt(this.state.add_lesson.info.duration_cost)>=0?
                        <div><br/><strong className={"text-danger"}>Себестоимость {this.state.add_lesson.info.duration_cost} мин</strong>
                        </div>:""
                      }
                      </td>
                      <td>{this.state.add_lesson.info.repeat!="0" ? <span> {this.state.add_lesson.info.repeat!="30" ? this.state.add_lesson.info.repeat+'w' : '1m'}</span> : ""}</td>
                      <td>{this.state.add_lesson.info.notification ? <div className={"click"}> <span onClick={()=>this.send_notification(this.state.add_lesson.info.id)}
                          className="text-secondary">ReSend</span></div> :
                          <div className={"click"}> <span onClick={()=>this.send_notification(this.state.add_lesson.info.id)}
                          className="text-primary">Send</span></div>}
                      </td>
                      <td>{this.state.add_lesson.info.tz_name}</td>
                      <td >
                        <strong className="click-block">
                          <div className="click" onClick={()=>this.edit_lesson(this.state.add_lesson)}><i className="fa fa-edit text-primary fa-lg"/></div> &nbsp;
                          <div className="click" onClick={()=>this.cancel_lesson(this.state.add_lesson.id)}><i className="fa fa-trash text-danger fa-lg"/></div> &nbsp;
                          {this.state.add_lesson.info.repeat==="1"?<div className="click" onClick={()=>this.cancel_lesson(this.state.add_lesson.id, 1)}><i className="fa fa-power-off text-danger fa-lg"/></div>:""}</strong></td>
                    </tr>
                </tbody>
              </table>
              <button type="button" onClick={()=>this.delete_pair(this.state.add_lesson.pair_id)} className="btn btn-outline-danger">Расформировать пару</button><br/>
              <strong>Текст для копирования</strong>
                <p className="text-success">{this.state.add_lesson.old_info.start} - {this.state.add_lesson.old_info.end}
                 {this.state.add_lesson.old_info.name} ({this.state.add_lesson.old_info.teacher}) </p>
                <p>{this.state.add_lesson.info.start} - {this.state.add_lesson.info.end}
                 {this.state.add_lesson.info.name} ({this.state.add_lesson.info.teacher}) </p>
            </div>
          </div>:<p>Выберите пару ученик-учитель</p>
        }
        <br/>
        <hr/>
        <div className="row">
          <div className="col-md-6">
            <h2>Ученики</h2>
            {this.state.add_pair.student ? <button type="button" onClick={()=>this.delete_user(this.state.add_pair.student)} className="btn btn-outline-danger">
              Удалить ученика</button>:""
            }
            {this.state.users.filter(function (user) {return user.role === "student"}).map((user, index)=>
              <div className={user.user_id===this.state.add_pair.student?"element-card selected":"element-card"}
                onClick={()=>this.setState({add_pair:{student:user.user_id, teacher:this.state.add_pair.teacher}})}>{user.name}</div>)
            }
            <div className="element-card" onClick={()=>this.add_user("student")}><span className="text-success">Добавить ученика</span></div>
          </div>
          <div className="col-md-6">
            <h2>Учителя</h2>
            {this.state.add_pair.teacher ? <button type="button" onClick={()=>this.delete_user(this.state.add_pair.teacher)} className="btn btn-outline-danger">
              Удалить учителя</button>:""
            }
            {this.state.users.filter(function (user) {return user.role === "teacher"}).map((user, index)=>
              <div className={user.user_id===this.state.add_pair.teacher?"element-card selected":"element-card"}
                onClick={()=>this.setState({add_pair:{student:this.state.add_pair.student, teacher:user.user_id}})}>{user.name}</div>)
            }
            <div className="element-card" onClick={()=>this.add_user("teacher")}><span className="text-success">Добавить учителя</span></div>
          </div>
        </div>
        <div>
          <p>Чтобы добавить пару выберите ученика из левой колонки, учитель из правой и нажмите создать пару.</p>
          <button type="button" className="btn btn-success" onClick={()=>this.add_pair()}
            disabled={!this.state.add_pair.student || !this.state.add_pair.teacher}>Создать пару ученик-учитель</button>
        </div>
        <br/>
        <hr/>
        <div className="row">
          <div className="col-md-6">
            <h2>Пары учитель-ученик без чата</h2>
            {this.state.pairs.filter(function (pair) {return pair.chat_id === 0}).map((pair, index)=>
              <div className={pair.pair_id===this.state.add_chat.chat_id?"element-card selected":"element-card"}
                onClick={()=>this.setState({add_chat:{chat_id:0, date:'', text:''}})}>{pair.name}</div>
            )}
          </div>
          <div className="col-md-6">
            <h2>Чаты с ботом без пары</h2>
            {this.state.chats.map((chat)=>{
              return(
              <div className={chat.chat_id===this.state.add_chat.chat_id?"element-card selected":"element-card"}
                onClick={()=>this.setState({add_chat:{chat_id:0, date:'', text:''}})}><span>{chat.text} ({chat.date})</span><br/><small>{chat.chat_id}</small></div>
            )})}
            <p>Чтобы добавить групповой чат:<br/>
              <ul><li>Добавьте @Edera_bot в групповой чат</li>
                  <li>Дайте боту права администратора</li>
                  <li>Напишите любое сообщение в чат</li>
                  <li>Обновите страницу, чат появится здесь</li>
              </ul>
            </p>
            <ul>
              <li>
                <a href="/clear" target="_blank">Почистить кеш (если не видно новых чатов)</a>
              </li>
              <li><a href="/tg" target="_blank">Все чаты</a></li>
            </ul>
          </div>
        </div>
        <button type="button" className="btn btn-success" onClick={()=>this.add_chat()}
          disabled={!this.state.add_chat.chat_id || !this.state.add_chat.chat_id}>
          Связать пару и чат
        </button>
        <br/>
        <hr/>
      </div>
    )
  }
}
