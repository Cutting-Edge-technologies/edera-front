import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ItemsManage } from "./teacher_service";
import { dummieAll_dicts, dummieCosts, dummieUsers, dummieStudentService } from "./dummieObj";

export default {
  title: 'PageStories/6 Finance',
  component: ItemsManage
} as ComponentMeta<typeof ItemsManage>;


export const TeacherServiceCosts_6_1_Story: ComponentStory<any> = () => {
  return (
    <ItemsManage token={""} all_dicts={dummieAll_dicts} users ={dummieUsers} costs={dummieCosts} services={dummieStudentService} />
  )
}
