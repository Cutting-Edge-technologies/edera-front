import { ComponentMeta, ComponentStory } from "@storybook/react";
import { UserInfo } from "./user";
import { dummieGroups, dummieUserInfoUsers, dummieUserInfoTeachers, dummieUserInfoFamilies} from "./dummieObj";

export default {
  title: 'Components/UserInfo',
  component: UserInfo,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof UserInfo>;

export const UserInfoStory: ComponentStory<any> = () => {
  return (
    <UserInfo
    token={""}
    managers={dummieGroups}
    families={dummieUserInfoFamilies}
    teachers={dummieUserInfoTeachers}
    users={dummieUserInfoUsers}
    />
  )
}