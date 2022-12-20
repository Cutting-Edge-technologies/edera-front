
import { dummieForm } from "../components/dummieObj";
import { LogIn, ILogInProps } from "../components/logIn";
import { CommonHOCWrapper } from "../shared/commonHOC";


export class LogInHOC extends CommonHOCWrapper<ILogInProps> {
  correspondingUrl = 'login/';
  fethInitialProps = async () => {
    const initialData: ILogInProps = {
      csrf_token: "",
      form: dummieForm,
      logIn: ()=>console.log("SignUp")
    }
    return initialData;
  };

  RenderComponent = LogIn;
}
