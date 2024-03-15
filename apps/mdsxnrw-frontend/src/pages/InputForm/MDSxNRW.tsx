import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stepper1 from './Stepper1';
import Stepper2 from './Stepper2';
import Stepper3 from './Stepper3';
import PrivacyText from '../InputForm/PrivacyText';
import Impressum from '../InputForm/Impressum';
import Kontakt from '../InputForm/Kontakt';
import jsPDF from 'jspdf';
import Box from '@mui/material/Box';
import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../../LanguageContext';
import translationFunction from 'translationFunction';
import { useMyContext } from '../../MyContext';
import { useData } from '../../DataContext';
import { useSortedData } from 'SortedDataProvider';

function Copyright() {
  return (
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
  );
}

const steps = ['Unternehmensinformationen', 'Kategorisierung', 'Empfehlung'];

const stepsObject = {
  stepsAufDeutsch: ['Unternehmensinformationen', 'Kategorisierung', 'Empfehlung'],
  stepsAufEnglisch: ['Company information', 'Category', 'Suggestion'],
};

function getStepContent(step: any) {
  switch (step) {
    case 0:
      return <Stepper1 />;
    case 1:
      return <Stepper2 />;
    case 2:
      return <Stepper3 />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme({
  palette: {
    primary: {
      light: '#005B7F',
      main: '#11998E',
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

export default function MDSxNRW() {
  const [activeStep, setActiveStep] = React.useState(0);
  const { updateResponseData } = useData();
  const hasSentDataRef = useRef(false);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const {
    aufwandOne,
    aufwandTwo,
    aufwandThree,
    aufwandFour,
    aufwandFive,
    aufwandSix,
    aufwandSeven,
    companyName,
    industrySector,
    companyType,
    companyLocation,
    companyZipcode,
    selectedCountry,
    contactFirstname,
    contactLastname,
    contactEmail,
    companyItExpertsFrom,
    companyItExpertsTo,
  } = useMyContext();

  //request
  const sendSelectedData = async () => {
    console.log('-------------------------------------------------------');
    try {
      const backendUri = process.env.REACT_APP_BACKEND_URL;
      console.log('Backend URI:', backendUri);
      if (!backendUri) {
        throw new Error('Backend URI not defined in environment variables');
      }

      const requestBody: any = {
        companySize: aufwandOne,
        companyItExpertsFrom: companyItExpertsFrom,
        companyItExpertsTo: companyItExpertsTo,
        companyItKnowhow: aufwandThree,
        dataspaceRoles: aufwandFour,
        dataAvailabilities: aufwandFive,
        companyType: companyType,
        companyLocation: companyLocation,
        companyZipcode: companyZipcode,
      };

      if (aufwandSeven) {
        requestBody.serviceLevel = aufwandSeven;
      }

      if (aufwandSix) {
        requestBody.usagePolicies = aufwandSix;
      }

      if (industrySector) {
        requestBody.companyIndustrySectors = industrySector;
      }

      console.log('Request Body:', requestBody);

      const response = await fetch(backendUri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text(); // Read the response body as text
        console.error('Failed to send data to the backend. Server response:', errorText);
        throw new Error('Failed to send data to the backend');
      }

      const responseDataString = await response.text(); // Read the response body as text
      const responseData = JSON.parse(responseDataString);
      updateResponseData(responseData);
      console.log('Response from backend:', responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (!hasSentDataRef.current) {
      sendSelectedData();
      hasSentDataRef.current = true;
    }
  }, [hasSentDataRef]);

  const { responseData } = useData();
  const { connectors, recommendationScores } = responseData || {};
  /* const Connectors = connectors || []; */
  const { sortedData: Connectors } = useSortedData();

  const downloadPDF = () => {
    const pdfDoc = new jsPDF('p', 'mm', 'a4');
    const pageHeight = pdfDoc.internal.pageSize.height;
    let currentY = 10;
    const startX = 15;
    const verticalSpacing = 5;
    pdfDoc.setFontSize(10);
    const defaultFontSize = 12;
    const tableFontSize = 10;
    const x = startX;
    const imgWidth = 40;
    const imgHeight = 40;
    const iconWidth = 4;
    const iconHeight = 4;
    const tableWidth = 90;
    const cellWidth = tableWidth;
    const cellHeight = 5;
    type ConnectorImages = {
      [key: string]: string;
    };
    const connectorImages: ConnectorImages = {
      'Eclipse Dataspace Components Connector': 'eclipse.png',
      'sovity Connector': 'sovity.png',
      'Data Intelligence Hub Connector': 't-mobile.png',
      'Intel IONOS Orbiter Connector': 'truzzt.jpeg',
      'AI.SOV Connector': 'cefriel.png',
      'Boot-X Connector': 'huawei.svg.png',
      'ECI Gatewise IDS Connector powered by TNO': 'eci.jpg',
      'EdgeDS Connector': 'INTRACOM.png',
      'EGI DataHub Connector': 'egi.png',
      'FIWARE Data Space Connector': 'fiware.png',
      'GATE Dataspace Connector': 'gate.jpeg',
      'GDSO Connector - Tyre Information Service': 'gdso.png',
      'Kharon IDS Connector powered by the Dataspace Connector': 'holonix.png',
      'Mitsubishi Electric Dataspace Connector': 'Mitsubishi.png',
      'OneNet Connector': 'onenet.png',
      'Tech2B SCSN Connector': 'tech2b.jpg',
      'TNO Security Gateway (TSG)': 'tno.jpg',
      'Tritom Enterprise Connector': 'Tritom.png',
      'TRUE Connector': 'eng.png',
      'Trusted Supplier Connector': 'edge.jpg',
    };
    pdfDoc.setFontSize(defaultFontSize);
    pdfDoc.text('Ihre Angaben', startX, currentY);
    currentY += 5;
    //daten von Stepper2
    const angabenTable = [
      [
        'Unternehmensgröße',
        aufwandOne === 'microenterprise'
          ? isDeutsch
            ? 'Kleinstunternehmen'
            : 'Micro-Enterprise'
          : aufwandOne === 'small_business'
          ? isDeutsch
            ? 'Kleines Unternehmen'
            : 'Small Business'
          : aufwandOne === 'medium_business'
          ? isDeutsch
            ? 'Mittleres Unternehmen'
            : 'Medium Company'
          : aufwandOne === 'large_business'
          ? isDeutsch
            ? 'Großunternehmen'
            : 'Large Companies'
          : 'Start-Up',
      ],
      ['Beschäftigte IT-Experten', aufwandTwo],
      [
        'IT-Know-How',
        aufwandThree === 'low'
          ? isDeutsch
            ? 'Niedrig'
            : 'Low'
          : aufwandThree === 'medium'
          ? isDeutsch
            ? 'Mittel'
            : 'Medium'
          : aufwandThree === 'high'
          ? isDeutsch
            ? 'Hoch'
            : 'High'
          : '',
      ],
      [
        'Rolle im Dataspace',
        [
          ...(aufwandFour.includes('data_provider')
            ? [isDeutsch ? 'Datengeber (Datenquelle)' : 'Data supplier (Data source)']
            : []),
          ...(aufwandFour.includes('data_consumer')
            ? [isDeutsch ? 'Datennehmer (Datenkonsument)' : 'Data client (Data consumer)']
            : []),
          ...(isDeutsch
            ? ['Service Provider (Bereitstellung von Services im MDS)']
            : ['Service Provider (provision of services in the MDS)']),
        ].join(', '),
      ],
      [
        'Verfügbarkeit der Daten',
        [
          ...(aufwandFive.includes('api') ? ['API (e.g. HTTP, Rest)'] : []),
          ...(aufwandFive.includes('data_file') ? ['Data (e.g. Excel, Word, PDF)'] : []),
          ...(aufwandFive.includes('ftp') ? ['FTP Server'] : []),
          ...(aufwandFive.includes('realtime')
            ? ['Real Time via Message Bus (e.g. Kafka, RabbitMQ)']
            : []),
          ...(aufwandFive.includes('others') ? ['Others'] : []),
        ].join(', '),
      ],
      [
        'Datennutzungsbediengungen (Usage Policies)',
        aufwandSix === 'standard'
          ? isDeutsch
            ? 'Standardnutzungsbedingungen'
            : 'Standard Terms of Use'
          : isDeutsch
          ? 'Spezielle Nutzungsbedingungen'
          : 'Special Terms of Use',
      ],
      [
        'Service Level',
        [
          ...(aufwandSeven.includes('caas') ? ['Caas'] : []),
          ...(aufwandSeven.includes('paas') ? ['Paas'] : []),
          ...(aufwandSeven.includes('self_service') ? ['Self Service'] : []),
        ].join(', '),
      ],
    ];
    pdfDoc.setFontSize(tableFontSize);
    angabenTable.forEach((row, rowIndex) => {
      const maxCellWidth = cellWidth - 2;
      let rowHeight = 0;
      const cellSpacing = 1;

      row.forEach((cell, colIndex) => {
        const cellText = cell.toString();
        const textLines = pdfDoc.splitTextToSize(cellText, maxCellWidth, { splitBy: 'auto' });
        const cellLinesHeight = textLines.length * (tableFontSize - cellSpacing);

        if (cellLinesHeight > rowHeight) {
          rowHeight = cellLinesHeight - 4;
        }
      });

      row.forEach((cell, colIndex) => {
        const cellX = x + colIndex * cellWidth;
        const cellText = cell.toString();
        const textLines = pdfDoc.splitTextToSize(cellText, maxCellWidth, { splitBy: 'auto' });
        const cellLinesHeight = textLines.length * tableFontSize;
        const cellY = currentY;
        const textY = cellY + (rowHeight - cellLinesHeight) / 2;
        textLines.forEach((line: any, lineIndex: any) => {
          const adjustedTextY = textY + (tableFontSize - cellSpacing - 4) * lineIndex + 6;
          pdfDoc.text(line, cellX + 1, adjustedTextY);
        });

        pdfDoc.rect(cellX, cellY, cellWidth, rowHeight);
      });

      currentY += rowHeight;
    });
    currentY += 10;
    pdfDoc.setFontSize(defaultFontSize);
    pdfDoc.text('Ihre Connector Empfehlungen', startX, currentY);
    currentY = 10;
    let count = 1;
    const containerWidth = 30;
    const containerHeight = 30;
    pdfDoc.addPage('a4');
    Connectors.slice(0, 5).forEach((connector: any, index: any) => {
      pdfDoc.setFontSize(defaultFontSize);
      const imgData = new Image();
      /* imgData.onload = function () {
        let scaleX = 1;
        let scaleY = 1;

        if (imgData.width > imgWidth) {
          scaleX = imgWidth / imgData.width;
        }
        if (imgData.height > imgHeight) {
          scaleY = imgHeight / imgData.height;
        }

        const scale = Math.min(scaleX, scaleY);

        pdfDoc.addImage(
          imgData,
          'JPEG',
          x,
          currentY,
          imgData.width * scale,
          imgData.height * scale,
        );
      }; */
      imgData.onload = function () {
        // Calculate scaling factors to fit the image within the container
        const scaleX = containerWidth / imgData.width;
        const scaleY = containerHeight / imgData.height;

        const scale = Math.min(scaleX, scaleY);

        const scaledWidth = imgData.width * scale;
        const scaledHeight = imgData.height * scale;

        const xPosition = (containerWidth - scaledWidth) / 2;
        const yPosition = (containerHeight - scaledHeight) / 2;

        pdfDoc.addImage(
          imgData,
          'JPEG',
          x + xPosition,
          currentY + yPosition,
          scaledWidth,
          scaledHeight,
        );
      };
      imgData.src = connectorImages[connector.connectorName] || '';
      const greenImg = 'greenTrue.jpg';
      const yellowImg = 'yellowTrue.jpg';
      const redImg = 'redFalse.jpg';
      const table1Data = [
        ['Name', connector.connectorName],
        [
          'Beschreibung',
          connector.connectorDescription.length > 100
            ? connector.connectorDescription.substring(0, 120) + '...'
            : connector.connectorDescription,
        ],
        ['Zahlung', connector.payment],
        ['Preis', connector.price],
        ['Matching', recommendationScores[index].toFixed(2)],
        ['Vorname', connector.contactForename],
        ['Nachname', connector.contactName],
        ['Kontakt Email', connector.connectorEmail],
        ['Kontakt Ort', connector.contactLocation],
        ['Website', connector.connectorWebsite],
      ];
      const table2Data = [
        ['Open Source', connector.openSource],
        ['Lizenz', connector.license],
        ['GUI', connector.gui],
        ['Spezifische GUI', connector.dsSpecificGui],
        ['Selbstimplementierung', connector.selfImplementation],
        ['Cloud', connector.cloud],
        ['Cloud Provider', connector.cloudNeeded],
        ['ODRL Sprachmodell', connector.basedOnODRL],
        ['Alternatives Policy Sprachmodell', connector.alternativePolicyExpressionModel],
        ['Verwendete Protokolle', connector.usedProtocols],
        ['Technologie Reifegrad (TRL)', connector.trl],
        ['Target Data Space Roles', connector.targetDataspaceRoles],
      ];
      const table3Data = [
        ['Preismodell', connector.pricingModel],
        ['Zahlungsintervall', connector.paymentInterval],
        ['Abonnementbeschreibung', connector.abonnementDescription],
        ['Kostenberechnungsbasis', connector.costCalculationBasis],
        ['Typ', connector.connectorType],
        ['Version', connector.connectorVersion],
        ['Deployment Typ', connector.deploymentType],
        ['Regional Beschränkt', connector.regionalRestrictions],
        ['Industrie Fokus', connector.targetIndustrySectors],
        ['Referenzen', connector.references],
      ];
      if (currentY + 4 * verticalSpacing + table2Data.length * cellHeight * 2 > pageHeight) {
        pdfDoc.addPage('a4');
        currentY = 10;
      }
      //Ampel Ordnung
      const guiSymbol = connector.gui ? greenImg : redImg;
      const supportSymbol = connector.hasSupport ? greenImg : redImg;
      const dokumentationSymbol = connector.hasDocumentation ? greenImg : redImg;
      let itKnowHowIcon;
      if (connector.itKnowhow === aufwandThree || aufwandThree === 'high') {
        itKnowHowIcon = greenImg;
      } else if (connector.itKnowhow === 'medium' && aufwandThree === 'low') {
        itKnowHowIcon = yellowImg;
      } else {
        itKnowHowIcon = redImg;
      }
      //link zum Homepage der Connector
      const homepageUrl = connector.connectorWebsite || '';
      //linke Spalte
      pdfDoc.text(`${count}`, x, currentY);
      count++;
      /* pdfDoc.addImage(imgData, 'JPEG', x, currentY, imgWidth, imgHeight); */
      pdfDoc.text(`${connector.connectorMaintainer}`, x, currentY + 7 * verticalSpacing);
      let serviceLevelText = '';
      if (connector.serviceLevel.includes('caas')) {
        serviceLevelText += 'Caas';
      }
      if (connector.serviceLevel.includes('paas')) {
        if (serviceLevelText !== '') serviceLevelText += ', ';
        serviceLevelText += 'Paas';
      }
      if (connector.serviceLevel.includes('self_service')) {
        if (serviceLevelText !== '') serviceLevelText += ', ';
        serviceLevelText += 'Self service';
      }

      pdfDoc.text(serviceLevelText, x, currentY + 8 * verticalSpacing);
      //mittlere Spalte
      pdfDoc.text(`${connector.connectorName}`, x + 75, currentY + verticalSpacing);
      let durationText;
      if (connector.durationFrom === connector.durationTo) {
        const unitText =
          connector.durationUnit === 'days'
            ? isDeutsch
              ? 'Tag'
              : 'Day'
            : isDeutsch
            ? 'Monat'
            : 'Month';
        durationText = `${connector.durationFrom} ${unitText}`;
      } else {
        const fromText = isDeutsch ? 'Von' : 'From';
        const toText = isDeutsch ? 'bis' : 'to';
        const unitText =
          connector.durationUnit === 'days'
            ? isDeutsch
              ? 'Tagen'
              : 'Days'
            : isDeutsch
            ? 'Monaten'
            : 'Months';
        durationText = `${fromText} ${connector.durationFrom} ${toText} ${connector.durationTo} ${unitText}`;
      }

      pdfDoc.text(
        `Implementierungs-Dauer: ${durationText}`,
        x + 75,
        currentY + 2 * verticalSpacing,
      );
      pdfDoc.text(
        `Arbeitsaufwand: ${
          connector.fte === 'single_person'
            ? isDeutsch
              ? 'Eine Person'
              : 'Single Person'
            : connector.fte === 'small_team'
            ? isDeutsch
              ? 'Kleines Team'
              : 'Small Team'
            : connector.fte === 'department'
            ? isDeutsch
              ? 'Department'
              : 'Department'
            : connector.fte === 'large_team'
            ? isDeutsch
              ? 'Großes Team'
              : 'Large Team'
            : ''
        }`,
        x + 75,
        currentY + 3 * verticalSpacing,
      );
      //Werte mit Symbole in Ampel Ordnung
      pdfDoc.addImage(
        `${guiSymbol}`,
        'JPEG',
        x + 75,
        currentY + 4.3 * verticalSpacing,
        iconWidth,
        iconHeight,
      );
      pdfDoc.text(`GUI`, x + 80, currentY + 5 * verticalSpacing);
      pdfDoc.addImage(
        `${supportSymbol}`,
        'JPEG',
        x + 75,
        currentY + 5.3 * verticalSpacing,
        iconWidth,
        iconHeight,
      );
      pdfDoc.text(`Support`, x + 80, currentY + 6 * verticalSpacing);
      pdfDoc.addImage(
        `${itKnowHowIcon}`,
        'JPEG',
        x + 75,
        currentY + 6.3 * verticalSpacing,
        iconWidth,
        iconHeight,
      );
      pdfDoc.text(`IT-Know-how`, x + 80, currentY + 7 * verticalSpacing);
      pdfDoc.addImage(
        `${dokumentationSymbol}`,
        'JPEG',
        x + 75,
        currentY + 7.3 * verticalSpacing,
        iconWidth,
        iconHeight,
      );
      pdfDoc.text(`Dokumentation`, x + 80, currentY + 8 * verticalSpacing);
      //rechte Spalte
      pdfDoc.text(
        `${(recommendationScores[index] * 100).toFixed(0)}% Score`,
        x + 150,
        currentY + 5 * verticalSpacing,
      );
      pdfDoc.text(`${connector.price} €`, x + 150, currentY + 6 * verticalSpacing);
      pdfDoc.textWithLink('Homepage', x + 150, currentY + 8 * verticalSpacing, {
        url: homepageUrl,
      });
      //die Tabellen
      pdfDoc.setFontSize(tableFontSize);
      if (index >= 0) {
        currentY += table1Data.length * cellHeight + verticalSpacing - 20;
      }
      const tableData = [table1Data, table3Data, table2Data];
      const totalTables = tableData.length;
      let currentYOffset = 10; //Abstand zwischen Daten und Tabelle
      const lineHeight = 5;
      const maxRowHeight = 20; //bestimmt Abstand zwischen größe Text Zeilen
      //für Tabelle Erweiterung
      const addPageIfNeeded = (rowHeight: any) => {
        const spaceLeftOnPage = pageHeight - currentY;
        const spaceNeededForRow = rowHeight + 10;
        if (spaceNeededForRow > spaceLeftOnPage - 90) {
          pdfDoc.addPage('a4');
          currentY = 10;
          return true;
        }
        return false;
      };
      tableData.forEach((table, tableIndex) => {
        table.forEach((row, rowIndex) => {
          const nextRowHeight = maxRowHeight;
          const maxCellWidth = cellWidth - 2;
          let rowHeight = 0;
          const cellSpacing = 1;
          let isRowWithLargeText = false;
          row.forEach((cell, colIndex) => {
            const cellText = cell !== null ? cell.toString() : 'Null';
            const textLines = pdfDoc.splitTextToSize(cellText, maxCellWidth, { splitBy: 'auto' });
            const cellLinesHeight = textLines.length * tableFontSize;
            if (cellLinesHeight > rowHeight) {
              rowHeight = cellLinesHeight - 4;
            }
            if (rowHeight > maxRowHeight) {
              rowHeight = maxRowHeight * (textLines.length / 6); //bestimmt Abstand zwischen größe Text Zeilen
              isRowWithLargeText = true;
            }
          });
          row.forEach((cell, colIndex) => {
            const cellX = x + colIndex * cellWidth;
            const cellText = cell !== null ? cell.toString() : 'Null';
            const textLines = pdfDoc.splitTextToSize(cellText, maxCellWidth, { splitBy: 'auto' });
            const cellLinesHeight = textLines.length * tableFontSize;
            const cellY = currentY + rowIndex * cellHeight + currentYOffset;
            const textY = cellY + (rowHeight - cellLinesHeight) / 2;
            const cellLines = textLines.length;
            const spaceBetweenLines = (rowHeight - 7 - cellLines * tableFontSize) / (cellLines + 1);
            if (textLines.length > 2) {
              textLines.forEach((line: string, lineIndex: number) => {
                const adjustedTextY =
                  cellY + spaceBetweenLines * lineIndex + tableFontSize * lineIndex;
                pdfDoc.text(line, cellX + 1, adjustedTextY + 3);
              });
            } else {
              textLines.forEach((line: string, lineIndex: number) => {
                const adjustedTextY =
                  textY + (tableFontSize - cellSpacing - lineHeight) * lineIndex + 6;
                pdfDoc.text(line, cellX + 1, adjustedTextY);
              });
            }
            pdfDoc.rect(cellX, cellY, cellWidth, rowHeight);
          });
          currentY += rowHeight - 5;
          addPageIfNeeded(rowHeight);
        });

        if (tableIndex < totalTables - 1) {
          currentYOffset += 10 * cellHeight + verticalSpacing;
        }
      });
      pdfDoc.setFontSize(defaultFontSize);
      currentY += table2Data.length * verticalSpacing + 25;
      if (index < 4) {
        if (currentY + 4 * verticalSpacing + table2Data.length * cellHeight * 5 > pageHeight) {
          pdfDoc.addPage('a4');
          currentY = 10;
        }
      }
    });
    pdfDoc.save('connectors.pdf');
  };

  const [isVerticalLayout, setIsVerticalLayout] = useState(window.innerWidth <= 450);
  useEffect(() => {
    const handleResize = () => {
      setIsVerticalLayout(window.innerWidth <= 550);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const { isDeutsch } = useLanguage();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component='main' maxWidth='md' sx={{ mb: 4 }}>
        <Paper variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Stepper
            activeStep={activeStep}
            sx={{ pt: 3, pb: 5 }}
            orientation={isVerticalLayout ? 'vertical' : 'horizontal'}
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>
                  {isDeutsch
                    ? stepsObject.stepsAufDeutsch[index]
                    : stepsObject.stepsAufEnglisch[index]}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>{}</React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box
                component='span'
                m={1}
                display='flex'
                justifyContent='space-between'
                alignItems='center'
              >
                {activeStep !== 0 && (
                  <Box sx={{ ml: '-8px' }}>
                    <Button
                      variant='outlined'
                      onClick={handleBack}
                      sx={{
                        mt: 3,
                        ml: 1,
                        '@media (max-width: 550px)': {
                          fontSize: 'small',
                        },
                      }}
                      style={{ textTransform: 'none' }}
                      size='large'
                    >
                      {isDeutsch
                        ? translationFunction().deutschTranslations.kategorisierungButton
                        : translationFunction().englishTranslations.kategorisierungButton}
                    </Button>
                  </Box>
                )}
                {activeStep === steps.length - 1 && (
                  <Box className='btnDiv'>
                    <Button
                      variant='outlined'
                      sx={{
                        mt: 3,
                        ml: 1,
                        '@media (max-width: 550px)': {
                          fontSize: 'small',
                        },
                      }}
                      onClick={downloadPDF}
                      id='downloadBtn'
                      value='download'
                      style={{ textTransform: 'none' }}
                      size='large'
                    >
                      {isDeutsch
                        ? translationFunction().deutschTranslations.empfehlungPDFButton
                        : translationFunction().englishTranslations.empfehlungPDFButton}
                    </Button>
                  </Box>
                )}
                {activeStep === steps.length - 2 && (
                  <Box>
                    <Button
                      disabled={aufwandOne === '' || aufwandTwo === '' || aufwandThree === ''}
                      variant='outlined'
                      onClick={() => {
                        handleNext();
                        sendSelectedData();
                      }}
                      sx={{
                        mt: 3,
                        ml: 1,
                        '@media (max-width: 550px)': {
                          fontSize: 'small',
                        },
                      }}
                      style={{ textTransform: 'none', whiteSpace: 'normal' }}
                      size='large'
                    >
                      {isDeutsch
                        ? translationFunction().deutschTranslations.zumConnectorvergleichButton
                        : translationFunction().englishTranslations.zumConnectorvergleichButton}
                    </Button>
                  </Box>
                )}
              </Box>
              {activeStep === steps.length - 3 && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    disabled={
                      companyName === '' ||
                      companyLocation === '' ||
                      companyType === '' ||
                      industrySector.length === 0 ||
                      companyZipcode === undefined ||
                      selectedCountry === undefined ||
                      contactFirstname === '' ||
                      contactLastname === '' ||
                      contactEmail === ''
                    }
                    variant='outlined'
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                    style={{ textTransform: 'none' }}
                    size='large'
                  >
                    {isDeutsch
                      ? translationFunction().deutschTranslations.weiterButton
                      : translationFunction().englishTranslations.weiterButton}
                  </Button>
                </Box>
              )}
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
