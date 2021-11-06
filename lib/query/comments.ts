import {gql} from '@apollo/client'
export const GET_COMMENTS = gql`
  query GetComments {
    comments {
      id
      data {
          body
      }
      post{
        data{
          title
        }
      }
    }
  }
`;

export const SEARCH_COMMENTS = gql`
  query SearchComments($where: Comments_input_where_payload) {
    comments(where: $where) {
      id
      data {
          body
      }
    }
  }
`;