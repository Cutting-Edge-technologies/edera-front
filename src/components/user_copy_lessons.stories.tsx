import { ComponentMeta, ComponentStory } from "@storybook/react";
import { UserCopyLessons } from "./user_copy_lessons";
import { dummieUsers} from "./dummieObj";

export default {
  title: 'Components/UserCopyLessons',
  component: UserCopyLessons,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof UserCopyLessons>;

const dummieDubleNumberArray: number[][] = [
  [1,2,3,4],
  [5,6,7,8],
  [9,10,11,12]
]


export const UserCopyLessonsStory: ComponentStory<any> = () => {
  return (
    <UserCopyLessons
    token={""}
    users={dummieUsers}
    weeks_from = {dummieDubleNumberArray}
    weeks_to ={dummieDubleNumberArray}
    />
  )
}