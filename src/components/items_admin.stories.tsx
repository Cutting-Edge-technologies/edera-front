import { ComponentMeta, ComponentStory } from "@storybook/react";
import { dummieFelds, dummieGroups } from "./dummieObj";
import { ItemsManage } from "./items_admin";

export default {
  title: 'PageStories/5 Setting',
  component: ItemsManage
} as ComponentMeta<typeof ItemsManage>;

const currencyFields = [dummieFelds[0]];

export const Currency_5_7_Story: ComponentStory<any> = () => {
  return (
    <ItemsManage token={""} fields={currencyFields} items={dummieGroups} desc={{name:"Currency"}}/>
  )
}

export const ServiceGroups_5_8_Story: ComponentStory<any> = () => {
  return (
    <ItemsManage token={""} fields={dummieFelds} items={dummieGroups} desc={{name:"Service Groups"}}/>
  )
}
