import gql from 'graphql-tag';

export default gql`
  query FetchFiters{
    allSidebarFilters(orderBy: order_ASC){
      id
      name
      order
      property{
        name
      }
    }
  }
`;
