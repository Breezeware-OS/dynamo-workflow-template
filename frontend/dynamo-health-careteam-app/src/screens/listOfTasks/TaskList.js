/* eslint-disable no-unsafe-optional-chaining */
import React, {useEffect, useState} from 'react';
import {
  Breadcrumbs,
  Pagination,
  Snackbar,
  Text,
  TextField,
} from 'glide-design-system';
import Grid from '@mui/material/Grid';
import makeStyles from '@mui/styles/makeStyles';
import {useDispatch, useSelector} from 'react-redux';
import {DateRangePicker} from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';

import HomeIcon from '../../assets/icons/home.svg';
import searchIcon from '../../assets/icons/search_icon.svg';
import NurseTaskListTable from '../../components/NurseTaskList/NurseTaskListTable';
import {
  // fetchNurseTaskListCount,
  fetchNurseTaskListData,
  nurseTaskListActions,
} from './NurseTaskListSlice';

const options = {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'GMT',
};

function convertDate(str) {
  const date = new Date(str);
  const mnth = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  return [date.getFullYear(), mnth, day].join('-') + `T00:00:00.000000Z`;
}

export default function TaskList({user}) {
  const dispatch = useDispatch();
  const classes = useStyles();

  // selectors
  const taskListNotification = useSelector(
    state => state.nurseTaskList.notification,
  );
  const taskListMessage = useSelector(state => state.nurseTaskList.message);
  const taskListError = useSelector(state => state.nurseTaskList.error);
  const nurseTaskListData = useSelector(state => state.nurseTaskList.taskData);
  const nurseTaskListStatus = useSelector(state => state.nurseTaskList.status);

  // filter options
  const [filterRange, setFilterRange] = useState();
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);

  // sort handlers
  const [sortItem, setSortItem] = useState('type');
  const [sortOrder, setSortOrder] = useState('desc');
  const sortHandler = (order, item) => {
    setSortItem(item);
    setSortOrder(order);
    fetchTaskListData({
      sortItem: item,
      sortOrder: order,
    });
  };

  const fetchTaskListData = args => {
    const params = {
      userId: user?.id,
      searchText: args?.searchText || '',
      filterFromDate:
        args?.filterFromDate === null
          ? null
          : args?.filterFromDate
          ? convertDate(args?.filterFromDate)
          : filterRange?.length > 0
          ? convertDate(filterRange[0])
          : null,
      filterToDate:
        args?.filterToDate === null
          ? null
          : args?.filterToDate
          ? convertDate(args?.filterToDate)
          : filterRange?.length > 0
          ? convertDate(filterRange[1])
          : null,
      sortItem: args?.sortItem || sortItem,
      sortOrder: args?.sortOrder || sortOrder,
      page:
        Number(args?.page) - 1 === 0 ? 0 : Number(args?.page) - 1 || page - 1,
    };
    dispatch(fetchNurseTaskListData(params));
  };

  const pageChangeHandler = value => {
    if (value !== page) {
      setPage(value);
    }
  };

  useEffect(() => {
    fetchTaskListData();
  }, [page]);

  return (
    <Grid container padding={1} style={{marginTop: '8px'}}>
      {taskListNotification && (
        <Snackbar
          id="alert-message"
          style={{zIndex: '1'}}
          open
          message={taskListMessage}
          type={taskListError ? 'error' : 'success'}
          autoHideDuration={5000}
          onClose={() => dispatch(nurseTaskListActions.closeNotification())}
        />
      )}
      <Grid item xs={12} marginBottom="8px">
        <Breadcrumbs separator=">">
          <Text href="/" style={{color: ' #aaaaaa'}}>
            <img src={HomeIcon} alt="" style={{marginRight: '3px'}} />
            Home
          </Text>
          <Text style={{color: ' #aaaaaa'}}>Nurse Task List</Text>
        </Breadcrumbs>
      </Grid>
      <Grid item xs={12} marginBottom="16px">
        <Text type="h1">Nurse Task List</Text>
      </Grid>

      <Grid item container xs={12} className={classes.tableContainer}>
        <Grid item xs={12} md={3} padding={2}>
          <TextField
            id="search-workflow"
            placeholder="Search Patient"
            width="100%"
            icon={<img src={searchIcon} alt="" />}
            value={searchText}
            onChange={e => {
              setSearchText(e.target.value);
              setPage(1);
              fetchTaskListData({
                searchText: e.target.value,
                page: 1,
              });
            }}
            className={classes.field}
            search-workflow
          />
        </Grid>
        <Grid item xs={12} md={3} padding={2}>
          <DateRangePicker
            id="nurse-task-create-date-picker"
            className={classes.field}
            value={filterRange?.length > 0 ? filterRange : []}
            renderValue={range => {
              return `${new Date(range[0]).toLocaleDateString(
                'en-EN',
                options,
              )} - ${new Date(range[1]).toLocaleDateString('en-EN', options)}`;
            }}
            character="-"
            placeholder="dd-mm-yyyy"
            format="MMM-dd-yyyy"
            onChange={value => {
              setFilterRange(value);
              setPage(1);
              if (value?.length > 0) {
                fetchTaskListData({
                  filterFromDate: value[0],
                  filterToDate: value[1],
                  page: 1,
                });
              } else {
                fetchTaskListData({
                  filterFromDate: null,
                  filterToDate: null,
                  page: 1,
                });
              }
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <NurseTaskListTable
            data={nurseTaskListData}
            loading={nurseTaskListStatus === 'loading'}
            sortHandler={sortHandler}
            sortItem={sortItem}
            sortOrder={sortOrder}
          />
        </Grid>
      </Grid>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          marginTop: '8px',
          width: '100%',
        }}>
        <p id="page-info">
          Showing {'  '}
          {nurseTaskListData?.length !== 0
            ? nurseTaskListData?.content?.length !== 0
              ? String(page > 1 ? (page - 1) * 15 + 1 : 1).padStart(2, '0')
              : '0'
            : '0'}
          -
          {nurseTaskListData?.length !== 0
            ? nurseTaskListData?.content?.length !== 0
              ? String(
                  page > 1
                    ? (page - 1) * 15 + nurseTaskListData?.content?.length
                    : nurseTaskListData?.content?.length,
                ).padStart(2, '0')
              : '0'
            : '0'}{' '}
          {'  '}
          of {'  '}
          {nurseTaskListData?.length !== 0
            ? nurseTaskListData?.totalElements !== 0
              ? String(nurseTaskListData?.totalElements).padStart(2, '0')
              : '0'
            : '0'}{' '}
          {'  '}
          entries
        </p>
        <Pagination
          count={nurseTaskListData?.totalPages || 0}
          variant="outlined"
          color="#0a5b99"
          page={page}
          onChange={pageChangeHandler}
        />
      </div>
    </Grid>
  );
}

const useStyles = makeStyles(() => ({
  tableContainer: {
    border: '1px solid #d7d7d7',
    borderRadius: '5px',
  },

  field: {
    color: 'black',
    width: '340px',
  },
}));
