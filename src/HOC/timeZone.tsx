import { dummieItems } from "../components/dummieObj";
import { IItemsManageProps } from "../components/pair_info";
import { ItemsManage } from "../components/timezone_manager";
import { CommonHOCWrapper } from "../shared/commonHOC";


export class TimeZone extends CommonHOCWrapper<IItemsManageProps> {
  fethInitialProps = async () => {
    const initialData: IItemsManageProps = {
      items: dummieItems,
      token: '',
    }
    return initialData;
  };

  RenderComponent = ItemsManage;
}
