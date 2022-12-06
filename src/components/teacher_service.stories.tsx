import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ItemsManage } from "./teacher_service";
import { dummieAll_dicts, dummieCosts, dummieUsers, dummieStudentService } from "./dummieObj";

export default {
  title: 'Components/Teacher_Service',
  component: ItemsManage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ItemsManage>;


export const ActivateStory: ComponentStory<any> = () => {
  return (
    <ItemsManage token={""} all_dicts={dummieAll_dicts} users ={dummieUsers} costs={dummieCosts} services={dummieStudentService} />
  )
}
