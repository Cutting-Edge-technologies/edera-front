import { dummieAddUserChats, dummieAddUserPairs, dummieAddUserUsers, dummieServices, dummieStrinds } from "../components/dummieObj";
import { IAddUserProps, AddUser } from "../components/user_manage";
import { CommonHOCWrapper } from "../shared/commonHOC";


export class PairStudents extends CommonHOCWrapper<IAddUserProps> {
  fethInitialProps = async () => {
    const initialData: IAddUserProps = {
      token: '',
      services: dummieServices,
      responsibles: dummieStrinds,
      chats: dummieAddUserChats,
      pairs: dummieAddUserPairs,
      users: dummieAddUserUsers,
    }
    return initialData;
  };

  RenderComponent = AddUser;
}