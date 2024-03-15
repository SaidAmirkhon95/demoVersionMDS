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

export default function ReiterCheckNineEn() {
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
        <FormLabel component='legend'>How is the connector licensed?</FormLabel>
        <Tooltip
          title='Please provide the existing connector license. Open-Source: The connector has an open-source code that can be viewed, modified, and used by third parties. Open-Source (copyleft): The open-source connector is provided with the requirement that modifications need to follow the same license terms and conditions. Closed source (extendable): The source code of the connector can be extended by the user. Closed-Source: The source code of the connector is not public.'
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
