import { dummieAll_dicts, dummieCosts, dummieStudentService, dummieUsers } from "../components/dummieObj";
import { ITeacerServiceItemsManageProps, ItemsManage } from "../components/teacher_service";
import { CommonHOCWrapper } from "../shared/commonHOC";


export class TeacherService extends CommonHOCWrapper<ITeacerServiceItemsManageProps> {
  correspondingUrl = 'teacher/service/';
  fethInitialProps = async () => {
    const initialData: ITeacerServiceItemsManageProps = {
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
