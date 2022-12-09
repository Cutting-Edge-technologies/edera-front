import { ComponentMeta, ComponentStory } from "@storybook/react";
import { dummieItems } from "./dummieObj";
import { ItemsManage } from "./pair_info";

export default {
  title: 'Components/pair_info',
  component: ItemsManage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ItemsManage>;

export const Pair_InfoStory: ComponentStory<any> = () => {
  return (
    <ItemsManage token={""} items={dummieItems} />
  )
}