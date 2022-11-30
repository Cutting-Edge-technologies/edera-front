import { ComponentMeta, ComponentStory } from "@storybook/react";
import { UserInfo } from "./activate";
import { dummieUsers } from "./dummieObj";

export default {
  title: 'Components/UserInfo',
  component: UserInfo,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof UserInfo>;

export const ActivateStory: ComponentStory<any> = () => {
  return (
    <UserInfo token={""} users={dummieUsers} teachers={dummieUsers} />
  )
}