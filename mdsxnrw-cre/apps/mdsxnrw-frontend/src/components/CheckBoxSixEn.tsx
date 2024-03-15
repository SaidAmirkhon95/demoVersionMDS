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

export default function CheckBoxSixEn() {
  const { aufwandSix, setAufwandSix } = useMyContext();

  const [selectedValue, setSelectedValue] = useState(aufwandSix);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value);
    setAufwandSix(event.target.value);
  };
 //smth
  return (
    <Box sx={{ display: 'grid' }}>
      <FormControl
        sx={{ m: 0.5, minWidth: 250 }}
        style={{ display: 'inline-flex', alignItems: 'flex-start', flexDirection: 'row' }}
      >
        <FormLabel component='legend'>Data Usage Policies</FormLabel>
        <Tooltip
          title='Which data usage conditions do you need? Standard terms of use: for example "Restrict data use to certain locations", "Restrict data use to certain connectors", "Data user may only forward encrypted data". For complete terms of use, see: Appendix A.1 in Usage Control in the International Data Spaces (https://doi.org/10.5281/zenodo.5675884) Special terms of use: Self-created terms of use that go beyond the given standard terms.'
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
          value={selectedValue}
          label='Choose an element'
          onChange={handleChange}
        >
          <MenuItem value={'standard'}>Standard Terms of Use</MenuItem>
          <MenuItem value={'special'}>Special Terms of Use</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
