import { AppViewMode } from "constants/applicationConstants";
import { LocationDescriptor } from "history";
import { UserGuideLocationState } from "pages/tutorials/tutorialsConstant";
import { DatasourceType } from "@lowcoder-ee/constants/queryConstants";

export const BASE_URL = "/";


export const ALL_APPLICATIONS_URL = "/apps";
export const ADMIN_APP_URL = "/ee/:applicationId/:viewMode";
export const MODULE_APPLICATIONS_URL = "/apps/module";
export const DATASOURCE_URL = `/datasource`;
export const DATASOURCE_CREATE_URL = `${DATASOURCE_URL}/new/:datasourceType`;
export const DATASOURCE_EDIT_URL = `${DATASOURCE_URL}/:datasourceId`;
export const QUERY_LIBRARY_URL = `/query-library`;
export const APP_EDITOR_URL = `${ALL_APPLICATIONS_URL}/:applicationId/:viewMode/:appPageId?`;


export const APPLICATION_VIEW_URL = (appId: string, viewMode: AppViewMode) =>
  `${ALL_APPLICATIONS_URL}/${appId}/${viewMode}`;

export const buildDatasourceCreateUrl = (datasourceType: DatasourceType) =>
  `${DATASOURCE_URL}/new/${datasourceType}`;
export const buildDatasourceEditUrl = (datasourceId: string) => `${DATASOURCE_URL}/${datasourceId}`;


export const buildAppRouteWithState = (
  appId: string,
  showGuide: boolean
): LocationDescriptor<UserGuideLocationState> => {
  return {
    pathname: APPLICATION_VIEW_URL(appId, "edit"),
    state: {
      showNewUserGuide: showGuide,
    },
  };
};

export function preview(applicationId: string) {
  window.open(APPLICATION_VIEW_URL(applicationId, "preview"));
}

