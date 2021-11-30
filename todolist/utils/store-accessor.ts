import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import taskState from "~/store/tasks";

// this is the name we'll use to import the module
let taskStateStore: taskState;

function initialiseStores(store: Store<any>): void {
  taskStateStore = getModule(taskState, store);
}

export { initialiseStores, taskStateStore };
