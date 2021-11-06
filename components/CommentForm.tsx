import type { NextPage } from 'next'
import {
  Button,
  Autocomplete,
  Card,
  CardContent,
  FormControl,
  IconButton,
  Input,
  TextField,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  ListSubheader,
  TextareaAutosize,
  Box,
  InputLabel
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_POSTS } from '../lib/query/posts'
import { Comment, Comments, Post } from '../typedef'
import CommentSearch from '../components/CommentSearch'
import { LoadingComponent } from '../components/LoadingComponent'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import { makeStyles } from '@mui/styles'
import CheckIcon from '@mui/icons-material/Check'
import CircularProgress from '@mui/material/CircularProgress'
import { CREATE_COMMENT, UPDATE_COMMENT } from '../lib/mutation/comments'
import { useMutation } from '@apollo/client'
import { GET_COMMENTS } from '../lib/query/comments'
import PostSearch from './PostSearch'
const useStyles = makeStyles({
  listItemOutlined: {
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: 4,
    color: 'rgba(0, 0, 0, 0.87)',
    paddingTop: 9,
    paddingBottom: 9,
    background: '#fff'
  },
  textPrimary: {
    overflow: 'hidden',
    maxWidth: '50ch',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: 14,
    fontWeight: 400
  }
})

interface CommentFormProps {
  comment: Comment | null
  resetListItem: Function
}

const CommentForm: React.FC<CommentFormProps> = ({
  comment,
  resetListItem
}) => {
  const [disconnectedId, setDisconnectedId] = useState<string | null | undefined>(null)
  const [body, setBody] = useState<string | undefined>('')
  const [commentPost, setCommentPost] = useState<Post | null>(null)
  const classes = useStyles()
  const [updateComment, { data, loading, error }] = useMutation(UPDATE_COMMENT)
  const [createComment, { data: cd, loading: cl, error: ce }] = useMutation(CREATE_COMMENT)
  useEffect(() => {
      console.log(comment,'comment form')
    if (comment) {
      const b = comment?.data?.body
      setBody(b)
      setCommentPost(comment?.post || null)
    } else {
      setBody('')
    }
  }, [comment])
  const updateCommentPost = (v: Post) => {
    setCommentPost(v)
  }
  const removeCommentPost = (v: Post | null) => {
    setCommentPost(null)
    setDisconnectedId(v?.id)
  }

  const commentUpdate = () => {
    
    updateComment({
      variables: {
        id: comment?.id,
        payload: {
          body: body
        },
        status: 'published',
        connect: {
          post_id: commentPost?.id || null
        },
        disconnect: {
          post_id: disconnectedId || null
        }
      },
      refetchQueries: [GET_COMMENTS]
    })
      .then((response) => {
        console.log('201 created ', response.data)
      })
      .catch((err) => {
        console.log(err, 'Create post error')
      })
  }

  const commentCreate = () => {
      createComment({
        variables: {
          payload: {
            body: body
          },
          status: 'published',
          connect: {
            post_id: commentPost?.id || null
          }
        },
        refetchQueries: [GET_COMMENTS]
      })
        .then((response) => {
          console.log('201 created ', response.data)
        })
        .catch((err) => {
          console.log(err, 'Create post error')
        })
  }

  return (
    <Box pl={4} pr={4}>
      <h3>{comment ? 'UPDATE COMMENT' : 'CREATE NEW COMMENT'}</h3>
      <div>
        <InputLabel>Body</InputLabel>
        <TextareaAutosize
          value={body}
          aria-label="minimum height"
          minRows={8}
          style={{ width: '100%' }}
          onChange={(e) => setBody(e.target.value || '')}
        />
      </div>
      <PostSearch setCommentPost={updateCommentPost} />
      <div>
        {commentPost && (
          <Box pt={2} pb={2}>
            <ListItem
              className={classes.listItemOutlined}
              secondaryAction={
                <IconButton
                  onClick={() => removeCommentPost(commentPost)}
                  edge="end"
                  aria-label="delete"
                >
                  <CloseOutlinedIcon />
                </IconButton>
              }
            >
              <ListItemText
                classes={{ primary: classes.textPrimary }}
                primary={commentPost?.data?.title}
              />
            </ListItem>
          </Box>
        )}

        <Box pt={4} pb={4} display="flex" justifyContent="flex-end">
          {comment && (
            <Box pr={2}>
              <Button
                color="error"
                variant="contained"
                startIcon={<CloseOutlinedIcon />}
                onClick={() => {
                    resetListItem()
                    setCommentPost(null)
                }}
              >
                Clear Form
              </Button>
            </Box>
          )}
          <Box>
            <Button
              onClick={comment ? commentUpdate : commentCreate}
              color="success"
              variant="contained"
              startIcon={
                loading ? <CircularProgress size={24} /> : <CheckIcon />
              }
            >
              {comment ? 'Update Comment' : 'Create Comment'}
            </Button>
          </Box>
        </Box>
      </div>
    </Box>
  )
}

export default CommentForm
