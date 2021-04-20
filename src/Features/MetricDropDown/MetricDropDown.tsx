import React, { useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AutoComplete from '@material-ui/lab/Autocomplete';
import { TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from 'urql';
import Chip from '../../components/Chip';
import { actions } from './reducer';
import { IState } from '../../store';

const useStyles = makeStyles({
  container: {
    width: '40%',
    padding: '15px',
  },
  listItem: {
    '&:hover': {
      backgroundColor: '#bbdefb',
    }
  },
});

const query = `
  query {
    getMetrics
  }
`;

const getMetrics = (state: IState) => {
  return state.metrics
};

export default () => {
  return <MetricDropDown />;
};

const MetricDropDown = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { metrics, selectedMetrics } = useSelector(getMetrics);
  const [result] = useQuery({ query, });

  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch(actions.metricApiErrorReceived({ error: error.message, }));
      return;
    }

    if (!data) return;

    dispatch(actions.metricDataRecevied(data.getMetrics));
  }, [dispatch, data, error]);

  const onMetricSelection = (_: ChangeEvent<{}>, value: any) => {
   if (value) {
    dispatch(actions.metricSelectionUpdated(value));
   } else {
    dispatch(actions.metricSelectionUpdated([]));
   }
  }

  const placeholder = selectedMetrics.length > 0 ? '': 'select...';

  return (
    <div className={styles.container}>
      <AutoComplete
        classes={{
          option: styles.listItem,
        }}
        debug
        filterSelectedOptions
        loading={fetching}
        multiple
        options={metrics}
        renderInput={(params) => <TextField {...params} placeholder={placeholder} variant="outlined" />}
        renderOption={(option) => <Typography variant="body2">{option}</Typography>}
        renderTags={(tags, getTagProps) => {
          return tags.map((tag, index) => (
            <Chip variant="outlined" label={tag} {...getTagProps({ index })} />
        ))}}
        onChange={onMetricSelection}
        value={selectedMetrics}
      />
    </div>
  );
};
