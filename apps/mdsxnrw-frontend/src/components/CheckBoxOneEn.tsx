import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import Tooltip from '@mui/material/Tooltip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useMyContext } from '../MyContext';

export default function CheckBoxOneEn() {
  const { aufwandOne, setAufwandOne } = useMyContext();

  const [selectedValue, setSelectedValue] = useState(aufwandOne);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value);
    setAufwandOne(event.target.value);
  };

  useEffect(() => {
    setSelectedValue(aufwandOne);
  }, [aufwandOne]);

  return (
    <Box sx={{ display: 'grid' }}>
      <FormControl
        sx={{ m: 0.5, minWidth: 250 }}
        style={{ display: 'inline-flex', alignItems: 'flex-start', flexDirection: 'row' }}
      >
        <FormLabel required component='legend'>
          Company size
        </FormLabel>
        <Tooltip
          title='Please enter the size of your company according to the number of employees and turnover: Start-Up: (young) small company with dynamic growth. Micro-enterprises: <10 employees, <2 million € turnover. Small company: <11-49 employees, <€10m turnover. Medium-sized company: <50-249 employees, <€50 million turnover. Large company: >249 employees, >€50 million turnover.'
          placement='top-start'
          style={{ position: 'absolute', right: 0 }}
        >
          <InfoOutlinedIcon color='disabled' fontSize='small' />
        </Tooltip>
      </FormControl>
      <FormControl sx={{ m: 0.5, minWidth: 250 }}>
        <InputLabel id='element'>Choose an element</InputLabel>
        <Select
          labelId='element'
          id='someelement'
          value={selectedValue} // Use the component state value
          label='Choose an element'
          onChange={handleChange}
        >
          <MenuItem value={'startup'}>Start-Up</MenuItem>
          <MenuItem value={'microenterprise'}>Micro-Enterprise</MenuItem>
          <MenuItem value={'small_business'}>Small Business</MenuItem>
          <MenuItem value={'medium_business'}>Medium Company</MenuItem>
          <MenuItem value={'large_business'}>Large Companies</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
