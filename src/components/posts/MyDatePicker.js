import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function NativePickers() {
  return (
      <TextField
        id="date"
        label="Birthday"
        type="date"
        defaultValue="2017-05-24"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
  );
}
