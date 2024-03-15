import React, { useEffect, useState, useRef } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import { useLanguage } from '../../LanguageContext';
import translationFunction from 'translationFunction';

const AboutSection5 = () => {
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
          flexDirection={isMobile ? 'column' : isTablet ? 'column' : 'row'}
          justifyContent='center'
          alignContent='center'
        >
          <Grid
            item
            xs={isMobile ? 12 : isTablet ? 8 : 12}
            md={6}
            flexDirection='column'
            container
            justifyContent={isMobile ? 'center' : isTablet ? 'flex-start' : 'center'}
            alignItems={isMobile ? 'center' : isTablet ? 'center' : 'center'}
            ref={sectionRef}
          >
            {/* <Slide direction='right' in={isMobile ? true : animationPlayed} timeout={1000}> */}
            <Typography
              gutterBottom
              variant={isMobile ? 'h6' : 'h2'}
              component='div'
              textAlign='center'
              marginBottom={isMobile ? '' : isTablet ? '' : '50px'}
            >
              {isDeutsch
                ? translationFunction().deutschTranslations.aboutSection51
                : translationFunction().englishTranslations.aboutSection51}
            </Typography>
            {/* </Slide> */}
          </Grid>
          <Grid
            ref={sectionRef}
            item
            xs={isMobile ? 12 : isTablet ? 4 : 12}
            md={6}
            direction='column'
            container
            justifyContent='center'
            alignItems={isMobile ? 'center' : isTablet ? 'center' : 'center'}
            marginLeft={isMobile ? '' : isTablet ? '0px' : '-200px'}
          >
            {/* <Slide direction='left' in={isMobile ? true : animationPlayed} timeout={1000}> */}
            <Grid
              sx={{ width: isMobile ? 320 : isTablet ? 650 : 800, height: isMobile ? 770 : 700 }}
            >
              <Box
                sx={{
                  backgroundImage: 'url(./reviews.svg)',
                  backgroundPosition: 'left',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: isMobile ? 200 : isTablet ? 300 : 230,
                  height: isMobile ? '160px' : isTablet ? '200px' : '160px',
                  width: isMobile ? '200px' : isTablet ? '300px' : '530px',
                  marginTop: isMobile ? '-50px' : isTablet ? '-40px' : '100px',
                  marginLeft: '17px',
                }}
              ></Box>
              <CardContent>
                <Typography
                  variant={isMobile ? 'subtitle2' : isTablet ? 'body1' : 'h6'}
                  color='text.secondary'
                  textAlign={isMobile ? 'left' : 'left'}
                >
                  {isDeutsch
                    ? translationFunction().deutschTranslations.aboutSection52
                    : translationFunction().englishTranslations.aboutSection52}
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
export default AboutSection5;
