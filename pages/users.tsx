import type { NextPage } from 'next'
import React from 'react'
import {Grid,Paper,List,ListItem,ListItemText} from '@mui/material'
import { useQuery } from '@apollo/client';
import {GET_POSTS} from '../lib/query/posts'
import {Posts} from '../typedef'
import SiteLayout from '../components/SiteLayout';

function generate(element: React.ReactElement) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const User: NextPage = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };
  const { loading, data,error } = useQuery<Posts>(
    GET_POSTS
  );

  if(loading) console.log('Hello Data',loading)
  if(data) console.log('Hello 200',data)
  if(error) console.log('Hello Error',error?.networkError?.message)



  return (
    <div>
      <Grid container>
        <Grid item xs={4}>
          <Paper>
            <List dense={false}>
              {generate(
                <ListItem>
                  <ListItemText
                    primary="passHref was not used for a Link component that wraps a custom component. This is needed in order to pass the href to the child <a> tag."
                  />
                </ListItem>,
              )}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={8}></Grid>
      </Grid>
    </div>
  )
}
export default User
