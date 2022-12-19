import { dummieGroups, dummieFelds } from "../components/dummieObj";
import { ItemsManage, IItemsManageProps } from "../components/items_admin";
import { CommonHOCWrapper } from "../shared/commonHOC";


export class Currency extends CommonHOCWrapper<IItemsManageProps> {
  correspondingUrl = 'items/currency/';
  fethInitialProps = async () => {
    const initialData: IItemsManageProps = {
      token: '',
      fields: [dummieFelds[0]], 
      items: dummieGroups,
      desc: {name:"Currency"}
    }
    return initialData;
  };

  RenderComponent = ItemsManage;
}
