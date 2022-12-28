import { dummieUsers } from "../components/dummieObj";
import { IUserCopyLessonsProps, UserCopyLessons } from "../components/user_copy_lessons";
import { dummieDubleNumberArray } from "../components/dummieObj";
import { CommonHOCWrapper, hostName } from "../shared/commonHOC";


export class CopyLesson extends CommonHOCWrapper<IUserCopyLessonsProps> {
  // correspondingUrl = 'manage/copy/';
  // fethInitialProps = async () => {
  //   const initialData: IUserCopyLessonsProps = {
  //     token: '',
  //     users: dummieUsers,
  //     weeks_from: dummieDubleNumberArray,
  //     weeks_to: dummieDubleNumberArray,
  //   }
  //   return initialData;
  // };
  correspondingUrl =  `${hostName}manage/copy/`;
  fethInitialProps = async () => {
    const response = await fetch(this.correspondingUrl);
    const initialData = await response.json();
    return initialData;
  };

  RenderComponent = UserCopyLessons;
}
