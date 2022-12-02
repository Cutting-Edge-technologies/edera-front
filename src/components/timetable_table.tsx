import React from "react";
import * as Reactstrap from "reactstrap";
import { IHaveToken } from "../shared/typings";
import { IUser } from "./activate";
import { IGroup } from "./service";

const Modal = Reactstrap.Modal;
const ModalHeader = Reactstrap.ModalHeader;
const ModalBody = Reactstrap.ModalBody;
const ModalFooter = Reactstrap.ModalFooter;


export interface ILesson {
  id:number;
  pair_id:number;
  name: string;
  info: string;
  old_info: string;
  repeat: string;
  break_start:string;
  break_duration:string;
  date: string;
  start_hour: string;
  start_minute: string;
  hours: string;
  minutes: string;
  service: ILessonEditorService;
  tz: ITimeZone;
  responsible: string;
  duration_cost: string;
  zoom: string;
}

export interface ITimeZone {
  id: string;
  name: string;
  hours: string;
}

export interface ILessonEditorService {
  note_id: number;
  name: string;
  cost: number;
  earn: number;
}

export interface IZoom  extends IGroup{}

export interface ILessonEditorProps extends IHaveToken{
  add_lesson:ILesson;
  save_lesson: Function;
  services:ILessonEditorService[];
  responsibles: string[];
  manage_url:string;
  today:string;
}

export interface ILessonEditorState {
  add_lesson: ILesson;
  services: ILessonEditorService[];
  responsibles: any;
  zooms: IZoom[];
  timezones:ITimeZone[]
}

let hours: string[] = [];
let minutes: string[] = [];

 let i:number;
 for(i=0;i<60;i+=5){
   minutes = minutes.concat(i.toString());
 }
 for(i=0;i<24;i++) {
  // var ist = i.toString();
   hours = hours.concat(i.toString());
 }

export class LessonEditor extends React.Component <ILessonEditorProps, ILessonEditorState>{
  constructor(props: ILessonEditorProps) {
    super(props);
    this.state={
      add_lesson:this.props.add_lesson,
      services:this.props.services,
      responsibles:this.props.responsibles,
      zooms: [],
      timezones:[]
    }
   // console.log(this.state.chats);
  }

  get_zooms(){
    var formData = new FormData(document.getElementById("add_lesson") as HTMLFormElement);
    formData.append("csrfmiddlewaretoken", this.props.token);
    formData.append("action", "get_zooms");
    fetch(this.props.manage_url, {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
      console.log("get_zooms", resp);
      this.setState({zooms:resp.items})
    });
  }

  get_timezones(){
    var formData = new FormData();
    formData.append("csrfmiddlewaretoken", this.props.token);
    formData.append("action", "get_timezones");
    fetch(this.props.manage_url, {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
      console.log("get_timezones", resp);
      this.setState({timezones:resp.items})
    });
  }

  componentDidMount(){
    console.log("lesson editor", this.state.add_lesson)
    this.get_zooms();
    this.get_timezones();
  }

  do_add_lesson(copy:number=0){
    var formData = new FormData(document.getElementById("add_lesson") as HTMLFormElement);
    formData.append("csrfmiddlewaretoken", this.props.token);
    formData.append("pair_id", `${this.state.add_lesson.pair_id}`);    
    if(copy==0){
      if(this.state.add_lesson.id){
      formData.append("lesson_id", `${this.state.add_lesson.id}`);
    }}
    formData.append("add_lesson", '1');
    fetch(this.props.manage_url, {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
      console.log(resp);
      this.props.save_lesson(resp);
      //this.setState({add_lesson:{pair_id:this.state.add_lesson.pair_id, info:resp.info, old_info: this.state.add_lesson.old_info}});
      //this.get_zooms();
    })
  }

  change_break(v:string){
    console.log(v);
    var lesson = this.state.add_lesson;
    lesson.break_duration = v;
    console.log(lesson);
    this.setState({add_lesson:lesson});
  }

  change_lesson(field: string, value:string){
    let add_lesson=this.state.add_lesson;
    if ( field in add_lesson) {
      add_lesson.field = value;
    }
    this.setState({add_lesson: add_lesson});
  }

  render(){
  //this.zooms = this.state.zooms.slice();
  //this.zooms.push({"id":0, "name":"Без Zoom"});
  //console.log("render zooms", this.zooms);
  return (
    <div>
      <form id="add_lesson">
        <div>
          <h3>Урок {" "}
            {this.state.add_lesson.id>0 ? this.state.add_lesson.id : "Новый"},
            {" "} пара {this.state.add_lesson.pair_id>0 ? this.state.add_lesson.pair_id : " Empty"}
          </h3>
        </div>
        <div className="form-group row my-1">
            <div className="col-md-4 col-sm-5 col-12 mb-3">
              <label>Дата</label>
              <input className="form-control form-control-lg mx-1" name="date" type="date"
                value={this.state.add_lesson.date ? this.state.add_lesson.date : this.props.today}
                onChange={(e)=>this.change_lesson("date", e.target.value)}
              />
            </div>
            <div className="col-md-2 col-sm-2 col-3 mb-3">
              <label>Начало (часы)</label>
              <select className="form-control form-control-lg mx-1" name="start_hour"
                value={this.state.add_lesson.start_hour?this.state.add_lesson.start_hour:"9"}
                onChange={(e)=>this.change_lesson("start_hour", e.target.value)}>
                {hours.map((value, index)=>
                  <option value={value}>{value}</option>)
                }
              </select>
            </div>
            <div className="col-md-2 col-sm-2 col-3 mb-3">
              <label>(минуты)</label>
              <select name="start_minute" className="form-control form-control-lg mx-1"
                value={this.state.add_lesson.start_minute?this.state.add_lesson.start_minute:"0"}
                onChange={(e)=>this.change_lesson("start_minute", e.target.value)}>
                {
                  minutes.map((value, index)=>
                  <option value={value}>{value} минут</option>)
                }
              </select>
            </div>
            <div className="col-md-2 col-sm-2 col-3  mb-3">
              <label>Длительность (часы)</label>
              <select name="hours" className="form-control form-control-lg mx-1"
                value={this.state.add_lesson.hours?this.state.add_lesson.hours:""}
                onChange={(e)=>this.change_lesson("hours", e.target.value)}>
                <option value="0">0</option>
                <option value="1">1 час</option>
                <option value="2">2 часа</option>
                <option value="3">3 часа</option>
                <option value="4">4 часа</option>
              </select>
            </div>
            <div className="col-md-2 col-sm-2 col-3 mb-3">
              <label>(минуты)</label>
              <select name="minutes" className="form-control form-control-lg mx-1"
                value={this.state.add_lesson.minutes?this.state.add_lesson.minutes:""}
                onChange={(e)=>this.change_lesson("minutes", e.target.value)}>
                {
                  minutes.map((value, index)=>
                  <option value={value}>{value} минут</option>)
                }
              </select>
            </div>
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <input name="name" className="form-control form-control-lg mx-1"
                placeholder="Mathematics"
                onChange={(e)=>this.change_lesson("name", e.target.value)}
                value={this.state.add_lesson.name?this.state.add_lesson.name:""}/>
            </div>
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <select name="service" className="form-control form-control-lg mx-1"
                onChange={(e)=>this.change_lesson("service", e.target.value)}
                value={`${this.state.add_lesson.service}`}>
                {
                  this.state.services.map((s, index)=>
                  <option value={s.note_id}>{s.name}, ({s.cost}, {s.earn})</option>
                )}
              </select>
            </div>
            <div className="col-md-4 col-sm-6 col-6 mb-3">
              <select name="repeat" className="form-control form-control-lg mx-1"
                onChange={(e)=>this.change_lesson("repeat", e.target.value)}
                value={this.state.add_lesson.repeat?this.state.add_lesson.repeat:"0"}>
                  <option value="0">Одноразовый</option>
                  <option value="1">1 week</option>
                  <option value="2">2 week</option>
                  <option value="4">4 week</option>
                  <option value="30">1 month</option>
              </select>
            </div>
            <div className="col-md-2 col-sm-6 col-6 mb-3">
              <button type="button" className="btn btn-lg btn-success"
                onClick={()=>this.do_add_lesson()}>{this.state.add_lesson.id ?"Сохранить":"Добавить урок"}
              </button>
            </div>
            <div className="col-md-2 col-sm-6 col-6 mb-3">
              {
                this.state.add_lesson.id > 0 ?
                <button type="button" className="btn btn-lg btn-info"
                onClick={()=>this.do_add_lesson(1)}>Копировать</button>:""
              }
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-mb-3">
              <select name="tz" className="form-control form-control-lg mx-1"
                value={`${this.state.add_lesson.tz}`}
                onChange={(e)=>this.change_lesson("tz", e.target.value)}
              >
                {this.state.timezones.map((item, index)=>
                  <option value={item.id}>{item.hours} - {item.name}</option>
                )}
              </select>
            </div>
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <select name="break_duration" className="form-control form-control-lg mx-1"
                value={this.state.add_lesson.break_duration}
                onChange={(e)=>this.change_lesson("break_duration", e.target.value)}
              >
                <option value="0">Без перерыва</option>
                <option value="10">10 мин</option>
                <option value="20">20 мин</option>
                <option value="30">30 мин</option>
                <option value="45">45 мин</option>
                <option value="60">60 мин</option>
              </select>
            </div>
            {this.state.add_lesson.break_duration ?
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <select name="break_start" className="form-control form-control-lg mx-1"
                  onChange={(e)=>this.change_lesson("break_start", e.target.value)}
                  value={this.state.add_lesson.break_start}
                >
                  <option value="30">Через 30 мин</option>
                  <option value="45">Через 45 мин</option>
                  <option value="60">Через 1 час</option>
                  <option value="75">Через 1 час 15 мин</option>
                  <option value="90">Через 1.5 часа</option>
                </select>
              </div> : ""
            }
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <select name="responsible" className="form-control form-control-lg mx-1"
                onChange={(e)=>this.change_lesson("responsible", e.target.value)}
                value={this.state.add_lesson.responsible?this.state.add_lesson.responsible:"A, E"}
              >
                {this.props.responsibles.map((value, index)=>
                <option value={value}>{value}</option>)
                }
              </select>
            </div>
              {this.state.add_lesson.id?
                <div className="col-md-4 col-sm-4 col-6  mb-3">
                  <label>Себестоимость (минуты), -1 значит как занятие</label>
                    <input name="duration_cost" type="number" className="form-control form-control-lg mx-1"
                    onChange={(e)=>this.change_lesson("duration_cost", e.target.value)}
                    value={this.state.add_lesson.duration_cost}>
                  </input>
                </div>:""
              }
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <div className="input-group mx-1">
                <button type="button" className="btn btn-outline-secondary" onClick={()=>this.get_zooms()}><i className="fa fa-refresh"></i></button>
                <select name="zoom" className="form-control form-control-lg"
                  onChange={(e)=>this.change_lesson("zoom", e.target.value)}
                  value={this.state.add_lesson.zoom?this.state.add_lesson.zoom:"0"}>                
                  {this.state.zooms.map((item, index)=>
                    <option value={item.id}>{item.name}</option>
                  )}
                </select>
              </div>                    
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export interface ISchaduleData {
  id: string;
  day_of_week:number;
  start_hour: string;
  title: string;
  startDate: string;
  endDate: string;
  color:string;
}

export interface ISchaduleLesson extends ILesson{
 // lesson_id: number,
}

export const url = `https://exampleURL.com`;
export const manage_url = `https://exampleManage_URL.com`;

export const initialLesson: ISchaduleLesson = {
  id:-1,
 // lesson_id: -1,
  pair_id: -1,
  info: '',
  name: '',
  old_info: '',
  repeat: '',
  break_duration:"",
  break_start:"",
  date:"",
  duration_cost:"",
  hours:"",
  minutes:"",
  responsible:"",
  service:{
    cost:-1,
    earn:-1,
    name:"",
    note_id:-1
  },
  start_hour:"",
  start_minute:"",
  tz:{
    hours:"",
    id:"",
    name:""
  },
  zoom:""
};
export const initialData: ISchaduleData = {
  color:"",
  day_of_week:-1,
  endDate:"",
  id:"",
  start_hour:"",
  startDate:"",
  title:""
};

export interface ISchaduleProps extends IHaveToken {
  appointments: ISchaduleData[];
  currentDate: string;
  days: string[];
}

export interface ISchaduleState {
  id: number;
  data: ISchaduleData[];
  currentDate: string;
  name: string;
  teacher: number;
  family: number;
  student: number;
  typ: string;
  edit: number;
  add_lesson: ISchaduleLesson;
  childKey: number;
  modal:boolean;
  show_item: ISchaduleData;
  days: string[];
  zoom: number;
}

export class DemoSchedule extends React.Component <ISchaduleProps, ISchaduleState>{
  constructor(props: ISchaduleProps) {
    super(props);
	  this.state = {
      id: -1,
      data:this.props.appointments,
	    currentDate:this.props.currentDate,
      name:"Anyone",
      teacher:0,
      family:0,
      student:0,
      typ:"student",
      edit:0,
      add_lesson:initialLesson,
      childKey:0,
      modal:false,
      show_item: initialData,
      days:["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      zoom:0
    };
	console.log(this.state);

  //this.hours = [];
  //this.minutes = [];
  //var i;
  //for(i=0;i<60;i+=5){this.minutes = this.minutes.concat(i.toString());}
  //for(i=0;i<24;i++) {this.hours = this.hours.concat(i.toString());}
  //
  this.save_lesson=this.save_lesson.bind(this);
  this.cancel_lesson = this.cancel_lesson.bind(this);
  this.edit_lesson= this.edit_lesson.bind(this);
  this.show_toggle = this.show_toggle.bind(this);
	//this.days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
	}

  currentDateChange(delta:number=7){
    let dt = Date.parse(this.state.currentDate);
    let result = new Date(dt);
    result.setDate(result.getDate() + delta);
    this.filter_student(this.state.teacher, "teacher", result.toISOString().substring(0, 10));
  };

  first_and_last_dt(){
    let dt = Date.parse(this.state.currentDate); // get current date
    let curr = new Date(dt);
    let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    let last = first + 6; // last day is the first day + 6
    let firstday = new Date(curr.setDate(first)).toDateString();
    let lastday = new Date(curr.setDate(last)).toDateString();
    return (firstday.substring(4, 11) + " - " + lastday.substring(4))
  }

	show_toggle(item:ISchaduleData){
    if(!this.state.modal){this.setState({modal:true, show_item:item})}
    
    else{this.setState({modal:false, show_item: initialData})}
  }

	filter_student(id: number, typ:string ="student", date=this.state.currentDate){
    console.log(date);
    var teacher = this.state.teacher;
    var student = this.state.student;
    var family = this.state.family;
    var zoom = this.state.zoom;
    if(typ==="student"){this.setState({"student":id});student=id;family=0;}
    else if(typ==="teacher"){this.setState({"teacher":id});teacher=id;}
    else if(typ==="family"){this.setState({"family":id});family=id;student=0;}
    else if(typ==="zoom"){this.setState({"zoom":id});zoom=id;}
		else if(typ==="reset"){this.setState({"family":0, "student":0, "teacher":0});teacher=0;student=0;family=0;zoom=0;}
    var formData = new FormData();
    formData.append("csrfmiddlewaretoken", this.props.token);
    formData.append("student", `${student}`);
    formData.append("teacher", `${teacher}`);
    formData.append("family", `${family}`);
    formData.append("zoom", `${zoom}`);
    formData.append("date", date);
    fetch(url, {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
      console.log(resp);
				//let lessons = resp.lessons.slice(1, 98);
				//console.log("lessons", lessons)
      this.setState({data:resp.lessons, name:resp.name, typ:typ, id:id,
        currentDate:date, days:resp.days
      })
    });
  }

  save_lesson(resp:ISchaduleLesson){
    this.setState({childKey:this.state.childKey+1});
    //empty object replaced  an with resp, resp changed type
    this.setState({edit:0, add_lesson:resp});
    this.filter_student(this.state.teacher, "teacher", this.state.currentDate);     
  }

	to_edit_lesson(){
		var formData = new FormData();
		formData.append("csrfmiddlewaretoken", this.props.token);
		formData.append("get_lesson_by_id", this.state.show_item.id);
		fetch(manage_url, {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
			console.log(resp);
       //show_item:0 replaced  an with initialData
			this.setState({edit:1, add_lesson: resp.lesson, modal:false, show_item:initialData})
		});
	}
  edit_lesson(lesson: ISchaduleLesson){
    lesson.pair_id = this.state.add_lesson.pair_id;
    lesson.info = this.state.add_lesson.info;
    lesson.old_info = this.state.add_lesson.old_info;
    //this.setState({add_lesson:{pair_id:0, date:0}});
    //console.log(lesson);
    this.setState({childKey:this.state.childKey+1});
    this.setState({add_lesson:lesson});
  }


  cancel_lesson(lesson_id: number, single:number=0){
    var msg;
    if(single){
        msg = "Этот урок будет одноразово отменен, но если включено повторение, следующие останутся.\n"
    }
    else{msg = "Урок и его повторы будут удалены.\n"}
    var confirm = prompt(msg + "Для подтверждения введите: yes", "no")
    if(confirm=== "yes"){
      var formData = new FormData();
      formData.append("csrfmiddlewaretoken", this.props.token);
      formData.append("cancel_lesson", `${lesson_id}`);
      formData.append("single", `${single}`);
      fetch(manage_url, {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
        console.log(resp);
        this.filter_student(this.state.teacher, "teacher", this.state.currentDate)
         //empty object replaced  an with initialLesson
        this.setState({edit:0, add_lesson:initialLesson, childKey:this.state.childKey+1});
      });
    }
  }
	render_timetable(){
		return (
			<div>
        <div className="row my-1">
          <button className="btn btn-secondary col-sm-2 col-4 mx-2" onClick={()=>this.currentDateChange(-7)}>
            Previous week
          </button>
          <div className="col-sm-2 col-4 mx-2">{this.first_and_last_dt()}</div>
          <button className="btn btn-secondary col-sm-2 col-4 mx-2" onClick={()=>this.currentDateChange(7)}>
            Next week
          </button>
        </div>
				<table className="table table-bordered table-striped">
				  <thead>
					  <tr>
						  <th style={{width: "2%"}}></th>
						  {this.state.days.map((item, index)=><th style={{width: "14%"}}>{item}, {this.state.days[index]}</th>)}
					  </tr>
				  </thead>
				  <tbody>
					  {hours.map((hour, i1)=>
					    <tr>
						    <td>{hour}:00</td>
						    {this.state.days.map((day, i2)=>
						      <td style={{padding:0}}>
                    {this.state.data.filter((el)=>{return (el.day_of_week==i2) && (el.start_hour.toString()==hour)}
							      ).map((item, index)=>
							        <p style={{background: item.color, color:"white", padding: "4px", cursor:"pointer"}}
							          onClick={()=>this.show_toggle(item)}>
								        <strong>{item.title}</strong>
								        <br/>
								        {item.startDate} - {item.endDate}
							        </p>)
							      }
						      </td>
                )}
					    </tr>
					  )}
				  </tbody>
				</table>
			</div>
		)
	}
	render() {
    const { data, currentDate, show_item } = this.state;
	  console.log(data);
    return (
      <div className="container">
			<Modal isOpen={this.state.modal} toggle={this.show_toggle}
        className="success wide-modal">
        <ModalHeader toggle={this.show_toggle}>{show_item.title} (id = {show_item.id})</ModalHeader>
        <ModalBody>
          <div className="img-container">
	          <p>{show_item.date} </p>
            <p>{show_item.startDate} - {show_item.endDate} (Moscow Time Zone)</p>
	          { show_item.tz_name &&
	            <p>{show_item.startDate_orig} - {show_item.endDate_orig} ({show_item.tz_name})</p>
            }
	          <p>
              Student: {show_item.student_tg ?
              <a href={"https://t.me/"+show_item.student_tg }>{show_item.location}</a>:
              show_item.location}
            </p>
            <p>
              Teacher: {show_item.teacher_tg ?
              <a href={"https://t.me/"+show_item.teacher_tg }>{show_item.teacher}</a>:
              show_item.teacher}
		        </p>
            {show_item.zoom?<p>Zoom: {show_item.zoom}</p>:""}
            {show_item.meeting? <p>Meeting_id: {show_item.meeting}</p>:""}
            {show_item.mentor?
              <p>Mentor:&nbsp;
                {show_item.mentor.tg ?
                  <a href={"https://t.me/"+show_item.mentor.tg }>{show_item.mentor.name}</a>:
                  show_item.mentor.name
                }
              </p>:""
            }
            {show_item.manager?
              <span>
                Manager:&nbsp;
                {show_item.manager.tg ?
                  <a href={"https://t.me/"+show_item.manager.tg }>{show_item.manager.name}</a>:
                  show_item.manager.name
                }
              </span>:""
            }
        	  {show_item.duration_cost>=0?
              <p>Себестоимость {show_item.duration_cost} мин</p>:""
            }
          </div>
        </ModalBody>
			    <ModalFooter>
					  <button className="btn btn-warning" onClick={()=>this.to_edit_lesson()}>Edit</button>
				  </ModalFooter>
      </Modal>
        <div className="row">
          <div className="col-md-2 col-sm-6">
            <label htmlFor="student">Students</label>
            <select name="student" id="student" className="form-control"
              onChange={(e)=>this.filter_student(parseInt(e.target.value), "student")}
              value={this.state.student}
            >
              <option value={0}>Anyone</option>
              {this.props.students.map((student, index)=>
                <option value={student.id}>{student.name}</option>)}
            </select>
          </div>
          {can_edit ?
            <div className="col-md-2 col-sm-6" >
              <label htmlFor="teacher">Families</label>
              <select name="family" id="family" className="form-control"
                onChange={(e)=>this.filter_student(parseInt(e.target.value), "family")}
                value={this.state.family}
              >
                <option value={0}>Anyone</option>
                {this.props.families.map((student, index)=>
                  <option value={student.id}>{student.name}</option>)}
              </select>
            </div> : ""}
          {can_edit ?
            <div className="col-md-2 col-sm-6">
              <label htmlFor="teacher">Teachers</label>
              <select name="teacher" id="teacher" className="form-control"
                onChange={(e)=>this.filter_student(parseInt(e.target.value), "teacher")}
                value={this.state.teacher}
              >
                <option value={0}>Anyone</option>
                {this.props.teachers.map((student, index)=>
                    <option value={student.id}>{student.name}</option>)}
              </select>
            </div> : ""
          }
          {can_edit ?
            <div className="col-md-2 col-sm-6">
              <label htmlFor="teacher">Zooms</label>
              <select name="zoom" id="zoom" className="form-control"
                onChange={(e)=>this.filter_student(parseInt(e.target.value), "zoom")}
                value={this.state.zoom}
              >
                <option value={0}>Anyone</option>
                <option value={-1}>No zoom</option>
                {this.props.zooms.map((zoom, index)=>
                    <option value={zoom.id}>{zoom.name}</option>)}
              </select>
            </div> : ""
          }
          <div className="col-md-2 col-sm-6">
            <label>Current filter</label><br/>
            <span>{this.state.name}</span>
            <span className="reset-btn" onClick={()=>this.filter_student(0, "reset")}>Reset</span>
          </div>
        </div>
        {!this.state.edit || !can_edit ?
			    this.render_timetable():
			    <div>
		        <LessonEditor key={this.state.childKey}
              services={services}
              responsibles={this.props.responsibles}
              token={this.props.token}
              manage_url= {manage_url}
              add_lesson={this.state.add_lesson}
              save_lesson={this.save_lesson}
              edit_lesson={this.edit_lesson}
              cancel_lesson={this.cancel_lesson}
            />
            <div className="row">
              <div className="col-md-3 col-sm-6 col-6 mb-3">
                <button type="button" className="btn btn-lg btn-secondary mx-1"
                  onClick={()=>this.setState({edit:0, add_lesson:{}, childKey:this.state.childKey+1})}>
                  Назад
                </button>
              </div>
              <div className="col-md-3 col-sm-6 col-6 mb-3">
                <button type="button" className="btn btn-lg btn-warning mx-1"
                  onClick={()=>this.cancel_lesson(this.state.add_lesson.id, 1)}>
                  Отменить урок
                </button>
              </div>
              <div className="col-md-3 col-sm-6 col-6 mb-3">
                <button type="button" className="btn btn-lg btn-danger mx-1"
                  onClick={()=>this.cancel_lesson(this.state.add_lesson.id)}>
                  Удалить
                </button>
              </div>    
            </div>
          </div>
        }
      </div> 
    );
  }
}
