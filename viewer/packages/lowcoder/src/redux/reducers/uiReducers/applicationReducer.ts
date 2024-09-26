import {
  ReduxAction,
  ReduxActionErrorTypes,
  ReduxActionTypes,
} from "constants/reduxActionConstants";
import { createReducer } from "util/reducerUtils";
import {
  ApplicationDetail,
  ApplicationMeta,
  AppPermissionInfo,
} from "constants/applicationConstants";
import { HomeData, HomeOrgMeta } from "api/applicationApi";

const initialState: ApplicationReduxState = {
  applicationList: [],
  modules: [],
  recycleList: [],
  marketplace: [],
  loadingStatus: {
    isFetchingHomeData: false,
    fetchHomeDataFinished: false,
    isApplicationCreating: false,
    deletingApplication: false,
    fetchingAppDetail: false,
    applicationPublishing: false,
  },
};

const usersReducer = createReducer(initialState, {
  [ReduxActionTypes.FETCH_HOME_DATA]: (state: ApplicationReduxState): ApplicationReduxState => ({
    ...state,
    loadingStatus: {
      ...state.loadingStatus,
      isFetchingHomeData: true,
    },
  }),
  [ReduxActionTypes.FETCH_ALL_APPLICATIONS_SUCCESS]: (
    state: ApplicationReduxState,
    action: ReduxAction<ApplicationMeta[]>
  ): ApplicationReduxState => ({
    ...state,
    applicationList: action.payload,
  }),
  [ReduxActionTypes.FETCH_ALL_MODULES_SUCCESS]: (
    state: ApplicationReduxState,
    action: ReduxAction<ApplicationMeta[]>
  ): ApplicationReduxState => ({
    ...state,
    modules: action.payload,
  }),
  [ReduxActionTypes.FETCH_HOME_DATA_SUCCESS]: (
    state: ApplicationReduxState,
    action: ReduxAction<HomeData>
  ): ApplicationReduxState => ({
    ...state,
    loadingStatus: {
      ...state.loadingStatus,
      isFetchingHomeData: false,
      fetchHomeDataFinished: true,
    },
    homeOrg: action.payload.organization,
  }),
  [ReduxActionErrorTypes.FETCH_HOME_DATA_ERROR]: (
    state: ApplicationReduxState
  ): ApplicationReduxState => ({
    ...state,
    loadingStatus: {
      ...state.loadingStatus,
      isFetchingHomeData: false,
      fetchHomeDataFinished: true,
    },
  }),
  [ReduxActionTypes.FETCH_APPLICATION_RECYCLE_LIST_SUCCESS]: (
    state: ApplicationReduxState,
    action: ReduxAction<ApplicationMeta[]>
  ): ApplicationReduxState => ({
    ...state,
    recycleList: action.payload,
  }),
  [ReduxActionTypes.FETCH_ALL_MARKETPLACE_APPS_SUCCESS]: (
    state: ApplicationReduxState,
    action: ReduxAction<ApplicationMeta[]>
  ): ApplicationReduxState => ({
    ...state,
    marketplace: action.payload,
  }),
  [ReduxActionTypes.FETCH_APP_PERMISSIONS_SUCCESS]: (
    state: ApplicationReduxState,
    action: ReduxAction<AppPermissionInfo>
  ): ApplicationReduxState => ({
    ...state,
    appPermissionInfo: {
      ...action.payload,
    },
  }),
  [ReduxActionTypes.FETCH_APPLICATION_DETAIL]: (
    state: ApplicationReduxState
  ): ApplicationReduxState => ({
    ...state,
    loadingStatus: {
      ...state.loadingStatus,
      fetchingAppDetail: true,
    },
  }),
  [ReduxActionTypes.FETCH_APP_EDITING_DETAIL_SUCCESS]: (
    state: ApplicationReduxState,
    action: ReduxAction<ApplicationDetail>
  ): ApplicationReduxState => {
    return {
      ...state,
      currentApplication: action.payload.applicationInfoView,
      loadingStatus: {
        ...state.loadingStatus,
        fetchingAppDetail: false,
      },
    };
  },
  [ReduxActionTypes.FETCH_APP_PUBLISH_DETAIL_SUCCESS]: (
    state: ApplicationReduxState,
    action: ReduxAction<ApplicationDetail>
  ): ApplicationReduxState => ({
    ...state,
    currentApplication: action.payload.applicationInfoView,
    templateId: action.payload.templateId,
    loadingStatus: {
      ...state.loadingStatus,
      fetchingAppDetail: false,
    },
  }),
  [ReduxActionErrorTypes.FETCH_APPLICATION_DETAIL_ERROR]: (
    state: ApplicationReduxState
  ): ApplicationReduxState => ({
    ...state,
    loadingStatus: {
      ...state.loadingStatus,
      fetchingAppDetail: false,
    },
  }),
});

export interface ApplicationReduxState {
  homeOrg?: HomeOrgMeta;
  applicationList: ApplicationMeta[];
  modules: ApplicationMeta[];
  recycleList: ApplicationMeta[];
  marketplace: ApplicationMeta[];
  appPermissionInfo?: AppPermissionInfo;
  currentApplication?: ApplicationMeta;
  templateId?: string;
  loadingStatus: {
    deletingApplication: boolean;
    isFetchingHomeData: boolean; // fetching app list
    fetchHomeDataFinished: boolean;
    isApplicationCreating: boolean;
    fetchingAppDetail: boolean; // dsl in detail
    applicationPublishing: boolean;
  };
}

export default usersReducer;
