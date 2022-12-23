import { dummieAddUserChats, dummieAddUserPairs, dummieAddUserUsers, dummieServices, dummieStrinds } from "../components/dummieObj";
import { IAddUserProps, AddUser } from "../components/user_manage";
import { CommonHOCWrapper, hostName } from "../shared/commonHOC";


export class PairStudents extends CommonHOCWrapper<IAddUserProps> {
  correspondingUrl = '';
  fethInitialProps = async () => {
    // const initialData: IAddUserProps = {
    //   token: '',
    //   services: dummieServices,
    //   responsibles: dummieStrinds,
    //   chats: dummieAddUserChats,
    //   pairs: dummieAddUserPairs,
    //   users: dummieAddUserUsers,
    // }
    const response = await fetch(this.correspondingUrl);
    const initialData = await response.json();
    return initialData;
  };

  RenderComponent = AddUser;
}