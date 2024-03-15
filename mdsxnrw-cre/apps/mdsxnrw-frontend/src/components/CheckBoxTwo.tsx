import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import Tooltip from '@mui/material/Tooltip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useMyContext } from '../MyContext';
import { useState, useEffect } from 'react';

export default function CheckBoxTwo() {
  const { aufwandTwo, setAufwandTwo } = useMyContext();
  const { companyItExpertsFrom, setCompanyItExpertsFrom } = useMyContext();
  const { companyItExpertsTo, setCompanyItExpertsTo } = useMyContext();

  const [selectedValue, setSelectedValue] = useState(aufwandTwo);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value);
    setAufwandTwo(event.target.value);

    switch (event.target.value) {
      case '<10':
        setCompanyItExpertsFrom(0);
        setCompanyItExpertsTo(10);
        break;
      case '11-49':
        setCompanyItExpertsFrom(11);
        setCompanyItExpertsTo(49);
        break;
      case '50-249':
        setCompanyItExpertsFrom(50);
        setCompanyItExpertsTo(249);
        break;
      case '249<':
        setCompanyItExpertsFrom(250);
        setCompanyItExpertsTo(1000);
        break;
      default:
        setCompanyItExpertsFrom(0);
        setCompanyItExpertsTo(10);
    }
  };

  useEffect(() => {
    if (!aufwandTwo) {
      // Set default value if aufwandTwo is empty
      setAufwandTwo('11-49'); // Assuming '11-49' as default value
      setSelectedValue('11-49');
      setCompanyItExpertsFrom(11);
      setCompanyItExpertsTo(49);
    }
  }, []);

  /* useEffect(() => {
    setSelectedValue(aufwandTwo);
  }, [aufwandTwo]); */

  return (
    <Box sx={{ display: 'grid' }}>
      <FormControl
        sx={{ m: 0.5, minWidth: 250 }}
        style={{ display: 'inline-flex', alignItems: 'flex-start', flexDirection: 'row' }}
      >
        <FormLabel required component='legend'>
          Beschäftigte IT-Experten
        </FormLabel>
        <Tooltip
          title='Bitte geben Sie an, wie viele IT-Experten bei Ihnen Beschäftigt sind.'
          placement='top-start'
          style={{ position: 'absolute', right: 0 }}
        >
          <InfoOutlinedIcon color='disabled' fontSize='small' />
        </Tooltip>
      </FormControl>
      <FormControl sx={{ m: 0.5, minWidth: 250 }}>
        <InputLabel id='element'>Wählen Sie ein Element aus</InputLabel>
        <Select
          labelId='element'
          id='someelement'
          value={selectedValue}
          label='Wählen Sie ein Element aus'
          onChange={handleChange}
        >
          <MenuItem value={'<10'}>bis 10 Beschäftigte</MenuItem>
          <MenuItem value={'11-49'}>11-49 Beschäftigte</MenuItem>
          <MenuItem value={'50-249'}>50-249 Beschäftigte</MenuItem>
          <MenuItem value={'249<'}>mehr als 249 Beschäftigte</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
