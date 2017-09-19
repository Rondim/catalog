import gql from 'graphql-tag';

export default gql`
  mutation CreateUpFilter(
  $name: String!,
  $multiselection: Boolean!,
  $order: Int!,
  $type: String,
  $childIds: [ID!],
  $parentIds: [ID!]
  ){
    createSidebarItem(
      name: $name
      multiselection: $multiselection
      order: $order
      type: $type
      childsIds: $childIds
      parentsIds: $parentIds
    ){
      id
    }
  }
`;
