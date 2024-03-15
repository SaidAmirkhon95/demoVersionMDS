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

export default function ReiterCheckTwo() {
  const [aufwand, setAufwand] = React.useState('');
  const { tableData, updateTableData } = useTableData();

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    updateTableData({
      ...tableData,
      [name]: value,
    });
  };

  const handleChange = (event: SelectChangeEvent) => {
    setAufwand(event.target.value);
  };

  return (
    <Box sx={{ display: 'grid' }}>
      <FormControl
        sx={{ m: 0.5, minWidth: 250 }}
        style={{ display: 'inline-flex', alignItems: 'flex-start', flexDirection: 'row' }}
      >
        <FormLabel component='legend'>Was ist der Connector-Typ? </FormLabel>
        <Tooltip
          title='Bitte geben Sie den Typ Ihres Connectors an. Data Connector-Framework: Modulare Data Space Komponenten, die als Basis für die Implementierung eines Connectors genutzt werden können. Generic Open-Source Solution: Dieser Connector-Typ kann direkt in die IT-Landschaft eingebunden und an Services angebunden werden, hierbei ist meist eine Konfiguration, Erweiterung oder Individualisierung notwendig. Generic Solution: Der Connector wird als proprietäre Software angeboten, hierbei ist meist eine Konfiguration, Erweiterung oder Individualisierung notwendig. Off-the-shelf: Um den Connector zu nutzen sind keine oder vom Aufwand sehr geringe zusätzliche Entwicklungsaktivitäten notwendig.'
          placement='top-start'
          style={{ position: 'absolute', right: 0 }}
        >
          <InfoOutlinedIcon color='disabled' fontSize='small' />
        </Tooltip>
      </FormControl>
      <FormControl sx={{ m: 0.5, minWidth: 250 }}>
        <InputLabel id='element'>Connector Type</InputLabel>
        <Select
          labelId='element'
          id='someelement'
          name='connectorTyp'
          label='Connector Type'
          onChange={handleInputChange}
          value={tableData.connectorTyp}
        >
          <MenuItem value={'Data Connector Framework'}>Data Connector Framework</MenuItem>
          <MenuItem value={'Generic Opensource Solution'}>Generic Opensource Solution</MenuItem>
          <MenuItem value={'Generic Solution'}>Generic Solution</MenuItem>
          <MenuItem value={'Off the Shelf Solution'}>Off the Shelf Solution</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
