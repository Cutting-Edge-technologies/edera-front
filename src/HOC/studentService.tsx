import { IStudentsServiceItemsManageProps, ItemsManage } from "../components/student_service";
import { CommonHOCWrapper, hostName } from "../shared/commonHOC";


export class StudentService extends CommonHOCWrapper<IStudentsServiceItemsManageProps> {

  correspondingUrl =  `${hostName}student/service/`;
  fethInitialProps = async () => {
    const response = await fetch(this.correspondingUrl);
    const initialData = await response.json();
    return initialData;
  };

  RenderComponent = ItemsManage;
}
