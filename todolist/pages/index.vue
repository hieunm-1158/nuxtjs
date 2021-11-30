<template>
  <section class="p-5 text-center">
    <h1 class="title_page">Danh sách công việc</h1>
    <div class="row py-5">
      <div v-show="isDisplayForm" class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <task-form @onToggleForm="handleToggleForm"></task-form>
      </div>
      <div
        :class="
          isDisplayForm
            ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8'
            : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'
        "
      >
        <button type="button" class="btn btn-primary" @click="handleToggleForm">
          <span class="fa fa-plus mr-5" />Thêm công việc
        </button>
        <div class="row mt-5">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <task-list @onOpenForm="handleOpenForm"></task-list>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  isDisplayForm: boolean = false;
  public handleToggleForm(): void {
    this.isDisplayForm = !this.isDisplayForm;
  }
  public handleOpenForm(): void {
    this.isDisplayForm = true;
  }
}
</script>

<style scoped lang="scss">
.title_page {
  font-size: 30px;
  text-transform: uppercase;
  color: orange;
  font-weight: bold;
}
</style>
