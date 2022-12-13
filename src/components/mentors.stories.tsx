import { ComponentMeta, ComponentStory } from "@storybook/react";
import { dummieMentorManageItems } from "./dummieObj";
import { ItemsManage } from "./mentors";

export default {
  title: 'PageStories/5 Setting',
  component: ItemsManage
} as ComponentMeta<typeof ItemsManage>;

export const MentorsAndManagers_5_5_Story: ComponentStory<any> = () => {
  return (
    <ItemsManage token={""} items={dummieMentorManageItems} managers={dummieMentorManageItems}/>
  )
}
