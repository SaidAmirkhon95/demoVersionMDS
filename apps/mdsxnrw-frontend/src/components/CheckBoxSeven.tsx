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
      setAufwandSeven(['caas']); // Assuming 'industry' as default value
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
          title='Wie soll der Connector eingesetezt werden? CaaS: Connector-as-a-Service, Of-the-Shelf-Solution. Ähnlich wie bei Software wird Ihnen der Connector als komplettes Software-Paket (Software-as-a-Service) angeboten. PaaS: Platform-as-a-Service. Der Connector ist ein zusätzlicher Dienst im Rahmen eines Platfform-Dienstes, auf dem Sie ggf. schon Daten in der Cloud speichern. Self-Service: Sie entwickeln einen Connector slebst und entwickeln diesen passgenau auf Ihre Anforderungen.'
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
          value={aufwandSeven}
          label='Mehrfachantwort möglich'
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
