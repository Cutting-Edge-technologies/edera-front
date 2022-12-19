import { CommonHOCWrapper } from "../shared/commonHOC";
import { IItemsManageProps, ItemsManage} from "../components/mentors";
import { dummieMentorManageItems } from "../components/dummieObj";

export class Mentors extends CommonHOCWrapper<IItemsManageProps> {
  correspondingUrl = 'mentors/';
  fethInitialProps = async () => {
    const initialData: IItemsManageProps = {
      token: '',
      items: dummieMentorManageItems,
      managers: dummieMentorManageItems
    }
    return initialData;
  };

  RenderComponent = ItemsManage;
}
