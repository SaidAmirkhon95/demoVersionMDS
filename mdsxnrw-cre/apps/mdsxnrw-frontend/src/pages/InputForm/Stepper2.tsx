import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckBoxOne from '../../components/CheckBoxOne';
import CheckBoxTwo from '../../components/CheckBoxTwo';
import CheckBoxThree from '../../components/CheckBoxThree';
import CheckBoxFour from 'components/CheckBoxFour';
import CheckBoxFive from 'components/CheckBoxFive';
import CheckBoxSix from 'components/CheckBoxSix';
import CheckBoxSeven from 'components/CheckBoxSeven';
import { useLanguage } from '../../LanguageContext';
import translationFunction from 'translationFunction';
import CheckBoxOneEn from 'components/CheckBoxOneEn';
import CheckBoxTwoEn from 'components/CheckBoxTwoEn';
import CheckBoxThreeEn from 'components/CheckBoxThreeEn';
import CheckBoxFourEn from 'components/CheckBoxFourEn';
import CheckBoxFiveEn from 'components/CheckBoxFiveEn';
import CheckBoxSixEn from 'components/CheckBoxSixEn';
import CheckBoxSevenEn from 'components/CheckBoxSevenEn';

export default function Stepper2() {
  const { isDeutsch } = useLanguage();
  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom align='center' style={{ marginBottom: '20px' }}>
        {isDeutsch
          ? translationFunction().deutschTranslations.stepper2
          : translationFunction().englishTranslations.stepper2}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {isDeutsch ? <CheckBoxOne /> : <CheckBoxOneEn />}
        </Grid>
        <Grid item xs={12} md={6}>
          {isDeutsch ? <CheckBoxTwo /> : <CheckBoxTwoEn />}
        </Grid>
        <Grid item xs={12} md={6}>
          {isDeutsch ? <CheckBoxThree /> : <CheckBoxThreeEn />}
        </Grid>
        <Grid item xs={12} md={6}>
          {isDeutsch ? <CheckBoxFour /> : <CheckBoxFourEn />}
        </Grid>
        <Grid item xs={12} md={6}>
          {isDeutsch ? <CheckBoxFive /> : <CheckBoxFiveEn />}
        </Grid>
        <Grid item xs={12} md={6}>
          {isDeutsch ? <CheckBoxSix /> : <CheckBoxSixEn />}
        </Grid>
        <Grid item xs={12} md={6}>
          {isDeutsch ? <CheckBoxSeven /> : <CheckBoxSevenEn />}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
