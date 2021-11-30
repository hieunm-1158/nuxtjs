<template>
  <table class="table table-bordered table-hover">
    <thead>
      <tr>
        <th class="text-center">ID</th>
        <th class="text-center">Tên công việc</th>
        <th class="text-center">Trạng thái</th>
        <th class="text-center">Hành động</th>
      </tr>
    </thead>
    <tbody>
      <div v-if="$fetchState.pending">
        <span class="loading"></span>
      </div>
      <task-item
        v-for="task in taskState.tasks"
        :key="task.id"
        :task="task"
        @onOpenForm="handleOpenForm"
        v-else
      ></task-item>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Vue, Component, namespace, Prop } from "nuxt-property-decorator";
import { $axios } from "~/utils/api";
import * as Model from "~/models/tasks.model";
import TaskItem from "../TaskItem/TaskItem.vue";
// import gql from "graphql-tag";
import { FETCH_TASK } from "../../libs/queryData";
const taskSpace = namespace("tasks");

@Component({
  components: {
    TaskItem,
  },
})
export default class TaskList extends Vue {
  @Prop() onOpenForm!: Function;
  @taskSpace.State
  public taskState!: Model.TaskState;
  @taskSpace.Mutation
  public handleSetListTask!: (tasks: Model.TaskState) => {};
  public handleOpenForm() {
    this.$emit("onOpenForm");
  }
  // apollo() {
  //   return {
  //     tasks: gql`
  //       query getTaskAll {
  //         getTaskAll {
  //           id
  //           content
  //           status
  //         }
  //       }
  //     `,
  //   };
  // }
  async fetch() {
    try {
      const tasks = await this.$apolloProvider.defaultClient.query({
        query: FETCH_TASK,
        variables: {},
      });

      this.handleSetListTask(tasks.data.getTaskAll);
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border: 4px solid rgba(9, 133, 81, 0.705);
  border-radius: 50%;
  border-top-color: #158876;
  animation: spin 1s ease-in-out infinite;
}
@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
