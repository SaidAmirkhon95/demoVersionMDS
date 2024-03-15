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

export default function CheckBoxThreeEn() {
  const { aufwandThree, setAufwandThree } = useMyContext();

  const [selectedValue, setSelectedValue] = useState(aufwandThree);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value);
    setAufwandThree(event.target.value);
  };

  useEffect(() => {
    setSelectedValue(aufwandThree);
  }, [aufwandThree]);

  return (
    <Box sx={{ display: 'grid' }}>
      <FormControl
        sx={{ m: 0.5, minWidth: 250 }}
        style={{ display: 'inline-flex', alignItems: 'flex-start', flexDirection: 'row' }}
      >
        <FormLabel required component='legend'>
          IT-Know-How
        </FormLabel>
        <Tooltip
          title='Please submit a self-assessment of the existing IT know-how in your company. Low: No own software development, IT administration, use of Office and other standard software. Medium: In some cases, software to support the business model is developed and used in-house. However, the core of the business model does not lie in software development. High: IT specialists with extensive experience in software development and IT project management (databases, programming, cloud, ...). IT development is an integral part of the business model.'
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
          <MenuItem value={'low'}>Low</MenuItem>
          <MenuItem value={'medium'}>Medium</MenuItem>
          <MenuItem value={'high'}>High</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
