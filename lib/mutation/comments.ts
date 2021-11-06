import { gql } from '@apollo/client'

export const CREATE_COMMENT = gql`
  mutation CreateComment(
    $payload: comment_create_payload!
    $status: STATUS_TYPE_ENUM
    $connect: comment_input_connection_payload
  ) {
    createComment(payload: $payload, status: $status, connect: $connect) {
      id
      data {
        body
      }
      post {
        data {
          title
        }
      }
    }
  }
`

export const UPDATE_COMMENT = gql`
  mutation UpdateComment(
    $id: String!
    $payload: comment_update_payload
    $status: STATUS_TYPE_ENUM
    $connect: comment_input_connection_payload
    $disconnect: comment_input_disconnection_payload
  ) {
    updateComment(
      _id: $id
      payload: $payload
      status: $status
      connect: $connect
      disconnect: $disconnect
    ) {
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
`
