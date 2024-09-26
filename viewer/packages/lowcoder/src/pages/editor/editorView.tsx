
import { PreloadComp } from "comps/comps/preLoadComp";
import UIComp from "comps/comps/uiComp";
import { EditorContext } from "comps/editorState";
import { AppPathParams } from "constants/applicationConstants";
import { Layers } from "constants/Layers";
import { TopHeaderHeight } from "constants/style";
import { useTemplateViewMode } from "util/hooks";
import {
  editorContentClassName,
} from "pages/tutorials/tutorialsConstant";
import React, {
  Suspense,
  lazy,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { currentApplication } from "redux/selectors/applicationSelector";
import { showAppSnapshotSelector } from "redux/selectors/appSnapshotSelector";
import styled from "styled-components";
import { ExternalEditorContext } from "util/context/ExternalEditorContext";
import { getCommonSettings } from "@lowcoder-ee/redux/selectors/commonSettingSelectors";
const CustomShortcutWrapper = lazy(
  () => import('pages/editor/editorHotKeys')
    .then(module => ({ default: module.CustomShortcutWrapper }))
);
const EditorHotKeys = lazy(
  () => import('pages/editor/editorHotKeys')
    .then(module => ({ default: module.EditorHotKeys }))
);
const Body = lazy(
  () => import('pages/common/styledComponent')
    .then(module => ({ default: module.Body }))
);
const EditorContainer = lazy(
  () => import('pages/common/styledComponent')
    .then(module => ({ default: module.EditorContainer }))
);
const EditorContainerWithViewMode = lazy(
  () => import('pages/common/styledComponent')
    .then(module => ({ default: module.EditorContainerWithViewMode }))
);
const MiddlePanel = lazy(
  () => import('pages/common/styledComponent')
    .then(module => ({ default: module.MiddlePanel }))
);

const HookCompContainer = styled.div`
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  contain: paint;
  z-index: ${Layers.hooksCompContainer};
`;

const ViewBody = styled.div<{ $hideBodyHeader?: boolean; $height?: number }>`
  height: ${(props) => `calc(${props.$height ? props.$height + "px" : "100vh"
    } - env(safe-area-inset-bottom) -
      ${props.$hideBodyHeader ? "0px" : TopHeaderHeight}
  )`};
`;

export const EditorWrapper = styled.div`
  overflow: auto;
  position: relative;
  flex: 1 1 0;
`;

interface EditorViewProps {
  uiComp: InstanceType<typeof UIComp>;
  preloadComp: InstanceType<typeof PreloadComp>;
}

function EditorView(props: EditorViewProps) {
  const { uiComp } = props;
  const params = useParams<AppPathParams>();
  const editorState = useContext(EditorContext);
  const { readOnly, hideHeader } = useContext(ExternalEditorContext);
  const application = useSelector(currentApplication);
  const commonSettings = useSelector(getCommonSettings);
  const showAppSnapshot = useSelector(showAppSnapshotSelector);
  const [height, setHeight] = useState<number>();

  const isViewMode = params.viewMode === 'view';

  const appSettingsComp = editorState.getAppSettingsComp();
  const { showHeaderInPublic } = appSettingsComp.getView();


  // added by Falk Wolsky to support a Layout and Logic Mode in Lowcoder

  const hookCompViews = useMemo(() => {
    return Object.keys(editorState.getHooksComp().children).map((key) => (
      // use appId as key, remount hook comp when app change. fix hookStateComp empty value
      <div key={key + "-" + application?.applicationId}>
        {editorState.getHooksComp().children[key].getView()}
      </div>
    ));
  }, [editorState]);

  useLayoutEffect(() => {
    function updateSize() {
      setHeight(window.innerHeight);
    }

    const eventType =
      "orientationchange" in window ? "orientationchange" : "resize";
    window.addEventListener(eventType, updateSize);
    updateSize();
    return () => window.removeEventListener(eventType, updateSize);
  }, []);

  const hideBodyHeader = useTemplateViewMode() || (isViewMode && (!showHeaderInPublic || !commonSettings.showHeaderInPublicApps));

  // we check if we are on the public cloud
  const isLowCoderDomain = window.location.hostname === 'app.lowcoder.cloud';
  const isLocalhost = window.location.hostname === 'localhost';
  if (readOnly && hideHeader) {
    return (
      <CustomShortcutWrapper>
        {uiComp.getView()}
        <div style={{ zIndex: Layers.hooksCompContainer }}>{hookCompViews}</div>
      </CustomShortcutWrapper>
    );
  }

  if (readOnly && !showAppSnapshot) {
    return (
      <CustomShortcutWrapper>
        <Helmet>
          {application && <title>{application.name}</title>}
          {isLowCoderDomain || isLocalhost && [
            // Adding Support for iframely to be able to embedd apps as iframes
            application?.name ? ([
              <meta key="iframely:title" property="iframely:title" content={application.name} />,
              <meta key="iframely:description" property="iframely:description" content={application.description} />,
            ]) : ([
              <meta key="iframely:title" property="iframely:title" content="Lowcoder 3" />,
              <meta key="iframely:description" property="iframely:description" content="Lowcoder | rapid App & VideoMeeting builder for everyone." />,
            ]),
            <link rel="iframely" type="text/html" href={window.location.href} media="(aspect-ratio: 1280/720)" />,
            <link key="preconnect-googleapis" rel="preconnect" href="https://fonts.googleapis.com" />,
            <link key="preconnect-gstatic" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />,
            <link key="font-ubuntu" href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,700;1,400&display=swap" rel="stylesheet" />,
            // adding Clearbit Support for Analytics
            <script key="clearbit-script" src="https://tag.clearbitscripts.com/v1/pk_dfbc0aeefb28dc63475b67134facf127/tags.js" referrerPolicy="strict-origin-when-cross-origin" type="text/javascript"></script>
          ]}
        </Helmet>
        <Suspense>
          <EditorContainerWithViewMode>
            <ViewBody $hideBodyHeader={hideBodyHeader} $height={height}>
              {uiComp.getView()}
            </ViewBody>
            <div style={{ zIndex: Layers.hooksCompContainer }}>
              {hookCompViews}
            </div>
          </EditorContainerWithViewMode>
        </Suspense>
      </CustomShortcutWrapper>
    );
  }

  // history mode, display with the right panel, a little trick
  let uiCompView;
  if (showAppSnapshot) {
    uiCompView = (
      <ViewBody $hideBodyHeader={hideBodyHeader} $height={height}>
        <EditorContainer>{uiComp.getView()}</EditorContainer>
      </ViewBody>
    );
  } else {
    uiCompView = uiComp.getView();
  }
  return (
    <>
      <Helmet>
        {application && <title>{application.name}</title>}
        {isLowCoderDomain || isLocalhost && [
          // Adding Support for iframely to be able to embedd apps as iframes
          application?.name ? ([
            <meta key="iframely:title" property="iframely:title" content={application.name} />,
            <meta key="iframely:description" property="iframely:description" content={application.description} />,
          ]) : ([
            <meta key="iframely:title" property="iframely:title" content="Lowcoder 3" />,
            <meta key="iframely:description" property="iframely:description" content="Lowcoder | rapid App & VideoMeeting builder for everyone." />,
          ]),
          <link rel="iframely" type="text/html" href={window.location.href} media="(aspect-ratio: 1280/720)" />,
          <link key="preconnect-googleapis" rel="preconnect" href="https://fonts.googleapis.com" />,
          <link key="preconnect-gstatic" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />,
          <link key="font-ubuntu" href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,700;1,400&display=swap" rel="stylesheet" />,
          // adding Clearbit Support for Analytics
          <script key="clearbit-script" src="https://tag.clearbitscripts.com/v1/pk_dfbc0aeefb28dc63475b67134facf127/tags.js" referrerPolicy="strict-origin-when-cross-origin" type="text/javascript"></script>
        ]}
      </Helmet>
      <Body>
        <MiddlePanel>
          <EditorWrapper className={editorContentClassName}>
            <EditorHotKeys disabled={readOnly}>
              <EditorContainerWithViewMode>
                {uiCompView}
                <HookCompContainer>{hookCompViews}</HookCompContainer>
              </EditorContainerWithViewMode>
            </EditorHotKeys>
          </EditorWrapper>
        </MiddlePanel>
      </Body>
    </>
  );
}

export default EditorView;
