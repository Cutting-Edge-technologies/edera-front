import React from "react";
import { IForm } from "./signUp";

export interface ILogInData{
  username: string;
  password: string;
}
export interface ILogInProps{
  csrf_token: string;
  logIn: (data: ILogInData) => void;
  form: IForm;
}

export interface ILogInState {
  name: string;
  password: string;
}

 export class LogIn extends React.Component <ILogInProps, ILogInState> {
  constructor(props: ILogInProps) {
    super(props);
    this.state = 
	    {
        name: "",
        password: "",
      };
  }
  render(): React.ReactNode {
    return (
      <div className = "card mx-auto" style={{ maxWidth:"500px", marginTop:"50px", padding:"20px"}}>
        <div className="card-body">
          <form className="form-signin">
            <h2>Welcome</h2>
            <br/>
            <div className="form-label-group">
              <input
                type="text"
                id="id_username" 
                name = "username"
                className="form-control"
                placeholder="username"
                required
                value={this.state.name}
                onChange={(e)=>{
                  this.setState({name:e.target.value});
                }}/>
            </div>
            <br/>
            <div className="form-label-group">
              <input
                type="password"
                id="id_password" 
                name = "password"
                className="form-control"
                placeholder="password" required
                onChange={(e)=>{
                  this.setState({password:e.target.value});
                }}
              />
            </div>
            { !!this.props.form.errors.length&&
				      <p className=" label label-danger" color ="red">
					        Incorrect username or password
				      </p>
            }
            <br/>
            <hr className="my-2"/>
            <div className = "my-2">
              <button
                className="btn btn-lg btn-primary btn-block text-uppercase"
                onClick={()=> {
                  console.warn('warning');
                  this.props.logIn({username: this.state.name, password: this.state.password})
                }}
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
