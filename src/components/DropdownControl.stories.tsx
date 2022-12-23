import { ComponentMeta, ComponentStory } from "@storybook/react";
import {DropdownControl } from "./DropdownControl";
import { controls } from "./dummieObj";

export default {
  title: 'Components/DropdownControl',
  component: DropdownControl
} as ComponentMeta<typeof DropdownControl>;

const title = controls[2].title;
const options = controls[2].options || [{reference:"manage/", title:"NOOO"}];
const isActive = controls[2].isActive || true;

export const DropdownControlStory: ComponentStory<any> = () => {
  
  return (
    <DropdownControl title={title} isActive={isActive} options={options}/>
  )
}