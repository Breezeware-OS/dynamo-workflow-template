import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import BackendService from '../../service/BackendService';

export const fetchUsersListData = createAsyncThunk('/users', async data => {
  const response = await BackendService.fetchUsers(data);
  return response.data;
});

export const inviteUser = createAsyncThunk('/invite', async data => {
  const response = await BackendService.inviteUser(data);
  return response.data;
});

// export const editUserInvite = createAsyncThunk(
//   '/edit/userInvite',
//   async data => {
//     const response = await BackendService.editUser(data);
//     return response.data;
//   },
// );

export const editUser = createAsyncThunk('/edit/user', async data => {
  const response = await BackendService.editUser(data);
  return response.data;
});

export const suspendUser = createAsyncThunk('/suspend/user', async data => {
  const response = await BackendService.suspendUser(data);
  return response.data;
});

export const reactivateUser = createAsyncThunk(
  '/reactivate/user',
  async data => {
    const response = await BackendService.reactivateUser(data);
    return response.data;
  },
);

const userManagementSlice = createSlice({
  name: 'Users',
  initialState: {
    status: '',
    users: [],
    message: '',
    error: false,
    notification: false,
  },
  reducers: {
    closeNotification(state) {
      state.notification = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsersListData.pending, state => {
        state.status = 'loading';
        state.message = null;
        state.notification = false;
        state.error = false;
      })
      .addCase(fetchUsersListData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = false;
        state.message = null;
        state.notification = false;
        state.users = action.payload;
      })
      .addCase(fetchUsersListData.rejected, state => {
        state.status = 'error';
        state.message =
          'An error occurred while fetching users. Please try again.';
        state.notification = true;
        state.error = true;
      })
      .addCase(inviteUser.pending, state => {
        state.status = 'loading';
        state.message = null;
        state.notification = false;
        state.error = false;
      })
      .addCase(inviteUser.fulfilled, state => {
        state.status = 'succeeded';
        state.error = false;
        state.message = 'User invited successfully.';
        state.notification = true;
      })
      .addCase(inviteUser.rejected, state => {
        state.status = 'error';
        state.message =
          'An error occurred while inviting user. Please try again.';
        state.notification = true;
        state.error = true;
      })
      // .addCase(editUserInvite.pending, state => {
      //   state.status = 'loading';
      //   state.message = null;
      //   state.notification = false;
      //   state.error = false;
      // })
      // .addCase(editUserInvite.fulfilled, state => {
      //   state.status = 'succeeded';
      //   state.error = false;
      //   state.message = null;
      //   state.notification = false;
      // })
      // .addCase(editUserInvite.rejected, state => {
      //   state.status = 'error';
      //   state.message =
      //     'An error occurred while editing user invite. Please try again.';
      //   state.notification = true;
      //   state.error = true;
      // })
      .addCase(editUser.pending, state => {
        state.status = 'loading';
        state.message = null;
        state.notification = false;
        state.error = false;
      })
      .addCase(editUser.fulfilled, state => {
        state.status = 'succeeded';
        state.error = false;
        state.message = 'User edited successfully.';
        state.notification = true;
      })
      .addCase(editUser.rejected, state => {
        state.status = 'error';
        state.message =
          'An error occurred while editing user. Please try again.';
        state.notification = true;
        state.error = true;
      })
      .addCase(suspendUser.pending, state => {
        state.status = 'loading';
        state.message = null;
        state.notification = false;
        state.error = false;
      })
      .addCase(suspendUser.fulfilled, state => {
        state.status = 'succeeded';
        state.error = false;
        state.message = 'User suspended successfully.';
        state.notification = true;
      })
      .addCase(suspendUser.rejected, state => {
        state.status = 'error';
        state.message =
          'An error occurred while suspending user. Please try again.';
        state.notification = true;
        state.error = true;
      })
      .addCase(reactivateUser.pending, state => {
        state.status = 'loading';
        state.message = null;
        state.notification = false;
        state.error = false;
      })
      .addCase(reactivateUser.fulfilled, state => {
        state.status = 'succeeded';
        state.error = false;
        state.message = 'User reactivated successfully.';
        state.notification = true;
      })
      .addCase(reactivateUser.rejected, state => {
        state.status = 'error';
        state.message =
          'An error occurred while reactivating user. Please try again.';
        state.notification = true;
        state.error = true;
      });
  },
});

export const userManagementActions = userManagementSlice.actions;
export default userManagementSlice;
