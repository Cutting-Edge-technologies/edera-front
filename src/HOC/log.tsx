import { ILessonLogProps, LessonLog } from "../components/lesson_log";
import { CommonHOCWrapper, hostName } from "../shared/commonHOC";


export class Log extends CommonHOCWrapper<ILessonLogProps> {

  correspondingUrl =  `${hostName}log/ `;
  fethInitialProps = async () => {
    const response = await fetch(this.correspondingUrl);
    const initialData = await response.json();
    return initialData;
  };

  RenderComponent = LessonLog;
}
