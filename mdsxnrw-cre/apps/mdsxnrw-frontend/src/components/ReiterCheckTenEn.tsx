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

export default function ReiterCheckTenEn() {
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
        <FormLabel component='legend'>How is the connector deployed?</FormLabel>
        <Tooltip
          title='Please specify how the connector is provided to the customer. Edge: The connector is close to the data generation (for example: A machine generates production data, so the edge connector is installed at the machine). On-Premises: The connector is installed on-site at the respective customers location. Cloud: The connector is installed and operates in the cloud.'
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
