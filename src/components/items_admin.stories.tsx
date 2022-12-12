import { ComponentMeta, ComponentStory } from "@storybook/react";
import { dummieFelds, dummieGroups } from "./dummieObj";
import { ItemsManage } from "./items_admin";

export default {
  title: 'Components/ItemsManage',
  component: ItemsManage
} as ComponentMeta<typeof ItemsManage>;

export const ItemsManageStory: ComponentStory<any> = () => {
  return (
    <ItemsManage token={""} desc={""} fields={dummieFelds} items={dummieGroups}/>
  )
}
