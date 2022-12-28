import { DemoSchedule, ISchaduleProps } from "../components/timetable_table";
import { CommonHOCWrapper, hostName } from "../shared/commonHOC";

export class TimeTable extends CommonHOCWrapper<ISchaduleProps> {

  correspondingUrl =  `${hostName}timetable/ `;
  fethInitialProps = async () => {
    const response = await fetch(this.correspondingUrl);
    const initialData = await response.json();
    return initialData;
  };

  RenderComponent = DemoSchedule;
}