import { ComponentMeta, ComponentStory } from "@storybook/react";
import { LessonLog } from "./lesson_log";

export default {
  title: 'PageStories/5 Setting',
  component: LessonLog
} as ComponentMeta<typeof LessonLog>;

export const LessonLog_5_6_Story: ComponentStory<any> = () => {
  return (
    <LessonLog token={""} dt_from="15-02-2022" dt_to={"18-02-2056"}/>
  )
}
