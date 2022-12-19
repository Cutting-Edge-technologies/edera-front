
import { dummieAll_dicts, dummieServices } from "../components/dummieObj";
import { IServiceProps, Service } from "../components/service";
import { CommonHOCWrapper } from "../shared/commonHOC";


export class Services extends CommonHOCWrapper<IServiceProps> {
  correspondingUrl = 'services/';
  fethInitialProps = async () => {
    const initialData: IServiceProps = {
      token: '',
      services: dummieServices,
      all_dicts: dummieAll_dicts,
    }
    return initialData;
  };

  RenderComponent = Service;
}
