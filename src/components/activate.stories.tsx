import { ComponentMeta, ComponentStory } from "@storybook/react";
import { UserInfo } from "./activate";
import { dummieUsers } from "./dummieObj";

export default {
  title: 'Components/Activate',
  component: UserInfo,
} as ComponentMeta<typeof UserInfo>;

export const ActivateStory: ComponentStory<any> = () => {
  return (
    <UserInfo token={""} users={dummieUsers} teachers={dummieUsers} />
  )
}