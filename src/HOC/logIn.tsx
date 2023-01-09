
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
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("username", `${data.name}`);
        urlencoded.append("password", `${data.password}`);

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
        };

        await fetch("http://127.0.0.1:8000/api/v1/login/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
      }
    }
    return initialData;
  };

  RenderComponent = LogIn;
}
