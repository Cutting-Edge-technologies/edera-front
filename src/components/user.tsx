import React from "react";
import { IHaveToken } from "../shared/typings";
import { ISchaduleFamily, ISchaduleStudent, ISchaduleTeacher } from "./timetable_table";

export const colors = ["teal", "Chocolate","indigo", "DarkBlue", "CornflowerBlue",
"Peru", "Tomato", "SeaGreen", "SlateBlue", "RebeccaPurple",
"OliveDrab", "MidnightBlue", "IndianRed", "Grey", "DodgerBlue", "Orange", "Gold",
"BlueViolet", "Brown", "Black", "CadetBlue", "Crimson", "DarkCyan",
"DarkGoldenRod", "DarkGreen", "DarkMagenta", "DarkOliveGreen",
"DarkOrchid", "DarkSalmon", "DarkSlateBlue", "DarkSlateGray",
"DarkViolet", "DeepPink", "DimGray", "ForestGreen", "FireBrick", "IndianRed",
"LightSlateGray", "Maroon", "MediumPurple", "MediumSlateBlue", "MediumVioletRed",
"Sienna", "RoyalBlue", "SlateGray", "SteelBlue"
]

export interface IUserInfoManage extends ISchaduleStudent{}
export interface IUserInfoFamily extends ISchaduleFamily{
  note_id:number;
  name_sheets: string;
}
export interface IUserInfoTeacher extends ISchaduleTeacher {
  user_id: number;
  name_sheets: string;
  username: string;
  tg: string;
}
export interface IUserInfoUser {
  id:string;
  user_id: number;
  note_id:string;
  name: string;
  family: IUserInfoFamily;
  teacher: IUserInfoTeacher;
  manager: IUserInfoManage;
  name_sheets: string;
  name_ru: string;
  parent_name_ru: string;
  discount: string;
  tg: string;
  color: string;
}

export interface IUserInfoProps extends IHaveToken {
  users: IUserInfoUser[];
  families: IUserInfoFamily[];
  teachers: IUserInfoTeacher[];
  managers: IUserInfoManage[];
}
export interface IUserInfoState {
  users: IUserInfoUser[];
  families: IUserInfoFamily[];
  teachers: IUserInfoTeacher[];
  managers: IUserInfoManage[];
  edit_user: number;
  family: number;
}

export class UserInfo extends React.Component <IUserInfoProps, IUserInfoState> {
  constructor(props:IUserInfoProps) {
    super(props);
    this.state = {
      users: this.props.users,
      families: this.props.families,
      teachers:this.props.teachers,
      managers:this.props.managers,
      edit_user: 0,
      family:0
    };
  }

  add_user(){
    var name = prompt("Please enter family name", "Mark Ivanov");
    if(name!=null){
      var formData = new FormData();
      formData.append("csrfmiddlewaretoken", this.props.token);
      formData.append("name", name);
      formData.append("add_family", `1`);
      fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
        console.log(resp);
        var families = this.state.families.slice();
        families.push(resp.family);
        this.setState({families:families});
      });
    }
  }

  edit_user(index: number){
    var formData = new FormData(document.getElementById("edit_user") as HTMLFormElement);
    formData.append("csrfmiddlewaretoken", this.props.token);
    formData.append("edit_user", `${this.state.edit_user}`);
    fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
      console.log(resp);
      var users = this.state.users.slice();
      users[index] = resp.user;
      this.setState({edit_user:0, users:users})
    });
  }

  edit_teacher(index:number){
    var formData = new FormData(document.getElementById("edit_teacher") as HTMLFormElement);
    formData.append("csrfmiddlewaretoken", this.props.token);
    formData.append("edit_user", `${this.state.edit_user}`);
    fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
      console.log(resp);
      var teachers = this.state.teachers.slice();
      teachers[index] = resp.user;
      this.setState({edit_user:0, teachers:teachers})
    });
  }

  edit_family(index:number){
    var formData = new FormData(document.getElementById("edit_family") as HTMLFormElement);
    formData.append("csrfmiddlewaretoken", this.props.token);
    formData.append("edit_family", `${this.state.family}`);
    fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
      console.log(resp);
      var families = this.state.families.slice();
      families[index] = resp.family;
      this.setState({family:0, families:families})
    });
  }

  delete_family(note_id:number){
    var formData = new FormData();
    formData.append("csrfmiddlewaretoken", this.props.token);
    formData.append("delete_family", `${note_id}`);
    fetch("", {method: "POST", body: formData}).then(response => response.json()).then(
      (resp) => {console.log(resp);this.setState({families:resp.families});
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h2>??????????????</h2>
            {this.state.users.map((user, index) =>
              <div className={user.user_id === this.state.edit_user ? "element-card selected" : "element-card"}>
                {user.user_id === this.state.edit_user ?
                  <form id="edit_user">
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <input name="name" className="form-control form-control-lg" defaultValue={user.name}/>
                      </div>
                      <div className="col-md-12 mb-3">
                        <input name="name_sheets" className="form-control form-control-lg" defaultValue={user.name_sheets}
                          placeholder="As in google sheets"/>
                      </div>
                      <div className="col-md-12 mb-3">
                        <label>Russian name (for telegram)</label>
                        <input name="name_ru" className="form-control form-control-lg" defaultValue={user.name_ru}
                          placeholder="name_ru for tg timetable"/>
                      </div>
                      <div className="col-md-12 mb-3">
                        <label>Russian parent name (for telegram)</label>
                        <input name="parent_name_ru" className="form-control form-control-lg" defaultValue={user.parent_name_ru}
                          placeholder="parent_name_ru for tg timetable"/>
                      </div>
                      <div className="col-md-12 mb-3">
                        <label>Default Discount, %</label>
                        <input name="discount" className="form-control form-control-lg" defaultValue={user.discount}
                          placeholder="25"/>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="family">??????????</label>
                        <select name="family" id="family" className="form-control form-control-lg" defaultValue={user.family.id}>
                          <option value="0">???? ??????????????</option>
                          {this.state.families.map((family, index)=>
                            <option value={family.id}>{family.name}</option>
                          )}
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="color">???????? ?? ????????????????????</label>
                        <select id="color" name="color" className="form-control form-control-lg" defaultValue={user.color}>
                          {colors.map((color, index)=>
                            <option className="white" style={{"background":color}} value={color}>{color}
                            </option>)
                          }
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="tg">????????????????-??????????(?????? @)</label>
                        <input name="tg" className="form-control form-control-lg" defaultValue={user.tg}
                          placeholder="edera_bot"/>
                      </div>
                      <div className="col-md-12 mb-3">
										    <label className="form-label">????????????</label>
										    <select  typeof="text" name="manager" className="form-control form-control-lg" 
										      defaultValue={user.manager.id}>
										      <option value="0">???? ????????????</option>
										      {this.state.managers.map((item, index)=>
											      <option value={item.id}>{item.name}</option>
										      )}
										    </select>
                      </div>
                      <div className="col-md-6">
                        <button type="button" onClick={()=>this.edit_user(index)} className="btn btn-success btn-lg">
                          ??????????????????
                        </button>
                      </div>
                    </div>
                  </form>
                  :<div>
                    <span onClick={() => this.setState({edit_user: user.user_id})}>
                      {user.name}{user.family.id ? " (" + user.family.name + ")" : ""}
                    </span>
                    {user.tg ?<span> &nbsp; <a className="btn" href={"https://t.me/"+user.tg}><i className="fa fa-lg fa-telegram"></i></a></span>:""}
                  </div>
                }
              </div>)
            }
          </div>
          <div className="col-md-4">
            <h2>??????????</h2>
            {this.state.family ? <button type="button" onClick={()=>this.delete_family(this.state.family)} className="btn btn-outline-danger">
              ?????????????? ??????????</button>:""}
            {this.state.families.map((user, index) =>
              user.note_id === this.state.family ?
              <div className= "element-card">
                <form id="edit_family">
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <input name="name" className="form-control form-control-lg" defaultValue={user.name}/>
                    </div>
                    <div className="col-md-12 mb-3">
                      <input name="name_sheets" className="form-control form-control-lg"
                        defaultValue={user.name_sheets}
                        placeholder="As in google sheets"/>
                    </div>
                    <div className="col-md-6">
                      <button type="button" onClick={()=>this.edit_family(index)} className="btn btn-success btn-lg">
                        ??????????????????
                      </button>
                    </div>
                    <div className="col-md-6">
                      <button type="button" onClick={()=>this.setState({family:0})} className="btn btn-secondary btn-lg">
                        ????????????
                      </button>
                    </div>
                  </div>
                </form>
              </div>:
              <div
                className={user.note_id === this.state.family ? "element-card selected" : "element-card"}
                onClick={() => this.setState({family: user.note_id})}>
                {user.name}
              </div>
            )}
            <div className="element-card" onClick={()=>this.add_user()}>
              <span className="text-success">
                ???????????????? ??????????
              </span>
            </div>
          </div>
          <div className="col-md-4">
            <h2>??????????????</h2>
            {this.state.teachers.map((user, index) =>
              <div
                className={user.user_id === this.state.edit_user ? "element-card selected" : "element-card"}
              >
                {user.user_id === this.state.edit_user ?
                  <form id="edit_teacher">
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <input name="name" className="form-control form-control-lg" defaultValue={user.name}/>
                      </div>
                      <div className="col-md-12 mb-3">
                        <input name="name_sheets" className="form-control form-control-lg" defaultValue={user.name_sheets}
                          placeholder="As in google sheets"/>
                      </div>
                      <div className="col-md-12 mb-3">
                        <label htmlFor="tg">????????????????-??????????(?????? @)</label>
                          <input name="tg" className="form-control form-control-lg" defaultValue={user.tg}
                            placeholder="edera_bot"/>
                      </div>
                      <div className="col-md-12 mb-3">
                        <label htmlFor="username">Username (unique)</label>
                          <input name="username" className="form-control form-control-lg" defaultValue={user.username}
                            placeholder="general@gmail.com"/>
                      </div>
                      <div className="col-md-12 mb-3">
                        <label htmlFor="password">Password</label>
                        <input name="password" className="form-control form-control-lg" defaultValue=""
                          placeholder="you will never see it"/>
                      </div>
                      <div className="col-md-6">
                        <button type="button" onClick={()=>this.edit_teacher(index)} className="btn btn-success btn-lg">
                          ??????????????????
                        </button>
                      </div>
                    </div>
                  </form>
                  :<div>
                    <div>
                      <span onClick={() => this.setState({edit_user: user.user_id})}>
                        {user.name}
                      </span>
                      {user.tg ?<span> &nbsp; <a className="btn" href={"https://t.me/"+user.tg}><i className="fa fa-lg fa-telegram"></i></a></span>:""}
                    </div>
                  </div>
                }
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
