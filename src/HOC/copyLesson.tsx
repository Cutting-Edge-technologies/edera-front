import { dummieUsers } from "../components/dummieObj";
import { IUserCopyLessonsProps, UserCopyLessons } from "../components/user_copy_lessons";
import { dummieDubleNumberArray } from "../components/dummieObj";
import { CommonHOCWrapper } from "../shared/commonHOC";


export class CopyLesson extends CommonHOCWrapper<IUserCopyLessonsProps> {
  correspondingUrl = 'manage/copy/';
  fethInitialProps = async () => {
    const initialData: IUserCopyLessonsProps = {
      token: '',
      users: dummieUsers,
      weeks_from: dummieDubleNumberArray,
      weeks_to: dummieDubleNumberArray,
    }
    return initialData;
  };

  RenderComponent = UserCopyLessons;
}
