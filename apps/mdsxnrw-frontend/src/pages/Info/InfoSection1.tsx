import React, { useEffect, useState, useRef } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import Slide from '@mui/material/Slide';
import { Link as ScrollLink } from 'react-scroll';
import { useLanguage } from '../../LanguageContext';
import translationFunction from 'translationFunction';

const InfoSection1 = () => {
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
          marginTop={isMobile ? '70px' : isTablet ? '50px' : ''}
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
                    variant={isMobile ? 'subtitle2' : isTablet ? 'body1' : 'h6'}
                    color='text.secondary'
                    textAlign={isMobile ? 'left' : 'left'}
                    /* style={{ textAlign: 'justify', textJustify: 'inter-word' }} */
                  >
                    <br />
                    {isDeutsch
                      ? translationFunction().deutschTranslations.infoSection11
                      : translationFunction().englishTranslations.infoSection11}
                    &nbsp;
                    <ScrollLink
                      to='section-one'
                      smooth={true}
                      duration={500}
                      offset={-100}
                      style={{
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        /* paddingLeft: '5px',
                        paddingRight: '5px', */
                      }}
                      activeStyle={{
                        fontWeight: 'bold',
                      }}
                    >
                      {isDeutsch
                        ? translationFunction().deutschTranslations.infoSection12
                        : translationFunction().englishTranslations.infoSection12}
                    </ScrollLink>
                    &nbsp;
                    {isDeutsch
                      ? translationFunction().deutschTranslations.infoSection13
                      : translationFunction().englishTranslations.infoSection13}
                    <br />
                    <br />
                    {isDeutsch
                      ? translationFunction().deutschTranslations.infoSection14
                      : translationFunction().englishTranslations.infoSection14}
                    &nbsp;
                    <ScrollLink
                      to='section-two'
                      smooth={true}
                      duration={500}
                      offset={-100}
                      style={{
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                      activeStyle={{
                        fontWeight: 'bold',
                      }}
                    >
                      {isDeutsch
                        ? translationFunction().deutschTranslations.infoSection15
                        : translationFunction().englishTranslations.infoSection15}
                    </ScrollLink>
                    &nbsp;
                    {isDeutsch
                      ? translationFunction().deutschTranslations.infoSection16
                      : translationFunction().englishTranslations.infoSection16}
                    &nbsp;
                    <ScrollLink
                      to='section-five'
                      smooth={true}
                      duration={500}
                      offset={-100}
                      style={{
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                      activeStyle={{
                        fontWeight: 'bold',
                      }}
                    >
                      Mobility Data Space
                    </ScrollLink>
                    &nbsp;
                    {isDeutsch
                      ? translationFunction().deutschTranslations.infoSection17
                      : translationFunction().englishTranslations.infoSection17}
                    &nbsp;
                    <ScrollLink
                      to='section-six'
                      smooth={true}
                      duration={500}
                      offset={-100}
                      style={{
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                      activeStyle={{
                        fontWeight: 'bold',
                      }}
                    >
                      {isDeutsch
                        ? translationFunction().deutschTranslations.infoSection18
                        : translationFunction().englishTranslations.infoSection18}
                    </ScrollLink>
                    &nbsp;
                    {isDeutsch
                      ? translationFunction().deutschTranslations.infoSection19
                      : translationFunction().englishTranslations.infoSection19}
                    <br />
                    <br />
                    {isDeutsch
                      ? translationFunction().deutschTranslations.infoSection110
                      : translationFunction().englishTranslations.infoSection110}
                    <br />
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
export default InfoSection1;
