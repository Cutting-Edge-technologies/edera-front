
import { IServiceProps, Service } from "../components/service";
import { CommonHOCWrapper, hostName } from "../shared/commonHOC";


export class Services extends CommonHOCWrapper<IServiceProps> {
  
  correspondingUrl =  `${hostName}services/ `;
  fethInitialProps = async () => {
    const response = await fetch(this.correspondingUrl);
    const initialData = await response.json();
    return initialData;
  };

  RenderComponent = Service;
}
