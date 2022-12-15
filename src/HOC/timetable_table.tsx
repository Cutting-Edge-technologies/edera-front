import { dummieGroups, dummieSchaduleData, dummieServices, dummieStrinds } from "../components/dummieObj";
import { DemoSchedule, ISchaduleProps } from "../components/timetable_table";
import { CommonHOCWrapper } from "../shared/commonHOC";

export class TimeTable extends CommonHOCWrapper<ISchaduleProps> {
  fethInitialProps = async () => {
    const initialData: ISchaduleProps = {
      token: '',
      services: dummieServices,
      families: dummieGroups,
      students: dummieGroups,
      teachers: dummieGroups,
      currentDate: "22-55-1988",
      days: ['15','16', '17', '18', '19', '20', '21' ],
      responsibles: dummieStrinds,
      zooms: dummieGroups,
      appointments: dummieSchaduleData,
    }
    return initialData;
  };

  RenderComponent = DemoSchedule;
}