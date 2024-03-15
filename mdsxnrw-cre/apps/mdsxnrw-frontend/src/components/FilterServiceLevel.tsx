import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const serviceLevel = [
  {
    value: 0,
    label: 'none',
  },
  {
    value: 33,
    label: 'CaaS',
  },
  {
    value: 67,
    label: 'PaaS',
  },
  {
    value: 100,
    label: 'Self-service',
  },
];

const StyledSlider = styled(Slider)(({ theme }) => ({
  '& .MuiSlider-thumb': {
    width: 16,
    height: 16,
    marginTop: 0,
    marginLeft: 7,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
  },
  '& .MuiSlider-valueLabel': {
    display: 'none',
  },
  '& .MuiSlider-markLabel': {
    fontSize: '0.8rem',
    whiteSpace: 'normal', // Allow word wrapping
    textAlign: 'center', // Center-align the wrapped text
    lineHeight: 1.2, // Increase line height for better readability
    wordWrap: 'break-word',
    marginLeft: '5px',
  },
  '& .MuiSlider-mark': {
    width: 16,
    height: 16,
    borderRadius: '50%',
    backgroundColor: theme.palette.grey[400],
  },
  '& .MuiSlider-markActive': {
    backgroundColor: theme.palette.primary.main,
  },
}));

function valuetext(label: any) {
  return `${label}`;
}

function valueLabelFormat(label: any) {
  return serviceLevel.findIndex((serviceLevel) => serviceLevel.label === label) + 1;
}

export default function FilterServiceLevel() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <Box sx={{ width: 200 }}>
      <Typography>Service Level</Typography>
      <StyledSlider
        aria-label='Restricted values'
        value={value}
        onChange={handleChange}
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={valuetext}
        step={null}
        valueLabelDisplay='auto'
        marks={serviceLevel}
        track={false}
      />
    </Box>
  );
}
