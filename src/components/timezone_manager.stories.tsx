import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ItemsManage } from "./timezone_manager";
import { dummieItems } from "./dummieObj";

export default {
  title: 'Components/timezone_manager',
  component: ItemsManage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ItemsManage>;

export const ActivateStory: ComponentStory<any> = () => {
  return (
    <ItemsManage token={""} items={dummieItems} />
  )
}