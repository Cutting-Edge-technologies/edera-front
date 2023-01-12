
import { authorizedFetch } from "../commands/API";
import { dummieAll_dicts, dummieServices } from "../components/dummieObj";
import { IServiceTrueProps, Service } from "../components/service";
import { CommonHOCWrapper, hostName } from "../shared/commonHOC";


export class Services extends CommonHOCWrapper<IServiceTrueProps> {
  correspondingUrl =  `${hostName}api/v1/services/ `;
  fetchInitialProps = async () => {
    const responseData = await authorizedFetch(this.correspondingUrl);
    if (responseData) {
      const initialData: IServiceTrueProps = {
        all_dicts: responseData.data.all_dicts,
        services: responseData.data.services,
        token: responseData.token
      };
      return initialData;
    } else {
      return ({
        all_dicts: dummieAll_dicts,
        services: dummieServices,
        token: ""
      })
    }
  };
  
  RenderComponent = Service;
}
