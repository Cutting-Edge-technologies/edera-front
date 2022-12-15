import { CommonHOCWrapper } from "../shared/commonHOC";
import { IUserInfoProps, UserInfo } from "../components/user";
import { dummieGroups, dummieUserInfoFamilies, dummieUserInfoTeachers, dummieUserInfoUsers } from "../components/dummieObj";

export class StudentsAndFamilies extends CommonHOCWrapper<IUserInfoProps> {
  fethInitialProps = async () => {
    const initialData: IUserInfoProps = {
      token: "",
      managers: dummieGroups,
      families: dummieUserInfoFamilies,
      teachers: dummieUserInfoTeachers,
      users: dummieUserInfoUsers
    }
    return initialData;
  };

  RenderComponent = UserInfo;
}
