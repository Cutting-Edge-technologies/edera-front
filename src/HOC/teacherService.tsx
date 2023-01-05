import { ITeacerServiceItemsManageProps, ItemsManage } from "../components/teacher_service";
import { CommonHOCWrapper, hostName } from "../shared/commonHOC";


export class TeacherService extends CommonHOCWrapper<ITeacerServiceItemsManageProps> {

  correspondingUrl =  `${hostName}teacher/service/`;
  fetchInitialProps = async () => {
    const response = await fetch(this.correspondingUrl);
    const initialData = await response.json();
    return initialData;
  };

  RenderComponent = ItemsManage;
}
