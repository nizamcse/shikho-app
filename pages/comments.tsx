import type { NextPage } from 'next'
import {useState} from 'react'
import {Autocomplete,Card,CardContent,FormControl,IconButton,Input,TextField,Grid,Paper,List,ListItem,ListItemText,ListItemButton,ListItemIcon,ListSubheader,TextareaAutosize,Box,InputLabel} from '@mui/material'
import { useQuery } from '@apollo/client';
import {GET_COMMENTS} from '../lib/query/comments'
import {Comments,Comment} from '../typedef'
import SiteLayout from '../components/SiteLayout';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import CommentForm from '../components/CommentForm'
import { makeStyles } from '@mui/styles';
import { LoadingComponent } from '../components/LoadingComponent'
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


const Comment: NextPage = () => {
  const classes = useStyles()
    const [selectedIndex, setSelectedIndex] = useState<string | undefined>();
    const [comment, setComment] = useState<Comment | null>(null)
    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: string,
        item: Comment
    ) => {
        setSelectedIndex(index);
        setComment(item)
    };
    const resetListItem = () => {
      setComment(null)
    }
  const { loading, data,error } = useQuery<Comments>(
    GET_COMMENTS
  );

  if (loading) {
    return <LoadingComponent />
  } 
  if(error) console.log('Hello Error',error?.networkError?.message)



  return (
    <div>
      <Grid container>
        <Grid item xs={4}>
          <Paper>
            <List dense={false}>
              {data?.comments?.map((comment) => {
                return (
                  <ListItemButton
                    key={comment.id}
                    selected={selectedIndex === comment.id}
                    onClick={(event) => handleListItemClick(event, comment.id,comment)}
                  >
                    <ListItemIcon>
                      <ArticleOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary={comment.data?.body} />
                  </ListItemButton>
                )
              })}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <CommentForm comment={comment} resetListItem={resetListItem} />
        </Grid>
      </Grid>
    </div>
  )
}
export default Comment
