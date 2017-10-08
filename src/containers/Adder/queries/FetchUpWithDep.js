import gql from 'graphql-tag';

export default gql`
  query FetchFitersWithDep{
    allSidebarItems(orderBy: order_ASC){
      id
      name
      order
    }
    allSidebarFilters(orderBy: order_ASC){
      id
      name
      order
      property{
        name
        id
      }
    }
  }
`;