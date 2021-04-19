import React from 'react';
import { useSelector } from 'react-redux';
import { List, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { IState } from '../../store';

const useStyles = makeStyles({
  root: {
    margin: '20px',
  },
  list: {
    display: 'flex',
  },
  listItem: {
    width: 'auto'
  },
  listItemText: {
    width: '150px',
  },
  paper: {
    padding: '10px',
    height: '100px',
    width: 'auto',
  },
});

const getSelectedMetrics = (state: IState) => state.metrics.selectedMetrics;

export default () => {
  const classes = useStyles();
  const selectedMetrics = useSelector(getSelectedMetrics);

  if (selectedMetrics.length < 1) {
    return null;
  }

  return (
    <section className={classes.root}>
      <List className={classes.list}>
        {selectedMetrics.map((metric) => (
          <ListItem className={classes.listItem} key={`metric-${metric}`}>
            <Paper className={classes.paper}>
              <ListItemText classes={{ root: classes.listItemText }} primary={metric} />
            </Paper>
          </ListItem>
        ))}
      </List>
    </section>
  );
};
