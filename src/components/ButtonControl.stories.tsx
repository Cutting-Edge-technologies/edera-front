import { ComponentMeta, ComponentStory } from "@storybook/react";
import {ButtonControl } from "./ButtonControl";
import { controls } from "./dummieObj";

export default {
  title: 'Components/ButtonControl',
  component: ButtonControl
} as ComponentMeta<typeof ButtonControl>;

const title = controls[0].title;
const reference = "http://localhost:6006/?path=/story/components-dropdowncontrol--dropdown-control-story";
const isActive = controls[0].isActive || true;

export const ButtonControlStory: ComponentStory<any> = () => {
  
  return (
    <ButtonControl title={title} reference={reference} isActive={isActive} />
  )
}