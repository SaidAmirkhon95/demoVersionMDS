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

export default function CheckBoxSix() {
  const { aufwandSix, setAufwandSix } = useMyContext();

  const [selectedValue, setSelectedValue] = useState(aufwandSix);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value);
    setAufwandSix(event.target.value);
  };

  useEffect(() => {
    // Set default value if aufwandOne is empty
    setAufwandSix('standard'); // Assuming 'startup' as default value
    setSelectedValue('standard');
  }, []);

  return (
    <Box sx={{ display: 'grid' }}>
      <FormControl
        sx={{ m: 0.5, minWidth: 250 }}
        style={{ display: 'inline-flex', alignItems: 'flex-start', flexDirection: 'row' }}
      >
        <FormLabel component='legend'>Datennutzungsbediengungen (Usage Policies)</FormLabel>
        <Tooltip
          title='Welche Datennutzungsbedingungen benötigen Sie? Standardnutzungsbedingungen: zum Beispiel „Datennutzung auf bestimmte Orte beschränken“, „Datennutzung auf bestimmte Connectoren beschränken“, „Datennutzer darf nur verschlüsselte Daten weiterleiten“. Komplette Nutzungsbedingungen siehe: Appendix A.1in Usage Control in the International Data Spaces (https://doi.org/10.5281/zenodo.5675884) Spezielle Nutzungsbedingungen: Selbsterstellte Nutzungsbedingungen, die über die gegebenen Standardbedingungen hinausgehen.'
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
          <MenuItem value={'standard'}>Standardnutzungsbedingungen</MenuItem>
          <MenuItem value={'special'}>Spezielle Nutzungsbedingungen</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
