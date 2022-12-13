import { ComponentMeta, ComponentStory } from "@storybook/react";
import { DemoSchedule } from "./timetable_table";
import { dummieServices, dummieGroups, dummieStrinds, dummieSchaduleData  } from "./dummieObj";

export default {
  title: 'PageStories/3 Schedule',
  component: DemoSchedule
} as ComponentMeta<typeof DemoSchedule>;

const days: string[] = ['Mon','Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'San' ];
export const ScheduleNormalViewStory: ComponentStory<any> = () => {
  return (
    <DemoSchedule
    token={""}
    services={dummieServices}
    families = {dummieGroups}
    students = {dummieGroups}
    teachers = {dummieGroups}
    currentDate= "22-55-1988"
    days={days}
    responsibles = {dummieStrinds}
    zooms = {dummieGroups}
    appointments = {dummieSchaduleData}
    />
  )
}