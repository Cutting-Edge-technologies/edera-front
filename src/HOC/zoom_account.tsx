import { dummieItems } from "../components/dummieObj";
import { IItemsManageProps } from "../components/pair_info";
import { ItemsManage } from "../components/zoom_account";
import { CommonHOCWrapper } from "../shared/commonHOC";

// export const ZoomAccount = () => <>Zoom account FC</>;

export class ZoomAccount extends CommonHOCWrapper<IItemsManageProps> {
  fethInitialProps = async () => {
    const initialData: IItemsManageProps = {
      items: dummieItems,
      token: '',
    }
    return initialData;
  };

  RenderComponent = ItemsManage;
}
