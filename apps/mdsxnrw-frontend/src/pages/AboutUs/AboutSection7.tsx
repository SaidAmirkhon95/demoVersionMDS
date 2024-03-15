import React, { useEffect, useState, useRef } from 'react';
import { ThemeProvider, Typography, createTheme } from '@mui/material';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Marcel from '../../components/Pictures/Marcel.jpg';
import Marius from '../../components/Pictures/Marius.jpg';
import Kontakt from 'pages/InputForm/Kontakt';
import PrivacyText from 'pages/InputForm/PrivacyText';
import Impressum from 'pages/InputForm/Impressum';
import { useLanguage } from '../../LanguageContext';
import translationFunction from 'translationFunction';

const AboutSection7 = () => {
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
        <Grid marginBottom={isMobile ? '' : isTablet ? '' : '20px'}>
          <Typography
            gutterBottom
            variant={isMobile ? 'h6' : 'h2'}
            component='div'
            textAlign={isMobile ? 'center' : isTablet ? 'center' : 'center'}
            marginBottom={isMobile ? '' : isTablet ? '' : '50px'}
            marginTop={isMobile ? '' : isTablet ? '' : '200px'}
          >
            {isDeutsch
              ? translationFunction().deutschTranslations.aboutSection71
              : translationFunction().englishTranslations.aboutSection71}
            <br />
            <br />
          </Typography>
          <Grid
            container
            direction={isMobile ? 'column' : isTablet ? 'column' : 'row'}
            justifyContent='center'
            spacing={6}
            ref={sectionRef}
          >
            {/* <Slide direction='right' in={isMobile ? true : animationPlayed} timeout={1000}> */}
            <Grid item xs={12} sm={6}>
              <Grid
                container
                direction='row'
                justifyContent={isMobile ? 'center' : isTablet ? 'center' : 'flex-end'}
                alignItems='center'
                sx={{
                  '@media (max-width: 900px)': {
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '15px',
                  },
                }}
              >
                <Grid item xs={10} sm={4}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ marginInline: 'auto' }}>
                      <img
                        style={{
                          borderRadius: '50%',
                          width: isTablet ? '90%' : isMobile ? '80%' : '100%',
                          maxWidth: '250px',
                        }}
                        src={Marcel}
                        alt='Marcel Altendeitering'
                      />
                    </div>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  container
                  direction='column'
                  justifyContent='center'
                  alignItems={isMobile ? 'center' : isTablet ? 'center' : 'flex-start'}
                >
                  <Typography
                    variant={isMobile ? 'h6' : isTablet ? 'h5' : 'h4'}
                    style={{ fontWeight: 'bold' }}
                  >
                    Marcel Altendeitering
                  </Typography>
                  <Typography
                    variant={isMobile ? 'subtitle2' : isTablet ? 'h5' : 'h6'}
                    sx={{
                      '@media (max-width: 900px)': {
                        fontSize: '20px',
                      },
                      '@media (max-width: 600px)': {
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                      },
                    }}
                  >
                    Email:&nbsp;&nbsp;
                    <a href={`mailto: marcel.altendeitering@isst.fraunhofer.de`}>
                      marcel.altendeitering@isst.fraunhofer.de
                    </a>
                    <br />
                    Tel.: &nbsp;&nbsp;&nbsp;&nbsp;+49 231 97677-461
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* </Slide> */}
            {/* <Slide direction='left' in={isMobile ? true : animationPlayed} timeout={1000}> */}
            <Grid item xs={12} sm={6}>
              <Grid
                container
                direction='row'
                justifyContent={isMobile ? 'center' : isTablet ? 'center' : 'flex-start'}
                alignItems='center'
                sx={{
                  '@media (max-width: 900px)': {
                    flexDirection: 'column',
                    alignItems: 'center',
                  },
                }}
              >
                <Grid item xs={10} sm={4}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ marginInline: 'auto' }}>
                      <img
                        style={{
                          borderRadius: '50%',
                          width: isTablet ? '90%' : isMobile ? '80%' : '100%',
                          maxWidth: '250px',
                        }}
                        src={Marius}
                        alt='Marius Hupperz'
                      />
                    </div>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  container
                  direction='column'
                  justifyContent='center'
                  alignItems={isMobile ? 'center' : isTablet ? 'center' : 'flex-start'}
                >
                  <Typography
                    variant={isMobile ? 'h6' : isTablet ? 'h5' : 'h4'}
                    style={{ fontWeight: 'bold' }}
                  >
                    Marius Hupperz
                  </Typography>
                  <Typography
                    variant={isMobile ? 'subtitle2' : isTablet ? 'h5' : 'h6'}
                    sx={{
                      '@media (max-width: 900px)': {
                        fontSize: '20px',
                      },
                      '@media (max-width: 600px)': {
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                      },
                    }}
                  >
                    Email:&nbsp;&nbsp;
                    <a href={`mailto: marius.hupperz@isst.fraunhofer.de`}>
                      marius.hupperz@isst.fraunhofer.de
                    </a>
                    <br />
                    Tel.: &nbsp;&nbsp;&nbsp;&nbsp;+49 231 97677-428
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* </Slide> */}
          </Grid>
          <Grid
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
            overflow='hidden'
          >
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
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default AboutSection7;
