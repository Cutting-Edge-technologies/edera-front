import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ItemsManage } from "./student_service";
import { dummieAll_dicts, dummieCosts, dummieUsers, dummieStudentService } from "./dummieObj";

export default {
  title: 'Components/Student_Service',
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
