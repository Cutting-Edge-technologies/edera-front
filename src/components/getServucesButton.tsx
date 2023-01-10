import React, { useContext, useState } from "react";
import { AuthContext } from "../App";
import { hostName } from "../shared/commonHOC";


export const GetServicesButton: React.FC<{}> = () => {

   const {token} = useContext(AuthContext);
   const correspondingUrl =  `${hostName}api/v1/services/ `;

var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${token}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  //redirect: 'follow'
};

const getServices = async() => { 
  const response = await fetch(correspondingUrl, requestOptions);
  const result = await response.text()
  console.log(JSON.parse(result));
}
  return (
      <button className="login" onClick={getServices}>Services</button>
  )
}
