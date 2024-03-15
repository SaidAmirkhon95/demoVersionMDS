import React, { useEffect, useState, useRef } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import { useLanguage } from '../../LanguageContext';
import translationFunction from 'translationFunction';

const InfoSection3 = () => {
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
      <div id='section-one' style={{ overflow: 'hidden', maxWidth: '2000px', margin: '0 auto' }}>
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
            justifyContent={isMobile ? 'flex-end' : isTablet ? 'center' : 'center'}
            alignItems={isMobile ? 'center' : isTablet ? 'center' : 'center'}
            ref={sectionRef}
          >
            <Box
              sx={{
                backgroundImage: 'url(./connection_6778.svg)',
                backgroundPosition: isMobile ? 'center' : isTablet ? 'center' : 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: isMobile ? 300 : isTablet ? 300 : 630,
                height: isMobile ? '480px' : isTablet ? '580px' : '780px',
                width: isMobile ? '300px' : isTablet ? '350px' : '630px',
                marginTop: isMobile ? '-130px' : isTablet ? '-40px' : '-40px',
              }}
            ></Box>
          </Grid>
          <Grid
            ref={sectionRef}
            item
            xs={isMobile ? 12 : isTablet ? 6 : 12}
            md={6}
            direction='column'
            container
            justifyContent={isMobile ? 'flex-start' : 'center'}
            alignItems={isMobile ? 'center' : isTablet ? 'center' : 'center'}
            marginLeft={isMobile ? '' : isTablet ? '-65px' : '-200px'}
          >
            <Grid
              sx={{ width: isMobile ? 320 : isTablet ? 400 : 700, height: isMobile ? 750 : 500 }}
            >
              <CardContent>
                <Typography
                  gutterBottom
                  variant={isMobile ? 'h6' : 'h5'}
                  component='div'
                  textAlign='center'
                >
                  {isDeutsch
                    ? translationFunction().deutschTranslations.infoSection21
                    : translationFunction().englishTranslations.infoSection21}
                  <br />
                  <br />
                </Typography>
                <Typography
                  variant={isMobile ? 'subtitle2' : isTablet ? 'body1' : 'h6'}
                  color='text.secondary'
                  textAlign='left'
                >
                  {isDeutsch
                    ? translationFunction().deutschTranslations.infoSection22
                    : translationFunction().englishTranslations.infoSection22}
                  <br />
                  <br />
                  {isDeutsch
                    ? translationFunction().deutschTranslations.infoSection23
                    : translationFunction().englishTranslations.infoSection23}
                  &nbsp;
                  <span style={{ fontStyle: 'italic' }}>
                    {isDeutsch
                      ? translationFunction().deutschTranslations.infoSection24
                      : translationFunction().englishTranslations.infoSection24}
                  </span>
                  &nbsp;
                  {isDeutsch
                    ? translationFunction().deutschTranslations.infoSection25
                    : translationFunction().englishTranslations.infoSection25}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};
export default InfoSection3;
