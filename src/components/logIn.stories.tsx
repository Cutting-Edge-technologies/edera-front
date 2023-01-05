import { ComponentMeta, ComponentStory } from "@storybook/react";
import { LogIn } from "./logIn";
import { dummieForm } from "./dummieObj";

export default {
  title: 'Components/LogIn',
  component: LogIn
} as ComponentMeta<typeof LogIn>;

export const LogInStory: ComponentStory<any> = () => {
  return (
    <LogIn csrf_token="" form={dummieForm} logIn={()=>console.log("submit")} />
  )
}
