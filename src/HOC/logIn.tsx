import React, { useContext, useState } from "react";
import { AuthContext } from "../App";

interface ILoginResponce {
  token: string;
}

export const LogInHOC: React.FC<{}> = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const {setToken, token} = useContext(AuthContext)

  const login = async () => {
    const body = {
      username,
      password,
    }
    const bodyEncoded = new URLSearchParams(body);
    console.warn(bodyEncoded);
    const requestOptions = {
      method: 'POST',
      body: bodyEncoded,
      redirect: "error" as any,
    };

    const response = await fetch("http://127.0.0.1:8000/api/v1/login/", requestOptions);
    const result = await response.text();
    const {token}: ILoginResponce = JSON.parse(result);
    console.log(result);
    setToken(token);

  }

  return (
    <div className="container">
      <label htmlFor="username">Login</label>
      <input id="username" type="text" className="login" value={username} onChange={(e) => setUserName(e.target.value)}/>
      <br/>
      <label htmlFor="password">Password</label>
      <input id="password" type="password" className="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <br/>
      <button className="login" onClick={login}>Login</button>
    </div>
  )
}
