import type { NextPage } from 'next'
import {
  Button,Autocomplete,
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
import { useQuery } from '@apollo/client';
import {GET_POSTS} from '../lib/query/posts'
import {Comment, Comments, Post} from '../typedef'
import CommentSearch from '../components/CommentSearch'
import {LoadingComponent} from '../components/LoadingComponent'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { makeStyles } from '@mui/styles';
import CheckIcon from '@mui/icons-material/Check'
import CircularProgress from '@mui/material/CircularProgress'
import { CREATE_POST, UPDATE_POST } from '../lib/mutation/posts'
import {useMutation} from '@apollo/client'
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
});

interface PostFormProps {
  post: Post | null
  resetListItem: Function
}

const PostForm: React.FC<PostFormProps> = ({ post, resetListItem }) => {
  const [title, setTitle] = useState<string | undefined>('')
  const [disconnectedIds, setDisconnectedIds] = useState<string[] | []>([])
  const [body, setBody] = useState<string | undefined>('')
  const [postComments, setPostComments] = useState<any>([])
  const classes = useStyles()
  const [updatePost, { data, loading, error }] = useMutation(UPDATE_POST)
  useEffect(() => {
    if (post) {
      const t = post?.data?.title
      const b = post?.data?.body?.html
      setTitle(t)
      setBody(b)
      setPostComments(post?.comments || [])
    }else{
        setTitle('')
        setBody('')
    }
  }, [post])
  const updateComments = (v: Comment) => {
    let c = postComments.slice()
    setTimeout(() => {
      let exist = c.find((value: { id: string }) => value.id === v.id)
      if (!exist) {
        c = [...c, v]
        setPostComments(c)
        for(let j=0; j<disconnectedIds.length; j++){
            if(disconnectedIds[j] === v.id){
                let disIds = disconnectedIds.slice()
                disIds.splice(j, 1)
                setDisconnectedIds(disIds)
                break
            }
        }
      }
    }, 0)
  }
  const removeComment = (v: Comment) => {
    let c = postComments.slice()
    let disIds = disconnectedIds.slice()
    disIds.push(v.id)
    setDisconnectedIds(disIds)
    let index = c.indexOf(v)
    if (index > -1) c.splice(index, 1)
    setPostComments(c)
  }

  const postCreate = () => {
      const commentIds = postComments.map((pc: { id: any }) => pc.id) || null
      updatePost({
        variables: {
          payload: {
            title: title,
            body: {
              html: body
            }
          },
          status: 'published',
          connect: {
            comment_ids: commentIds
          }
        },
        refetchQueries: [GET_POSTS]
      })
        .then((response) => {
          console.log('201 created ', response.data)
        })
        .catch((err) => {
          console.log(err, 'Create post error')
        })
  }

  const postUpdate = () => {
    const commentIds = postComments.map((pc: { id: any }) => pc.id) || null
    updatePost({
      variables: {
        id: post?.id,
        payload: {
          title: title,
          body: {
            html: body
          }
        },
        status: 'published',
        connect: {
          comment_ids: commentIds
        },
        disconnect: {
          comment_ids: disconnectedIds
        }
      },
      refetchQueries: [GET_POSTS]
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
      <h3>{post ? 'UPDATE POST' : 'CREATE NEW POST'}</h3>
      <div>
        <InputLabel>Title</InputLabel>
        <TextField
          size="small"
          fullWidth
          hiddenLabel
          id="outlined-basic"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value || '')}
        />
      </div>
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
      <CommentSearch setPostComments={updateComments} />
      <div>
        <Box pt={2} pb={2}>
          <Grid container spacing={2}>
            {postComments?.map((c: Comment) => {
              return (
                <Grid key={c?.id} item>
                  <ListItem
                    className={classes.listItemOutlined}
                    secondaryAction={
                      <IconButton
                        onClick={() => removeComment(c)}
                        edge="end"
                        aria-label="delete"
                      >
                        <CloseOutlinedIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      classes={{ primary: classes.textPrimary }}
                      primary={c?.data?.body}
                    />
                  </ListItem>
                </Grid>
              )
            })}
          </Grid>
        </Box>
        <Box pt={4} pb={4} display="flex" justifyContent="flex-end">
          {post && (
            <Box pr={2}>
              <Button
                color="error"
                variant="contained"
                startIcon={<CloseOutlinedIcon />}
                onClick={() => {
                  setPostComments([]) 
                  resetListItem()
                }}
              >
                Clear Form
              </Button>
            </Box>
          )}
          <Box>
            <Button
              onClick={post ? postUpdate : postCreate}
              color="success"
              variant="contained"
              startIcon={
                loading ? <CircularProgress size={24} /> : <CheckIcon />
              }
            >
              {post ? 'Update post' : 'Create Post'}
            </Button>
          </Box>
        </Box>
      </div>
    </Box>
  )
}

export default PostForm
