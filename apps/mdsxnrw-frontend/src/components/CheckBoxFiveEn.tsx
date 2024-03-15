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
  { label: 'API (e.g. HTTP, Rest)', value: 'api' },
  { label: 'Data (e.g. Excel, Word, PDF)', value: 'data_file' },
  { label: 'FTP Server', value: 'ftp' },
  { label: 'Real Time via Message Bus (e.g. Kafka, RabbitMQ)', value: 'realtime' },
  { label: 'Others', value: 'others' },
];

export default function CheckBoxFiveEn() {
  const { aufwandFive, setAufwandFive } = useMyContext();

  const handleChange = (event: SelectChangeEvent<typeof aufwandFive>) => {
    const {
      target: { value },
    } = event;
    setAufwandFive(Array.isArray(value) ? value : [value]);
  };

  useEffect(() => {
    setAufwandFive(aufwandFive);
  }, [aufwandFive]);

  return (
    <Box sx={{ display: 'grid' }}>
      <FormControl
        sx={{ m: 0.5, minWidth: 250 }}
        style={{ display: 'inline-flex', alignItems: 'flex-start', flexDirection: 'row' }}
      >
        <FormLabel component='legend'>Availability of the Data</FormLabel>
        <Tooltip
          title='How is the data you want to share or use connected or available?'
          placement='top-start'
          style={{ position: 'absolute', right: 0 }}
        >
          <InfoOutlinedIcon color='disabled' fontSize='small' />
        </Tooltip>
      </FormControl>
      <FormControl sx={{ m: 0.5, minWidth: 250 }}>
        <InputLabel id='element'>Multiple Choice possible</InputLabel>
        <Select
          labelId='element'
          id='someelement'
          multiple
          value={aufwandFive}
          onChange={handleChange}
          input={<OutlinedInput label='Multiple Choice possible' />}
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
