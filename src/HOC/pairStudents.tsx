import { IAddUserProps, AddUser } from "../components/user_manage";
import { CommonHOCWrapper, hostName } from "../shared/commonHOC";


export class PairStudents extends CommonHOCWrapper<IAddUserProps> {
  correspondingUrl =  `${hostName}manage/ `;
  fetchInitialProps = async () => {
    const response = await fetch(this.correspondingUrl);
    const initialData = await response.json();
    return initialData;
  };

  RenderComponent = AddUser;
}