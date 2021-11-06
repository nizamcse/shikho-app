import * as React from 'react';
import Link from 'next/link'
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
export const mainListItems = (
  <div>
      <Link href="/users" passHref>
        <ListItem button>
            <ListItemIcon>
                <GroupOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
        </ListItem>
    </Link>
    <Link href="/posts" passHref>
        <ListItem button>
            <ListItemIcon>
                <ArticleOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Posts" />
        </ListItem>
    </Link>
    <Link href="/comments" passHref>
        <ListItem button>
            <ListItemIcon>
                <CommentOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Comments" />
        </ListItem>
    </Link>
    
  </div>
);