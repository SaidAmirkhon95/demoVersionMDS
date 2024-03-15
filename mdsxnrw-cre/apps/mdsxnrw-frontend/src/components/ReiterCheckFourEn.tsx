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

export default function ReiterCheckFourEn() {
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
          How many people (FTEs) are typically required for the implementation of a connector?
        </FormLabel>
        <Tooltip
          title='Full time equivalent (FTE) equals a full-time worker. One person, a small team (2-4 people), a large team (5-10 people/department).'
          placement='top-start'
          style={{ position: 'absolute', right: 0 }}
        >
          <InfoOutlinedIcon color='disabled' fontSize='small' />
        </Tooltip>
      </FormControl>
      <FormControl sx={{ m: 0.5, minWidth: 250 }}>
        <InputLabel id='element'>FTE</InputLabel>
        <Select
          name='fte'
          labelId='element'
          id='someelement'
          label='FTE'
          onChange={handleInputChange}
          value={tableData.fte}
        >
          <MenuItem value={'Single Person'}>Single person</MenuItem>
          <MenuItem value={'Small Team'}>Small Team</MenuItem>
          <MenuItem value={'Large Team'}>Large Team</MenuItem>
          <MenuItem value={'Department'}>Department</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
