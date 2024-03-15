import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTableData } from '../TableDataProvider';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function ReiterCheckTen() {
  const [aufwand, setAufwand] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAufwand(event.target.value);
  };

  const { tableData, updateTableData } = useTableData();

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    updateTableData({
      ...tableData,
      [name]: value,
    });
  };

  return (
    <Box sx={{ display: 'grid' }}>
      <FormControl
        sx={{ m: 0.5, minWidth: 250 }}
        style={{ display: 'inline-flex', alignItems: 'flex-start', flexDirection: 'row' }}
      >
        <FormLabel component='legend'>
          Auf welche Weise kann der Connector deployed werden?
        </FormLabel>
        <Tooltip
          title='Bitte geben Sie an, wie der Connector für den Kunden bereitgestellt wird. Edge: Der Connector wird nahe den Erfassungspunkten oder Geräten platziert, die Daten generieren oder aufnehmen. (Bspw. Eine Maschine generiert Produktionsdaten, dann wird ein Edge-Connector direkt an der Maschine installiert). On-Premises: Der Connector wird bei den jeweiligen Kunden vor Ort installiert. Cloud: Der Connector wird in der Cloud installiert und ausgeführt.'
          placement='top-start'
          style={{ position: 'absolute', right: 0 }}
        >
          <InfoOutlinedIcon color='disabled' fontSize='small' />
        </Tooltip>
      </FormControl>
      <FormControl sx={{ m: 0.5, minWidth: 250 }}>
        <InputLabel id='element'>Deployment Type</InputLabel>
        <Select
          name='deployment'
          labelId='element'
          id='someelement'
          label='Deployment Type'
          onChange={handleInputChange}
          value={tableData.deployment}
        >
          <MenuItem value={'Edge'}>Edge</MenuItem>
          <MenuItem value={'Cloud'}>Cloud</MenuItem>
          <MenuItem value={'On Premises'}>On Premises</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
