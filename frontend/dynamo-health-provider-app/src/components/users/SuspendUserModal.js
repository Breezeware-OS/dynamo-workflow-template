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
import React from 'react';

import susupendIcon from '../../assets/icons/suspendIcon.svg';
import warningIcon from '../../assets/icons/warning.svg';

export default function SuspendUserModal({
  open,
  closeModal,
  currentUser,
  suspendUser,
}) {
  const classes = useStyles();

  return (
    <Modal open={open} onClose={closeModal} id="modal">
      <ModalTitle id="modal-title">
        <Text type="h2">Suspend User</Text>
        <IconButton
          onClick={closeModal}
          size="small"
          style={{padding: 0}}
          id="close-icon">
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
            Are you sure you want to suspend this user?
          </Text>
          <Text style={{fontSize: '14px', fontWeight: '400', color: '#555555'}}>
            (The user will not be able to access the application)
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
          className={classes.button}
          icon={<img src={susupendIcon} alt="" />}
          iconPosition="start"
          id="submit-btn"
          onClick={() => suspendUser(currentUser)}>
          Suspend
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
