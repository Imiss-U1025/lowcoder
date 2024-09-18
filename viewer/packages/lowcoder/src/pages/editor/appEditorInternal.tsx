import { AppSummaryInfo } from "redux/reduxActions/applicationActions";
import { useEffect } from "react";
import { default as ConfigProvider } from "antd/es/config-provider";
import { default as message } from "antd/es/message";
import { RootCompInstanceType } from "./useRootCompInstance";
import React from "react";
import { isEqual } from "lodash";

interface AppEditorInternalViewProps {
  readOnly: boolean;
  appInfo: AppSummaryInfo;
  loading: boolean;
  compInstance: RootCompInstanceType;
}

export const AppEditorInternalView = React.memo((props: AppEditorInternalViewProps) => {
  const { compInstance } = props;

  useEffect(() => {
    message.config({ top: 0 });
  }, []);

  const loading =
    !compInstance || !compInstance.comp || !compInstance.comp.preloaded || props.loading;

  return loading ? (<div></div>) : (
    <ConfigProvider>
      {compInstance?.comp?.getView()}
    </ConfigProvider>
  );
}, (prevProps, nextProps) => {
  return isEqual(prevProps, nextProps)
});
