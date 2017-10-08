import gql from 'graphql-tag';

export default gql`
  mutation CreatePopupFilter(
  $name: String!,
  $order: Int!,
  $property: ID!,
  $dependentOn: [ID!]
  ){
    createSidebarFilter(
      name: $name
      order: $order
      propertyId: $property,
      dependentOnIds: $dependentOn
    ){
      id
    }
  }
`;
