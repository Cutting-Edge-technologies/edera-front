import { ItemsManage, IItemsManageProps } from "../components/items_admin";
import { CommonHOCWrapper, hostName } from "../shared/commonHOC";


export class Currency extends CommonHOCWrapper<IItemsManageProps> {
  
  correspondingUrl =  `${hostName}items/currency/`;
  fethInitialProps = async () => {
    const response = await fetch(this.correspondingUrl);
    const initialData = await response.json();
    return initialData;
  };

  RenderComponent = ItemsManage;
}
