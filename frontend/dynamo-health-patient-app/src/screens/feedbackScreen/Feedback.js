import React, {useEffect} from 'react';
import {Button, Text} from 'glide-design-system';
import Grid from '@mui/material/Grid';
import {useNavigate} from 'react-router-dom';

import Appbar from '../../components/Appbar/Appbar';
import successIcon from '../../assets/icons/Check_Success.svg';

export default function Feedback() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 5000);
  }, []);

  return (
    <>
      <Appbar />
      <Grid
        container
        padding={3}
        spacing={2}
        justifyContent="center"
        textAlign="center">
        <Grid item xs={12}>
          <img src={successIcon} alt="" style={{height: 200, width: 200}} />
        </Grid>
        <Grid item xs={12}>
          <Text type="h2">Your intake form has been submitted.</Text>
        </Grid>

        <Grid item xs={12}>
          <Button
            containerStyle={{
              display: 'flex',
              justifyContent: 'center',
            }}
            onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
