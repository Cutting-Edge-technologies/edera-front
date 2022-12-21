import React from "react";
import { IForm } from "./signUp";

export interface ILogInProps{
  csrf_token: string;
  logIn: () => void;
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
          <form method="post" className="form-signin" action="{ url 'login' }">
			      { this.props.csrf_token }
            <h2>Welcome</h2>
            <br/>
            <div className="form-label-group">
              <input type="text" id="id_username" 
                name = "username" className="form-control" placeholder="username" required
                onChange={(e)=>{
                  this.setState({name:e.target.value});
                  return(e.target.value);
                }}/>
            </div>
            <br/>
            <div className="form-label-group">
              <input type="password" id="id_password" 
              name = "password" className="form-control" placeholder="password" required
              onChange={(e)=>{
                this.setState({password:e.target.value});
                return(e.target.value);
              }}/>
            </div>
            { !!this.props.form.errors.length&&
				      <p className=" label label-danger" color ="red">
					        Incorrect username or password
				      </p>
            }
            <br/>
            <hr className="my-2"/>
            <div className = "my-2">
              <button className="btn btn-lg btn-primary btn-block text-uppercase" onClick={this.props.logIn}>
                Sign in
              </button>
              <input type="hidden" name="next" value="{{ next }}"/>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
