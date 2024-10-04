import React from 'react';
import {Box} from '@mui/material';

import {NavbarLayout} from 'glide-design-system';

import dynamoLogo from '../../assets/logo/dynamo_white_logo.png';

export default function Appbar() {
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
        </Box>
      </NavbarLayout>
    </>
  );
}
