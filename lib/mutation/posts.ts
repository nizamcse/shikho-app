import {gql} from '@apollo/client'

export const CREATE_POST = gql`
  mutation CreatePost(
    $payload: post_create_payload!
    $status: STATUS_TYPE_ENUM
    $connect: post_input_connection_payload
  ) {
    createPost(payload: $payload, status: $status, connect: $connect) {
      id
      data {
        title
        body {
          html
        }
      }
    }
  }
`

export const UPDATE_POST = gql`
  mutation UpdatePost(
    $id: String!
    $payload: post_update_payload
    $status: STATUS_TYPE_ENUM
    $connect: post_input_connection_payload
    $disconnect: post_input_disconnection_payload
  ) {
    updatePost(
      _id: $id
      payload: $payload
      status: $status
      connect: $connect
      disconnect: $disconnect
    ) {
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
`

