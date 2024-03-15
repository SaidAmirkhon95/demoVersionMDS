/* import * as React from 'react';
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

export default function CheckBoxSevenEn() {
  const { aufwandSeven, setAufwandSeven } = useMyContext();

  const [selectedValue, setSelectedValue] = useState(aufwandSeven);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value);
    setAufwandSeven(event.target.value);
  };

  return (
    <Box sx={{ display: 'grid' }}>
      <FormControl
        sx={{ m: 0.5, minWidth: 250 }}
        style={{ display: 'inline-flex', alignItems: 'flex-start', flexDirection: 'row' }}
      >
        <FormLabel component='legend'>Service Level</FormLabel>
        <Tooltip
          title='How should the connector be used? CaaS: Connector-as-a-Service, Of-the-Shelf-Solution. Similar to software, the connector is offered to you as a complete software package (Software-as-a-Service). PaaS: Platform as a Service. The connector is an additional service as part of a platform service on which you may already be storing data in the cloud. Self-service: You develop a connector yourself and tailor it to your requirements.'
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
          <MenuItem value={'caas'}>CaaS</MenuItem>
          <MenuItem value={'paas'}>PaaS</MenuItem>
          <MenuItem value={'self_service'}>Self-Service</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
 */

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
  { label: 'Caas', value: 'caas' },
  { label: 'Paas', value: 'paas' },
  { label: 'Self-Service', value: 'self_service' },
];

export default function CheckBoxSeven() {
  const { aufwandSeven, setAufwandSeven } = useMyContext();

  const handleChange = (event: SelectChangeEvent<typeof aufwandSeven>) => {
    const {
      target: { value },
    } = event;
    // Ensure value is always an array, even if it's a single string
    setAufwandSeven(Array.isArray(value) ? value : [value]);
  };

  useEffect(() => {
    if (CheckBoxSeven.length === 0) {
      // Set default value if industrySector is empty
      setAufwandSeven(['paas', 'self_service']); // Assuming 'industry' as default value
    }
  }, []);

  /* useEffect(() => {
    setAufwandFour(aufwandFour);
  }, [aufwandFour]); */

  return (
    <Box sx={{ display: 'grid' }}>
      <FormControl
        sx={{ m: 0.5, minWidth: 250 }}
        style={{ display: 'inline-flex', alignItems: 'flex-start', flexDirection: 'row' }}
      >
        <FormLabel component='legend'>Service Level</FormLabel>
        <Tooltip
          title='How should the connector be used? CaaS: Connector-as-a-Service, Of-the-Shelf-Solution. Similar to software, the connector is offered to you as a complete software package (Software-as-a-Service). PaaS: Platform as a Service. The connector is an additional service as part of a platform service on which you may already be storing data in the cloud. Self-service: You develop a connector yourself and tailor it to your requirements.'
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
          value={aufwandSeven}
          label='Multiple Choice possible'
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
                checked={aufwandSeven.includes(data.value)}
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
