import { CommonHOCWrapper, hostName } from "../shared/commonHOC";
import { IUserInfoProps, UserInfo } from "../components/user";
import { authorizedFetch } from "../commands/API";

export class StudentsAndFamilies extends CommonHOCWrapper<IUserInfoProps> {

  correspondingUrl =  `${hostName}api/v1/users/`;
  fetchInitialProps = async () => {
    const responseData = await authorizedFetch(this.correspondingUrl)
    if ( responseData ) {
      const initialData: IUserInfoProps = {
        token: responseData.token,
        users: responseData.data.users,
        families: responseData.data.families,
        managers: responseData.data.managers,
        teachers: responseData.data.teachers,
      };
      return initialData;
    } else { 
      return ({
        token: '',
        users: [],
        families: [],
        managers: [],
        teachers: [],
      })} 
  };

  RenderComponent = UserInfo;
}
