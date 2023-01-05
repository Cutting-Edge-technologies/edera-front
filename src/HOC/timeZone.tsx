import { IItemsManageProps } from "../components/pair_info";
import { ItemsManage } from "../components/timezone_manager";
import { CommonHOCWrapper, hostName } from "../shared/commonHOC";


export class TimeZone extends CommonHOCWrapper<IItemsManageProps> {

  correspondingUrl =  `${hostName}timezone/ `;
  fetchInitialProps = async () => {
    const response = await fetch(this.correspondingUrl);
    const initialData = await response.json();
    return initialData;
  };

  RenderComponent = ItemsManage;
}
