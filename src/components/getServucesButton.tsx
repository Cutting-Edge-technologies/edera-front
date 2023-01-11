import { useSelector } from "react-redux";
import { tokenSelector } from "../selectors/token";
import { hostName } from "../shared/commonHOC";


export const GetServicesButton: React.FC<{}> = () => {

   const token = useSelector(tokenSelector);
   const correspondingUrl =  `${hostName}api/v1/services/`;

var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${token}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
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
