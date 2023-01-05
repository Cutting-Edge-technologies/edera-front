import { CommonHOCWrapper, hostName } from "../shared/commonHOC";
import { IUserInfoProps, UserInfo } from "../components/user";

export class StudentsAndFamilies extends CommonHOCWrapper<IUserInfoProps> {

  correspondingUrl =  `${hostName}users/ `;
  fethInitialProps = async () => {
    const response = await fetch(this.correspondingUrl);
    const initialData = await response.json();
    return initialData;
  };

  RenderComponent = UserInfo;
}
