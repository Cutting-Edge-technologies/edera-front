import { ComponentMeta, ComponentStory } from "@storybook/react";
import { LessonEditor } from "./lessonEditor";
import { dummieLesson, dummieStrinds, dummieServices } from "./dummieObj";

export default {
  title: 'Components/LessonEditor',
  component: LessonEditor
} as ComponentMeta<typeof LessonEditor>;


export const LessonEditorStory: ComponentStory<any> = () => {
  return (
    <LessonEditor
    token={""}
    add_lesson ={dummieLesson}
    manage_url ="Lorem Ipsum"
    responsibles= {dummieStrinds}
    today= "22-10-2089"
    services={dummieServices}
    save_lesson = {()=>console.log("lesson seved")}
    />
  )
}
