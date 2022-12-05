import { IUser } from "./activate"
import { IItem } from "./pair_info"
import { IGroup, IService } from "./service"
import { ICost, IServiceWithGroup, IStudentService } from "./student_service"
import { ILesson, ISchaduleData} from "./timetable_table"

export const dummieGroups: IGroup[] = [
  {
    id: 11111111,
    name: `DummieGroup1`
  },
  {
    id: 222222,
    name: `DummieGroup2`
  },
  {
    id: 333333,
    name: `DummieGroup3`
  },

]

export const dummieServices: IService[] = [
  {
    service_id: 1,
    cost: 100,
    earn: 2000,
    name: 'John',
    note_id: 30,
    group: dummieGroups[0]
  },
  {
    service_id: 2,
    cost: 200,
    earn: 4000,
    name: 'Nohj',
    note_id: 60,
    group: dummieGroups[1]
  },
  {
    service_id: 3,
    cost: 300,
    earn: 6000,
    name: 'Down',
    note_id: 90,
    group: dummieGroups[2]
  },
]

export const dummieAll_dicts = {
  groups: dummieGroups,
  services: dummieGroups,
  currency: dummieGroups
}

export const dummieItems: IItem[] = [
  {
    id: 10,
    name: 'rondo1',
    account_id: 'rondo2',
    chat_id: 'rondo3',
    client_id: 'rondo4',
    client_secret: 'rondo5',
    hours: 3
  },
  {
    id: 20,
    name: 'tango1',
    account_id: 'tango2',
    chat_id: 'tango3',
    client_id: 'tango4',
    client_secret: 'tango5',
    hours: 4
  },
  {
    id: 30,
    name: 'delta1',
    account_id: 'delta2',
    chat_id: 'delta3',
    client_id: 'delta4',
    client_secret: 'delta5',
    hours: 5
  },
]

export const dummieUsers: IUser[] = [
  {
    user_id: '1',
    name: 'John Dow',
  },
  {
    user_id: '2',
    name: 'John Dow1',
  },
  {
    user_id: '3',
    name: 'John Dow2',
  },
]

export const dummieCosts: ICost[] = [
  {
    cost: 10,
    currency:{
      id: 1,
      name: 'aaaa'
    },
    date_from: '10-12-2020',
    discount: 12,
    id: 13
  },
  {
    cost: 20,
    currency:{
      id: 2,
      name: 'bbbb'
    },
    date_from: '10000',
    discount: 24,
    id: 26
  },
  {
    cost: 30,
    currency:{
      id: 3,
      name: 'cccc'
    },
    date_from: '22222',
    discount: 36,
    id: 39
  },
] 

export const dummieServicesWithGroup: IServiceWithGroup[] = [
  {
    group: 'AAAA',
    id: 55,
    name: 'John'
  },
  {
    group: 'BBBB',
    id: 110,
    name: 'Down'
  },
  {
    group: 'CCCC',
    id: 165,
    name: 'Bothare'
  }
]

export const dummieStudentService: IStudentService[] = [
  {
    costs: dummieCosts,
    id: 88,
    service: dummieServicesWithGroup[0]
  },
  {
    costs: dummieCosts,
    id: 99,
    service: dummieServicesWithGroup[1]
  },
  {
    costs: dummieCosts,
    id: 111,
    service: dummieServicesWithGroup[2]
  },
]

export const dummieLesson: ILesson = {
  id:22,
  pair_id: 33,
  info: 'aaa',
  name: 'bbb',
  old_info: 'ccc',
  repeat: 'ddd',
  break_duration:"eee",
  break_start:"fff",
  date:"ggg",
  duration_cost:"44",
  hours:"55",
  minutes:"66",
  responsible:"77",
  service:{
    cost:88,
    earn:99,
    name:"qqq",
    note_id:111
  },
  start_hour:"222",
  start_minute:"333",
  tz:{
    hours:"+23",
    id:"444",
    name:"www"
  },
  zoom:"zzz"
}

export const dummieStrinds: string[] = [
  "Lorem", "Ipsum", "John", "Dow"
]

export const dummieSchaduleData: ISchaduleData[] =[
  {
    color:"black",
    day_of_week:6,
    endDate:"28/12",
    id:"aaa",
    start_hour:"sss",
    startDate:"ttt",
    title:"Lorem Ipsum",
    date:"12/15",
    duration_cost:1500,
    location:"Oslo",
    teacher:"Norberd",
    endDate_orig:"02/11",
    startDate_orig:"25/09",
    tz_name:"Oslo",
  },
  {
    color:"white",
    day_of_week:2,
    endDate:"14/04",
    id:"bb",
    start_hour:"nnn",
    startDate:"eee",
    title:"John Dow",
    date:"88/55",
    duration_cost:200,
    location:"London",
    teacher:"Dobby",
    endDate_orig:"77/11",
    startDate_orig:"04/56",
    tz_name:"London",
  },
  {
    color:"green",
    day_of_week:1,
    endDate:"00/11",
    id:"ccc",
    start_hour:"qqq",
    startDate:"rrr",
    title:"Prow",
    date:"22/99",
    duration_cost:256054,
    location:"Shmaganroge",
    teacher:"Argent",
    endDate_orig:"45/33",
    startDate_orig:"22/15",
    tz_name:"Shmaganroge",
  },

]
