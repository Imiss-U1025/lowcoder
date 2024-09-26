import { ReduxActionTypes } from "constants/reduxActionConstants";
import {
  ApplicationDetail,
  ApplicationDSLType,
  ApplicationRoleType,
  AppTypeEnum,
} from "constants/applicationConstants";
import { JSONValue } from "util/jsonTypes";
import { CommonSettingResponseData } from "api/commonSettingApi";

export interface HomeDataPayload {
  applicationType?: AppTypeEnum;
}

export const fetchHomeData = (payload: HomeDataPayload) => ({
  type: ReduxActionTypes.FETCH_HOME_DATA,
  payload: {},
});

export const fetchAllApplications = (payload: HomeDataPayload) => ({
  type: ReduxActionTypes.FETCH_ALL_APPLICATIONS_INIT,
  payload: {},
});

export type CreateApplicationPayload = {
  applicationName: string;
  applicationType: AppTypeEnum;
  orgId: string;
  dsl?: JSONValue;
  folderId?: string;
  onSuccess: (app: ApplicationDetail) => void;
};

export type RecycleApplicationPayload = {
  folderId: string;
  applicationId: string;
};

export type RestoreApplicationPayload = {
  applicationId: string;
};
export type DeleteApplicationPayload = {
  applicationId: string;
};

export type UpdateAppMetaPayload = {
  folderId?: string;
  applicationId: string;
  name: string;
};
export type PublishApplicationPayload = {
  applicationId: string;
};

export interface AppSummaryInfo {
  id: string;
  dsl?: JSONValue;
  moduleDsl?: Record<string, any>;
  appType: AppTypeEnum;
  orgCommonSettings?: CommonSettingResponseData;
}

export type FetchAppInfoPayload = {
  applicationId: string;
  type: ApplicationDSLType;
  onSuccess?: (info: AppSummaryInfo) => void;
  onError?: (error: string) => void;
};
export const fetchApplicationInfo = (payload: FetchAppInfoPayload) => ({
  type: ReduxActionTypes.FETCH_APPLICATION_DETAIL,
  payload: payload,
});

export type FetchAppPermissionPayload = {
  applicationId: string;
};
export type UpdateAppPermissionPayload = {
  applicationId: string;
  role: ApplicationRoleType;
  permissionId: string;
};
export type DeleteAppPermissionPayload = {
  applicationId: string;
  permissionId: string;
};