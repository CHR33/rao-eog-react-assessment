import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, List, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { IState } from '../../store';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '20px',
    width: '60%',
  },
  card: {
    marginRight: '1rem',
    marginBottom: '1rem',
  },
});

const getSelectedMetrics = (state: IState) => state.metrics.selectedMetrics;

export default () => {
  const classes = useStyles();
  const selectedMetrics = useSelector(getSelectedMetrics);

  return (
    <section className={classes.root}>
        {selectedMetrics.map((metric) => (
          <Card className={classes.card} key={`metric-${metric}`}>
            <CardContent>
              <Typography variant="h6">{metric}</Typography>
              <Typography variant="h3">{Math.random().toFixed(2)}</Typography>
            </CardContent>
          </Card>
        ))}
    </section>
  );
};
