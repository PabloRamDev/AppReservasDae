import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export default function Spinner() {
  return (
    <Box sx={{
      backgroundColor: 'white',
      display: 'flex',
      width: '100%',
      height: '90vh',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <CircularProgress />
    </Box>
  );
}
