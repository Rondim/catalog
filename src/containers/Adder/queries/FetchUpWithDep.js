import gql from 'graphql-tag';

export default gql`
  query FetchFitersWithDep{
    allSidebarItems(orderBy: order_ASC){
      id
      name
      order
    }
  }
`;
