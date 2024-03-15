import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import Tooltip from '@mui/material/Tooltip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { useMyContext } from '../MyContext';

const MenuProps = {
  PaperProps: {
    style: {
      width: 200,
      height: 300,
    },
  },
};

const datas = [
  { label: 'Handel', value: 'trade' },
  { label: 'Industrie', value: 'industry' },
  { label: 'Media', value: 'media' },
  { label: 'Tourism', value: 'tourism' },
  { label: 'Landwirtschaft', value: 'property' },
  { label: 'Gesundheitspflege', value: 'healthcare' },
  { label: 'Dienstleistung', value: 'service' },
  { label: 'Finanzen', value: 'finance' },
  { label: 'Wissenschaft', value: 'science' },
  { label: 'Others', value: 'others' },
];

export default function IndustrySelect() {
  const { industrySector, setIndustrySector } = useMyContext();

  useEffect(() => {
    if (industrySector.length === 0) {
      // Set default value if industrySector is empty
      setIndustrySector(['media', 'tourism']); // Assuming 'industry' as default value
    }
  }, []); // Run only when the component mounts

  const handleChange = (event: SelectChangeEvent<typeof industrySector>) => {
    const {
      target: { value },
    } = event;
    // Ensure value is always an array, even if it's a single string
    setIndustrySector(Array.isArray(value) ? value : [value]);
  };

  /* useEffect(() => {
    setIndustrySector(industrySector);
  }, [industrySector]); */

  return (
    <Box sx={{ display: 'grid' }}>
      <FormControl sx={{ m: 1, minWidth: 250 }} size='small'>
        <InputLabel id='element'>Branche *</InputLabel>
        <Select
          labelId='element'
          id='someelement'
          multiple
          value={industrySector}
          label='Wählen Sie ein Element aus'
          onChange={handleChange}
          input={<OutlinedInput label='Branche' />}
          renderValue={(selected) =>
            selected
              .map((value) => {
                const selectedItem = datas.find((item) => item.value === value);
                return selectedItem ? selectedItem.label : '';
              })
              .join(', ')
          }
          MenuProps={MenuProps}
        >
          {datas.map((data, index) => (
            <MenuItem key={data.value} value={data.value} style={{ whiteSpace: 'normal' }}>
              <Checkbox
                checked={industrySector.includes(data.value)}
                style={{ marginLeft: '-10px' }}
              />
              <ListItemText primary={data.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
