import { dummieAll_dicts, dummieCosts, dummieStudentService, dummieUsers } from "../components/dummieObj";
import { IStudentsServiceItemsManageProps, ItemsManage } from "../components/student_service";
import { CommonHOCWrapper } from "../shared/commonHOC";


export class StudentService extends CommonHOCWrapper<IStudentsServiceItemsManageProps> {
  correspondingUrl = 'student/service/';
  fethInitialProps = async () => {
    const initialData: IStudentsServiceItemsManageProps = {
      token: '',
      all_dicts: dummieAll_dicts,
      users: dummieUsers,
      costs: dummieCosts,
      services: dummieStudentService
    }
    return initialData;
  };

  RenderComponent = ItemsManage;
}
