import React from "react";
import { IHaveToken } from "../shared/typings";
import { IGroup } from "./service";

export interface ILesson {
  id:number;
  pair_id:number;
  name: string;
  info: ILessonInfo;
  old_info: ILessonInfo;
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

export interface ILessonInfo {
  start: string;
  end: string;
  name: string;
  break: string;
  duration_cost: string;
  repeat: string;
  id:number;
  tz_name: string;
  teacher: string;
  notification:string;
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

export let hours: string[] = [];
export let minutes: string[] = [];

 let i:number;
 for(i=0;i<60;i+=5){
   minutes = minutes.concat(i.toString());
 }
 for(i=0;i<24;i++) {
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

  change_lesson(fieldDifirense: Partial<ILesson>){
    const lesson = {...this.state.add_lesson, ...fieldDifirense};
    this.setState({add_lesson: lesson});
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
                onChange={(e)=>this.change_lesson({date: e.target.value})}
              />
            </div>
            <div className="col-md-2 col-sm-2 col-3 mb-3">
              <label>Начало (часы)</label>
              <select className="form-control form-control-lg mx-1" name="start_hour"
                value={this.state.add_lesson.start_hour?this.state.add_lesson.start_hour:"9"}
                onChange={(e)=>this.change_lesson({start_hour: e.target.value})}>
                {hours.map((value, index)=>
                  <option value={value}>{value}</option>)
                }
              </select>
            </div>
            <div className="col-md-2 col-sm-2 col-3 mb-3">
              <label>(минуты)</label>
              <select name="start_minute" className="form-control form-control-lg mx-1"
                value={this.state.add_lesson.start_minute?this.state.add_lesson.start_minute:"0"}
                onChange={(e)=>this.change_lesson({start_minute: e.target.value})}>
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
                onChange={(e)=>this.change_lesson({hours: e.target.value})}>
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
                onChange={(e)=>this.change_lesson({minutes: e.target.value})}>
                {
                  minutes.map((value, index)=>
                  <option value={value}>{value} минут</option>)
                }
              </select>
            </div>
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <input name="name" className="form-control form-control-lg mx-1"
                placeholder="Mathematics"
                onChange={(e)=>this.change_lesson({name: e.target.value})}
                value={this.state.add_lesson.name?this.state.add_lesson.name:""}/>
            </div>
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <select name="service" className="form-control form-control-lg mx-1"
                onChange={(e)=>{
                  const service_id =  parseInt(e.target.value);
                  const target_service = this.state.services.find((item)=>item.note_id == service_id)
                  this.change_lesson({service: target_service})
                }}
                value={this.state.add_lesson.service.note_id}>
                {
                  this.state.services.map((s, index)=>
                  <option value={s.note_id}>{s.name}, ({s.cost}, {s.earn})</option>
                )}
              </select>
            </div>
            <div className="col-md-4 col-sm-6 col-6 mb-3">
              <select name="repeat" className="form-control form-control-lg mx-1"
                onChange={(e)=>this.change_lesson({repeat: e.target.value})}
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
                value={this.state.add_lesson.tz.id}
                onChange={(e)=>{
                  const tz_id =  e.target.value;
                  const target_tz = this.state.timezones.find((item)=>item.id == tz_id)
                  this.change_lesson({tz: target_tz})
                }}
              >
                {this.state.timezones.map((item, index)=>
                  <option value={item.id}>{item.hours} - {item.name}</option>
                )}
              </select>
            </div>
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <select name="break_duration" className="form-control form-control-lg mx-1"
                value={this.state.add_lesson.break_duration}
                onChange={(e)=>this.change_lesson({break_duration: e.target.value})}
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
                  onChange={(e)=>this.change_lesson({break_start: e.target.value})}
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
                onChange={(e)=>this.change_lesson({responsible: e.target.value})}
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
                    onChange={(e)=>this.change_lesson({duration_cost: e.target.value})}
                    value={this.state.add_lesson.duration_cost}>
                  </input>
                </div>:""
              }
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <div className="input-group mx-1">
                <button type="button" className="btn btn-outline-secondary" onClick={()=>this.get_zooms()}><i className="fa fa-refresh"></i></button>
                <select name="zoom" className="form-control form-control-lg"
                  onChange={(e)=>this.change_lesson({zoom: e.target.value})}
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