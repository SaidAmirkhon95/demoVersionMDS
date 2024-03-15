import React, { useEffect, useState, useRef } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import Kontakt from 'pages/InputForm/Kontakt';
import PrivacyText from 'pages/InputForm/PrivacyText';
import Impressum from 'pages/InputForm/Impressum';
import { useLanguage } from '../../LanguageContext';
import translationFunction from 'translationFunction';

const InfoSection7 = () => {
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

  const { isDeutsch } = useLanguage();
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
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1600);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth < 1600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [animationPlayed, setAnimationPlayed] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const handleIntersection = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting && !animationPlayed) {
          setIsInView(true);
          setAnimationPlayed(true);
        } else {
          setIsInView(false);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    const section = sectionRef.current;
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [animationPlayed]);
  return (
    <ThemeProvider theme={theme}>
      <div id='section-six' style={{ overflow: 'hidden', maxWidth: '2000px', margin: '0 auto' }}>
        <Grid
          container
          spacing={8}
          display='flex'
          flexDirection={isMobile ? 'column' : 'row'}
          justifyContent='center'
          alignContent='center'
          marginTop={isMobile ? '' : '50px'}
        >
          <Grid
            item
            xs={isMobile ? 12 : isTablet ? 6 : 12}
            md={6}
            flexDirection='column'
            container
            justifyContent={isMobile ? 'center' : isTablet ? 'center' : 'flex-start'}
            alignItems={isMobile ? 'center' : isTablet ? 'center' : 'center'}
            ref={sectionRef}
          >
            {/* <Slide direction='right' in={isMobile ? true : animationPlayed} timeout={1000}> */}
            <Box
              sx={{
                backgroundImage: 'url(./analytics.svg)',
                backgroundPosition: isMobile ? 'center' : isTablet ? 'center' : 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: isMobile ? 300 : isTablet ? 350 : 530,
                height: isMobile ? '650px' : isTablet ? '580px' : '780px',
                width: isMobile ? '300px' : isTablet ? '350px' : '630px',
                marginTop: isMobile ? '-130px' : isTablet ? '-40px' : '-40px',
              }}
            ></Box>
            {/* </Slide> */}
          </Grid>
          <Grid
            ref={sectionRef}
            item
            xs={isMobile ? 12 : isTablet ? 6 : 12}
            md={6}
            direction='column'
            container
            justifyContent='center'
            alignItems={isMobile ? 'center' : isTablet ? 'center' : 'center'}
            marginLeft={isMobile ? '' : isTablet ? '-65px' : '-200px'}
          >
            {/* <Slide direction='left' in={isMobile ? true : animationPlayed} timeout={1000}> */}
            <Grid
              sx={{ width: isMobile ? 320 : isTablet ? 400 : 700, height: isMobile ? 750 : 800 }}
            >
              <CardContent>
                <Typography
                  gutterBottom
                  variant={isMobile ? 'h6' : 'h5'}
                  component='div'
                  textAlign='center'
                >
                  {isDeutsch
                    ? translationFunction().deutschTranslations.infoSection71
                    : translationFunction().englishTranslations.infoSection71}
                  <br />
                  <br />
                </Typography>
                <Typography
                  variant={isMobile ? 'subtitle2' : isTablet ? 'body1' : 'h6'}
                  color='text.secondary'
                  textAlign='left'
                  /* style={{ textAlign: 'justify', textJustify: 'inter-word' }} */
                >
                  {isDeutsch
                    ? translationFunction().deutschTranslations.infoSection72
                    : translationFunction().englishTranslations.infoSection72}
                  <br />
                  <br />
                  {isDeutsch
                    ? translationFunction().deutschTranslations.infoSection73
                    : translationFunction().englishTranslations.infoSection73}
                  <br />
                  <br />
                  {isDeutsch
                    ? translationFunction().deutschTranslations.infoSection74
                    : translationFunction().englishTranslations.infoSection74}
                  <br />
                  <br />
                  {isDeutsch
                    ? translationFunction().deutschTranslations.infoSection75
                    : translationFunction().englishTranslations.infoSection75}
                  <br />
                  <br />
                  <span style={{ fontWeight: 'bold' }}>
                    {isDeutsch
                      ? translationFunction().deutschTranslations.infoSection76
                      : translationFunction().englishTranslations.infoSection76}
                  </span>
                </Typography>
              </CardContent>
            </Grid>
            {/* </Slide> */}
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            '@media (max-width: 600px)': {
              marginTop: '480px !important',
            },
            '@media (max-width: 1100px)': {
              marginTop: '150px !important',
            },
            '@media (max-width: 1535px)': {
              marginTop: '200px',
            },
            '@media (min-width: 1536px)': {
              marginTop: '200px',
            },
          }}
          maxWidth='2000px'
          /* margin='0 auto' */
          overflow='hidden'
          marginBottom='20px'
        >
          <Typography variant='body2' color='text.secondary' align='center'>
            {'Copyright © '}
            <Link color='inherit' rel='isst' target='_blank' href='https://www.isst.fraunhofer.de/'>
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
                  justifyContent: 'center',
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
        </Grid>
      </div>
    </ThemeProvider>
  );
};
export default InfoSection7;
