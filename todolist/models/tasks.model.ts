export enum LabelText{
  active="success",
  noactive="pending",
  disable="disable"
}

export interface TaskItem{
  id?:number|string,
  content:string,
  status: string
}

export interface TaskState{
  tasks: Array<TaskItem>,
  editTaskItem:{
    id?:number|string,
    content:string,
    status: string
  }
}

