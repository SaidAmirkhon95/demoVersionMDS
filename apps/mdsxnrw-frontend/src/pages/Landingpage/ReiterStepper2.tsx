import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useLanguage } from '../../LanguageContext';
import translationFunction from 'translationFunction';
import ReiterCheckOne from 'components/ReiterCheckOne';
import ReiterCheckOneEn from 'components/ReiterCheckOneEn';
import ReiterCheckTwo from 'components/ReiterCheckTwo';
import ReiterCheckTwoEn from 'components/ReiterCheckTwoEn';
import ReiterCheckThree from 'components/ReiterCheckThree';
import ReiterCheckThreeEn from 'components/ReiterCheckThreeEn';
import ReiterCheckFour from 'components/ReiterCheckFour';
import ReiterCheckFourEn from 'components/ReiterCheckFourEn';
import ReiterCheckFive from 'components/ReiterCheckFive';
import ReiterCheckFiveEn from 'components/ReiterCheckFiveEn';
import ReiterCheckSix from 'components/ReiterCheckSix';
import ReiterCheckSixEn from 'components/ReiterCheckSixEn';
import ReiterCheckSeven from 'components/ReiterCheckSeven';
import ReiterCheckSevenEn from 'components/ReiterCheckSevenEn';
import ReiterCheckEight from 'components/ReiterCheckEight';
import ReiterCheckEightEn from 'components/ReiterCheckEightEn';
import ReiterCheckNine from 'components/ReiterCheckNine';
import ReiterCheckNineEn from 'components/ReiterCheckNineEn';
import ReiterCheckTen from 'components/ReiterCheckTen';
import ReiterCheckTenEn from 'components/ReiterCheckTenEn';
import ReiterCheckEleven from 'components/ReiterCheckEleven';
import ReiterCheckElevenEn from 'components/ReiterCheckElevenEn';

export default function ReiterStepper2() {
  const { isDeutsch } = useLanguage();
  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom align='left' style={{ marginBottom: '20px' }}>
        {isDeutsch
          ? translationFunction().deutschTranslations.reiterStepper21
          : translationFunction().englishTranslations.reiterStepper21}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {isDeutsch ? <ReiterCheckOne /> : <ReiterCheckOneEn />}
        </Grid>
        <Grid item xs={12} md={6}>
          {isDeutsch ? <ReiterCheckTwo /> : <ReiterCheckTwoEn />}
        </Grid>
        <Grid item xs={12} md={6}>
          {isDeutsch ? <ReiterCheckThree /> : <ReiterCheckThreeEn />}
        </Grid>
        <Grid item xs={12} md={6}>
          {isDeutsch ? <ReiterCheckFour /> : <ReiterCheckFourEn />}
        </Grid>
        <Grid item xs={12} md={6}>
          {isDeutsch ? <ReiterCheckFive /> : <ReiterCheckFiveEn />}
        </Grid>
        <Grid item xs={12} md={6}>
          {isDeutsch ? <ReiterCheckSix /> : <ReiterCheckSixEn />}
        </Grid>
        <Grid item xs={12} md={6}>
          {isDeutsch ? <ReiterCheckSeven /> : <ReiterCheckSevenEn />}
        </Grid>
        <Grid item xs={12} md={6}>
          {isDeutsch ? <ReiterCheckEight /> : <ReiterCheckEightEn />}
        </Grid>
        <Grid item xs={12} md={6}>
          {isDeutsch ? <ReiterCheckNine /> : <ReiterCheckNineEn />}
          {isDeutsch ? <ReiterCheckTen /> : <ReiterCheckTenEn />}
        </Grid>
        <Grid item xs={12} md={6}>
          {isDeutsch ? <ReiterCheckEleven /> : <ReiterCheckElevenEn />}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
