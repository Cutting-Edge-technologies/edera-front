import { ComponentMeta, ComponentStory } from "@storybook/react";
import { IItem, ItemsManage } from "./pair_info";

export default {
  title: 'Components/ItemsManage',
  component: ItemsManage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ItemsManage>;

const dummieItems: IItem[] = [
  {
    id: 10,
    name: 'rondo1',
    account_id: 'rondo2',
    chat_id: 'rondo3',
    client_id: 'rondo4',
    client_secret: 'rondo5'
  },
  {
    id: 20,
    name: 'tango1',
    account_id: 'tango2',
    chat_id: 'tango3',
    client_id: 'tango4',
    client_secret: 'tango5'
  },
  {
    id: 30,
    name: 'delta1',
    account_id: 'delta2',
    chat_id: 'delta3',
    client_id: 'delta4',
    client_secret: 'delta5'
  },
]

export const ActivateStory: ComponentStory<any> = () => {
  return (
    <ItemsManage token={""} items={dummieItems} />
  )
}