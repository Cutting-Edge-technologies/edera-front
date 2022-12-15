import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InvoiceManage } from "./invoice";

export default {
  title: 'Components/InvoiceManage',
  component: InvoiceManage
} as ComponentMeta<typeof InvoiceManage>;

export const Zoom_accountStory: ComponentStory<any> = () => {
  return (
    <InvoiceManage token={""}/>
  )
}
