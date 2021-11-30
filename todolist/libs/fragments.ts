import { gql } from "graphql-tag";

export const TASK_FIELDS = gql`
  fragment TaskFields on TaskDTO {
    id
    content
    status
  }
`;
