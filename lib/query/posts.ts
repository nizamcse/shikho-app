import {gql} from '@apollo/client'
export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      data {
          title
          body {
              html
          }
      }
      comments {
        id
        data {
          body
        }
      }
    }
  }
`;

export const SEARCH_POSTS = gql`
  query GetPosts($where: Posts_input_where_payload) {
    posts(where: $where) {
      id
      data {
          title
          body {
              html
          }
      }
      comments {
        id
        data {
          body
        }
      }
    }
  }
`;