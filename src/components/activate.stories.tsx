import { ComponentMeta, ComponentStory } from "@storybook/react";
import { IUser, UserInfo } from "./activate";

export default {
  title: 'Components/UserInfo',
  component: UserInfo,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof UserInfo>;

const dummieUsers: IUser[] = [
  {
    user_id: '1',
    name: 'John Dow',
  },
  {
    user_id: '2',
    name: 'John Dow1',
  },
  {
    user_id: '3',
    name: 'John Dow2',
  },
]

export const ActivateStory: ComponentStory<any> = () => {
  return (
    <UserInfo token={""} users={dummieUsers} teachers={dummieUsers} />
  )
}