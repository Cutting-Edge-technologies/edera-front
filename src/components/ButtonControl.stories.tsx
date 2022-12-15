import { ComponentMeta, ComponentStory } from "@storybook/react";
import {ButtonControl } from "./ButtonControl";
import { dummieControls } from "./dummieObj";

export default {
  title: 'Components/ButtonControl',
  component: ButtonControl
} as ComponentMeta<typeof ButtonControl>;

const title = dummieControls[0].title;
const onClick = ()=>window.location.href = "http://localhost:6006/?path=/story/components-dropdowncontrol--dropdown-control-story";
const isActive = dummieControls[0].isActive || true;

export const ButtonControlStory: ComponentStory<any> = () => {
  
  return (
    <ButtonControl title={title} onClick={onClick} isActive={isActive} />
  )
}