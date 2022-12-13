import { ComponentMeta, ComponentStory } from "@storybook/react";
import { dummieFelds, dummieGroups } from "./dummieObj";
import { ItemsManage } from "./items_admin";

export default {
  title: 'PageStories/5 Setting',
  component: ItemsManage
} as ComponentMeta<typeof ItemsManage>;

export const Currency_5_7_Story: ComponentStory<any> = () => {
  return (
    <ItemsManage token={""} desc={""} fields={dummieFelds} items={dummieGroups}/>
  )
}
