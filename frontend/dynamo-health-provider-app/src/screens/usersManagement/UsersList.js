import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import {Breadcrumbs, Button, Snackbar, Text} from 'glide-design-system';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import HomeIcon from '../../assets/icons/home.svg';
import UsersTable from '../../components/users/UsersTable';
import InviteUserModal from '../../components/users/InviteUserModal';
import {fetchUsersListData, inviteUser} from './UserSlice';

export default function UsersList({user}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showInviteModal, setShowInviteModal] = useState(false);

  const showModal = () => {
    setShowInviteModal(!showInviteModal);
  };

  const inviteUserHandler = data => {
    const postData = {...data};
    postData.invitedBy = user?.id;
    showModal();
    dispatch(inviteUser(postData)).then(() => {
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
    });
  };

  return (
    <Grid container padding={1} style={{marginTop: '8px'}}>
      <Grid item xs={12} marginBottom="8px">
        <Breadcrumbs separator=">">
          <Text href="/" style={{color: ' #aaaaaa'}}>
            <img src={HomeIcon} alt="" style={{marginRight: '3px'}} />
            Home
          </Text>
          <Text href="/" style={{color: ' #aaaaaa'}}>
            Users
          </Text>
        </Breadcrumbs>
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <Text style={style.heading}>Users</Text>
        <Button
          icon={<span className="material-symbols-outlined">add</span>}
          id="addUser-btn"
          onClick={showModal}
          style={style.button}
          size="medium">
          Add User
        </Button>
      </Grid>

      <Grid item xs={12}>
        <UsersTable />
      </Grid>

      <InviteUserModal
        open={showInviteModal}
        showModal={showModal}
        inviteUserHandler={inviteUserHandler}
      />
    </Grid>
  );
}

const style = {
  container: {
    backgroundColor: '#FFFFFF',
    width: '100% !important',
    marginLeft: '25px !important',
  },
  heading: {
    fontWeight: 700,
    fontSize: '24px',
    fontFamily: 'sans-serif',
    // marginLeft: '24px',
  },
  button: {
    marginRight: '25px',
    marginBottom: '30px',
    // marginTop: '5px',
  },
};
