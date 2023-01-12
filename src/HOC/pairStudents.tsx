import { authorizedFetch } from "../commands/API";
import { initialLesson } from "../components/timetable_table";
import { IAddUserProps, AddUser } from "../components/user_manage";
import { CommonHOCWrapper, hostName } from "../shared/commonHOC";


export class PairStudents extends CommonHOCWrapper<IAddUserProps> {

  correspondingUrl =  `${hostName}api/v1/manage/`;
  fetchInitialProps = async () => {
    const responseData = await authorizedFetch(this.correspondingUrl)
    if (responseData) {
      const initialData: IAddUserProps = {
        token: responseData.token,
        users: responseData.data.users,
        pairs: responseData.data.pairs,
        services: responseData.data.services,
        chats: responseData.data.chats,
        responsibles: responseData.data.responsible,
        today: responseData.data.today,
        add_lesson: initialLesson,
      };
      return initialData;
    } else {
      return ({
        token: "",
        users: [],
        pairs: [],
        services: [],
        chats: [],
        responsibles: [],
        today: "",
        add_lesson: initialLesson,
      })
    }
  };

  RenderComponent = AddUser;
}