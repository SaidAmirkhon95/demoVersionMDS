import React, { useEffect, useState, useRef } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Slide from '@mui/material/Slide';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../LanguageContext';
import translationFunction from 'translationFunction';

const Section1 = () => {
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
  const { isDeutsch } = useLanguage();

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
      <div
        id='section1'
        style={{ overflow: isMobile ? '' : 'hidden', maxWidth: '2000px', margin: '0 auto' }}
      >
        <Grid
          container
          spacing={8}
          display='flex'
          flexDirection={isMobile ? 'column' : 'row'}
          justifyContent='center'
          alignContent='center'
          marginTop={isMobile ? '100px' : isTablet ? '100px' : '150px'}
        >
          <Grid
            ref={sectionRef}
            item
            xs={isMobile ? 12 : isTablet ? 5 : 12}
            md={5}
            container
            flexDirection='column'
            justifyContent='flex-start'
            alignItems={isMobile ? 'center' : isTablet ? 'center' : 'flex-end'}
            marginRight={isMobile ? 0 : isTablet ? 0 : '20px'}
          >
            <Slide direction='right' in={isMobile ? true : animationPlayed} timeout={1000}>
              <Grid
                sx={{
                  width: isMobile ? 320 : isTablet ? 350 : 550,
                  height: isMobile ? 450 : isTablet ? 400 : 650,
                }}
              >
                <CardContent sx={{ paddingTop: isMobile ? '10px' : isTablet ? '0px' : '50px' }}>
                  <Typography
                    gutterBottom
                    variant={isMobile ? 'h6' : isTablet ? 'h4' : 'h4'}
                    component='div'
                    textAlign='center'
                  >
                    {isDeutsch
                      ? translationFunction().deutschTranslations.wasIstMDX
                      : translationFunction().englishTranslations.wasIstMDX}
                    <br />
                  </Typography>
                  <Typography
                    variant={isMobile ? 'subtitle2' : isTablet ? 'body2' : 'h6'}
                    color='text.secondary'
                    textAlign='center'
                  >
                    <h4>
                      {isDeutsch
                        ? translationFunction().deutschTranslations.datensouveränität
                        : translationFunction().englishTranslations.datensouveränität}
                    </h4>
                    <br />
                    {isDeutsch
                      ? translationFunction().deutschTranslations.section1Absatz1
                      : translationFunction().englishTranslations.section1Absatz1}
                    <br />
                    <br />
                    {isDeutsch
                      ? translationFunction().deutschTranslations.section1Absatz2
                      : translationFunction().englishTranslations.section1Absatz2}
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
          <Grid ref={sectionRef} item xs={isMobile ? 12 : isTablet ? 6 : 12} md={6}>
            <Slide direction='left' in={isMobile ? true : animationPlayed} timeout={1000}>
              <Grid
                container
                direction='column'
                justifyContent='center'
                alignItems={isMobile ? 'center' : isTablet ? 'center' : 'flex-end'}
                gap='50px'
                marginLeft={isMobile ? 0 : isTablet ? 0 : '-180px'}
              >
                <Grid>
                  <Typography
                    variant={isMobile ? 'h6' : isTablet ? 'h5' : 'h5'}
                    component='h4'
                    sx={{ color: 'black', ml: isMobile ? '25%' : isTablet ? '25%' : '200px' }}
                  >
                    {isDeutsch
                      ? translationFunction().deutschTranslations.netzwerkPartner
                      : translationFunction().englishTranslations.netzwerkPartner}
                  </Typography>
                  <Box
                    sx={{
                      width: isMobile ? 320 : isTablet ? 380 : 600,
                      height: isMobile ? 125 : isTablet ? 130 : 200,
                      mt: '20px',
                      borderRadius: '20px',
                      background: isMobile
                        ? 'url(./logo_MDS_black.svg) 25%, url(./FraunhoferISST.png) 75%'
                        : isTablet
                        ? 'url(./logo_MDS_black.svg) 30%, url(./FraunhoferISST.png) 85%'
                        : 'url(./logo_MDS_black.svg) 25%, url(./FraunhoferISST.png) 85%',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: isMobile ? '30%, 35%' : isTablet ? '30%, 35%' : '35%, 40%',
                      backgroundColor: '#f5f7f7',
                      ' &:hover': {
                        opacity: 1,
                      },
                    }}
                  ></Box>
                </Grid>
                <Grid marginTop={isMobile ? '' : isTablet ? '' : '120px'}>
                  <Typography
                    variant={isMobile ? 'h6' : isTablet ? 'h5' : 'h5'}
                    component='h4'
                    sx={{ color: 'black', ml: isMobile ? '80px' : '100px' }}
                  >
                    {isDeutsch
                      ? translationFunction().deutschTranslations.gefördertDurch
                      : translationFunction().englishTranslations.gefördertDurch}
                  </Typography>
                  <Card
                    sx={{
                      width: isMobile ? 320 : isTablet ? 350 : 405,
                      height: isMobile ? 95 : 120,
                    }}
                  >
                    <CardMedia
                      sx={{
                        height: isMobile ? 95 : 100,
                        backgroundSize: isMobile ? '70%' : '90%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      image='./image1.svg'
                    />
                  </Card>
                </Grid>
              </Grid>
            </Slide>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default Section1;
