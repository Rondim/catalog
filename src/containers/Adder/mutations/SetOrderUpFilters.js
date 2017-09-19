import gql from 'graphql-tag';

export default gql`
  mutation SetOrderUpFilters($id: ID!, $order: Int) {
    updateSidebarItem(id: $id, order: $order) {
      id
    }
  }
`;
