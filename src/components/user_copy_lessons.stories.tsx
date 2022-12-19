import { ComponentMeta, ComponentStory } from "@storybook/react";
import { UserCopyLessons } from "./user_copy_lessons";
import { dummieDubleNumberArray, dummieUsers} from "./dummieObj";

export default {
  title: 'PageStories/4 Copy Lessons',
  component: UserCopyLessons
} as ComponentMeta<typeof UserCopyLessons>;


export const CopyLessonsStory: ComponentStory<any> = () => {
  return (
    <UserCopyLessons
    token={""}
    users={dummieUsers}
    weeks_from = {dummieDubleNumberArray}
    weeks_to ={dummieDubleNumberArray}
    />
  )
}