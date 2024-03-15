import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReiterStepper1 from './ReiterStepper1';
import ReiterStepper2 from './ReiterStepper2';
import ReiterStepper3 from './ReiterStepper3';
import PrivacyText from '../InputForm/PrivacyText';
import Impressum from '../InputForm/Impressum';
import Kontakt from '../InputForm/Kontakt';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../LanguageContext';
import translationFunction from 'translationFunction';
import { useTableData } from '../../TableDataProvider';

function Copyright() {
  return (
    <Typography variant='body2' color='text.secondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' target='_blank' href='https://www.isst.fraunhofer.de/'>
        Fraunhofer ISST
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'} <br />
      <Typography
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: '20px',
          gap: '8rem',
          '@media (max-width: 600px)': {
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          },
        }}
      >
        <Impressum />
        <PrivacyText />
        <Kontakt />
      </Typography>
    </Typography>
  );
}

const steps = ['Unternehmensinformationen', 'Kategorisierung', 'Empfehlung'];

const stepsObject = {
  stepsAufDeutsch: ['Unternehmensinformationen', 'Kategorisierung', 'Zusammenfassung'],
  stepsAufEnglisch: ['Company information', 'Category', 'Summary'],
};

function getStepContent(step: any) {
  switch (step) {
    case 0:
      return <ReiterStepper1 />;
    case 1:
      return <ReiterStepper2 />;
    case 2:
      return <ReiterStepper3 />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme({
  palette: {
    primary: {
      light: '#005B7F',
      main: '#11998E',
      dark: '#005946',
      contrastText: '#fff',
    },
    secondary: {
      light: '#0080b2',
      main: '#005B7F',
      dark: '#0080b2',
      contrastText: '#fff',
    },
  },
});

export default function ReiterForConnector() {
  const { tableData } = useTableData();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const [isVerticalLayout, setIsVerticalLayout] = useState(window.innerWidth <= 450);
  useEffect(() => {
    const handleResize = () => {
      setIsVerticalLayout(window.innerWidth <= 550);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const { isDeutsch } = useLanguage();

  //Mobile and Tablet Views
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const subjectBase = 'Connector Onboarding';
  const getEmailBody = () => {
    // Construct the email body with the table data
    const emailBody = `
      Ich möchte folgende Connector onboarden:

      Name ihres Unternehmens: ${tableData.company}
      Hauptstandort: ${tableData.ort}
      Postleitzahl: ${tableData.plz}
      Land: ${tableData.land}
      Vorname: ${tableData.vorname}
      Nachname: ${tableData.nachname}
      E-Mail für Kontakt: ${tableData.email}
      Connector Name: ${tableData.connectorName}
      Connector Typ: ${tableData.connectorTyp}
      Dauer der Einführung: ${tableData.dauer}
      FTE: ${tableData.fte}
      GUI vorhanden: ${tableData.gui}
      MDS GUI möglich: ${tableData.mdsGui}
      An Cloud-Anbieter gebunden: ${tableData.cloudAnbieter}
      Cloud: ${tableData.cloud}
      IT-Know-how: ${tableData.itKnowHow}
      Auf ODRL basierend: ${tableData.odrl}
      Open Source: ${tableData.openSource}
      Service-Level: ${tableData.serviceLevel}
      Deployment Type: ${tableData.deployment}
      `;

    return encodeURIComponent(emailBody);
  };
  const getEmailBodyEn = () => {
    // Construct the email body with the table data
    const emailBody = `
      I would like to onboard the following Connector:

      Name of your company: ${tableData.company}
      Main location: ${tableData.ort}
      Zip code: ${tableData.plz}
      Land: ${tableData.land}
      First name: ${tableData.vorname}
      Last name: ${tableData.nachname}
      E-Mail for Contact: ${tableData.email}
      Connector Name: ${tableData.connectorName}
      Connector Type: ${tableData.connectorTyp}
      Duration of the introduction: ${tableData.dauer}
      FTE: ${tableData.fte}
      GUI available: ${tableData.gui}
      MDS GUI possible: ${tableData.mdsGui}
      Tied to Cloud-Provider: ${tableData.cloudAnbieter}
      Cloud: ${tableData.cloud}
      IT-Know-how: ${tableData.itKnowHow}
      Based on ODRL: ${tableData.odrl}
      Open Source: ${tableData.openSource}
      Service-Level: ${tableData.serviceLevel}
      Deployment Type: ${tableData.deployment}
      `;

    return encodeURIComponent(emailBody);
  };
  const recipientEmail =
    'marcel.altendeitering@isst.fraunhofer.de; marius.hupperz@isst.fraunhofer.de';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component='main' maxWidth='md' sx={{ mb: 4 }}>
        <Paper variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography variant='h5' gutterBottom fontWeight='bold'>
            Connector Onboarding
            {activeStep === steps.length - 3 ? (
              <Typography>
                {isDeutsch
                  ? translationFunction().deutschTranslations.reiterInfo
                  : translationFunction().englishTranslations.reiterInfo}
              </Typography>
            ) : (
              ''
            )}
          </Typography>
          <Stepper
            activeStep={activeStep}
            sx={{ pt: 3, pb: 5 }}
            orientation={isVerticalLayout ? 'vertical' : 'horizontal'}
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>
                  {isDeutsch
                    ? stepsObject.stepsAufDeutsch[index]
                    : stepsObject.stepsAufEnglisch[index]}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>{}</React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box
                component='span'
                m={1}
                display='flex'
                justifyContent='space-between'
                alignItems='center'
              >
                {activeStep !== 0 && activeStep !== 2 && (
                  <Box sx={{ ml: '-8px' }}>
                    <Button
                      variant='outlined'
                      onClick={handleBack}
                      sx={{
                        mt: 3,
                        ml: 1,
                        '@media (max-width: 550px)': {
                          fontSize: 'small',
                        },
                      }}
                      style={{ textTransform: 'none' }}
                      size='large'
                    >
                      {isDeutsch
                        ? translationFunction().deutschTranslations.zurückButton
                        : translationFunction().englishTranslations.zurückButton}
                    </Button>
                  </Box>
                )}
                {activeStep === steps.length - 2 && (
                  <Box>
                    {isDeutsch ? (
                      <a
                        href={`mailto:${recipientEmail}?subject=${encodeURIComponent(
                          subjectBase,
                        )}&body=${getEmailBody()}`}
                      >
                        <Button
                          variant='outlined'
                          onClick={handleNext}
                          sx={{
                            mt: 3,
                            ml: 1,
                            '@media (max-width: 550px)': {
                              fontSize: 'small',
                            },
                          }}
                          style={{ textTransform: 'none' }}
                          size='large'
                        >
                          Send Email
                        </Button>
                      </a>
                    ) : (
                      <a
                        href={`mailto:${recipientEmail}?subject=${encodeURIComponent(
                          subjectBase,
                        )}&body=${getEmailBodyEn()}`}
                      >
                        <Button
                          variant='outlined'
                          onClick={handleNext}
                          sx={{
                            mt: 3,
                            ml: 1,
                            '@media (max-width: 550px)': {
                              fontSize: 'small',
                            },
                          }}
                          style={{ textTransform: 'none' }}
                          size='large'
                        >
                          Send Email
                        </Button>
                      </a>
                    )}
                  </Box>
                )}
              </Box>
              {activeStep === steps.length - 3 && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant='outlined'
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                    style={{ textTransform: 'none' }}
                    size='large'
                  >
                    {isDeutsch
                      ? translationFunction().deutschTranslations.weiterButton
                      : translationFunction().englishTranslations.weiterButton}
                  </Button>
                </Box>
              )}
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
