<template>
  <div class="panel panel-warning border p-4">
    <div class="panel-heading">
      <h3 class="panel-title d-flex justify-content-between">
        {{ taskEdit.id ? "Sửa công việc" : "Thêm công việc" }}
        <span
          @click="$emit('onToggleForm')"
          class="fa fa-times-circle text-right"
        />
      </h3>
    </div>
    <div class="panel-body py-3">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(handleSubmitForm)">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <div class="form-group">
              <label>Tên :</label>
              <input
                type="text"
                class="form-control"
                v-model="taskEdit.content"
              />
              <span class="error-message">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <label>Trạng thái</label>
          <select class="form-control" v-model="taskEdit.status">
            <option value="active">Success</option>
            <option value="noactive">Pending</option>
            <option value="disable">Disable</option>
          </select>
          <br />
          <div class="text-center">
            <button v-if="taskEdit.id" type="submit" class="btn btn-warning">
              Sửa
            </button>
            <button v-else type="submit" class="btn btn-warning">Thêm</button>
            <button
              type="button"
              class="btn btn-danger"
              @click="$emit('onToggleForm')"
            >
              Hủy Bỏ
            </button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, namespace, Watch } from "nuxt-property-decorator";
import { ADD_TASK, UPDATE_TASK } from "~/libs/queryData";
import * as Model from "~/models/tasks.model";
import { ValidationProvider, ValidationObserver } from "vee-validate";
const taskSpace = namespace("tasks");
@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
  },
})
export default class TaskForm extends Vue {
  taskEdit: Model.TaskItem = {
    id: "",
    content: "",
    status: "disable",
  };
  @taskSpace.State
  public taskState!: Model.TaskState;
  @taskSpace.Action
  public addTask!: (body: Model.TaskItem) => {};
  @taskSpace.Action
  public updateTask!: (body: Model.TaskItem) => {};
  @taskSpace.Action
  public setEditTaskItem!: (body: Model.TaskItem) => {};

  public async handleSubmitForm() {
    if (!this.taskEdit.id) {
      const body = {
        content: this.taskEdit.content,
        status: this.taskEdit.status,
      };
      const newTask = await this.$apollo.mutate({
        mutation: ADD_TASK,
        variables: { task: body },
      });
      this.addTask(newTask.data.createTask);
      this.taskEdit.content = "";
      this.taskEdit.status = "disable";
    } else {
      const updateTask = await this.$apollo.mutate({
        mutation: UPDATE_TASK,
        variables: {
          id: this.taskEdit.id,
          content: this.taskEdit.content,
          status: this.taskEdit.status,
        },
      });
      this.updateTask(updateTask.data.updateTask);
      this.setEditTaskItem({
        id: "",
        content: "",
        status: "disable",
      });
    }
  }
  @Watch("taskState.editTaskItem", {
    immediate: true,
    deep: true,
  })
  watchEditTaskItem() {
    this.taskEdit = { ...this.taskState.editTaskItem };
  }
}
</script>

<style lang="scss" scoped>
.error-message {
  color: red;
  margin-top: 5px;
  display: inline-block;
}
</style>
