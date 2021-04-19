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
    display: 'flex',
    justifyContent: 'flex-end',
    minWidth: '150px',
    padding: '15px',
  },
  dropDownRoot: {
    width: '500px',
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
  const [result] = useQuery({ query });

  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch(actions.metricApiErrorReceived({ error: error.message }));
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

  return (
    <div className={styles.container}>
      <AutoComplete
        classes={{
          root: styles.dropDownRoot
        }}
        filterSelectedOptions
        loading={fetching}
        multiple
        options={metrics}
        renderInput={(params) => <TextField {...params} label="Metrics" variant="outlined" />}
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
