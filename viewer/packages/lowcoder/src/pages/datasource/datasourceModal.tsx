import React, { useEffect, useState } from "react";
import { AddIcon } from "lowcoder-design";
import styled from "styled-components";
import { default as Button } from "antd/es/button";
import StepModal, { StepModalProps } from "components/StepModal";
import { GreyTextColor } from "constants/style";
import { Datasource } from "@lowcoder-ee/constants/datasourceConstants";

const EditButton = styled(Button)`
  font-size: 13px;
  color: #333333;
  text-align: center;
  line-height: 13px;
  background: #f5f5f6;
  border-radius: 4px;
  border: none;
  height: 20px;
  width: 76px;
  margin-right: 12px;
  padding: 4px;

  &:hover {
    color: #315efb;
    background-color: #edeff2;
  }

  &:focus {
    color: #315efb;
    background-color: #edeff2;
  }
`;

const StyledAddIcon = styled(AddIcon)`
  height: 16px;
  width: 16px;
  margin-right: 4px;
`;

const CreateButton = styled(Button)`
  font-size: 13px;
  color: #333333;
  text-align: left;
  line-height: 13px;
  border: none;
  height: 31px;
  display: flex;
  align-items: center;
  padding: 12px;
  box-shadow: none;
  margin-right: 8px;

  &:hover ${StyledAddIcon} path {
    fill: #315efb;
  }

  &:hover {
    color: #333333;
    background-color: #f2f7fc;
    border-color: #c2d6ff;
  }

  &:focus {
    color: #333333;
    background-color: #f2f7fc;
    border-color: #c2d6ff;
  }
`;

type ResourceModalMode = "create" | "edit";

type ResourceModalProps = {
  mode: ResourceModalMode;
  text: string;
  hidden?: boolean;

  datasource?: Datasource;
  onDatasourceChange?: (datasource: Datasource) => void;

  afterMouseDown?: (e: React.MouseEvent) => void; // trigger on open the datasource dialog
};

interface UseDataSourceModalStepsParams {
  datasource?: Datasource;
  onCreated: (datasource: Datasource) => void;
}

export function useDataSourceModalSteps(params: UseDataSourceModalStepsParams) {
    return [];
}

interface CreateDataSourceModalProps extends Omit<StepModalProps, "steps"> {
  dataSource?: Datasource;
  onCreated: (dataSource: Datasource) => void;
}

export function CreateDataSourceModal(props: CreateDataSourceModalProps) {
  const { dataSource, onCreated, ...otherProps } = props;
  const steps = useDataSourceModalSteps({
    datasource: dataSource,
    onCreated,
  });
  const [activeStepKey, setActiveStepKey] = useState(dataSource?.type || "type");

  useEffect(() => {
    if (dataSource) {
      setActiveStepKey("form");
    }
  });

  return (
    <StepModal
      {...otherProps}
      destroyOnClose={true}
      onStepChange={setActiveStepKey}
      activeStepKey={activeStepKey}
      width="888px"
      steps={steps}
      onCancel={(e) => {
        props.onCancel?.(e);
        setActiveStepKey("type");
      }}
    />
  );
}

export const DatasourceModal = (props: ResourceModalProps) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      {props.mode === "create" ? (
        <CreateButton
          onMouseDown={(e) => {
            setVisible(true);
            if (props.afterMouseDown) {
              props.afterMouseDown(e);
            }
            e.stopPropagation();
          }}
        >
          <StyledAddIcon style={{ color: GreyTextColor }} />
          {props.text}
        </CreateButton>
      ) : (
        <EditButton
          hidden={props.hidden}
          onMouseDown={(e) => {
            setVisible(true);
            if (props.afterMouseDown) {
              props.afterMouseDown(e);
            }
            e.stopPropagation();
          }}
        >
          {props.text}
        </EditButton>
      )}

      <div
        onKeyDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <CreateDataSourceModal
          open={visible}
          onCancel={() => setVisible(false)}
          dataSource={props.datasource}
          onCreated={(dataSource: Datasource) => {
            setVisible(false);
            props.onDatasourceChange?.(dataSource);
          }}
        />
      </div>
    </>
  );
};
