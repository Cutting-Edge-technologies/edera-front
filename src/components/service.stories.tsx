import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Service } from "./service";
import { dummieAll_dicts, dummieServices } from "./dummieObj";

export default {
  title: 'PageStories/5 Setting',
  component: Service
} as ComponentMeta<typeof Service>;


export const Service_5_1_Story: ComponentStory<any> = () => {
  return (
    <Service token={""} services={dummieServices} all_dicts={dummieAll_dicts} />
  )
}
