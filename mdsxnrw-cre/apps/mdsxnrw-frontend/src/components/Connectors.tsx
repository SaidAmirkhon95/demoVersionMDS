import React from 'react';
import exampleRecommendation from './exampleRecommendation.json';

interface Connector {
  id: string;
  connectorDescription: string;
  connectorLogo: any;
  connectorName: string;
  connectorMaintainer: string;
  connectorType: string;
  connectorVersion: string;
  connectorWebsite: string;
  connectorEmail: string;
  contactForename: string;
  contactLocation: string;
  contactName: string;
  deploymentType: string[];
  durationFrom: number;
  durationTo: number;
  durationUnit: string;
  openSource: string;
  license: string;
  fte: string;
  selfImplementation: boolean;
  gui: boolean;
  dsSpecificGui: boolean;
  cloudNeeded: boolean;
  cloud: any;
  targetIndustrySectors: string[];
  targetDataspaceRoles: string[];
  itKnowhow: string;
  payment: any;
  pricingModel: any;
  price: any;
  paymentInterval: any;
  abonnementDescription: any;
  costCalculationBasis: any;
  tier1Cost: any;
  tier1PaymentInterval: any;
  tier1AbonnementDescription: any;
  tier2Cost: any;
  tier2PaymentInterval: any;
  tier2AbonnementDescription: any;
  tier3Cost: any;
  tier3PaymentInterval: any;
  tier3AbonnementDescription: any;
  tier4Cost: any;
  tier4PaymentInterval: any;
  tier4AbonnementDescription: any;
  tier5Cost: any;
  tier5PaymentInterval: any;
  tier5AbonnementDescription: any;
  regionalRestrictions: boolean;
  hasDocumentation: boolean;
  hasSupport: boolean;
  basedOnODRL: boolean;
  alternativePolicyExpressionModel: any;
  usedProtocols: string[];
  trl: number;
  references: string;
  serviceLevel: string;
  score: number;
}

const Connectors: Connector[] = exampleRecommendation.connectors.map((jsonConnector, index) => {
  const score = exampleRecommendation.recommendationScores[index];
  return {
    id: String(jsonConnector.id), //done
    connectorDescription: jsonConnector.connectorDescription, //done
    connectorLogo: jsonConnector.connectorLogo, //done
    connectorName: jsonConnector.connectorName, //done
    connectorMaintainer: jsonConnector.connectorMaintainer, //done
    connectorType: jsonConnector.connectorType, //done
    connectorVersion: jsonConnector.connectorVersion, //done
    connectorWebsite: jsonConnector.connectorWebsite, //done
    connectorEmail: jsonConnector.connectorEmail, //done
    contactForename: jsonConnector.contactForename, //done
    contactLocation: jsonConnector.contactLocation, //done
    contactName: jsonConnector.contactName, //done
    deploymentType: jsonConnector.deploymentType, //done
    durationFrom: jsonConnector.durationFrom, //done
    durationTo: jsonConnector.durationTo, //doen
    durationUnit: jsonConnector.durationUnit, //doen
    openSource: jsonConnector.openSource, //done
    license: jsonConnector.license, //done
    fte: jsonConnector.fte, //done
    selfImplementation: jsonConnector.selfImplementation, //done
    gui: jsonConnector.gui, //done
    dsSpecificGui: jsonConnector.dsSpecificGui, //done
    cloudNeeded: jsonConnector.cloudNeeded, //done
    cloud: jsonConnector.cloud, //done
    targetIndustrySectors: jsonConnector.targetIndustrySectors, //done
    targetDataspaceRoles: jsonConnector.targetDataspaceRoles, //done
    itKnowhow: jsonConnector.itKnowhow, //done
    payment: jsonConnector.payment, //done
    pricingModel: jsonConnector.pricingModel, //done
    price: jsonConnector.price, //done
    paymentInterval: jsonConnector.paymentInterval, //done
    abonnementDescription: jsonConnector.abonnementDescription, //done
    costCalculationBasis: jsonConnector.costCalculationBasis, //done
    tier1Cost: jsonConnector.tier1Cost,
    tier1PaymentInterval: jsonConnector.tier1PaymentInterval,
    tier1AbonnementDescription: jsonConnector.tier1AbonnementDescription,
    tier2Cost: jsonConnector.tier2Cost,
    tier2PaymentInterval: jsonConnector.tier2PaymentInterval,
    tier2AbonnementDescription: jsonConnector.tier2AbonnementDescription,
    tier3Cost: jsonConnector.tier3Cost,
    tier3PaymentInterval: jsonConnector.tier3PaymentInterval,
    tier3AbonnementDescription: jsonConnector.tier3AbonnementDescription,
    tier4Cost: jsonConnector.tier4Cost,
    tier4PaymentInterval: jsonConnector.tier4PaymentInterval,
    tier4AbonnementDescription: jsonConnector.tier4AbonnementDescription,
    tier5Cost: jsonConnector.tier5Cost,
    tier5PaymentInterval: jsonConnector.tier5PaymentInterval,
    tier5AbonnementDescription: jsonConnector.tier5AbonnementDescription,
    regionalRestrictions: jsonConnector.regionalRestrictions, //done
    hasDocumentation: jsonConnector.hasDocumentation, //done
    hasSupport: jsonConnector.hasSupport, //done
    basedOnODRL: jsonConnector.basedOnODRL, //done
    alternativePolicyExpressionModel: jsonConnector.alternativePolicyExpressionModel, //done
    usedProtocols: jsonConnector.usedProtocols, //done
    trl: jsonConnector.trl, //done
    references: jsonConnector.references, //done
    serviceLevel: jsonConnector.serviceLevel, //done
    score: score, //done
  };
});

export { Connectors };
