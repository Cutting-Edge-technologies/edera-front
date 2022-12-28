import { CommonHOCWrapper, hostName } from "../shared/commonHOC";
import { IItemsManageProps, ItemsManage} from "../components/mentors";

export class Mentors extends CommonHOCWrapper<IItemsManageProps> {

  correspondingUrl =  `${hostName}mentors/ `;
  fethInitialProps = async () => {
    const response = await fetch(this.correspondingUrl);
    const initialData = await response.json();
    return initialData;
  };

  RenderComponent = ItemsManage;
}
