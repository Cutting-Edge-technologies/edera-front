import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ItemsManage } from "./zoom_account";
import { dummieItems } from "./dummieObj";

export default {
  title: 'PageStories/5 Setting',
  component: ItemsManage
} as ComponentMeta<typeof ItemsManage>;

export const Zoom_accoun_5_2_tStory: ComponentStory<any> = () => {
  return (
    <ItemsManage token={""} items={dummieItems} />
  )
}
