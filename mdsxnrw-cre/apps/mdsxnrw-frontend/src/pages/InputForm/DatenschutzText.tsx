import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import Impressum from './Impressum';
import Kontakt from './Kontakt';
import PrivacyText from './PrivacyText';
import DataVisualizationThree from '../../components/Pictures/DataVisualizationThree.png';
import { useLanguage } from '../../LanguageContext';
import translationFunction from 'translationFunction';

const DatenschutzText = () => {
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
    <Grid id='datenschutz' style={{ overflow: 'hidden', maxWidth: '2000px', margin: '0 auto' }}>
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
          marginBottom={isMobile ? '20px' : '80px'}
        >
          <Typography variant={isMobile ? 'subtitle2' : isTablet ? 'h5' : 'h4'}>
            <h1 style={{ color: '#005B7F' }}>
              {isDeutsch
                ? translationFunction().deutschTranslations.datenschutzerklärung
                : translationFunction().englishTranslations.datenschutzerklärung}
            </h1>
          </Typography>
        </Grid>
      </header>
      <body>
        <Typography
          id='dazenschutz'
          variant='body1'
          style={{
            width: '76%',
            paddingLeft: '12%',
          }}
        >
          <div>
            <Typography variant={isMobile ? 'h6' : 'h4'}>
              {isDeutsch
                ? translationFunction().deutschTranslations.datenschutzinformation
                : translationFunction().englishTranslations.datenschutzinformation}
            </Typography>
            <br />
            <Typography style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
              {isDeutsch
                ? translationFunction().deutschTranslations.datenschutz1
                : translationFunction().englishTranslations.datenschutz1}
            </Typography>
          </div>
          <Typography variant='body1' style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
            <ol>
              <li>
                {isDeutsch
                  ? translationFunction().deutschTranslations.datenschutzList1
                  : translationFunction().englishTranslations.datenschutzList1}
              </li>
              <li>
                {isDeutsch
                  ? translationFunction().deutschTranslations.datenschutzList2
                  : translationFunction().englishTranslations.datenschutzList2}
              </li>
              <li>
                {isDeutsch
                  ? translationFunction().deutschTranslations.datenschutzList3
                  : translationFunction().englishTranslations.datenschutzList3}
              </li>
              <li>
                {isDeutsch
                  ? translationFunction().deutschTranslations.datenschutzList4
                  : translationFunction().englishTranslations.datenschutzList4}
              </li>
              <li>Cookies</li>
              <li>
                {isDeutsch
                  ? translationFunction().deutschTranslations.datenschutzList6
                  : translationFunction().englishTranslations.datenschutzList6}
              </li>
              <li>
                {isDeutsch
                  ? translationFunction().deutschTranslations.datenschutzList7
                  : translationFunction().englishTranslations.datenschutzList7}
              </li>
              <li>
                {isDeutsch
                  ? translationFunction().deutschTranslations.datenschutzList8
                  : translationFunction().englishTranslations.datenschutzList8}
              </li>
            </ol>
          </Typography>
          <Typography variant={isMobile ? 'h5' : 'h4'}>
            1.
            {isDeutsch
              ? translationFunction().deutschTranslations.datenschutzList1
              : translationFunction().englishTranslations.datenschutzList1}
          </Typography>
          <Typography style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
            {isDeutsch
              ? translationFunction().deutschTranslations.datenschutzList1Content
              : translationFunction().englishTranslations.datenschutzList1Content}
          </Typography>
          <br />
          <Typography variant={isMobile ? 'h5' : 'h4'}>
            2.
            {isDeutsch
              ? translationFunction().deutschTranslations.datenschutzList2
              : translationFunction().englishTranslations.datenschutzList2}
          </Typography>
          <Typography style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
            <text>
              {isDeutsch
                ? translationFunction().deutschTranslations.datenschutzList2Content1
                : translationFunction().englishTranslations.datenschutzList2Content1}
            </text>
            <br />
            <text>
              {isDeutsch
                ? translationFunction().deutschTranslations.datenschutzList2Content2
                : translationFunction().englishTranslations.datenschutzList2Content2}
            </text>
            <br />
            <text>Hansastraße 27 c</text>
            <br />
            <text>80686 München</text>
            <br />
            <br />
            <text>
              {isDeutsch
                ? translationFunction().deutschTranslations.datenschutzList2Content3
                : translationFunction().englishTranslations.datenschutzList2Content3}
            </text>
            <br />
            <text>Speicherstraße 6</text>
            <br />
            <text>44147 Dortmund</text>
            <br />
            <text>
              (
              {isDeutsch
                ? translationFunction().deutschTranslations.datenschutzList2Content4
                : translationFunction().englishTranslations.datenschutzList2Content4}
              )
            </text>
            <br />
            <br />
            <text>
              E-Mail:&nbsp;
              <a href={`mailto: datenschutz@zv.fraunhofer.de`}>datenschutz@zv.fraunhofer.de</a>
            </text>
            <br />
            <text>Telefon: 0231-97677-0</text>
            <br />
            <text>Fax: 0231-9 76 77 - 1 99</text>
          </Typography>
          <Typography style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
            {isDeutsch
              ? translationFunction().deutschTranslations.datenschutzList2Content5
              : translationFunction().englishTranslations.datenschutzList2Content5}
            &nbsp;
            <a href={`mailto: datenschutz@zv.fraunhofer.de`}>datenschutz@zv.fraunhofer.de</a>&nbsp;
            {isDeutsch
              ? translationFunction().deutschTranslations.datenschutzList2Content6
              : translationFunction().englishTranslations.datenschutzList2Content6}
          </Typography>
          <br />
          <Typography variant={isMobile ? 'h5' : 'h4'}>
            3.
            {isDeutsch
              ? translationFunction().deutschTranslations.datenschutzList3
              : translationFunction().englishTranslations.datenschutzList3}
          </Typography>
          <h3>
            {isDeutsch
              ? translationFunction().deutschTranslations.datenschutzList3Content1
              : translationFunction().englishTranslations.datenschutzList3Content1}
          </h3>
          <Typography style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
            {isDeutsch
              ? translationFunction().deutschTranslations.datenschutzList3Content2
              : translationFunction().englishTranslations.datenschutzList3Content2}
          </Typography>
          <br />
          <Typography variant={isMobile ? 'h5' : 'h4'}>
            4.
            {isDeutsch
              ? translationFunction().deutschTranslations.datenschutzList4
              : translationFunction().englishTranslations.datenschutzList4}
          </Typography>
          <Typography style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
            {isDeutsch
              ? translationFunction().deutschTranslations.datenschutzList4Content1
              : translationFunction().englishTranslations.datenschutzList4Content1}
          </Typography>
          <br />
          <Typography variant={isMobile ? 'h5' : 'h4'}>5.Cookies</Typography>
          <Typography style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
            {isDeutsch
              ? translationFunction().deutschTranslations.datenschutzList5Content1
              : translationFunction().englishTranslations.datenschutzList5Content1}
          </Typography>
          <br />
          <Typography variant={isMobile ? 'h5' : 'h4'}>
            6.
            {isDeutsch
              ? translationFunction().deutschTranslations.datenschutzList6
              : translationFunction().englishTranslations.datenschutzList6}
          </Typography>
          {isDeutsch
            ? translationFunction().deutschTranslations.datenschutzList6Content1
            : translationFunction().englishTranslations.datenschutzList6Content1}
          <Typography style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
            <ul>
              <li>
                {isDeutsch
                  ? translationFunction().deutschTranslations.datenschutzList6Content2
                  : translationFunction().englishTranslations.datenschutzList6Content2}
              </li>
              <li>
                {isDeutsch
                  ? translationFunction().deutschTranslations.datenschutzList6Content3
                  : translationFunction().englishTranslations.datenschutzList6Content3}
              </li>
              <li>
                {isDeutsch
                  ? translationFunction().deutschTranslations.datenschutzList6Content4
                  : translationFunction().englishTranslations.datenschutzList6Content4}
              </li>
              <li>
                {isDeutsch
                  ? translationFunction().deutschTranslations.datenschutzList6Content5
                  : translationFunction().englishTranslations.datenschutzList6Content5}
              </li>
              <li>
                {isDeutsch
                  ? translationFunction().deutschTranslations.datenschutzList6Content6
                  : translationFunction().englishTranslations.datenschutzList6Content6}
              </li>
              <li>
                {isDeutsch
                  ? translationFunction().deutschTranslations.datenschutzList6Content7
                  : translationFunction().englishTranslations.datenschutzList6Content7}
              </li>
              <li>
                {isDeutsch
                  ? translationFunction().deutschTranslations.datenschutzList6Content8
                  : translationFunction().englishTranslations.datenschutzList6Content8}
              </li>
            </ul>
          </Typography>
          <Typography
            style={{
              textAlign: 'justify',
              textJustify: 'inter-word',
              border: '1px solid black',
              margin: '10px',
              padding: '5px',
            }}
          >
            <h4>
              {isDeutsch
                ? translationFunction().deutschTranslations.datenschutzList6Content9
                : translationFunction().englishTranslations.datenschutzList6Content9}
            </h4>
            <text>
              {isDeutsch
                ? translationFunction().deutschTranslations.datenschutzList6Content10
                : translationFunction().englishTranslations.datenschutzList6Content10}
              &nbsp;
              <a href={`mailto: datenschutzkoordination@zv.fraunhofer.de`}>
                datenschutzkoordination@zv.fraunhofer.de.
              </a>
            </text>
          </Typography>
          <br />
          <Typography variant={isMobile ? 'h5' : 'h4'}>
            7.
            {isDeutsch
              ? translationFunction().deutschTranslations.datenschutzList7
              : translationFunction().englishTranslations.datenschutzList7}
          </Typography>
          <Typography style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
            {isDeutsch
              ? translationFunction().deutschTranslations.datenschutzList7Content1
              : translationFunction().englishTranslations.datenschutzList7Content1}
          </Typography>
          <br />
          <Typography variant={isMobile ? 'h5' : 'h4'}>
            8.
            {isDeutsch
              ? translationFunction().deutschTranslations.datenschutzList8
              : translationFunction().englishTranslations.datenschutzList8}
          </Typography>
          <Typography style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
            {isDeutsch
              ? translationFunction().deutschTranslations.datenschutzList8Content1
              : translationFunction().englishTranslations.datenschutzList8Content1}
          </Typography>
        </Typography>
      </body>
      <br />
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

export default DatenschutzText;
