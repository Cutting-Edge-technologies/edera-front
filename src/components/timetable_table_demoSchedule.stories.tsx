import { ComponentMeta, ComponentStory } from "@storybook/react";
import { DemoSchedule } from "./timetable_table";
import { dummieServices, dummieGroups, dummieStrinds, dummieSchaduleData  } from "./dummieObj";

export default {
  title: 'Components/DemoSchedule',
  component: DemoSchedule,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DemoSchedule>;


export const DemoScheduleStory: ComponentStory<any> = () => {
  return (
    <DemoSchedule
    token={""}
    services={dummieServices}
    families = {dummieGroups}
    students = {dummieGroups}
    teachers = {dummieGroups}
    currentDate= "22-55-1988"
    days={dummieStrinds}
    responsibles = {dummieStrinds}
    zooms = {dummieGroups}
    appointments = {dummieSchaduleData}
    />
  )
}