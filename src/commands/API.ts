import { tokenSelector } from "../selectors/token";
import { tokenStore } from "../store";

export const authorizedFetch = async (correspondingUrl:string) => {
  const token = tokenSelector(tokenStore.getState());
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${token}`);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };
  try{
    const response = await fetch(correspondingUrl, requestOptions);
    const result = await response.text()
    const data = JSON.parse(result)
    return({token, data});
  } catch (e) {
    console.error(e);
  }
}
