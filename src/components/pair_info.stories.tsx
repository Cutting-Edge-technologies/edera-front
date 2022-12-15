import { ComponentMeta, ComponentStory } from "@storybook/react";
import { dummieItems } from "./dummieObj";
import { ItemsManage } from "./pair_info";

export default {
  title: 'PageStories/5 Setting',
  component: ItemsManage
} as ComponentMeta<typeof ItemsManage>;

export const PairsAndChats_5_4_Story: ComponentStory<any> = () => {
  return (
    <ItemsManage token={""} items={dummieItems} />
  )
}