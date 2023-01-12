import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { type } from "os";
import { ILogInData } from "../components/logIn";
import { tokenSelector } from "../selectors/token";
import { hostName } from "../shared/commonHOC";
import { tokenStore } from "../store";


export const logIn = async (data:ILogInData) => {
     
  const bodyEncoded = new URLSearchParams();
  bodyEncoded.append("username", data.username);
  bodyEncoded.append("password", data.password);
  console.warn(bodyEncoded);
    const requestOptions = {
      method: 'POST',
      body: bodyEncoded,
      redirect: "error" as any,
    };

  const response = await fetch(`${hostName}api/v1/login/`, requestOptions);
  const result = await response.text();
  const {token} = JSON.parse(result);
  return (token);
}

export const logOut = async () => {
  const token = tokenSelector(tokenStore.getState());   
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${token}`);
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
  };
  const response = await fetch(`${hostName}api/v1/logout/`, requestOptions);
  }
  