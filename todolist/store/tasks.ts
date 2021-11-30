import { Module, Mutation, Action, VuexModule } from "vuex-module-decorators";
// import { $axios } from "~/utils/api";
import * as Model from "../models/tasks.model";

@Module({
  name: "taskModule",
  stateFactory: true,
  namespaced: true,
})
export default class Tasks extends VuexModule {
  public taskState: Model.TaskState = {
    tasks: [],
    editTaskItem: {
      id: "",
      content: "",
      status: "disable",
    },
  };

  @Mutation
  public handleSetListTask(tasks: Array<Model.TaskItem>) {
    this.taskState.tasks = tasks;
  }

  @Mutation
  public handleAddTask(tasks: Model.TaskItem) {
    this.taskState.tasks = [...this.taskState.tasks, tasks];
  }

  @Mutation
  public handleDeleteTask(id: string | number) {
    const data = this.taskState.tasks.filter((task) => {
      return task.id !== id;
    });
    this.taskState.tasks = data;
  }

  @Mutation
  public handleSetEditTaskItem(task: Model.TaskItem) {
    this.taskState.editTaskItem = task;
  }

  @Mutation
  public handleUpdateTask(task: Model.TaskItem) {
    const editTaskIndex = this.taskState.tasks.findIndex(
      (item) => item.id === task.id
    );
    this.taskState.tasks[editTaskIndex] = {
      ...this.taskState.tasks[editTaskIndex],
      content: task.content,
      status: task.status,
    };
    return this.taskState.tasks.splice(
      editTaskIndex,
      1,
      this.taskState.tasks[editTaskIndex]
    );
  }

  @Action
  public async addTask(task: Model.TaskItem) {
    try {
      // debugger;
      this.context.commit("handleAddTask", task);
    } catch (error) {
      console.log(error);
    }
  }

  @Action
  public async deleteTask(id: number) {
    try {
      this.context.commit("handleDeleteTask", id);
    } catch (error) {
      console.log(error);
    }
  }

  @Action
  public setEditTaskItem(task: Model.TaskItem) {
    this.context.commit("handleSetEditTaskItem", task);
  }

  @Action
  public async updateTask(task: Model.TaskItem) {
    try {
      // const res = await $axios.$patch(`/tasks/${task.id}`, task);
      this.context.commit("handleUpdateTask", task);
    } catch (error) {
      console.log(error);
    }
  }
}
