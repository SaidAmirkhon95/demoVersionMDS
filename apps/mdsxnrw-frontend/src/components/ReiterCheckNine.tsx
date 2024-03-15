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

export default function ReiterCheckNine() {
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
        <FormLabel component='legend'>Wie ist der Connector lizensiert?</FormLabel>
        <Tooltip
          title='Bitte geben Sie die vorhandene Connectorlizenz an. Open-Source: Der Connector verfügt über einen öffentlichen Quellcode, der von Dritten eingesehen, geändert und genutzt werden darf. Open-Source (copyleft): Open-Source Connectoren werden mit der Auflage versehen, dass Bearbeitungen ebenfalls den gleichen Lizenzbedingungen unterliegen. Closed source (extendable): Der Source Code des Connectors darf durch den Anwender erweitert werden. Closed-Source: Der Quellcode des Connectors ist nicht öffentlich.'
          placement='top-start'
          style={{ position: 'absolute', right: 0 }}
        >
          <InfoOutlinedIcon color='disabled' fontSize='small' />
        </Tooltip>
      </FormControl>
      <FormControl sx={{ m: 0.5, minWidth: 250 }}>
        <InputLabel id='element'>Open Source</InputLabel>
        <Select
          name='openSource'
          labelId='element'
          id='someelement'
          label='OpenSource'
          onChange={handleInputChange}
          value={tableData.openSource}
        >
          <MenuItem value={'Opensource'}>Open Source</MenuItem>
          <MenuItem value={'Opensource Copyleft'}>Opensource Copyleft</MenuItem>
          <MenuItem value={'Closed Source'}>Closed Source</MenuItem>
          <MenuItem value={'Closed Source Extendable'}>Closed Source Extendable</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
