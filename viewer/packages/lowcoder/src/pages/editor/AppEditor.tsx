import { AppPathParams, AppTypeEnum } from "constants/applicationConstants";
import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { AppSummaryInfo, fetchApplicationInfo } from "redux/reduxActions/applicationActions";
import { getUser } from "redux/selectors/usersSelectors";
import "comps/uiCompRegistry";
import { setShowAppSnapshot } from "redux/reduxActions/appSnapshotActions";
import { fetchGroupsAction } from "redux/reduxActions/orgActions";
import { getFetchOrgGroupsFinished } from "redux/selectors/orgSelectors";
import { getIsCommonSettingFetching } from "redux/selectors/commonSettingSelectors";
import {
  MarkAppDSLLoaded,
  MarkAppEditorFirstRender,
  MarkAppEditorMounted,
  perfClear,
  perfMark,
} from "util/perfUtils";
import { useMount, useUnmount } from "react-use";
import { clearGlobalSettings, setGlobalSettings } from "comps/utils/globalSettings";
import { registryDataSourcePlugin } from "constants/queryConstants";
import { DatasourceApi } from "api/datasourceApi";
import { useRootCompInstance } from "./useRootCompInstance";
import EditorSkeletonView from "./editorSkeletonView";
import { ErrorBoundary } from 'react-error-boundary';
import { ALL_APPLICATIONS_URL } from "@lowcoder-ee/constants/routesURL";
import history from "util/history";
import Flex from "antd/es/flex";
import React from "react";

const AppEditorInternalView = lazy(
  () => import("pages/editor/appEditorInternal")
    .then(moduleExports => ({ default: moduleExports.AppEditorInternalView }))
);

const AppEditor = React.memo(() => {
  const params = useParams<AppPathParams>();
  const applicationId = params.applicationId || window.location.pathname.split("/")[2];
  const paramViewMode = params.viewMode || window.location.pathname.split("/")[3];
  const viewMode = (paramViewMode === "view" || paramViewMode === "admin") ? "published" : paramViewMode === "view_marketplace" ? "view_marketplace" : "editing";
  const currentUser = useSelector(getUser);
  const dispatch = useDispatch();
  const fetchOrgGroupsFinished = useSelector(getFetchOrgGroupsFinished);
  const isCommonSettingsFetching = useSelector(getIsCommonSettingFetching);
  const orgId = currentUser.currentOrgId;
  const firstRendered = useRef(false);
  const [isDataSourcePluginRegistered, setIsDataSourcePluginRegistered] = useState(false);
  const [appError, setAppError] = useState('');

  setGlobalSettings({ applicationId, isViewMode: paramViewMode === "view" });

  if (!firstRendered.current) {
    perfClear();
    perfMark(MarkAppEditorFirstRender);
    firstRendered.current = true;
  }

  useMount(() => {
    perfMark(MarkAppEditorMounted);
  });

  useUnmount(() => {
    clearGlobalSettings();
  });

  // fetch dsl
  const [appInfo, setAppInfo] = useState<AppSummaryInfo>({
    id: "",
    appType: AppTypeEnum.Application,
  });

  const compInstance = useRootCompInstance(appInfo, true, isDataSourcePluginRegistered);

  const fetchJSDataSourceByApp = () => {
    DatasourceApi.fetchJsDatasourceByApp(applicationId).then((res) => {
      res.data.data.forEach((i) => {
        registryDataSourcePlugin(i.type, i.id, i.pluginDefinition);
      });
      setIsDataSourcePluginRegistered(true);
    });
    dispatch(setShowAppSnapshot(false));
  };

  useEffect(() => {
    if (!fetchOrgGroupsFinished) {
      dispatch(fetchGroupsAction(orgId));
    }
  }, [dispatch, fetchOrgGroupsFinished, orgId]);

  useEffect(() => {
    dispatch(
      fetchApplicationInfo({
        type: viewMode,
        applicationId: applicationId,
        onSuccess: (info) => {
          perfMark(MarkAppDSLLoaded);
          const runJsInHost =
            info.orgCommonSettings?.runJavaScriptInHost ?? !!REACT_APP_DISABLE_JS_SANDBOX;
          setGlobalSettings({
            orgCommonSettings: {
              ...info.orgCommonSettings,
              runJavaScriptInHost: runJsInHost,
            },
          });
          setAppInfo(info);
          fetchJSDataSourceByApp();
        },
        onError: (errorMessage) => {
          setAppError(errorMessage);
        }
      })
    );
  }, [viewMode, applicationId, dispatch]);

  const fallbackUI = useMemo(() => (
    <Flex align="center" justify="center" vertical style={{
      height: '300px',
      width: '400px',
      margin: '0 auto',
    }}>
      <h4 style={{ margin: 0 }}>Something went wrong while displaying this webpage</h4>
      <button onClick={() => history.push(ALL_APPLICATIONS_URL)} style={{ background: '#4965f2', border: '1px solid #4965f2', color: '#ffffff', borderRadius: '6px' }}>Go to Apps</button>
    </Flex>
  ), []);

  if (Boolean(appError)) {
    return (
      <Flex align="center" justify="center" vertical style={{
        height: '300px',
        width: '400px',
        margin: '0 auto',
      }}>
        <h4>{appError}</h4>
        <button onClick={() => history.push(ALL_APPLICATIONS_URL)} style={{ background: '#4965f2', border: '1px solid #4965f2', color: '#ffffff', borderRadius: '6px' }}>Back to Home</button>
      </Flex>
    )
  }

  return (
    <ErrorBoundary fallback={fallbackUI}>
      <Suspense fallback={<EditorSkeletonView />}>
        <AppEditorInternalView
          appInfo={appInfo}
          readOnly={false}
          loading={
            !fetchOrgGroupsFinished || !isDataSourcePluginRegistered || isCommonSettingsFetching
          }
          compInstance={compInstance}
        />
      </Suspense>
    </ErrorBoundary>
  );
});

export default AppEditor;
