
import { dummieForm } from "../components/dummieObj";
import { LogIn, ILogInProps } from "../components/logIn";
import { CommonHOCWrapper, hostName } from "../shared/commonHOC";


export class LogInHOC extends CommonHOCWrapper<ILogInProps> {
  correspondingUrl =  `${hostName}api/v1/login/`;
  fetchInitialProps = async () => {
    const initialData: ILogInProps = {
      csrf_token: "",
      form: dummieForm,
      logIn: async (data)=> {
        const fetchOptions = {
          method: 'POST',
          body: JSON.stringify(data),
        } 
        await fetch( this.correspondingUrl, fetchOptions);
      }
    }
    return initialData;
  };

  RenderComponent = LogIn;
}
