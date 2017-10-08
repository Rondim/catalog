import gql from 'graphql-tag';

export default gql`
  query FetchFitersWithDep($property: ID){
    allSidebarFilters(orderBy: order_ASC, filter: {property: { id: $property }}){
      id
      name
      order
    }
  }
`;
