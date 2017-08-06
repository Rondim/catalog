import gql from 'graphql-tag';
export default gql`
    query {
        allItems{
            id,
            img{
                id
                url
            }
        }
    }
`;
