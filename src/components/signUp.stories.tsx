import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SignUp } from "./signUp";
import { dummieForm } from "./dummieObj";

export default {
  title: 'Components/SingUp',
  component: SignUp
} as ComponentMeta<typeof SignUp>;

export const SignUpStory: ComponentStory<any> = () => {
  return (
    <SignUp crf_token="" form={dummieForm} signUp={()=>console.log("submit")} />
  )
}
