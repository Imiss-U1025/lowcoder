import { ApiResponse, GenericApiResponse } from "api/apiResponses";
import ApplicationApi, {
  ApplicationResp,
  AppPermissionResponse,
  HomeDataResponse,
} from "api/applicationApi";
import { AxiosResponse } from "axios";
import {
  ReduxAction,
  ReduxActionErrorTypes,
  ReduxActionTypes,
  ReduxActionWithCallbacks,
} from "constants/reduxActionConstants";
import log from "loglevel";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  FetchAppInfoPayload,
  FetchAppPermissionPayload,
  HomeDataPayload,
} from "redux/reduxActions/applicationActions";
import { doValidResponse, validateResponse } from "api/apiUtils";
import { messageInstance } from "lowcoder-design/src/components/GlobalInstances";

import { SERVER_ERROR_CODES } from "constants/apiConstants";
import { ApplicationMeta, AppTypeEnum } from "constants/applicationConstants";

export function* fetchHomeDataSaga(action: ReduxAction<HomeDataPayload>) {
  try {
    const response: AxiosResponse<HomeDataResponse> = yield call(
      ApplicationApi.fetchHomeData,
      action.payload
    );
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.FETCH_HOME_DATA_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error) {
    log.debug("fetch home data error: ", error);
    yield put({
      type: ReduxActionErrorTypes.FETCH_HOME_DATA_ERROR,
    });
  }
}

export function* fetchAllApplicationSaga(action: ReduxAction<HomeDataPayload>) {
  try {
    const response: AxiosResponse<GenericApiResponse<ApplicationMeta[]>> = yield call(
      ApplicationApi.fetchAllApplications,
      action.payload
    );
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.FETCH_ALL_APPLICATIONS_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error: any) {
    log.debug("fetch all application error: ", error);
    messageInstance.error(error.message);
  }
}

export function* fetchAllModulesSaga(action: ReduxAction<HomeDataPayload>) {
  try {
    const response: AxiosResponse<GenericApiResponse<ApplicationMeta[]>> = yield call(
      ApplicationApi.fetchAllModules,
      action.payload
    );
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.FETCH_ALL_MODULES_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error: any) {
    log.debug("fetch all modules error: ", error);
    messageInstance.error(error.message);
  }
}

export function* fetchApplicationDetailSaga(action: ReduxAction<FetchAppInfoPayload>) {
  try {
    const response: AxiosResponse<ApplicationResp> = yield call(
      ApplicationApi.getApplicationDetail,
      action.payload
    );
    const isValidResponse: boolean = doValidResponse(response);
    if (isValidResponse && action.payload) {
      const {
        applicationDSL: dsl,
        applicationInfoView: info,
        moduleDSL: moduleDsl,
        orgCommonSettings,
      } = response.data.data;
      // update editor component
      if (action.payload.onSuccess) {
        action.payload.onSuccess({
          id: info.applicationId,
          appType: info.applicationType || AppTypeEnum.Module,
          dsl,
          moduleDsl,
          orgCommonSettings,
        });
      }
      if (orgCommonSettings) {
        yield put({
          type: ReduxActionTypes.FETCH_COMMON_SETTING_SUCCESS,
          payload: { data: orgCommonSettings },
        });
      }

      const type =
        action.payload.type === "editing"
          ? ReduxActionTypes.FETCH_APP_EDITING_DETAIL_SUCCESS
          : ReduxActionTypes.FETCH_APP_PUBLISH_DETAIL_SUCCESS;
      yield put({
        type: type,
        payload: response.data.data,
      });
      return;
    } else if (!isValidResponse) {
      if (response.data.code === SERVER_ERROR_CODES.NO_PERMISSION_TO_REQUEST_APP) {
        // history.push(BASE_URL);
        action.payload.onError?.(response.data.message);
      }
      throw Error(response.data.message);
    }
  } catch (error: any) {
    messageInstance.error(error.message);
    yield put({
      type: ReduxActionErrorTypes.FETCH_APPLICATION_DETAIL_ERROR,
    });
  }
}

export function* fetchApplicationPermissions(action: ReduxAction<FetchAppPermissionPayload>) {
  try {
    const response: AxiosResponse<AppPermissionResponse> = yield call(
      ApplicationApi.getApplicationPermissions,
      action.payload.applicationId
    );
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.FETCH_APP_PERMISSIONS_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error) {
    log.debug("fetch all application error: ", error);
  }
}

function* fetchApplicationRecycleListSaga() {
  try {
    const response: AxiosResponse<GenericApiResponse<ApplicationMeta[]>> = yield call(
      ApplicationApi.fetchRecycleList
    );
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.FETCH_APPLICATION_RECYCLE_LIST_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error: any) {
    messageInstance.error(error.message);
    log.debug("fetch application recycle list error: ", error);
  }
}

function* fetchAllMarketplaceAppsSaga() {
  try {
    const response: AxiosResponse<GenericApiResponse<ApplicationMeta[]>> = yield call(
      ApplicationApi.fetchAllMarketplaceApps
    );
    const isValidResponse: boolean = validateResponse(response);
    if (isValidResponse) {
      yield put({
        type: ReduxActionTypes.FETCH_ALL_MARKETPLACE_APPS_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error: any) {
    messageInstance.error(error.message);
    log.debug("fetch marketplace apps error: ", error);
  }
}

export default function* applicationSagas() {
  yield all([
    takeLatest(ReduxActionTypes.FETCH_HOME_DATA, fetchHomeDataSaga),
    takeLatest(ReduxActionTypes.FETCH_APP_PERMISSIONS, fetchApplicationPermissions),
    takeLatest(ReduxActionTypes.FETCH_APPLICATION_DETAIL, fetchApplicationDetailSaga),
    takeLatest(ReduxActionTypes.FETCH_ALL_APPLICATIONS_INIT, fetchAllApplicationSaga),
    takeLatest(ReduxActionTypes.FETCH_ALL_MODULES_INIT, fetchAllModulesSaga),

    takeLatest(
      ReduxActionTypes.FETCH_APPLICATION_RECYCLE_LIST_INIT,
      fetchApplicationRecycleListSaga
    ),
    takeLatest(
      ReduxActionTypes.FETCH_ALL_MARKETPLACE_APPS,
      fetchAllMarketplaceAppsSaga,
    ),
  ]);
}
