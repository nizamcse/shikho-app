import type { NextPage } from 'next'
import {Autocomplete,Card,CardContent,FormControl,IconButton,Input,TextField,Grid,Paper,List,ListItem,ListItemText,ListItemButton,ListItemIcon,ListSubheader,TextareaAutosize,Box,InputLabel} from '@mui/material'
import React,{useState} from 'react'
import { useQuery } from '@apollo/client';
import {GET_POSTS} from '../lib/query/posts'
import {Posts,Post} from '../typedef'
import CommentSearch from '../components/CommentSearch'
import {LoadingComponent} from '../components/LoadingComponent'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { makeStyles } from '@mui/styles';
import PostForm from '../components/PostForm'
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

const Post: NextPage = () => {
    const classes = useStyles()
    const [selectedIndex, setSelectedIndex] = useState<string | null>(null);
    const [post, setPost] = useState<Post | null>(null)
    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: string,
        item: Post
    ) => {
        setSelectedIndex(index);
        setPost(item)
    };  
    const resetListItem = () => {
      setPost(null)
    }
    const { loading, data,error } = useQuery<Posts>(
        GET_POSTS
    );

  if(loading){
      return <LoadingComponent />
  } 
  if(error) console.log('Hello Error',error?.networkError?.message)

  return (
    <div>
      <Grid container>
        <Grid item xs={4}>
          <Paper>
            <List dense={false}>
              {data?.posts?.map((post) => {
                return (
                  <ListItemButton
                    key={post.id}
                    selected={selectedIndex === post.id}
                    onClick={(event) =>
                      handleListItemClick(event, post.id, post)
                    }
                  >
                    <ListItemIcon>
                      <ArticleOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary={post.data?.title} />
                  </ListItemButton>
                )
              })}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <PostForm post={post} resetListItem={resetListItem} />
        </Grid>
      </Grid>
    </div>
  )
}
export default Post
