import { ComponentMeta, ComponentStory } from "@storybook/react";
import {Starter } from "./starter";
import { controls } from "./dummieObj";

export default {
  title: 'Components/StarterOther',
  component: Starter
} as ComponentMeta<typeof Starter>;

export const StarterOtherStory: ComponentStory<any> = () => {
  return (
    <Starter controls={controls}/>
  )
}
