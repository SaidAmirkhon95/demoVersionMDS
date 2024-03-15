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

export default function ReiterCheckThree() {
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
          Wie lange dauert die Einführung eines Connectors durchschnittlich?
        </FormLabel>
        <Tooltip
          title='Bitte geben Sie die durchschnittliche Dauer für die Einführung eines Connectors bei einem Kunden an. '
          placement='top-start'
          style={{ position: 'absolute', right: 0 }}
        >
          <InfoOutlinedIcon color='disabled' fontSize='small' />
        </Tooltip>
      </FormControl>
      <FormControl sx={{ m: 0.5, minWidth: 250 }}>
        <InputLabel id='element'>Dauer</InputLabel>
        <Select
          name='dauer'
          labelId='element'
          id='someelement'
          label='Dauer'
          onChange={handleInputChange}
          value={tableData.dauer}
        >
          <MenuItem value={'About 1 Day'}>About 1 Day</MenuItem>
          <MenuItem value={'Between 2 to 5 Days'}>Between 2 to 5 Days</MenuItem>
          <MenuItem value={'About 1 Month'}>About 1 Month</MenuItem>
          <MenuItem value={'Between 2 to 4 Months'}>Between 2 to 4 Months</MenuItem>
          <MenuItem value={'Between 4 to 6 Months'}>Between 4 to 6 Months</MenuItem>
          <MenuItem value={'More than 6 Months'}>More than 6 Months</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
