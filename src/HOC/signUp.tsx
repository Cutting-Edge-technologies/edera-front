
import { dummieForm } from "../components/dummieObj";
import { SignUp, ISingUpProps } from "../components/signUp";
import { CommonHOCWrapper } from "../shared/commonHOC";


export class SingUpHOC extends CommonHOCWrapper<ISingUpProps> {
  correspondingUrl = 'signup/';
  fethInitialProps = async () => {
    const initialData: ISingUpProps = {
      csrf_token: "",
      form: dummieForm,
      signUp: ()=>console.log("SignUp")
    }
    return initialData;
  };

  RenderComponent = SignUp;
}
