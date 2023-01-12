
import { useSelector } from "react-redux";
import { authorizedFetch } from "../commands/API";
import { IServiceProps, Service } from "../components/service";
import { tokenSelector } from "../selectors/token";
import { CommonHOCWrapper, hostName } from "../shared/commonHOC";
import { tokenStore } from "../store";


export class Services extends CommonHOCWrapper<IServiceProps> {
  correspondingUrl =  `${hostName}api/v1/services/ `;
  fetchInitialProps = async () => {
    const responseData = await authorizedFetch(this.correspondingUrl)
    const initialData: IServiceProps = {
      all_dicts: responseData.data.all_dicts,
      services: responseData.data.services,
      token: responseData.token
    };
    console.log(initialData);
    return initialData;
  };
  
  RenderComponent = Service;
}
