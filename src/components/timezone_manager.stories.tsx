import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ItemsManage } from "./timezone_manager";
import { dummieItems } from "./dummieObj";

export default {
  title: 'PageStories/5 Setting',
  component: ItemsManage
} as ComponentMeta<typeof ItemsManage>;

export const Timezone_5_3_Story: ComponentStory<any> = () => {
  return (
    <ItemsManage token={""} items={dummieItems} />
  )
}