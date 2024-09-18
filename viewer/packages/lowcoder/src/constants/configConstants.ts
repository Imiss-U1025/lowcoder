
interface FeatureFlag {
  enableCustomBranding: boolean;
  enableEnterpriseLogin: boolean;
  enableAuditLog: boolean;
}

export interface BrandingConfig {
  logo?: string;
  favicon?: string;
  brandName?: string;
  headerColor?: string;
}

export type ConfigBaseInfo = {
  selfDomain: boolean;
  cloudHosting: boolean;
  workspaceMode: "SAAS" | "ENTERPRISE" | "MULTIWORSPACE" | "SINGLEWORKSPACE";
  warning?: string;
  featureFlag: FeatureFlag;
  branding?: BrandingConfig;
};
