
import { useContext } from "react";
import { AuthContext, IAuthContext } from "../App";
import { IServiceProps, Service } from "../components/service";
import { CommonHOCWrapper, hostName } from "../shared/commonHOC";


export class Services extends CommonHOCWrapper<IServiceProps> {
  static contextType = AuthContext;
  correspondingUrl =  `${hostName}api/v1/services/ `;
  fetchInitialProps = async () => {
    const {token} = this.context as IAuthContext;
    console.log(token);
    console.log(this.context);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    const response = await fetch(this.correspondingUrl, requestOptions);
    const result = await response.text()
    const responseData = JSON.parse(result)
    const initialData: IServiceProps = {
      all_dicts: responseData.all_dicts,
      services: responseData.services,
      token: token
    };
    console.log(initialData);
    return initialData;
  };

  RenderComponent = Service;
}
