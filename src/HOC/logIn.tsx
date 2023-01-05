
import { dummieForm } from "../components/dummieObj";
import { LogIn, ILogInProps } from "../components/logIn";
import { CommonHOCWrapper, hostName } from "../shared/commonHOC";


export class LogInHOC extends CommonHOCWrapper<ILogInProps> {
  correspondingUrl =  `${hostName}login/ `;
  fetchInitialProps = async () => {
    const initialData: ILogInProps = {
      csrf_token: "",
      form: dummieForm,
      logIn: async (data)=> {
        const fetchOptions = {
          method: 'POST',
          body: JSON.stringify(data),
        } 
        const newURL = "http://127.0.0.1:8000/api/v1/login/"
        await fetch( newURL, fetchOptions);
      }
    }
    return initialData;
  };

  RenderComponent = LogIn;
}
