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

export default function ReiterCheckTwoEn() {
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
        <FormLabel component='legend'>What is the connector type?</FormLabel>
        <Tooltip
          title='Please specify the type of your connector. Data Connector-Framework: Modular Data Space components that can be used as a framework for implementing a connector. Generic Open-Source Solution: This connector type can be directly integrated into the IT landscape and connected to services, often requiring configuration, extension, or customization. Generic Solution: The connector is offered as proprietary software, often requiring configuration, extension, or customization. Off-the-shelf: No or very minimal additional development activities are required to use the connector.'
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
