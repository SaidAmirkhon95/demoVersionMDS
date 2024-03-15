import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './Page.module.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import { useLanguage } from '../../LanguageContext';
import translationFunction from 'translationFunction';

const Header = () => {
  const { isDeutsch } = useLanguage();

  const theme = createTheme({
    palette: {
      primary: {
        light: '#005B7F',
        main: '#009374',
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

  //textOverlapping
  const OverlappingContainer = styled('div')({
    position: 'relative',
    display: 'inline-block',
  });

  const BaseText = styled('div')({
    position: 'relative',
    zIndex: 1,
    color: 'white',
  });

  const OverlappedText = styled('div')({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    color: '#11998E',
    fontWeight: 'bold',
  });

  return (
    <ThemeProvider theme={theme}>
      <div style={{ overflow: 'hidden', maxWidth: '2000px', margin: '0 auto' }}>
        <Grid
          container
          spacing={1}
          display='flex'
          flexDirection={isMobile ? 'column' : isTablet ? 'row' : 'row'}
          justifyContent='center'
          alignItems='center'
          maxWidth='2000px'
        >
          <Grid
            item
            xs={isMobile ? 12 : isTablet ? 7 : 12}
            md={6}
            container
            direction='column'
            justifyContent={isMobile ? 'center' : 'flex-start'}
            alignItems={isMobile ? 'center' : isTablet ? 'center' : 'center'}
            paddingRight={isMobile ? 0 : isTablet ? 0 : '30px'}
          >
            <Slide direction='right' in={true} timeout={1000}>
              <Grid>
                <Typography
                  variant={isMobile ? 'h5' : isTablet ? 'h4' : 'h4'}
                  component='h1'
                  sx={{
                    fontWeight: 700,
                    color: 'black',
                    lineHeight: '1.1',
                    mt: '100px',
                    mb: '20px',
                    maxWidth: '1000px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {isDeutsch
                    ? translationFunction().deutschTranslations.mdsInWenig
                    : translationFunction().englishTranslations.mdsInWenig}
                  <br />
                  {isDeutsch
                    ? translationFunction().deutschTranslations.schritteZu
                    : translationFunction().englishTranslations.schritteZu}
                  <br />
                  {isDeutsch
                    ? translationFunction().deutschTranslations.requirements
                    : translationFunction().englishTranslations.requirements}
                </Typography>
                <Typography
                  variant={isMobile ? 'subtitle2' : isTablet ? 'body2' : 'body1'}
                  color='text.secondary'
                >
                  {isDeutsch
                    ? translationFunction().deutschTranslations.anbindung
                    : translationFunction().englishTranslations.anbindung}
                  {isMobile ? <br /> : ''}
                  {isDeutsch
                    ? translationFunction().deutschTranslations.md
                    : translationFunction().englishTranslations.md}
                  {isMobile ? '' : <br />}
                  {isDeutsch
                    ? translationFunction().deutschTranslations.sDurch
                    : translationFunction().englishTranslations.sDurch}
                  {isMobile ? <br /> : ''}
                  {isDeutsch ? '' : <br />}
                  {isDeutsch
                    ? translationFunction().deutschTranslations.passgenau
                    : translationFunction().englishTranslations.passgenau}
                </Typography>
                <Typography sx={{ display: 'flex', marginTop: isMobile ? '' : '30px' }}>
                  <Button
                    //disabled
                    component={Link}
                    to={'/app'}
                    variant='contained'
                    sx={{
                      mt: '18px',
                      width: isMobile ? '130px' : isTablet ? '190px' : '230px',
                      height: '60px',
                      textTransform: 'none',
                      color: 'primary',
                      '&&:focus': {
                        backgroundColor: '#343a55',
                      },
                    }}
                  >
                    <Typography
                      component='body'
                      variant={isMobile ? 'body2' : isTablet ? 'h6' : 'h5'}
                      sx={{
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                      }}
                    >
                      {isDeutsch
                        ? translationFunction().deutschTranslations.empfehlungStarten
                        : translationFunction().englishTranslations.empfehlungStarten}
                    </Typography>
                  </Button>
                  <Button
                    component={Link}
                    to={'/about'}
                    variant='outlined'
                    sx={{
                      ml: '30px',
                      mt: '18px',
                      width: isMobile ? '130px' : isTablet ? '190px' : '230px',
                      height: '60px',

                      textTransform: 'none',
                      color: '#primary',

                      '&&:focus': {
                        backgroundColor: '#343a55',
                      },
                    }}
                  >
                    <Typography
                      component='body'
                      variant={isMobile ? 'body2' : isTablet ? 'h6' : 'h5'}
                      sx={{ whiteSpace: 'nowrap' }}
                    >
                      {isDeutsch
                        ? translationFunction().deutschTranslations.weiterInfo
                        : translationFunction().englishTranslations.weiterInfo}
                    </Typography>
                  </Button>
                </Typography>
              </Grid>
            </Slide>
          </Grid>
          <Grid
            item
            xs={isMobile ? 12 : isTablet ? 5 : 12}
            md={5}
            container
            display='flex'
            direction='row'
            justifyContent={isMobile ? 'center' : 'flex-start'}
            alignItems='flex-end'
          >
            <Slide direction='left' in={true} timeout={1000}>
              <Box
                sx={{
                  backgroundImage: 'url(./searchApp.svg)',
                  backgroundPosition: isMobile ? 'center' : isTablet ? 'bottom' : 'bottom',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: isMobile ? 250 : isTablet ? 300 : 550,
                  height: isTablet ? '500px' : '700px',
                  width: isMobile ? '90%' : isTablet ? '600px' : '600px',
                  '@media (max-width: 600px)': {
                    marginTop: '-200px',
                  },
                  '@media (max-width: 1100px)': {
                    marginTop: isMobile ? '-50px' : '',
                  },
                }}
              ></Box>
            </Slide>
          </Grid>
          <Slide direction='up' in={true} timeout={1000}>
            <Grid
              item
              xs={isMobile ? 12 : isTablet ? 5 : 12}
              md={6}
              display='flex'
              marginTop={isMobile ? '-100px' : '10px'}
              justifyContent='space-around'
              flexDirection={isMobile ? 'row' : 'row'}
              alignItems='center'
            >
              <img
                style={{
                  maxWidth: isMobile ? '100px' : '170px',
                  paddingRight: '20px',
                }}
                src='logo_MDS_black.svg'
                alt='mds'
              />
              <img
                style={{
                  maxWidth: isMobile ? '100px' : '160px',
                  paddingRight: '10px',
                }}
                src='Fraunhofer_ISST-Logo_Internet.svg'
                alt='mds'
              />
              <img
                style={{
                  maxWidth: isMobile ? '130px' : '220px',
                }}
                src='image1.svg'
                alt='mds'
              />
            </Grid>
          </Slide>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default Header;
