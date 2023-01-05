import { IItemsManageProps } from "../components/pair_info";
import { ItemsManage } from "../components/zoom_account";
import { CommonHOCWrapper, hostName } from "../shared/commonHOC";

// export const ZoomAccount = () => <>Zoom account FC</>;

export class ZoomAccount extends CommonHOCWrapper<IItemsManageProps> {

  correspondingUrl =  `${hostName}zoom_account/ `;
  fetchInitialProps = async () => {
    const response = await fetch(this.correspondingUrl);
    const initialData = await response.json();
    return initialData;
  };

  RenderComponent = ItemsManage;
}
