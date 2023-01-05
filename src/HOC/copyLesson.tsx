import { IUserCopyLessonsProps, UserCopyLessons } from "../components/user_copy_lessons";
import { CommonHOCWrapper, hostName } from "../shared/commonHOC";


export class CopyLesson extends CommonHOCWrapper<IUserCopyLessonsProps> {

  correspondingUrl =  `${hostName}manage/copy/`;
  fethInitialProps = async () => {
    const response = await fetch(this.correspondingUrl);
    const initialData = await response.json();
    return initialData;
  };

  RenderComponent = UserCopyLessons;
}
