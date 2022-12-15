import { ComponentMeta, ComponentStory } from "@storybook/react";
import { UserInfo } from "./user";
import { dummieGroups, dummieUserInfoUsers, dummieUserInfoTeachers, dummieUserInfoFamilies} from "./dummieObj";

export default {
  title: 'PageStories/2 Students And Families',
  component: UserInfo,
} as ComponentMeta<typeof UserInfo>;

export const StudentsAndFamiliesStory: ComponentStory<any> = () => {
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