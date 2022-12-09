import { ComponentMeta, ComponentStory } from "@storybook/react";
import {StarterOther } from "./starterOther";
import { dummieControls } from "./dummieObj";

export default {
  title: 'Components/StarterOther',
  component: StarterOther,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof StarterOther>;

export const StarterOtherStory: ComponentStory<any> = () => {
  return (
    <StarterOther controls={dummieControls}/>
  )
}
