import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SingUp } from "./signUp";
import { dummieForm } from "./dummieObj";

export default {
  title: 'Components/SingUp',
  component: SingUp
} as ComponentMeta<typeof SingUp>;

export const SingUpStory: ComponentStory<any> = () => {
  return (
    <SingUp crf_token="" form={dummieForm} signUp={()=>console.log("submit")} />
  )
}
