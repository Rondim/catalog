import gql from 'graphql-tag';

export default gql`
  mutation SetOrderPopupFilters($id: ID!, $order: Int) {
    updateSidebarFilter(id: $id, order: $order) {
      id
    }
  }
`;
