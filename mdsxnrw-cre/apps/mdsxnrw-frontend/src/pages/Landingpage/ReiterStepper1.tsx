import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CountrySelect from '../../components/CountrySelect';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useLanguage } from '../../LanguageContext';
import { useTableData } from '../../TableDataProvider';
import translationFunction from 'translationFunction';

export default function ReiterStepper1() {
  const { isDeutsch } = useLanguage();
  const { tableData, updateTableData } = useTableData();

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    updateTableData({
      ...tableData,
      [name]: value,
    });
  };
  return (
    <React.Fragment>
      <Grid
        item
        xs={12}
        style={{
          display: 'inline-flex',
          flexDirection: 'row',
        }}
      >
        <Typography variant='h6' gutterBottom>
          {isDeutsch
            ? translationFunction().deutschTranslations.reiterStepper11
            : translationFunction().englishTranslations.reiterStepper11}
        </Typography>
        <Tooltip
          title={
            isDeutsch
              ? translationFunction().deutschTranslations.stepper12
              : translationFunction().englishTranslations.stepper12
          }
          placement='top-start'
        >
          <InfoOutlinedIcon
            color='disabled'
            fontSize='small'
            style={{
              marginLeft: '5px',
              marginTop: '5px',
            }}
          />
        </Tooltip>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id='unternehmen'
            name='company'
            label={
              isDeutsch
                ? translationFunction().deutschTranslations.stepper13
                : translationFunction().englishTranslations.stepper13
            }
            fullWidth
            autoComplete='unternehmen'
            variant='standard'
            onChange={handleInputChange}
            value={tableData.company}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id='ort'
            name='ort'
            label={
              isDeutsch
                ? translationFunction().deutschTranslations.stepper16
                : translationFunction().englishTranslations.stepper16
            }
            fullWidth
            autoComplete='ort'
            variant='standard'
            onChange={handleInputChange}
            value={tableData.ort}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id='plz'
            name='plz'
            label={
              isDeutsch
                ? translationFunction().deutschTranslations.stepper17
                : translationFunction().englishTranslations.stepper17
            }
            fullWidth
            autoComplete='postleitzahl'
            variant='standard'
            onChange={handleInputChange}
            value={tableData.plz}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          {<CountrySelect />}
        </Grid>
        <Grid item xs={12} sm={6}>
          {}
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          display: 'inline-flex',
          alignItems: 'flex-start',
          flexDirection: 'row',
        }}
      >
        <Typography variant='h6' gutterBottom>
          {isDeutsch
            ? translationFunction().deutschTranslations.stepper18
            : translationFunction().englishTranslations.stepper18}
        </Typography>
        <Tooltip
          title={
            isDeutsch
              ? translationFunction().deutschTranslations.stepper19
              : translationFunction().englishTranslations.stepper19
          }
          placement='top-start'
          style={{ marginLeft: '5px', marginTop: '5px' }}
        >
          <InfoOutlinedIcon color='disabled' fontSize='small' />
        </Tooltip>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='vorname'
            name='vorname'
            label={
              isDeutsch
                ? translationFunction().deutschTranslations.stepper110
                : translationFunction().englishTranslations.stepper110
            }
            fullWidth
            autoComplete='vorname'
            variant='standard'
            onChange={handleInputChange}
            value={tableData.vorname}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='nachname'
            name='nachname'
            label={
              isDeutsch
                ? translationFunction().deutschTranslations.stepper111
                : translationFunction().englishTranslations.stepper111
            }
            fullWidth
            autoComplete='nachname'
            variant='standard'
            onChange={handleInputChange}
            value={tableData.nachname}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id='email'
            name='email'
            label={
              isDeutsch
                ? translationFunction().deutschTranslations.stepper112
                : translationFunction().englishTranslations.stepper112
            }
            fullWidth
            autoComplete='email'
            variant='standard'
            onChange={handleInputChange}
            value={tableData.email}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
