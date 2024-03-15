import React, { useEffect, useState, useRef } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Slide from '@mui/material/Slide';

const AboutSection1 = () => {
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
            ref={sectionRef}
            item
            direction='column'
            container
            justifyContent='flex-start'
            alignItems={isMobile ? 'center' : isTablet ? 'center' : 'center'}
          >
            <Slide direction='left' in={isMobile ? true : animationPlayed} timeout={1000}>
              <Box
                sx={{
                  backgroundImage: 'url(./MDSxNRWLogo1.svg)',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: isMobile ? 300 : isTablet ? 350 : 530,
                  height: isMobile ? '80px' : isTablet ? '120px' : '140px',
                  width: isMobile ? '300px' : isTablet ? '350px' : '530px',
                  marginTop: isMobile ? '-130px' : isTablet ? '-40px' : '100px',
                }}
              ></Box>
            </Slide>
          </Grid>
          <Grid
            item
            flexDirection='column'
            container
            justifyContent={isMobile ? 'center' : isTablet ? 'flex-end' : 'center'}
            alignItems='center'
            ref={sectionRef}
            marginTop={isMobile ? '-100px' : ''}
          >
            <Slide direction='right' in={isMobile ? true : animationPlayed} timeout={1000}>
              <Grid
                sx={{ width: isMobile ? 320 : isTablet ? 650 : 1200, height: isMobile ? 770 : 700 }}
              >
                <CardContent>
                  <Typography
                    gutterBottom
                    variant={isMobile ? 'h6' : 'h5'}
                    component='div'
                    textAlign='center'
                  >
                    Passgenaue Connectoren für die Mobilität von Morgen
                    <br />
                    <br />
                  </Typography>
                  <Typography
                    variant={isMobile ? 'subtitle2' : isTablet ? 'body1' : 'h6'}
                    color='text.secondary'
                    textAlign={isMobile ? 'left' : 'left'}
                    /* style={{ textAlign: 'justify', textJustify: 'inter-word' }} */
                  >
                    Um die Suche nach dem perfekten Connector und die Anbindung an den Mobility Data
                    Space so einfach wie möglich zu gestalten, wurde MDSxNRW ins Leben gerufen.
                    <br />
                    <br />
                    Unsere Recommendation Engine findet auf Grundlage Ihrer Unternehmensangaben die
                    passgenaue Connectorlösung, die Sie die Mobilität von Morgen mitgestalten lässt.
                    <br />
                    <br />
                    Unser Ziel ist es Ihnen den Weg zum Mobility Data Space so einfach wie möglich
                    zu bereiten. Wir schlagen Ihnen passende Connectoren vor und bieten Anleitung
                    zur Einrichtung des Connectors oder automatisieren diesen Prozess.
                  </Typography>
                </CardContent>
              </Grid>
            </Slide>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};
export default AboutSection1;
