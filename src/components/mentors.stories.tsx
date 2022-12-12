import { ComponentMeta, ComponentStory } from "@storybook/react";
import { dummieMentorManageItems } from "./dummieObj";
import { ItemsManage } from "./mentors";

export default {
  title: 'Components/ItemsManage',
  component: ItemsManage
} as ComponentMeta<typeof ItemsManage>;

export const ItemsManageStory: ComponentStory<any> = () => {
  return (
    <ItemsManage token={""} items={dummieMentorManageItems} managers={dummieMentorManageItems}/>
  )
}
