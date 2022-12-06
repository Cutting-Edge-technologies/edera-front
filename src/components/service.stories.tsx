import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Service } from "./service";
import { dummieAll_dicts, dummieServices } from "./dummieObj";

export default {
  title: 'Components/Service',
  component: Service,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Service>;


export const ActivateStory: ComponentStory<any> = () => {
  return (
    <Service token={""} services={dummieServices} all_dicts={dummieAll_dicts} />
  )
}
