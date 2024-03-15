import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import { SelectChangeEvent } from '@mui/material/Select';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useTableData } from '../TableDataProvider';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function ReiterCheckEightEn() {
  const [aufwand, setAufwand] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAufwand(event.target.value);
  };

  const { tableData, updateTableData } = useTableData();

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    updateTableData({
      ...tableData,
      [name]: value,
    });
  };

  return (
    <Box sx={{ display: 'grid' }}>
      <FormControl
        sx={{ m: 0.5, minWidth: 250 }}
        style={{ display: 'inline-flex', alignItems: 'flex-start' }}
      >
        <FormLabel component='legend'>Are the usage policies based on ODRL?</FormLabel>
        <Tooltip
          title='ODRL stands for Open Digital Rights Language and represents an internationally recognized standard for managing digital rights and licenses.'
          placement='top-start'
          style={{ position: 'absolute', right: 0 }}
        >
          <InfoOutlinedIcon color='disabled' fontSize='small' />
        </Tooltip>
        <RadioGroup row value={aufwand} onChange={handleChange}>
          <FormControlLabel
            name='odrl'
            value='Yes'
            control={<Radio />}
            label='Yes'
            onChange={(event) => handleInputChange(event)}
          />
          <FormControlLabel
            name='odrl'
            value='No'
            control={<Radio />}
            label='No'
            onChange={(event) => handleInputChange(event)}
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
