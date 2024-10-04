import React, {useEffect, useState} from 'react';
import {Box, Divider, IconButton, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';

import {
  NavbarLayout,
  Menu,
  MenuItem,
  Avatar,
  Button,
  Drawer,
  Text,
} from 'glide-design-system';
import makeStyles from '@mui/styles/makeStyles';

import dynamoLogo from '../../assets/logo/dynamo_white_logo.png';

export default function Appbar({user,signOut}) {
  const classes = useStyles();
  const navigate = useNavigate();

  const [userOptionsAnchorEl, setUserOptionsAnchorEl] = useState(null);
  const [settingOptionsAnchorEl, setSettingOptionsAnchorEl] = useState(null);

  const handleOpenUserMenu = event => {
    setUserOptionsAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserOptionsAnchorEl(null);
  };

  const handleOpenSettingsMenu = event => {
    setSettingOptionsAnchorEl(event.currentTarget);
  };

  const handleCloseSettingsMenu = () => {
    setSettingOptionsAnchorEl(null);
  };
  return (
    <>
      <NavbarLayout>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: '24px',
          }}>
          <img
            src={dynamoLogo}
            alt="Logo"
            style={{
              height: '32px',
              marginRight: '24px',
            }}
          />
          <Button
            onClick={() => navigate('/')}
            key="task-list"
            size="small"
            id="taskListBtn"
            style={{backgroundColor: 'inherit'}}
            className={classes.buttonActive}>
            Patients for Review
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingRight: '16px',
          }}
          className={classes.navDetails}>
          <Box
            sx={{
              flexGrow: 0,
              textAlign: 'right',
              marginLeft: 'auto',
              display: 'flex',
              justifyContent: 'center',
            }}>
            {/* <IconButton onClick={handleOpenSettingsMenu}>
              <span
                style={{color: 'white', fontSize: 32}}
                className="material-symbols-outlined">
                settings
              </span>
            </IconButton> */}
            <div style={{padding: 8}}>
              <Avatar
                label={user?.email.charAt(0).toUpperCase()}
                onClick={handleOpenUserMenu}
              />
            </div>
          </Box>
          <Menu
            sx={{mt: '45px'}}
            anchorEl={userOptionsAnchorEl}
            open={Boolean(userOptionsAnchorEl)}
            onClose={handleCloseUserMenu}
            position={'bottomLeft'}
            style={{top: '47px'}}>
            <MenuItem>
              <Avatar
                style={{
                  marginRight: '9px',
                  width: '26px',
                  height: '26px',
                  backgroundColor: '#0a5b99 ',
                  color: 'white',
                }}
                label={user?.email.charAt(0).toUpperCase()}
              />
              <Text>{user?.email}</Text>
            </MenuItem>
            <Divider sx={{border: '1px solid #f2f2f2'}} />
            <MenuItem
              onClick={() => {
                handleCloseUserMenu();
                signOut();
              }}>
              <span
                className={`material-symbols-outlined ${classes.logoutIcon}`}>
                logout
              </span>
              <Text>Logout</Text>
            </MenuItem>
          </Menu>
          {/* Settings Menu Start */}
          <Menu
            sx={{mt: '45px'}}
            anchorEl={settingOptionsAnchorEl}
            open={Boolean(settingOptionsAnchorEl)}
            onClose={handleCloseSettingsMenu}
            position={'bottomLeft'}
            style={{top: '47px'}}>
            <MenuItem
              onClick={() => {
                navigate('/users');
                handleCloseSettingsMenu();
              }}>
              <span
                style={{marginRight: 8, color: '#0a5b99'}}
                className="material-symbols-outlined">
                group
              </span>
              <Text>User Management</Text>
            </MenuItem>
          </Menu>
          {/* Settings Menu End */}
        </Box>
      </NavbarLayout>
    </>
  );
}

const useStyles = makeStyles(() => ({
  buttonActive: {
    display: 'flex !important',
    whiteSpace: 'nowrap !important',
    borderRadius: '0px !important',
    height: '45px !important',
    backgroundColor: '#084069 !important',
    fontFamily: 'Roboto Medium, Roboto, sans-serif',
    fontSize: '14px !important',
    fontWeight: '700',
    '&:hover': {
      backgroundColor: '#084069 !important',
    },
  },
  navDetails: {
    display: 'flex',
  },
  logoutIcon: {
    height: '26px !important',
    width: '26px !important',

    marginRight: '9px !important',

    color: '#0a5b99 !important',
  },
}));
