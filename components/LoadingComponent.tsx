import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: 'calc(100vh - 128px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export function LoadingComponent() {
    const classes = useStyles()
  return (
    <Box className={classes.root} sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
}