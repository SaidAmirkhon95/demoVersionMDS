import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';
import Impressum from './Impressum';
import Kontakt from './Kontakt';
import PrivacyText from './PrivacyText';
import Grid from '@mui/material/Grid';
import Marcel from '../../components/Pictures/Marcel.jpg';
import Marius from '../../components/Pictures/Marius.jpg';
import DataVisualizationThree from '../../components/Pictures/DataVisualizationThree.png';
import { useLanguage } from '../../LanguageContext';
import translationFunction from 'translationFunction';

const KontaktInfo = () => {
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
  return (
    <Grid id='kontaktinfo' style={{ overflow: 'hidden', maxWidth: '2000px', margin: '0 auto' }}>
      <header>
        <img
          src={DataVisualizationThree}
          alt='DataVisualization'
          width='100%'
          height='100%'
          style={{ marginTop: '-28%' }}
        />
        <Grid
          container
          spacing={2}
          direction='column'
          justifyContent='flex-start'
          alignItems='flex-start'
          paddingLeft={isMobile ? '5%' : '10vw'}
          marginTop={isMobile ? '-10vw' : '-10%'}
          marginBottom={isMobile ? '20px' : '80px'}
        >
          <Grid item xs={12} sm={6}>
            <Typography variant={isMobile ? 'h5' : 'h4'}>
              <h1 style={{ color: '#005B7F' }}>
                {isDeutsch
                  ? translationFunction().deutschTranslations.kontakt
                  : translationFunction().englishTranslations.kontakt}
              </h1>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant={isMobile ? 'subtitle1' : 'h5'}>
              {isDeutsch
                ? translationFunction().deutschTranslations.kontaktFragen
                : translationFunction().englishTranslations.kontaktFragen}
            </Typography>
          </Grid>
        </Grid>
      </header>
      <body>
        <Grid
          container
          direction={isMobile ? 'column' : isTablet ? 'column' : 'row'}
          justifyContent='center'
          spacing={6}
        >
          <Grid item xs={12} sm={6}>
            <Grid
              container
              direction='row'
              justifyContent='center'
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
          <Grid item xs={12} sm={6}>
            <Grid
              container
              direction='row'
              justifyContent='center'
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
        </Grid>
      </body>
      <br />
      <footer>
        <Grid container direction='column' justifyContent='center' alignItems='flex-end'>
          <div style={{ marginBottom: '6rem' }}></div>
          <Grid container direction='row' justifyContent='center' alignItems='flex-end'>
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
      </footer>
    </Grid>
  );
};

export default KontaktInfo;
