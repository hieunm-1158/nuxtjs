<template>
  <tr>
    <td>{{ task.id }}</td>
    <td>{{ task.content }}</td>
    <td class="text-center">
      <span class="label" :class="labelText">{{ task.status }}</span>
    </td>
    <td class="text-center">
      <button
        type="button"
        class="btn btn-warning"
        @click="handleSetEditTaskItem"
      >
        <span class="fa fa-pencil mr-5" />Sửa
      </button>
      &nbsp;
      <button
        type="button"
        class="btn btn-danger"
        @click="handleDeleteTask(task.id)"
      >
        <span class="fa fa-trash mr-5" />Xóa
      </button>
    </td>
  </tr>
</template>

<script lang="ts">
import { Component, Prop, Vue, namespace } from "nuxt-property-decorator";
import { DELETE_TASK } from "~/libs/queryData";
import * as Model from "~/models/tasks.model";
const taskSpace = namespace("tasks");

@Component
export default class TaskItem extends Vue {
  @Prop({ required: true }) task!: Model.TaskItem;
  @Prop() onOpenForm!: Function;

  @taskSpace.Action
  public deleteTask!: (id: number | string) => {};
  @taskSpace.Action
  public setEditTaskItem!: (task: Model.TaskItem) => {};

  public async handleDeleteTask(id: number) {
    try {
      await this.$apollo.mutate({
        mutation: DELETE_TASK,
        variables: { id },
      });
      this.deleteTask(id);
    } catch (error) {
      console.log(error);
    }
  }

  public handleSetEditTaskItem() {
    this.setEditTaskItem(this.task);
    this.$emit("onOpenForm");
  }

  get labelText(): Model.LabelText {
    if (this.task.status === "active") {
      return Model.LabelText.active;
    } else if (this.task.status === "noactive") {
      return Model.LabelText.noactive;
    } else {
      return Model.LabelText.disable;
    }
  }
}
</script>

<style lang="scss" scoped>
.label {
  padding: 5px 20px;
  border-radius: 25px;
  &.success {
    background-color: greenyellow;
  }
  &.pending {
    background-color: aqua;
  }
  &.disable {
    background-color: orange;
  }
}
</style>
