import { dummieGroups, dummieFelds } from "../components/dummieObj";
import { ItemsManage, IItemsManageProps } from "../components/items_admin";
import { CommonHOCWrapper } from "../shared/commonHOC";


export class ServiceGroups extends CommonHOCWrapper<IItemsManageProps> {
  correspondingUrl = 'items/servicegroup/';
  fethInitialProps = async () => {
    const initialData: IItemsManageProps = {
      token: '',
      fields: [dummieFelds[0]], 
      items: dummieGroups,
      desc: {name:"Service Groups"}
    }
    return initialData;
  };

  RenderComponent = ItemsManage;
}
