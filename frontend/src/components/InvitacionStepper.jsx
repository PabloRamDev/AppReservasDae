import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  'Busca por correo',
  'Confirma los datos',
  'Agrega un mensaje y envía',
];

export default function InvitacionStepper() {
  return (
    <Box sx={{ width: '100%', marginTop: 2}}>
      <Stepper alternativeLabel>
        {steps.map((label) => (
          <Step key={label} active>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}