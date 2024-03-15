-- CreateEnum
CREATE TYPE "Duration" AS ENUM ('about_1_day', 'between_2_to_5_days', 'about_1_month', 'between_2_to_4_months', 'between_4_to_6_months', 'morethan_6_months');

-- CreateEnum
CREATE TYPE "FTE" AS ENUM ('single_person', 'small_team', 'large_team', 'department');

-- CreateEnum
CREATE TYPE "CompanyItExperts" AS ENUM ('lessthan_10_employees', 'between_11_to_49_employees', 'between_50_to_249_employees', 'morethan_249_employees');

-- CreateEnum
CREATE TYPE "ConnectorType" AS ENUM ('data_connector_framework', 'generic_opensource_solution', 'generic_solution', 'off_the_shelf_solution');

-- CreateEnum
CREATE TYPE "License" AS ENUM ('apache_2_0', 'mit_license', 'bsd_license', 'unlicense', 'mozilla_public_license_2_0', 'eclipse_public_license_2_0', 'gnu_lgpl', 'gnu_agpl', 'gnu_gpl_3');

-- CreateEnum
CREATE TYPE "OpenSource" AS ENUM ('opensource', 'opensource_copyleft', 'closedsource', 'closedsource_extendable');

-- CreateEnum
CREATE TYPE "Cloud" AS ENUM ('aws', 'microsoft_azure', 'google_cloud', 'ibm_cloud', 'redhat', 'vmware', 'mycloud');

-- CreateEnum
CREATE TYPE "CostCalculationBasis" AS ENUM ('file_upload_count', 'size_of_upload', 'file_download_count', 'size_of_download', 'number_of_adressed_dataspaces');

-- CreateEnum
CREATE TYPE "AlternativePolicyExpressionModel" AS ENUM ('ind_2_uce', 'lucon', 'degree', 'my_data');

-- CreateEnum
CREATE TYPE "PaymentInterval" AS ENUM ('yearly', 'monthly', 'bi_weekly', 'weekly', 'daily');

-- CreateEnum
CREATE TYPE "PricingModel" AS ENUM ('flatrate', 'pay_as_you_go', 'tiering', 'freemium', 'custom');

-- CreateEnum
CREATE TYPE "UsagePolicies" AS ENUM ('standard', 'special');

-- CreateEnum
CREATE TYPE "DataAvailabilities" AS ENUM ('api', 'data_file', 'ftp', 'realtime', 'others', 'not_specified');

-- CreateEnum
CREATE TYPE "DataspaceRoles" AS ENUM ('data_provider', 'data_consumer', 'service_provider');

-- CreateEnum
CREATE TYPE "CompanySize" AS ENUM ('startup', 'microenterprise', 'small_business', 'medium_business', 'large_business');

-- CreateEnum
CREATE TYPE "ServiceLevel" AS ENUM ('caas', 'paas', 'self_service');

-- CreateEnum
CREATE TYPE "DeploymentType" AS ENUM ('edge', 'on_premises', 'cloud');

-- CreateEnum
CREATE TYPE "ItKnowhow" AS ENUM ('low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "Protocol" AS ENUM ('https', 'idscp_v2', 'neuropil', 'ids_rest', 'multipart');

-- CreateEnum
CREATE TYPE "CompanyIndustrySector" AS ENUM ('trade', 'industry', 'media', 'tourism', 'property', 'healthcare', 'service', 'finance', 'science', 'others');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "companyIndustrySectors" "CompanyIndustrySector"[],
    "companyLocation" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyType" TEXT NOT NULL,
    "companyZipcode" INTEGER,
    "email" TEXT NOT NULL,
    "forename" TEXT,
    "futureUseOfDs" BOOLEAN,
    "name" TEXT NOT NULL,
    "companyItExperts" "CompanyItExperts" NOT NULL,
    "companyItKnowhow" "ItKnowhow" NOT NULL,
    "companySize" "CompanySize" NOT NULL,
    "dataAvailabilities" "DataAvailabilities"[],
    "dataspaceRoles" "DataspaceRoles"[],
    "serviceLevel" "ServiceLevel"[],
    "usagePolicies" "UsagePolicies",

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "companyIndustrySectors" "CompanyIndustrySector"[],
    "companyItExperts" "CompanyItExperts" NOT NULL,
    "companyItKnowhow" "ItKnowhow" NOT NULL,
    "companyLocation" TEXT NOT NULL,
    "companySize" "CompanySize" NOT NULL,
    "companyType" TEXT NOT NULL,
    "companyZipcode" INTEGER,
    "dataAvailabilities" "DataAvailabilities"[],
    "dataspaceRoles" "DataspaceRoles"[],
    "serviceLevel" "ServiceLevel"[],
    "usagePolicies" "UsagePolicies",

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Connector" (
    "id" SERIAL NOT NULL,
    "connectorDescription" TEXT NOT NULL,
    "connectorLogo" TEXT,
    "connectorName" TEXT NOT NULL,
    "connectorMaintainer" TEXT NOT NULL,
    "connectorType" "ConnectorType" NOT NULL,
    "connectorVersion" TEXT NOT NULL,
    "connectorWebsite" TEXT,
    "connectorEmail" TEXT NOT NULL,
    "contactForename" TEXT,
    "contactLocation" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "deploymentType" "DeploymentType"[],
    "duration" "Duration",
    "openSource" "OpenSource" NOT NULL,
    "license" "License" NOT NULL,
    "fte" "FTE" NOT NULL,
    "selfImplementation" BOOLEAN NOT NULL,
    "gui" BOOLEAN NOT NULL,
    "dsSpecificGui" BOOLEAN NOT NULL,
    "cloudNeeded" BOOLEAN NOT NULL,
    "cloud" "Cloud",
    "targetIndustrySectors" "CompanyIndustrySector"[],
    "targetDataspaceRoles" "DataspaceRoles"[],
    "itKnowhow" "ItKnowhow" NOT NULL,
    "payment" BOOLEAN NOT NULL,
    "pricingModel" "PricingModel",
    "price" DOUBLE PRECISION,
    "paymentInterval" "PaymentInterval",
    "abonnementDescription" TEXT,
    "costCalculationBasis" "CostCalculationBasis",
    "tier1Cost" DOUBLE PRECISION,
    "tier1PaymentInterval" "PaymentInterval",
    "tier1AbonnementDescription" TEXT,
    "tier2Cost" DOUBLE PRECISION,
    "tier2PaymentInterval" "PaymentInterval",
    "tier2AbonnementDescription" TEXT,
    "tier3Cost" DOUBLE PRECISION,
    "tier3PaymentInterval" "PaymentInterval",
    "tier3AbonnementDescription" TEXT,
    "tier4Cost" DOUBLE PRECISION,
    "tier4PaymentInterval" "PaymentInterval",
    "tier4AbonnementDescription" TEXT,
    "tier5Cost" DOUBLE PRECISION,
    "tier5PaymentInterval" "PaymentInterval",
    "tier5AbonnementDescription" TEXT,
    "regionalRestrictions" BOOLEAN NOT NULL,
    "hasDocumentation" BOOLEAN NOT NULL,
    "hasSupport" BOOLEAN NOT NULL,
    "basedOnODRL" BOOLEAN NOT NULL,
    "alternativePolicyExpressionModel" "AlternativePolicyExpressionModel",
    "usedProtocols" "Protocol"[],
    "trl" INTEGER NOT NULL,
    "references" TEXT NOT NULL,
    "serviceLevel" "ServiceLevel"[] NOT NULL,

    CONSTRAINT "Connector_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Connector_connectorName_key" ON "Connector"("connectorName");
