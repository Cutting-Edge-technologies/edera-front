import { ILessonLogProps, LessonLog } from "../components/lesson_log";
import { CommonHOCWrapper } from "../shared/commonHOC";


export class Log extends CommonHOCWrapper<ILessonLogProps> {
  fethInitialProps = async () => {
    const initialData: ILessonLogProps = {
      token: '',
      dt_from: "15-02-2022",
      dt_to: "18-02-2056"
    }
    return initialData;
  };

  RenderComponent = LessonLog;
}
