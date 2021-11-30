import gql from "graphql-tag";
import { TASK_FIELDS } from "./fragments";

export const FETCH_TASK = gql`
  ${TASK_FIELDS}
  query getTaskAll {
    getTaskAll {
      ...TaskFields
    }
  }
`;

export const ADD_TASK = gql`
  ${TASK_FIELDS}
  mutation createTask($task: CreateTaskDTO!) {
    createTask(task: $task) {
      ...TaskFields
    }
  }
`;

export const DELETE_TASK = gql`
  ${TASK_FIELDS}
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id) {
      ...TaskFields
    }
  }
`;

export const UPDATE_TASK = gql`
  ${TASK_FIELDS}
  mutation updateTask($id: ID!, $content: String!, $status: String!) {
    updateTask(id: $id, content: $content, status: $status) {
      ...TaskFields
    }
  }
`;
