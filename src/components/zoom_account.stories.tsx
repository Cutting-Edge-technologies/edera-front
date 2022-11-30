import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ItemsManage } from "./zoom_account";
import { dummieItems } from "./dummieObj";

export default {
  title: 'Components/ItemsManage from Zoom_account',
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
