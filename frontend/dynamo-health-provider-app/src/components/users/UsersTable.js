import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Grid, IconButton} from '@mui/material';
import {
  Button,
  Chip,
  Menu,
  MenuItem,
  Pagination,
  Table,
  Text,
  TextField,
  Snackbar,
} from 'glide-design-system';
import 'rsuite/dist/rsuite-no-reset.min.css';
import {DatePicker} from 'rsuite';
import {MoreHoriz} from '@mui/icons-material';
import makeStyles from '@mui/styles/makeStyles';

import {statusBackgroundColor} from './HelperFunction';
import EditUserModal from './EditUserModal';
import SuspendUserModal from './SuspendUserModal';
import ReactivateUserModal from './ReactivateUserModal';
import {
  editUser,
  fetchUsersListData,
  reactivateUser,
  suspendUser,
  userManagementActions,
} from '../../screens/usersManagement/UserSlice';

const options = {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'GMT',
};

export default function UsersTable() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [sortOrder, setSortOrder] = useState('desc');
  const [sortItem, setSortItem] = useState('createdOn');
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);
  const [taskActionsAnchorEl, setTaskActionsAnchorEl] = useState(null);

  const [openEditUserModal, setOpenEditUserModal] = useState(false);
  const [openSuspendUserModal, setOpenSuspendUserModal] = useState(false);
  const [openReactivateUserModal, setOpenReactivateUserModal] = useState(false);

  // selectors
  const userManagementData = useSelector(state => state.users.users);
  // selectors
  const userManagementNotification = useSelector(
    state => state.users.notification,
  );
  const userManagementMessage = useSelector(state => state.users.message);
  const userManagementError = useSelector(state => state.users.error);

  const pageChangeHandler = value => {
    if (value !== page) {
      setPage(value);
      fetchUserList({
        page: value,
      });
    }
  };

  /**
   * Search data on value change
   * @param {*} data input value
   */
  const searchHandler = data => {
    setSearch(data.target.value);
    fetchUserList({
      username: data.target.value,
      page: 0,
    });
  };

  /**
   * filter data based on role
   * @param {*} data selected value
   */
  const filterRole = data => {
    setRole(data.target.value);
    fetchUserList({
      role: data.target.value,
      page: 0,
    });
  };

  const filterStatus = data => {
    setUserStatus(data.target.value);
    fetchUserList({
      status: data.target.value,
      page: 0,
    });
  };

  const handleClearButtonClick = () => {
    setSelectedDate(null);
    setRole('');
    setSearch('');
    setUserStatus('');

    const args = {
      username: '',
      role: '',
      pageNo: 0,
      userStatus: '',
      searchDate: null,
      sotItem: 'createdOn',
      sortOrder: 'desc',
    };

    dispatch(fetchUsersListData(args));
  };

  const sortHandler = (sortOrder, sortItem) => {
    const updatedSortItem = sortItem?.startsWith('created')
      ? sortItem?.replace(/o/g, 'O')?.split(' ')?.join('')
      : sortItem;
    setSortItem(updatedSortItem);
    setSortOrder(sortOrder);

    fetchUserList({
      sortOrder,
      sortItem,
      page: 0,
    });
  };

  // columns of the table
  const tableColumns = [
    {
      label: 'email',
      fieldName: 'email',
      sort: true,
      style: {
        textAlign: 'left',
      },
      type: 'email',
    },
    {
      label: 'name',
      fieldName: 'name',
      style: {
        textAlign: 'left',
      },
      customBodyRenderer: rowItem => {
        return (
          <div
            style={{
              textTransform: 'capitalize',
              alignItems: 'center',
              // fontSize: '14px',
            }}>
            {rowItem?.firstName || rowItem?.lastName
              ? `${rowItem?.firstName}  ${rowItem?.lastName}`
              : '-'}
          </div>
        );
      },
    },
    {
      label: 'role',
      fieldName: 'roles',
      style: {
        textAlign: 'left',
        textTransform: 'capitalize',
      },
    },
    {
      label: 'phoneNumber',
      fieldName: 'phoneNumber',
      style: {
        textAlign: 'left',
      },
    },
    {
      label: 'status',
      fieldName: 'status',
      style: {
        textAlign: 'left',
      },
      customBodyRenderer: rowItem => {
        return (
          <Chip
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              padding: '5px',
              // fontSize: '12px',
              fontWeight: 400,
              textTransform: 'capitalize',
              backgroundColor: statusBackgroundColor(rowItem?.status),
              color: '#333333',
            }}>
            {rowItem?.status}
          </Chip>
        );
      },
    },
    {
      label: 'createdDate',
      fieldName: 'createdOn',
      sort: true,
      type: 'date',
      style: {
        textAlign: 'left',
      },
    },

    {
      label: 'actions',
      style: {
        textAlign: 'left',
      },
      customBodyRenderer: rowItem => {
        return (
          //   <Text>i</Text>
          <IconButton
            id="action-btn"
            sx={{padding: '0'}}
            onClick={e => {
              setTaskActionsAnchorEl(e.currentTarget);
              setCurrentUser(rowItem);
            }}>
            <MoreHoriz sx={{fontSize: '39px'}} />
          </IconButton>
        );
      },
    },
  ];

  const fetchUserList = params => {
    const args = {
      username: params?.username || search,
      role: params?.role || role,
      pageNo: params?.page || page,
      userStatus: params?.status || userStatus,
      searchDate: params?.searchDate || selectedDate,
      sotItem: params?.sortItem || sortItem,
      sortOrder: params?.sortOrder || sortOrder,
    };

    dispatch(fetchUsersListData(args));
  };

  const editUserHandler = data => {
    setOpenEditUserModal(false);
    dispatch(editUser(data)).then(() => {
      const args = {
        username: '',
        role: '',
        pageNo: 0,
        userStatus: '',
        searchDate: selectedDate,
        sotItem: 'createdOn',
        sortOrder: 'desc',
      };

      dispatch(fetchUsersListData(args));
    });
  };

  const suspendUserHandler = data => {
    setOpenSuspendUserModal(false);
    dispatch(suspendUser(data)).then(() => {
      const args = {
        username: '',
        role: '',
        pageNo: 0,
        userStatus: '',
        searchDate: selectedDate,
        sotItem: 'createdOn',
        sortOrder: 'desc',
      };

      dispatch(fetchUsersListData(args));
    });
  };

  const reactivateUserHandler = data => {
    setOpenReactivateUserModal(false);
    dispatch(reactivateUser(data)).then(() => {
      const args = {
        username: '',
        role: '',
        pageNo: 0,
        userStatus: '',
        searchDate: selectedDate,
        sotItem: 'createdOn',
        sortOrder: 'desc',
      };

      dispatch(fetchUsersListData(args));
    });
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <div>
      <EditUserModal
        closeModal={() => setOpenEditUserModal(false)}
        initialData={currentUser}
        open={openEditUserModal}
        editUser={editUserHandler}
      />

      <SuspendUserModal
        closeModal={() => setOpenSuspendUserModal(false)}
        currentUser={currentUser}
        open={openSuspendUserModal}
        suspendUser={suspendUserHandler}
      />

      <ReactivateUserModal
        closeModal={() => setOpenReactivateUserModal(false)}
        currentUser={currentUser}
        open={openReactivateUserModal}
        reactivateUser={reactivateUserHandler}
      />

      {userManagementNotification && (
        <Snackbar
          id="alert-message"
          style={{zIndex: '1'}}
          open
          message={userManagementMessage}
          type={userManagementError ? 'error' : 'success'}
          autoHideDuration={5000}
          onClose={() => dispatch(userManagementActions.closeNotification())}
        />
      )}

      <div className={classes.container}>
        <Grid container display="flex" spacing={1} flexDirection="row">
          <Grid item xs={12} md={5} lg={2}>
            <TextField
              id="search"
              type="search"
              value={search === null ? '' : search}
              placeholder="Search Name"
              width="100%"
              icon={<span className="material-symbols-outlined">search</span>}
              onChange={searchHandler}
              style={{color: 'black', borderColor: '#D7D7D7', height: '36px'}}
            />
          </Grid>
          <Grid item xs={12} md={5} lg={2}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                height: '36px',
                marginLeft: '30px',
              }}>
              <select
                id="role"
                placeholder="Role"
                value={role}
                onChange={filterRole}
                className={classes.select}>
                <option disabled value="">
                  Role
                </option>
                {/* <option value="super_admin">Super Admin</option> */}
                <option value="careteam">Careteam</option>
                <option value="physician">Physician</option>
              </select>
            </div>
          </Grid>
          <Grid item xs={12} md={5} lg={2}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                height: '36px',
                marginLeft: '30px',
              }}>
              <select
                id="status"
                placeholder="status"
                value={userStatus}
                onChange={filterStatus}
                className={classes.select}>
                <option disabled value="">
                  Status
                </option>
                <option value="active">Active</option>
                <option value="invited">Invited</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginLeft: '30px',
              }}>
              <DatePicker
                name="created-date"
                style={{
                  width: 280,
                  marginBottom: '24px',
                }}
                className={classes.durationField}
                character=" to "
                format="dd-MM-yyyy"
                oneTap
                showOneCalendar
                placeholder="Search by created Date"
                onChange={value => {
                  fetchUserList({
                    searchDate: value,
                  });
                  setSelectedDate(value);
                }}
                value={selectedDate}
                renderValue={date => {
                  return `${new Date(date).toLocaleDateString(
                    'en-EN',
                    options,
                  )}`;
                }}
              />
              <Button
                color="secondary"
                id="reset-btn"
                style={{marginLeft: '45px'}}
                icon={<span className="material-symbols-outlined">close</span>}
                onClick={handleClearButtonClick}>
                Reset
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
      <Table
        data={userManagementData?.content}
        columns={tableColumns}
        sortHandler={sortHandler}
        sortItem={sortItem}
        sortOrder={sortOrder}
        // loading={loader}
        progressCircleStyle={{color: '#0a5b99'}}
        message={
          userManagementData?.content?.length === 0 ? 'No users found' : ''
        }
        style={{
          border: '0px',
          minWidth: '1000px',
        }}
        tableContainerStyle={{
          border: '1px solid #d7d7d7',
        }}
        tableHeaderStyle={{height: '40px'}}
      />
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
          {userManagementData?.length !== 0
            ? userManagementData?.content?.length !== 0
              ? String(page > 1 ? (page - 1) * 15 + 1 : 1).padStart(2, '0')
              : '0'
            : '0'}
          -
          {userManagementData?.length !== 0
            ? userManagementData?.content?.length !== 0
              ? String(
                  page > 1
                    ? (page - 1) * 15 + userManagementData?.content?.length
                    : userManagementData?.content?.length,
                ).padStart(2, '0')
              : '0'
            : '0'}{' '}
          {'  '}
          of {'  '}
          {userManagementData?.length !== 0
            ? userManagementData?.totalElements !== 0
              ? String(userManagementData?.totalElements).padStart(2, '0')
              : '0'
            : '0'}{' '}
          {'  '}
          entries
        </p>
        <Pagination
          count={userManagementData?.totalPages || 0}
          variant="outlined"
          color="#0a5b99"
          page={page}
          onChange={pageChangeHandler}
        />
      </div>

      <Menu
        style={{boxShadow: 'none', cursor: 'pointer'}}
        anchorEl={taskActionsAnchorEl}
        open={Boolean(taskActionsAnchorEl)}
        position="bottom"
        onClose={() => setTaskActionsAnchorEl(null)}>
        <MenuItem
          onClick={() => {
            setOpenEditUserModal(true);
            setTaskActionsAnchorEl(null);
          }}>
          <span
            style={{color: '#0a5b99', marginRight: 4}}
            className="material-symbols-outlined">
            edit
          </span>
          <Text>Edit</Text>
        </MenuItem>
        {currentUser?.status?.toLowerCase() === 'active' && (
          <MenuItem
            onClick={() => {
              setOpenSuspendUserModal(true);
              setTaskActionsAnchorEl(null);
            }}>
            <span
              style={{color: '#E08665', marginRight: 4}}
              className="material-symbols-outlined">
              stop_circle
            </span>
            <Text>Suspend</Text>
          </MenuItem>
        )}
        {currentUser?.status?.toLowerCase() === 'suspended' && (
          <MenuItem
            onClick={() => {
              setOpenReactivateUserModal(true);
              setTaskActionsAnchorEl(null);
            }}>
            <span
              style={{color: '#E08665', marginRight: 4}}
              className="material-symbols-outlined">
              sync
            </span>
            <Text>Reacivate</Text>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    border: '1px solid #DDD',
    borderRadius: '5px',
    borderBottom: 'none',
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
    // display: 'flex',
    paddingTop: '16px',
    paddingLeft: 16,
    // gap: '25px',
  },
  select: {
    width: '300px',
    borderRadius: '5px',
    border: '1px solid #999999',
    backgroundColor: 'transparent',
    borderColor: '#D7D7D7',
    color: 'black',
  },
  durationField: {
    '& .rs-picker-toggle-wrapper': {
      display: 'inline-block',
      maxWidth: '100%',
      verticalAlign: 'middle',
    },
    '&.rs-picker-default .rs-picker-toggle': {
      marginLeft: '1px',
      border: '1px solid !important',
      borderRadius: '5px',
      backgroundColor: 'black',
      width: '293px',
      borderColor: '#D7D7D7 !important',
    },
  },
  datePicker: {
    border: '1px solid',
    borderRadius: '2px !important',
    borderColor: '#D7D7D7 !important',
  },
  menuItem: {
    cursor: 'pointer',
    width: '100%',
    justifyContent: 'flex-start',
  },
}));
