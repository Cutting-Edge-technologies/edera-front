import { string } from "prop-types";
import { authorizedFetch } from "../commands/API";
import { IUserCopyLessonsProps, UserCopyLessons } from "../components/user_copy_lessons";
import { tokenSelector } from "../selectors/token";
import { CommonHOCWrapper, hostName } from "../shared/commonHOC";
import { tokenStore } from "../store";


export class CopyLesson extends CommonHOCWrapper<IUserCopyLessonsProps> {

  correspondingUrl =  `${hostName}api/v1/manage/copy/`;
  fetchInitialProps = async () => {
    const responseData = await authorizedFetch(this.correspondingUrl)
    if (responseData) {
      const initialData: IUserCopyLessonsProps = {
        token: responseData.token,
        users: responseData.data.users,
        weeks_from: responseData.data.weeks_from,
        weeks_to: responseData.data.weeks_to
      };
      return initialData;
    } else {
      return ({
        token: "",
        users: [],
        weeks_from: [],
        weeks_to: [],
    })
  }
  };
  RenderComponent = UserCopyLessons;
}
