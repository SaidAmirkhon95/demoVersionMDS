import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Impressum from './Impressum';
import Kontakt from './Kontakt';
import PrivacyText from './PrivacyText';
import DataVisualizationThree from '../../components/Pictures/DataVisualizationThree.png';
import { useLanguage } from '../../LanguageContext';
import translationFunction from 'translationFunction';

const ImpressumText = () => {
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
    <Grid id='impressum' style={{ overflow: 'hidden', maxWidth: '2000px', margin: '0 auto' }}>
      <header style={{ width: '100%', height: '100%', position: 'relative' }}>
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
          marginLeft='12%'
          marginTop={isMobile ? '-2%' : isTablet ? '-5%' : '-10%'}
          marginBottom={isMobile ? '20px' : '40px'}
        >
          <Typography variant={isMobile ? 'subtitle1' : isTablet ? 'h5' : 'h4'}>
            <h1 style={{ color: '#005B7F' }}>
              {isDeutsch
                ? translationFunction().deutschTranslations.impressum
                : translationFunction().englishTranslations.impressum}
            </h1>
          </Typography>
        </Grid>
      </header>
      <br />
      <body>
        <Typography
          variant='body1'
          style={{
            width: '76%',
            marginLeft: '12%',
            marginRight: '12%',
            textAlign: 'justify',
            textJustify: 'inter-word',
          }}
        >
          {isDeutsch
            ? translationFunction().deutschTranslations.impressum1
            : translationFunction().englishTranslations.impressum1}
          <br />
          Internet: www.fraunhofer.de
          <br />
          E-Mail:&nbsp; <a href={`mailto: info@zv.fraunhofer.de`}>info@zv.fraunhofer.de</a>
          <br />
          <p>
            <Typography variant={isMobile ? 'h5' : 'h4'}>
              {isDeutsch
                ? translationFunction().deutschTranslations.verantwortlicherRedakteur
                : translationFunction().englishTranslations.verantwortlicherRedakteur}
            </Typography>
            <br />
            {isDeutsch
              ? translationFunction().deutschTranslations.impressum2
              : translationFunction().englishTranslations.impressum2}
            <br />
          </p>
          <p>
            <Typography variant={isMobile ? 'h5' : 'h4'}>
              {isDeutsch
                ? translationFunction().deutschTranslations.vorstand
                : translationFunction().englishTranslations.vorstand}
            </Typography>
            <br />
            Prof. Dr.-Ing. Reimund Neugebauer |
            {isDeutsch
              ? translationFunction().deutschTranslations.präsident
              : translationFunction().englishTranslations.präsident}
            <br />
            Prof. Dr. Alexander Kurz |
            {isDeutsch
              ? translationFunction().deutschTranslations.mitgliedVorstand
              : translationFunction().englishTranslations.mitgliedVorstand}
          </p>
          <p>
            <Typography variant={isMobile ? 'h5' : 'h4'}>
              {isDeutsch
                ? translationFunction().deutschTranslations.nutzungsrechte
                : translationFunction().englishTranslations.nutzungsrechte}
            </Typography>
            <br />
            {isDeutsch
              ? translationFunction().deutschTranslations.impressum3
              : translationFunction().englishTranslations.impressum3}
            <br />
            {isDeutsch
              ? translationFunction().deutschTranslations.anfragen
              : translationFunction().englishTranslations.anfragen}
            <br />
            {isDeutsch
              ? translationFunction().deutschTranslations.isst
              : translationFunction().englishTranslations.isst}
            <br />
            Speicherstraße 6, 44147 Dortmund.
            <br />
            {isDeutsch
              ? translationFunction().deutschTranslations.impressum4
              : translationFunction().englishTranslations.impressum4}
            <br />
            {isDeutsch
              ? translationFunction().deutschTranslations.impressum5
              : translationFunction().englishTranslations.impressum5}
          </p>
          <Typography variant={isMobile ? 'h5' : 'h4'}>
            {isDeutsch
              ? translationFunction().deutschTranslations.haftungshinweis
              : translationFunction().englishTranslations.haftungshinweis}
          </Typography>
          <br />
          {isDeutsch
            ? translationFunction().deutschTranslations.impressum6
            : translationFunction().englishTranslations.impressum6}
          <br />
        </Typography>
      </body>
      <br />
      <footer style={{ marginBottom: '20px' }}>
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
      </footer>
    </Grid>
  );
};

export default ImpressumText;
