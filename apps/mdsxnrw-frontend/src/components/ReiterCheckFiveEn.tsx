import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import { SelectChangeEvent } from '@mui/material/Select';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useTableData } from '../TableDataProvider';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function ReiterCheckFiveEn() {
  const [aufwand, setAufwand] = React.useState('');
  const [isSecondFormControlDisabled, setIsSecondFormControlDisabled] = React.useState(true);

  const handleChange = (event: SelectChangeEvent) => {
    setAufwand(event.target.value);
    setIsSecondFormControlDisabled(event.target.value !== 'Yes');
    handleInputChange(event);
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
        style={{ display: 'inline-flex', alignItems: 'flex-start' }}
      >
        <FormLabel component='legend'>
          Is there a GUI available for operating the connector?
        </FormLabel>
        <Tooltip
          title='This question refers to the usability of your connector. Please specify whether a graphical user interface (GUI) is available for easy operation of the connector, or if the connector is operated through a commandline.'
          placement='top-start'
          style={{ position: 'absolute', right: 0 }}
        >
          <InfoOutlinedIcon color='disabled' fontSize='small' />
        </Tooltip>
        <RadioGroup row value={aufwand} onChange={handleChange}>
          <FormControlLabel
            name='gui'
            value='Yes'
            control={<Radio />}
            label='Yes'
            onChange={(event) => handleInputChange(event)}
          />
          <FormControlLabel
            name='gui'
            value='No'
            control={<Radio />}
            label='No'
            onChange={(event) => handleInputChange(event)}
          />
        </RadioGroup>
      </FormControl>
      <FormControl
        sx={{ m: 0.5, minWidth: 250 }}
        disabled={isSecondFormControlDisabled}
        style={{ display: 'inline-flex', alignItems: 'flex-start' }}
      >
        <FormLabel component='legend'>Is it also possible to use the MDS GUI?</FormLabel>
        <Tooltip
          title='Please indicate whether the Mobility Data Space (MDS) GUI can be used.'
          placement='top-start'
          style={{ position: 'absolute', right: 0 }}
        >
          <InfoOutlinedIcon color='disabled' fontSize='small' />
        </Tooltip>
        <RadioGroup row>
          <FormControlLabel
            name='mdsGui'
            value='Yes'
            control={<Radio />}
            label='Yes'
            onChange={(event) => handleInputChange(event)}
          />
          <FormControlLabel
            name='mdsGui'
            value='No'
            control={<Radio />}
            label='No'
            onChange={(event) => handleInputChange(event)}
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
