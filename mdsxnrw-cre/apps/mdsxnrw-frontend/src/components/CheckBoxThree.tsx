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

export default function CheckBxoThree() {
  const { aufwandThree, setAufwandThree } = useMyContext();

  const [selectedValue, setSelectedValue] = useState(aufwandThree);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value);
    setAufwandThree(event.target.value);
  };

  useEffect(() => {
    if (!aufwandThree) {
      // Set default value if aufwandOne is empty
      setAufwandThree('low');
      setSelectedValue('low');
    } else {
      setAufwandThree(aufwandThree);
      setSelectedValue(aufwandThree);
    }
  }, []);

  /* useEffect(() => {
    setSelectedValue(aufwandThree);
  }, [aufwandThree]); */

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
          title='Bitte geben Sie hier eine Selbsteinschätzung über das vorhandene IT-Know-How in Ihrem Unternehmen ab. Gering: Keine eigene Softwareentwicklung, IT-Administration, Einsatz von Office und weiterer Standardsoftware. Mittel: Teilweise wird Software zur Unterstützung des Geschäftsmodells selbst entwickelt und eingesetzt. Der Kern des Geschäftsmodells liegt aber nicht in der Softwareentwicklung. Hoch: IT-Spezialisten mit umfangreicher Erfahrung in der Softwareentwicklung und IT-Projektmanagement (Datenbanken, Programmierung, Cloud, …). IT-Entwicklung ist integraler Bestandteil des Geschäftsmodells.'
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
          <MenuItem value={'low'}>Niedrig</MenuItem>
          <MenuItem value={'medium'}>Mittel</MenuItem>
          <MenuItem value={'high'}>Hoch</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
