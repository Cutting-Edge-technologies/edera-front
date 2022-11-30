import { IUser } from "./activate"
import { IItem } from "./pair_info"
import { IGroup, IService } from "./service"

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
  services: dummieServices
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
