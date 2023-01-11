import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { type } from "os";
import { ILogInData } from "../components/logIn";
import { tokenStateType } from "../store";


// const fetchToken = createAction(
//   type: 'fetchToken',
//   payload: 

// ) 



// (state:tokenStateType, {payload}: PayloadAction<ILogInData>) => {
//   const bodyEncoded = new URLSearchParams({...payload});
//   const requestOptions = {
//     method: 'POST',
//     body: bodyEncoded,
//     redirect: "error" as any,
//   };

//   const response = await fetch("http://127.0.0.1:8000/api/v1/login/", requestOptions);
//   const result = await response.text();
//   const {token} = JSON.parse(result);
//   console.log(result);
//   return ({value: token});
// }