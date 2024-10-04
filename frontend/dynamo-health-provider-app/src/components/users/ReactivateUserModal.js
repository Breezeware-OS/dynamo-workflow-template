import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalTitle,
  Text,
} from 'glide-design-system';
import {Divider, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import makeStyles from '@mui/styles/makeStyles';
import {useDispatch, useSelector} from 'react-redux';
import React from 'react';

import warningIcon from '../../assets/icons/warning.svg';
import reactivateIcon from '../../assets/icons/reactivateIcon.svg';

export default function ReactivateUserModal({
  open,
  closeModal,
  currentUser,
  reactivateUser,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Modal open={open} onClose={closeModal} id="modal">
      <ModalTitle id="modal-title">
        <Text type="h2">Reactivate User</Text>
        <IconButton onClick={closeModal} style={{padding: 0}} id="close-icon">
          <CloseIcon />
        </IconButton>
      </ModalTitle>
      <ModalContent
        id="modal-content"
        style={{display: 'flex', justifyContent: 'center', padding: '25px'}}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 5,
          }}>
          <img src={warningIcon} alt="Warning" height="25px" width="29px" />
          <Text style={{fontSize: '16px', fontWeight: '400'}}>
            Are you sure you want to reactivate this user?
          </Text>
          <Text style={{fontSize: '14px', fontWeight: '400', color: '#555555'}}>
            (The user will be able to access the application)
          </Text>
        </div>
      </ModalContent>
      <Divider />
      <ModalActions>
        <Button
          icon={<span className="material-symbols-outlined">close</span>}
          iconPosition="start"
          color="secondary"
          onClick={closeModal}
          id="cancel-btn"
          style={{marginRight: '15px'}}>
          Cancel
        </Button>
        <Button
          id="submit-btn"
          className={classes.button}
          icon={<img src={reactivateIcon} alt="" />}
          iconPosition="start"
          onClick={() => reactivateUser(currentUser)}>
          Reactivate
        </Button>
      </ModalActions>
    </Modal>
  );
}

const useStyles = makeStyles(() => ({
  button: {
    backgroundColor: '#DD6336 !important',
    '&:hover': {
      backgroundColor: 'rgba(199,78,26,1) !important',
    },
  },
}));
