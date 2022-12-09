import { ComponentMeta, ComponentStory } from "@storybook/react";
import {Starter } from "./starter";
import { dummieControls } from "./dummieObj";

export default {
  title: 'Components/Starter',
  component: Starter,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Starter>;

export const StarterStory: ComponentStory<any> = () => {
  return (
    <Starter controls={dummieControls}/>
  )
}
