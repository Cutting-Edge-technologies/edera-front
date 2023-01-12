import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { tokenSelector } from "../selectors/token";
import { setToken } from "../slices/tokenSlice";
import { Navigate } from "react-router-dom";
import { ILogInData } from "../components/logIn";
import { logIn } from "../commands/login";

interface ILoginResponce {
  token: string;
}

export const LogInHOC: React.FC<{}> = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  let token = useSelector(tokenSelector);

  const login = async (data:ILogInData) => {
    token = await logIn(data);
    dispatch(setToken(token));
  };

  return (
    <>{!token? 
    <div className="container">
      <label htmlFor="username">Login</label>
      <input id="username" type="text" className="login" value={username} onChange={(e) => setUserName(e.target.value)}/>
      <br/>
      <label htmlFor="password">Password</label>
      <input id="password" type="password" className="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <br/>
      <button className="login" onClick={()=> login({username:username, password:password})}>Login</button>
    </div> : <Navigate to ="/"/>}
    </>
  )
}
