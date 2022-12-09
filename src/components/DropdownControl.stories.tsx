import { ComponentMeta, ComponentStory } from "@storybook/react";
import {DropdownControl } from "./DropdownControl";
import { dummieControls } from "./dummieObj";

export default {
  title: 'Components/DropdownControl',
  component: DropdownControl,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DropdownControl>;

const title = dummieControls[2].title;
const options = dummieControls[2].options || [{onClick:()=>console.log("AAAA"), title:"AAAA"}, {onClick:()=>console.log("NOOOO"), title:"NOOO"}];
const isActive = dummieControls[2].isActive || true;

export const DropdownControlStory: ComponentStory<any> = () => {
  
  return (
    <DropdownControl title={title} isActive={isActive} options={options}/>
  )
}