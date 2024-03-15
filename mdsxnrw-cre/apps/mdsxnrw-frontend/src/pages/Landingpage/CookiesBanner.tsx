import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Button, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import PrivacyText from 'pages/InputForm/PrivacyText';
import Impressum from 'pages/InputForm/Impressum';
import { useLanguage } from '../../LanguageContext';
import translationFunction from 'translationFunction';

const theme = createTheme({
  palette: {
    primary: {
      light: '#005B7F',
      main: '#11998E',
      dark: '#05786e',
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

const myComponent = {
  marginTop: '12%',
  height: '400px',
  overflow: 'scroll',
};

const CookiesBanner = () => {
  const { isDeutsch } = useLanguage();
  const [cookies, setCookie] = useCookies(['cookiesAccepted']);
  const [open, setOpen] = useState(cookies.cookiesAccepted === undefined); // make ! invisible to see cookies
  const [customizeOpen, setCustomizeOpen] = useState(false);

  const handleAccept = () => {
    setCookie('cookiesAccepted', true, { maxAge: 365 * 24 * 60 * 60 }); //läuft in einem Jahr ab
    setOpen(false);
  };

  const handleDecline = () => {
    console.log('Cookies declined.');
    setCookie('cookiesAccepted', false, { maxAge: 365 * 24 * 60 * 60 });
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCustomize = () => {
    setCustomizeOpen(true);
    setOpen(false);
  };

  const handleCustomizeClose = () => {
    setCustomizeOpen(false);
  };

  const handleCustomizeSave = () => {
    console.log('Customize preferences saved.');
    setCookie('cookiesAccepted', true, { maxAge: 365 * 24 * 60 * 60 });
    setOpen(false);
    setCustomizeOpen(false);
  };

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
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1100);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth < 1100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: isMobile ? '100%' : '200%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9999,
        }}
        ContentProps={{
          sx: {
            fontSize: isMobile ? '18px' : '25px',
            marginLeft: isMobile ? '1%' : '50%',
            marginRight: isMobile ? '1%' : '',
            opacity: 0.5,
            background: 'white',
            color: '#616161',
            marginTop: '0%',
            width: '600px',
            height: isMobile ? '750px' : '550px',
            borderRadius: isMobile ? '' : '5%',
            textAlign: 'justify',
            textJustify: 'inter-word',
          },
        }}
        message={
          <div>
            <Typography variant='h6' color='primary' align='center' marginBottom='20px'>
              {isDeutsch
                ? translationFunction().deutschTranslations.cookies1
                : translationFunction().englishTranslations.cookies1}
            </Typography>
            <Typography variant={isMobile ? 'body2' : 'body1'}>
              {isDeutsch
                ? translationFunction().deutschTranslations.cookies2
                : translationFunction().englishTranslations.cookies2}
            </Typography>
          </div>
        }
        action={
          <div style={{ marginLeft: '-4%' }}>
            <Button
              color='primary'
              size={isMobile ? 'medium' : 'large'}
              onClick={handleAccept}
              style={{ border: '1px solid #11998E', marginBottom: '10px', width: '100%' }}
              variant='contained'
            >
              {isDeutsch
                ? translationFunction().deutschTranslations.cookies3
                : translationFunction().englishTranslations.cookies3}
            </Button>
            <Button
              color='primary'
              size={isMobile ? 'medium' : 'large'}
              onClick={handleDecline}
              style={{ border: '1px solid #11998E', marginBottom: '10px', width: '100%' }}
              variant='outlined'
            >
              {isDeutsch
                ? translationFunction().deutschTranslations.cookies4
                : translationFunction().englishTranslations.cookies4}
            </Button>
            <Button
              color='primary'
              size={isMobile ? 'medium' : 'large'}
              onClick={handleCustomize}
              style={{ border: '1px solid #11998E', width: '100%' }}
              variant='outlined'
            >
              {isDeutsch
                ? translationFunction().deutschTranslations.cookies5
                : translationFunction().englishTranslations.cookies5}
            </Button>
            <Grid maxWidth='2000px' overflow='hidden'>
              <Typography variant='body2' color='text.secondary' align='center'>
                <Typography
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: '20px',
                    gap: '8rem',
                    '@media (max-width: 600px)': {
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '0.5rem',
                    },
                  }}
                >
                  <PrivacyText />
                  <Impressum />
                </Typography>
              </Typography>
            </Grid>
          </div>
        }
        onClose={handleClose}
      />
      <Dialog open={customizeOpen} onClose={handleCustomizeClose} style={myComponent}>
        <DialogTitle>
          {isDeutsch
            ? translationFunction().deutschTranslations.cookies6
            : translationFunction().englishTranslations.cookies6}
        </DialogTitle>
        <DialogContent>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label={
                    isDeutsch
                      ? translationFunction().deutschTranslations.cookiesNotwendig
                      : translationFunction().englishTranslations.cookiesNotwendig
                  }
                />
              </FormGroup>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {isDeutsch
                  ? translationFunction().deutschTranslations.cookies7
                  : translationFunction().englishTranslations.cookies7}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <FormControlLabel
                control={<Checkbox />}
                label={
                  isDeutsch
                    ? translationFunction().deutschTranslations.cookiesAnalytisch
                    : translationFunction().englishTranslations.cookiesAnalytisch
                }
              />
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {isDeutsch
                  ? translationFunction().deutschTranslations.cookies8
                  : translationFunction().englishTranslations.cookies8}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <FormControlLabel control={<Checkbox />} label='Marketing' />
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {isDeutsch
                  ? translationFunction().deutschTranslations.cookies9
                  : translationFunction().englishTranslations.cookies9}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCustomizeClose} color='primary'>
            {isDeutsch
              ? translationFunction().deutschTranslations.cookies10
              : translationFunction().englishTranslations.cookies10}
          </Button>
          <Button onClick={handleCustomizeSave} color='primary'>
            {isDeutsch
              ? translationFunction().deutschTranslations.cookies11
              : translationFunction().englishTranslations.cookies11}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default CookiesBanner;
