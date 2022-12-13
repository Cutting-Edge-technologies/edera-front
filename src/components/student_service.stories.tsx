import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ItemsManage } from "./student_service";
import { dummieAll_dicts, dummieCosts, dummieUsers, dummieStudentService } from "./dummieObj";

export default {
  title: 'PageStories/6 Finance',
  component: ItemsManage
} as ComponentMeta<typeof ItemsManage>;


export const StudentServiceRevenue_6_2_Story: ComponentStory<any> = () => {
  return (
    <ItemsManage token={""} all_dicts={dummieAll_dicts} users ={dummieUsers} costs={dummieCosts} services={dummieStudentService} />
  )
}
