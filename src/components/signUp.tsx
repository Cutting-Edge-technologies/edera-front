import React from "react";

export interface IForm {
  errors: string[];
  username: {
    name: string;
    errors: string[];
  };
  password1: {
    password1: string;
    errors: string[];
  };
  password2: {
    password2: string;
    errors: string[];
  };
}

export interface ISingUpProps{
  crf_token: string;
  signUp: () => void;
  form: IForm;
}

export interface ISingUpState {
  name: string;
  password1: string;
  password2: string;
}

 export class SignUp extends React.Component <ISingUpProps, ISingUpState> {
  constructor(props: ISingUpProps) {
    super(props);
    this.state = 
	    {
        name: "",
        password1: "",
        password2: "",
      };
  }
  render(): React.ReactNode {
    return (
      <div>
        <h2>Sign up</h2>
        <form>
          { this.props.crf_token }
          <div className="form-group">
            <>
              <label>Email</label>
              { (!!this.props.form.username.errors.length)?
                <div className="invalid-feedback">
                  Данный email уже занят.
                  </div>: <input type="text" onChange={(e)=>{
                  this.setState({name:e.target.value});
                  return(e.target.value)}
                }/>
              }
            </>
          </div>
          <div className="form-group">
            <>
              <label>Пароль</label>
              { !!this.props.form.password1.errors.length?
                <div className="invalid-feedback">
                  Пароль должен:
                  {this.props.form.password1.errors}
                </div>: (<input type="password" onChange={(e)=>{
                  this.setState({password1:e.target.value});
                  return(e.target.value);
                }}/>)
              }
            </>
          </div>
          <div className="form-group">
            <>
              <label>Повторите пароль</label>
              {!!this.props.form.password2.errors.length?
                <div className="invalid-feedback">
                {this.props.form.password2.errors}
                </div>: <input type="password" onChange={(e)=>{
                  this.setState({password2:e.target.value});
                  return(e.target.value)}
                }/>
              }
            </>
          </div>
          <div className="form-group">
            <select name="role">
              <option value="moderator">Модератор</option>
              <option value="student">Ученик</option>
              <option value="teacher">Учитель</option>
            </select>
          </div>
          <div className="form-group">
            <label>Code</label>
            <input name="code" type="password" className="" placeholder="for admin"/>
            { !!this.props.form.username.errors.length&&
            <div className="invalid-feedback">
              Данный email уже занят.
            </div>}
           </div>
          {this.props.form.errors}
          <button onClick={this.props.signUp} className = "btn btn-lg btn-info">Sign up</button>
        </form>
      </div>
    )
  }
}
