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

export default function ReiterCheckSevenEn() {
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
          Required IT knowledge for setting up the connector?
        </FormLabel>
        <Tooltip
          title='Please specify the required IT knowledge for setting up the connector. Low: There is no software development, the customer has knowledge in Office and other standard software. Medium: Software development is not at the core of the business model, but software is occasionally developed to support the business model of the organization. High: IT development is an integral part of the business model.'
          placement='top-start'
          style={{ position: 'absolute', right: 0 }}
        >
          <InfoOutlinedIcon color='disabled' fontSize='small' />
        </Tooltip>
      </FormControl>
      <FormControl sx={{ m: 0.5, minWidth: 250 }}>
        <InputLabel id='element'>IT-Know-how</InputLabel>
        <Select
          name='itKnowHow'
          labelId='element'
          id='someelement'
          label='IT-Know-how'
          onChange={handleInputChange}
          value={tableData.itKnowHow}
        >
          <MenuItem value={'Low'}>Low</MenuItem>
          <MenuItem value={'Medium'}>Medium</MenuItem>
          <MenuItem value={'High'}>High</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
