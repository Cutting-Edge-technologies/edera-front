import { IItemsManageProps, ItemsManage } from "../components/pair_info";
import { CommonHOCWrapper, hostName } from "../shared/commonHOC";


export class PairsAndChats extends CommonHOCWrapper<IItemsManageProps> {

  correspondingUrl =  `${hostName}pair_info/ `;
  fetchInitialProps = async () => {
    const response = await fetch(this.correspondingUrl);
    const initialData = await response.json();
    return initialData;
  };

  RenderComponent = ItemsManage;
}
