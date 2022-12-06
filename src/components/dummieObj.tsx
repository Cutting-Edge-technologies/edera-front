import { IUser } from "./activate"
import { IItem } from "./pair_info"
import { IGroup, IService } from "./service"
import { ICost, IServiceWithGroup, IStudentService } from "./student_service"
import { ILesson, ISchaduleData} from "./timetable_table"
import { IUserInfoFamily, IUserInfoTeacher, IUserInfoUser } from "./user"

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

export const dummieUserInfoFamilies: IUserInfoFamily[] = [
  {
    note_id: 565,
    name_sheets: "Fooo",
    id: 686,
    name: "Beee"
  },
  {
    note_id: 754,
    name_sheets: "Word",
    id: 365,
    name: "Zuuu"
  },
  {
    note_id: 999,
    name_sheets: "Nord",
    id: 111,
    name: "Diii"
  },

]
export const dummieUserInfoTeachers: IUserInfoTeacher[] = [
  {
    id: 456,
    name: "joan",
    name_sheets: "Boran",
    tg: "@Joan",
    user_id: 4556,
    username: "JoanBoran"
  },
  {
    id: 666,
    name: "Adam",
    name_sheets: "Huan",
    tg: "@Huan",
    user_id: 999,
    username: "AdamHuan"
  },
  {
    id: 222,
    name: "Hesus",
    name_sheets: "Kain",
    tg: "@Hesus",
    user_id: 333,
    username: "HesusKain"
  },
]

export const dummieUserInfoUsers: IUserInfoUser[] = [
  {
  id:"aaa",
  user_id: 111,
  note_id: "bbb",
  name: "John",
  family: dummieUserInfoFamilies[0],
  teacher: dummieUserInfoTeachers[0],
  manager: dummieGroups[0],
  name_sheets: "Pohan",
  name_ru: "Похан",
  parent_name_ru: "Станиславович",
  discount: "58%",
  tg: "@Pohan",
  color: "white"
  },
  {
    id:"bbb",
    user_id: 222,
    note_id: "ccc",
    name: "Huan",
    family: dummieUserInfoFamilies[1],
    teacher: dummieUserInfoTeachers[1],
    manager: dummieGroups[1],
    name_sheets: "Kayna",
    name_ru: "хан",
    parent_name_ru: "славович",
    discount: "42%",
    tg: "@Han",
    color: "black"
    },
    {
      id:"ccc",
      user_id: 333,
      note_id: "ddd",
      name: "Eve",
      family: dummieUserInfoFamilies[2],
      teacher: dummieUserInfoTeachers[2],
      manager: dummieGroups[2],
      name_sheets: "Po",
      name_ru: "По",
      parent_name_ru: "Станович",
      discount: "15%",
      tg: "@Po",
      color: "green"
      },
]
