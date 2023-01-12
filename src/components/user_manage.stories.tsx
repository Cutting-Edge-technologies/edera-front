import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AddUser } from "./user_manage";
import { dummieStrinds, dummieServices, dummieAddUserChats, dummieAddUserPairs, dummieAddUserUsers } from "./dummieObj";
import { initialLesson } from "./timetable_table";

export default {
  title: 'PageStories/1 Pair Students',
  component: AddUser
} as ComponentMeta<typeof AddUser>;


export const Pair_StudentsStory: ComponentStory<any> = () => {
  return (
    <AddUser
    token={""}
    services={dummieServices}
    responsibles={dummieStrinds}
    chats={dummieAddUserChats}
    pairs={dummieAddUserPairs}
    users={dummieAddUserUsers}
    today="12/10"
    add_lesson = {initialLesson}
    />
  )
}