import { AppViewMode } from "constants/applicationConstants";

export const BASE_URL = "/";
export const USER_AUTH_URL = "/user/auth";

export const ALL_APPLICATIONS_URL = "/apps";
export const APPLICATION_MARKETPLACE_URL = `https://app.lowcoder.cloud/apps`;
export const MODULE_APPLICATIONS_URL = "/apps/module";
export const DATASOURCE_URL = `/datasource`;
export const QUERY_LIBRARY_URL = `/query-library`;
export const FOLDER_URL_PREFIX = `/folder`;
export const APP_EDITOR_URL = `${ALL_APPLICATIONS_URL}/:applicationId/:viewMode/:appPageId?`;

export const AUTH_LOGIN_URL = `${USER_AUTH_URL}/login`;
export const OAUTH_REDIRECT = `${USER_AUTH_URL}/oauth/redirect`;
export const ORG_AUTH_LOGIN_URL = `/org/:orgId/auth/login`;

export const APPLICATION_VIEW_URL = (appId: string, viewMode: AppViewMode) =>
  `${ALL_APPLICATIONS_URL}/${appId}/${viewMode}`;

export const APPLICATION_MARKETPLACE_VIEW_URL = (
  appId: string,
  viewMode: AppViewMode
) => `${APPLICATION_MARKETPLACE_URL}/${appId}/${viewMode}`;


export const isAuthUnRequired = (pathname: string): boolean => {
  return (
    pathname.startsWith("/invite/") ||
    pathname.startsWith(USER_AUTH_URL) ||
    pathname.endsWith("/auth/login") ||
    pathname.endsWith("/auth/register")
  );
};

export const buildFolderUrl = (folderId: string) =>
  `${FOLDER_URL_PREFIX}/${folderId}`;

export function preview(applicationId: string) {
  window.open(APPLICATION_VIEW_URL(applicationId, "preview"));
}