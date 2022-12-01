import { IUser } from "./activate"
import { IItem } from "./pair_info"
import { IGroup, IService } from "./service"
import { ICost, IServiceWithGroup, IStudentService } from "./student_service"

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
    d:11,
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
    d:22,
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
    d:33,
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
