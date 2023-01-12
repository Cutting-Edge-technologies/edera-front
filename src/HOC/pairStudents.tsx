import { authorizedFetch } from "../commands/API";
import { IAddUserProps, AddUser } from "../components/user_manage";
import { CommonHOCWrapper, hostName } from "../shared/commonHOC";


export class PairStudents extends CommonHOCWrapper<IAddUserProps> {

   correspondingUrl =  `${hostName}api/v1/manage/`;
  fetchInitialProps = async () => {
    const responseData = await authorizedFetch(this.correspondingUrl)
    const initialData: IAddUserProps = {
      token: responseData.token,
      users: responseData.data.users,
      pairs: responseData.data.pairs,
      services: responseData.data.services,
      chats: responseData.data.chats,
      responsibles: responseData.data.responsibles,
      today: responseData.data.today
    };
    return initialData;
  };

  RenderComponent = AddUser;
}