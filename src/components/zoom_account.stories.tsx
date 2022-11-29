import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ItemsManage } from "./zoom_account";
import { dummieItems } from "./pair_info.stories";

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
