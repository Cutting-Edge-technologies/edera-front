import { IUserCopyLessonsProps, UserCopyLessons } from "../components/user_copy_lessons";
import { tokenSelector } from "../selectors/token";
import { CommonHOCWrapper, hostName } from "../shared/commonHOC";
import { tokenStore } from "../store";


export class CopyLesson extends CommonHOCWrapper<IUserCopyLessonsProps> {

  correspondingUrl =  `${hostName}api/v1/manage/copy/`;
  fetchInitialProps = async () => {
    const token = tokenSelector(tokenStore.getState());
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${token}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    const response = await fetch(this.correspondingUrl, requestOptions);
    const result = await response.text()
    const responseData = JSON.parse(result)
    const initialData: IUserCopyLessonsProps = {
      token: token,
      users: responseData.users,
      weeks_from: responseData.weeks_from,
      weeks_to: responseData.weeks_to
    };
    console.log(initialData);
    return initialData;
  };

  RenderComponent = UserCopyLessons;
}
