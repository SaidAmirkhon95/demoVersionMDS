import React, { useEffect, useState, useRef } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Slide from '@mui/material/Slide';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../LanguageContext';
import translationFunction from 'translationFunction';

const Section2 = () => {
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
      <div style={{ overflow: 'hidden', maxWidth: '2000px', margin: '0 auto' }}>
        <Grid
          container
          spacing={8}
          display='flex'
          flexDirection={isMobile ? 'column' : 'row'}
          justifyContent='center'
          alignContent='center'
          marginTop='100px'
        >
          <Grid
            item
            xs={isMobile ? 12 : isTablet ? 8 : 12}
            md={7}
            flexDirection='column'
            container
            justifyContent={isMobile ? 'center' : isTablet ? 'flex-end' : 'center'}
            alignItems={isMobile ? 'center' : isTablet ? 'flex-start' : 'center'}
            ref={sectionRef}
            marginRight={isMobile ? '' : isTablet ? '' : '100px'}
          >
            <Slide direction='right' in={isMobile ? true : animationPlayed} timeout={1000}>
              <Grid
                sx={{ width: isMobile ? 320 : isTablet ? 450 : 650, height: isMobile ? 600 : 650 }}
              >
                <CardContent>
                  <Typography
                    gutterBottom
                    variant={isMobile ? 'h6' : 'h5'}
                    component='div'
                    textAlign='center'
                  >
                    Recommendation Engine
                    <br />
                  </Typography>
                  <Typography
                    variant={isMobile ? 'subtitle2' : isTablet ? 'body1' : 'h6'}
                    color='text.secondary'
                    textAlign='center'
                  >
                    <br />
                    <h4>
                      {isDeutsch
                        ? translationFunction().deutschTranslations.passgenaueEmpfehlungen
                        : translationFunction().englishTranslations.passgenaueEmpfehlungen}
                    </h4>
                    {isDeutsch
                      ? translationFunction().deutschTranslations.section2Absatz1
                      : translationFunction().englishTranslations.section2Absatz1}
                    <br />
                  </Typography>
                  <Typography
                    variant={isMobile ? 'subtitle2' : isTablet ? 'body1' : 'h6'}
                    color='text.secondary'
                    textAlign='center'
                  >
                    <h4>
                      {isDeutsch
                        ? translationFunction().deutschTranslations.wieFunktioniertDas
                        : translationFunction().englishTranslations.wieFunktioniertDas}
                    </h4>
                    {isDeutsch
                      ? translationFunction().deutschTranslations.section2Absatz2
                      : translationFunction().englishTranslations.section2Absatz2}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    justifyContent: 'center',
                    mt: isMobile ? '10px' : '15px',
                    alignItems: 'stretch',
                  }}
                >
                  <Button
                    component={Link}
                    to={'/info'}
                    size={isMobile ? 'small' : 'large'}
                    sx={{ marginTop: isMobile ? '0px' : '-5px' }}
                  >
                    <InfoIcon
                      sx={{
                        verticalAlign: 'small',
                        ml: '0px',
                        color: 'primary.main',
                        marginRight: '5px',
                        marginBottom: '5px',
                      }}
                    />
                    {isDeutsch
                      ? translationFunction().deutschTranslations.projektbeschreibung
                      : translationFunction().englishTranslations.projektbeschreibung}
                  </Button>
                </CardActions>
              </Grid>
            </Slide>
          </Grid>
          <Grid
            ref={sectionRef}
            item
            xs={isMobile ? 12 : isTablet ? 4 : 12}
            md={5}
            direction='column'
            container
            justifyContent='flex-start'
            alignItems={isMobile ? 'center' : isTablet ? 'center' : 'flex-start'}
            marginLeft={isMobile ? '' : isTablet ? '-100px' : '-200px'}
          >
            <Slide direction='left' in={isMobile ? true : animationPlayed} timeout={1000}>
              <Box
                component='section'
                sx={{
                  backgroundImage: 'url(./WomanReco.svg)',
                  backgroundPosition: isMobile ? 'center' : isTablet ? 'bottom' : 'bottom',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: isMobile ? 300 : isTablet ? 480 : 730,
                  height: isMobile ? '480px' : isTablet ? '580px' : '720px',
                  width: isMobile ? '300px' : isTablet ? '350px' : '530px',
                  marginTop: isMobile ? '-130px' : isTablet ? '-40px' : '-40px',
                }}
              ></Box>
            </Slide>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};
export default Section2;
