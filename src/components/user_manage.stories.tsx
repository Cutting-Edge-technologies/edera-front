import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AddUser } from "./user_manage";
import { dummieStrinds, dummieServices, dummieAddUserChats, dummieAddUserPairs, dummieAddUserUsers } from "./dummieObj";

export default {
  title: 'Components/Add_User',
  component: AddUser,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AddUser>;


export const Add_UserStory: ComponentStory<any> = () => {
  return (
    <AddUser
    token={""}
    services={dummieServices}
    responsibles={dummieStrinds}
    chats={dummieAddUserChats}
    pairs={dummieAddUserPairs}
    users={dummieAddUserUsers}
    />
  )
}