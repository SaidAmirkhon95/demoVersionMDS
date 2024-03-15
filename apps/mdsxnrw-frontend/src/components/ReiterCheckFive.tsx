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

export default function ReiterCheckFive() {
  const [aufwand, setAufwand] = React.useState('');
  const [isSecondFormControlDisabled, setIsSecondFormControlDisabled] = React.useState(true);

  const handleChange = (event: SelectChangeEvent) => {
    setAufwand(event.target.value);
    setIsSecondFormControlDisabled(event.target.value !== 'Ja');
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
          Ist für den Betrieb des Connectors eine GUI vorhanden?
        </FormLabel>
        <Tooltip
          title='Diese Frage richtet sich nach der Nutzerfreundlichkeit des Connectors. Bitte geben Sie an, ob für den Betrieb des Connectors eine grafische Benutzeroberfläche zur einfachen Bedienung vorhanden ist oder der Connector über eine Konsole bedient werden muss.'
          placement='top-start'
          style={{ position: 'absolute', right: 0 }}
        >
          <InfoOutlinedIcon color='disabled' fontSize='small' />
        </Tooltip>
        <RadioGroup row value={aufwand} onChange={handleChange}>
          <FormControlLabel
            name='gui'
            value='Ja'
            control={<Radio />}
            label='Ja'
            onChange={(event) => handleInputChange(event)}
          />
          <FormControlLabel
            name='gui'
            value='Nein'
            control={<Radio />}
            label='Nein'
            onChange={(event) => handleInputChange(event)}
          />
        </RadioGroup>
      </FormControl>
      <FormControl
        sx={{ m: 0.5, minWidth: 250 }}
        disabled={isSecondFormControlDisabled}
        style={{ display: 'inline-flex', alignItems: 'flex-start' }}
      >
        <FormLabel component='legend'>Ist auch die Nutzung der MDS GUI möglich?</FormLabel>
        <Tooltip
          title='Bitte geben Sie an, ob die GUI des Mobility Data Space (MDS) genutzt werden kann.'
          placement='top-start'
          style={{ position: 'absolute', right: 0 }}
        >
          <InfoOutlinedIcon color='disabled' fontSize='small' />
        </Tooltip>
        <RadioGroup row>
          <FormControlLabel
            name='mdsGui'
            value='Ja'
            control={<Radio />}
            label='Ja'
            onChange={(event) => handleInputChange(event)}
          />
          <FormControlLabel
            name='mdsGui'
            value='Nein'
            control={<Radio />}
            label='Nein'
            onChange={(event) => handleInputChange(event)}
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
