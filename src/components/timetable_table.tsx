import React from "react";
import * as Reactstrap from "reactstrap";
import { IHaveToken } from "../shared/typings";
import { IGroup } from "./service";
import { hours, ILesson, ILessonEditorService, ILessonInfo, IZoom, LessonEditor } from "./lessonEditor";

const Modal = Reactstrap.Modal;
const ModalHeader = Reactstrap.ModalHeader;
const ModalBody = Reactstrap.ModalBody;
const ModalFooter = Reactstrap.ModalFooter;

export interface ISchaduleData {
  id: string;
  day_of_week:number;
  start_hour: string;
  title: string;
  date: string;
  startDate: string;
  endDate: string;
  color:string;
  location: string;
  student_tg?: string;
  teacher_tg?: string;
  teacher: string;
  zoom?: string;
  meeting?: string;
  mentor?: {
    tg?: string;
    name: string;
  };
  manager?: {
    tg?: string;
    name: string;
  };
  duration_cost: number;
  startDate_orig: string;
  endDate_orig: string;
  tz_name: string;
}

export interface ISchaduleLesson extends ILesson{
}

export const url = `https://exampleURL.com`;
export const manage_url = `https://exampleManage_URL.com`;

export const initialLessonInfo: ILessonInfo = {
  start: "",
  end: "",
  name: "",
  break: "",
  duration_cost: "",
  repeat: "",
  id: 0,
  tz_name: "",
  teacher: "",
  notification: ""
}

export const initialLesson: ISchaduleLesson = {
  id:-1,
 // lesson_id: -1,
  pair_id: -1,
  info: initialLessonInfo,
  name: '',
  old_info: initialLessonInfo,
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
  title:"",
  date:"",
  duration_cost:0,
  location:"",
  teacher:"",
  endDate_orig:"",
  startDate_orig:"",
  tz_name:"",
};

export interface ISchaduleStudent extends IGroup{}
export interface ISchaduleFamily extends ISchaduleStudent{}
export interface ISchaduleTeacher extends ISchaduleStudent{}

export interface ISchaduleProps extends IHaveToken {
  appointments: ISchaduleData[];
  currentDate: string;
  days: string[];
  students:ISchaduleStudent[];
  families:ISchaduleFamily[];
  teachers:ISchaduleTeacher[];
  zooms:IZoom[];
  services:ILessonEditorService[];
  responsibles:string[];
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
  can_edit: boolean;
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
      zoom:0,
      //hard coded
      can_edit:true
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
        msg = "???????? ???????? ?????????? ???????????????????? ??????????????, ???? ???????? ???????????????? ????????????????????, ?????????????????? ??????????????????.\n"
    }
    else{msg = "???????? ?? ?????? ?????????????? ?????????? ??????????????.\n"}
    var confirm = prompt(msg + "?????? ?????????????????????????? ??????????????: yes", "no")
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
						  {this.state.days.map((item, index)=><th style={{width: "14%"}}>{item}, {this.props.days[index]}</th>)}
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
			<Modal isOpen={this.state.modal} toggle={()=>this.show_toggle}
        className="success wide-modal">
        <ModalHeader toggle={()=>this.show_toggle}>{show_item.title} (id = {show_item.id})</ModalHeader>
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
              <p>?????????????????????????? {show_item.duration_cost} ??????</p>:""
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
          {this.state.can_edit ?
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
          {this.state.can_edit ?
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
          {this.state.can_edit ?
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
        {!this.state.edit || !this.state.can_edit ?
			    this.render_timetable():
			    <div>
		        <LessonEditor key={this.state.childKey}
              services={this.props.services}
              responsibles={this.props.responsibles}
              token={this.props.token}
              manage_url= {manage_url}
              add_lesson={this.state.add_lesson}
              save_lesson={this.save_lesson}
              today = "today"
            //  edit_lesson={this.edit_lesson}
            //  cancel_lesson={this.cancel_lesson}
            />
            <div className="row">
              <div className="col-md-3 col-sm-6 col-6 mb-3">
                <button type="button" className="btn btn-lg btn-secondary mx-1"
                                    //empty object replaced  an with initialLesson
                  onClick={()=>this.setState({edit:0, add_lesson:initialLesson, childKey:this.state.childKey+1})}>
                  ??????????
                </button>
              </div>
              <div className="col-md-3 col-sm-6 col-6 mb-3">
                <button type="button" className="btn btn-lg btn-warning mx-1"
                  onClick={()=>this.cancel_lesson(this.state.add_lesson.id, 1)}>
                  ???????????????? ????????
                </button>
              </div>
              <div className="col-md-3 col-sm-6 col-6 mb-3">
                <button type="button" className="btn btn-lg btn-danger mx-1"
                  onClick={()=>this.cancel_lesson(this.state.add_lesson.id)}>
                  ??????????????
                </button>
              </div>    
            </div>
          </div>
        }
      </div> 
    );
  }
}
