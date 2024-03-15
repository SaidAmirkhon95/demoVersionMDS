import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormLabel from '@mui/material/FormLabel';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineTwoToneIcon from '@mui/icons-material/HelpOutlineTwoTone';

export default function SelectDataspace() {
  const [age, setAge] = React.useState('');

  const handleChange = (event: any) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormLabel component='legend'>Anvisierte Rolle im Dataspace</FormLabel>
      <div>
        <FormControl sx={{ m: 1, minWidth: 300 }} size='small'>
          <InputLabel id='emo-select-small' required>
            Rolle im Dataspace
          </InputLabel>
          <Select
            labelId='demo-select-small'
            id='demo-select-small'
            value={age}
            label='Rolle im Dataspace'
            onChange={handleChange}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <Tooltip title='Some Info' placement='top-end'>
          <HelpOutlineTwoToneIcon color='disabled' fontSize='small' />
        </Tooltip>
      </div>
    </div>
  );
}
