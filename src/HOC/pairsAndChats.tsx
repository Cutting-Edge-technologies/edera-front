import { dummieItems } from "../components/dummieObj";
import { IItemsManageProps, ItemsManage } from "../components/pair_info";
import { CommonHOCWrapper } from "../shared/commonHOC";


export class PairsAndChats extends CommonHOCWrapper<IItemsManageProps> {
  fethInitialProps = async () => {
    const initialData: IItemsManageProps = {
      items: dummieItems,
      token: '',
    }
    return initialData;
  };

  RenderComponent = ItemsManage;
}