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
      <div id='section-five' style={{ overflow: 'hidden', maxWidth: '2000px', margin: '0 auto' }}>
        <Grid
          container
          spacing={8}
          display='flex'
          flexDirection={isMobile ? 'column' : 'row'}
          justifyContent='center'
          alignContent='center'
          marginTop={isMobile ? '70px' : '50px'}
        >
          <Grid
            item
            xs={isMobile ? 12 : isTablet ? 6 : 12}
            md={6}
            flexDirection='column'
            container
            justifyContent={isMobile ? 'center' : isTablet ? 'center' : 'center'}
            alignItems={isMobile ? 'center' : isTablet ? 'flex-end' : 'center'}
            ref={sectionRef}
          >
            {/* <Slide direction='right' in={isMobile ? true : animationPlayed} timeout={1000}> */}
            <Box
              sx={{
                backgroundImage: 'url(./logo_MDS_black.svg)',
                backgroundPosition: isMobile ? 'center' : isTablet ? 'center' : 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: isMobile ? 200 : isTablet ? 250 : 330,
                height: isMobile ? '80px' : isTablet ? '180px' : '230px',
                width: isMobile ? '300px' : isTablet ? '350px' : '430px',
                marginTop: isMobile ? '-130px' : isTablet ? '' : '-40px',
                marginLeft: isMobile ? '' : isTablet ? '-60px' : '',
              }}
            ></Box>
            <Typography variant={isMobile ? 'h5' : isTablet ? 'h4' : 'h2'} textAlign='center'>
              {isDeutsch
                ? translationFunction().deutschTranslations.infoSection51
                : translationFunction().englishTranslations.infoSection51}
              <br />
              {isDeutsch
                ? translationFunction().deutschTranslations.infoSection52
                : translationFunction().englishTranslations.infoSection52}
              <br />
              {isDeutsch
                ? translationFunction().deutschTranslations.infoSection53
                : translationFunction().englishTranslations.infoSection53}
            </Typography>
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
              sx={{ width: isMobile ? 320 : isTablet ? 400 : 700, height: isMobile ? 750 : 500 }}
            >
              <CardContent>
                <Typography
                  variant={isMobile ? 'subtitle2' : isTablet ? 'body1' : 'h6'}
                  color='text.secondary'
                  textAlign='left'
                >
                  {isDeutsch
                    ? translationFunction().deutschTranslations.infoSection54
                    : translationFunction().englishTranslations.infoSection54}
                  <br />
                  <br />
                  {isDeutsch
                    ? translationFunction().deutschTranslations.infoSection55
                    : translationFunction().englishTranslations.infoSection55}
                  <br />
                  <br />
                  {isDeutsch
                    ? translationFunction().deutschTranslations.infoSection56
                    : translationFunction().englishTranslations.infoSection56}
                  &nbsp;
                  <a rel='mobilDataSpace' target='_blank' href='https://mobility-dataspace.eu/de'>
                    {isDeutsch
                      ? translationFunction().deutschTranslations.infoSection57
                      : translationFunction().englishTranslations.infoSection57}
                  </a>
                </Typography>
              </CardContent>
            </Grid>
            {/* </Slide> */}
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};
export default InfoSection3;
