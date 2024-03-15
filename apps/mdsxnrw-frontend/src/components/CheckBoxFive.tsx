import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import Tooltip from '@mui/material/Tooltip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { useMyContext } from '../MyContext';

const MenuProps = {
  PaperProps: {
    style: {
      width: 200,
    },
  },
};

const datas = [
  { label: 'API (z.B. HTTP, Rest)', value: 'api' },
  { label: 'Datei (z.B. Excel, Word, PDF)', value: 'data_file' },
  { label: 'FTP Server', value: 'ftp' },
  { label: 'Real Time via Message Bus (z.B. Kafka, RabbitMQ)', value: 'realtime' },
  { label: 'Sonstige', value: 'others' },
];

export default function CheckBoxFive() {
  const { aufwandFive, setAufwandFive } = useMyContext();

  const handleChange = (event: SelectChangeEvent<typeof aufwandFive>) => {
    const {
      target: { value },
    } = event;
    // Ensure value is always an array, even if it's a single string
    setAufwandFive(Array.isArray(value) ? value : [value]);
  };

  useEffect(() => {
    if (CheckBoxFive.length === 0) {
      // Set default value if industrySector is empty
      setAufwandFive(['api', 'data_file']); // Assuming 'industry' as default value
    }
  }, []);

  /* useEffect(() => {
    setAufwandFive(aufwandFive);
  }, [aufwandFive]); */

  return (
    <Box sx={{ display: 'grid' }}>
      <FormControl
        sx={{ m: 0.5, minWidth: 250 }}
        style={{ display: 'inline-flex', alignItems: 'flex-start', flexDirection: 'row' }}
      >
        <FormLabel component='legend'>Verfügbarkeit der Daten</FormLabel>
        <Tooltip
          title='Wie sind die Daten, die Sie teilen oder nutzen möchten, angebunden bzw. verfügbar?'
          placement='top-start'
          style={{ position: 'absolute', right: 0 }}
        >
          <InfoOutlinedIcon color='disabled' fontSize='small' />
        </Tooltip>
      </FormControl>
      <FormControl sx={{ m: 0.5, minWidth: 250 }}>
        <InputLabel id='element'>Mehrfachantwort möglich</InputLabel>
        <Select
          labelId='element'
          id='someelement'
          multiple
          value={aufwandFive}
          onChange={handleChange}
          input={<OutlinedInput label='Mehrfachantwort möglich' />}
          renderValue={(selected) =>
            selected
              .map((value) => {
                const selectedItem = datas.find((item) => item.value === value);
                return selectedItem ? selectedItem.label : '';
              })
              .join(', ')
          }
          MenuProps={MenuProps}
        >
          {datas.map((data, index) => (
            <MenuItem key={data.value} value={data.value} style={{ whiteSpace: 'normal' }}>
              <Checkbox
                checked={aufwandFive.includes(data.value)}
                style={{ marginLeft: '-10px' }}
              />
              <ListItemText primary={data.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
