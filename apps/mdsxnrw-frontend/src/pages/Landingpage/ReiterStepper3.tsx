import * as React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { useLanguage } from '../../LanguageContext';
import { useTableData } from '../../TableDataProvider';
import translationFunction from 'translationFunction';

const theme = createTheme({
  palette: {
    primary: {
      light: '#005B7F',
      main: '#11998E',
      dark: '#005946',
      contrastText: '#fff',
    },
  },
});

export default function ReiterStepper3() {
  const { isDeutsch } = useLanguage();
  const { tableData } = useTableData();

  //Mobile and Tablet Views
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

  const [isTablet, setIsTablet] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth < 900);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <React.Fragment>
      <div style={{ overflow: 'hidden', maxWidth: '2000px', margin: '0 auto' }}>
        <div
          style={{
            flexGrow: '15',
            padding: '0px',
            marginRight: '0px',
          }}
        >
          {isDeutsch ? (
            <Typography variant={isMobile ? 'subtitle2' : 'h6'} gutterBottom align='center'>
              <br />
              Sollte sich ihr E-Mail-Programm nicht automatisch öffnen, senden Sie bitte eine Mail
              mit dem Betreff &quot;Connector Onboarding&quot; an&nbsp;
              <br />
              <a href={`mailto: marcel.altendeitering@isst.fraunhofer.de`}>
                marcel.altendeitering@isst.fraunhofer.de
              </a>
              &nbsp;und&nbsp;
              <a href={`mailto: marius.hupperz@isst.fraunhofer.de`}>
                marius.hupperz@isst.fraunhofer.de
              </a>
              <br />
              &nbsp;und fügen Sie bitte unten stehende Tabelle als Text hinzu.
            </Typography>
          ) : (
            <Typography variant={isMobile ? 'subtitle2' : 'h6'} gutterBottom align='center'>
              <br />
              If your email program does not open automatically, please send an email with the
              subject &quot;Connector Onboarding&quot; to
              <br />
              <a href={`mailto: marcel.altendeitering@isst.fraunhofer.de`}>
                marcel.altendeitering@isst.fraunhofer.de
              </a>
              &nbsp;und&nbsp;
              <a href={`mailto: marius.hupperz@isst.fraunhofer.de`}>
                marius.hupperz@isst.fraunhofer.de
              </a>
              <br />
              &nbsp;and please add the table below as text.
            </Typography>
          )}
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: isMobile ? 300 : 700 }} size='small' aria-label='a dense table'>
            <TableBody>
              <TableRow>
                <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                  {isDeutsch
                    ? translationFunction().deutschTranslations.stepper13
                    : translationFunction().englishTranslations.stepper13}
                </TableCell>
                <TableCell style={{ borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                  {tableData.company}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                  {isDeutsch
                    ? translationFunction().deutschTranslations.stepper16
                    : translationFunction().englishTranslations.stepper16}
                </TableCell>
                <TableCell style={{ borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                  {tableData.ort}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                  {isDeutsch
                    ? translationFunction().deutschTranslations.stepper17
                    : translationFunction().englishTranslations.stepper17}
                </TableCell>
                <TableCell style={{ borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                  {tableData.plz}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ borderLeft: '1px solid #ccc' }}>Land</TableCell>
                <TableCell style={{ borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                  {tableData.land}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                  {isDeutsch
                    ? translationFunction().deutschTranslations.stepper110
                    : translationFunction().englishTranslations.stepper110}
                </TableCell>
                <TableCell style={{ borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                  {tableData.vorname}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                  {isDeutsch
                    ? translationFunction().deutschTranslations.stepper111
                    : translationFunction().englishTranslations.stepper111}
                </TableCell>
                <TableCell style={{ borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                  {tableData.nachname}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                  {isDeutsch
                    ? translationFunction().deutschTranslations.stepper112
                    : translationFunction().englishTranslations.stepper112}
                </TableCell>
                <TableCell style={{ borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                  {tableData.email}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ borderLeft: '1px solid #ccc' }}>Connector Name</TableCell>
                <TableCell style={{ borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                  {tableData.connectorName}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                  {isDeutsch
                    ? translationFunction().deutschTranslations.connectorTyp
                    : translationFunction().englishTranslations.connectorTyp}
                </TableCell>
                <TableCell style={{ borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                  {tableData.connectorTyp}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                  {isDeutsch
                    ? translationFunction().deutschTranslations.dauerEinführung
                    : translationFunction().englishTranslations.dauerEinführung}
                </TableCell>
                <TableCell style={{ borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                  {tableData.dauer}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ borderLeft: '1px solid #ccc' }}>FTE</TableCell>
                <TableCell style={{ borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                  {tableData.fte}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                  {isDeutsch
                    ? translationFunction().deutschTranslations.guiVorhanden
                    : translationFunction().englishTranslations.guiVorhanden}
                </TableCell>
                <TableCell style={{ borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                  {tableData.gui}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                  {isDeutsch
                    ? translationFunction().deutschTranslations.mdsGuiMöglich
                    : translationFunction().englishTranslations.mdsGuiMöglich}
                </TableCell>
                <TableCell style={{ borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                  {tableData.mdsGui}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                  {isDeutsch
                    ? translationFunction().deutschTranslations.cloudAnbieterGebunden
                    : translationFunction().englishTranslations.cloudAnbieterGebunden}
                </TableCell>
                <TableCell style={{ borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                  {tableData.cloudAnbieter}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ borderLeft: '1px solid #ccc' }}>Cloud</TableCell>
                <TableCell style={{ borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                  {tableData.cloud}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ borderLeft: '1px solid #ccc' }}>IT-Know-how</TableCell>
                <TableCell style={{ borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                  {tableData.itKnowHow}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                  {isDeutsch
                    ? translationFunction().deutschTranslations.oDRLbasierend
                    : translationFunction().englishTranslations.oDRLbasierend}
                </TableCell>
                <TableCell style={{ borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                  {tableData.odrl}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ borderLeft: '1px solid #ccc' }}>Open Source</TableCell>
                <TableCell style={{ borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                  {tableData.openSource}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ borderLeft: '1px solid #ccc' }}>Service-Level</TableCell>
                <TableCell style={{ borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                  {tableData.serviceLevel}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ borderLeft: '1px solid #ccc' }}>Deployment Type</TableCell>
                <TableCell style={{ borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                  {tableData.deployment}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </React.Fragment>
  );
}
