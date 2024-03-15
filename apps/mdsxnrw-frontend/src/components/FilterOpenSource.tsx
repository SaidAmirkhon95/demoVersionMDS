import * as React from 'react';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function FilterOpenSource() {
  const [filter, setFilter] = React.useState(true);
  return (
    <div>
      <Box>
        <FormControlLabel
          label='Open Source'
          sx={{
            display: 'block',
          }}
          control={<Switch checked={!filter} onChange={() => setFilter(!filter)} color='primary' />}
        />
        <hr />
        {/* <FormHelperText>Soll der Connector ausschließlich Open Source sein?</FormHelperText> */}
      </Box>
    </div>
  );
}
