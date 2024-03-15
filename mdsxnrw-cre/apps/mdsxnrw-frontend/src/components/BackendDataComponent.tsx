// BackendDataComponent.tsx
import React, { FC, useEffect } from 'react';

interface BackendDataComponentProps {
  updateConnectors: (newConnectors: any[]) => void;
}

const BackendDataComponent: FC<BackendDataComponentProps> = ({ updateConnectors }) => {
  useEffect(() => {
    fetchDataFromBackend();
  }, []);

  const fetchDataFromBackend = async () => {
    try {
      const response = await fetch('your_backend_api_endpoint');
      const result = await response.json();

      const backendConnectors = result.connectors.map((connector: any) => ({
        connectorId: connector.id,
        description: connector.connectorDescription,
        logo: connector.connectorLogo,
        name: connector.connectorName,
        maintainer: connector.connectorMaintainer,
        typ: connector.connectorType,
        version: connector.connectorVersion,
        website: connector.connectorWebsite,
        email: connector.connectorEmail,
        contactForename: connector.contactForename,
        location: connector.contactLocation,
        contactName: connector.contactName,
        deployment: connector.deploymentType,
        duration: connector.duration,
        openSource: connector.openSource,
        lizenz: connector.license,
        fte: connector.fte,
        selfImplementation: connector.selfImplementation,
        gui: connector.gui,
        spezifischeGUI: connector.dsSpecificGui,
        cloudGebraucht: connector.cloudNeeded,
        cloud: connector.cloud,
        industrie: connector.targetIndustrySectors,
        targetDataspaceRoles: connector.targetDataspaceRoles,
        itknowhow: connector.itKnowhow,
        zahlung: connector.payment,
        pricingModel: connector.pricingModel,
        price: connector.price,
        paymentInterval: connector.paymentInterval,
        abonnementDescription: connector.abonnementDescription,
        costCalculationBasis: connector.costCalculationBasis,
        //hier kommt mehr daten
        regionalBeschränkt: connector.regionalRestrictions,
        dokumentation: connector.hasDocumentation,
        support: connector.hasSupport,
        basedonODRL: connector.basedOnODRL,
        alternativPolicy: connector.alternativePolicyExpressionModel,
        usedProtocols: connector.usedProtocols,
        trl: connector.trl,
        references: connector.references,
        dienst: connector.serviceLevel,
        firma: 'Connector-Firma1',
        branch: 'Concetor-Bereich',
        zielgruppe: 'Zielgruppe',
        specialUsagePolicies: 'Spezielle Nutzungsbediengunen',
        volumeRestricted: 'Speicher Begrenzung',
        score: '100%',
        link: (
          <button onClick={() => window.open(connector.connectorWebsite, '_blank')}>Weiter</button>
        ),
        homepage: <a href={connector.connectorWebsite}>Homepage</a>,
        greenImg: require('./Pictures/greenTrue.jpg'),
        yellowImg: require('./Pictures/yellowTrue.jpg'),
        redImg: require('./Pictures/redFalse.jpg'),
      }));

      updateConnectors(backendConnectors);
    } catch (error) {
      console.error('Error fetching data from the backend:', error);
    }
  };

  return null;
};

export default BackendDataComponent;
