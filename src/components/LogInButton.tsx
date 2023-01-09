import React from "react";
import { ILogInData } from "./logIn";

 export class LogInButton extends React.Component <ILogInData> {
  render(): React.ReactNode {
    const onClick = async () => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("username", this.props.name);
      urlencoded.append("password",  this.props.password);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
      };

      await fetch("http://127.0.0.1:8000/api/v1/login/", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    }
    return(
      <button onClick={onClick}>LogIn</button>
    )
  }
}