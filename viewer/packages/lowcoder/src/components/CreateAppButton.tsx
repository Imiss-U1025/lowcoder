import { ApplicationDetail, AppTypeEnum } from "constants/applicationConstants";
import { ActiveTextColor, LightActiveTextColor } from "constants/style";
import { User } from "constants/userConstants";
import _ from "lodash";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "redux/reducers";
import { createApplication } from "redux/reduxActions/applicationActions";
import styled from "styled-components";
import { getNextEntityName } from "util/stringUtils";
import { trans } from "i18n";
import { normalAppListSelector } from "../redux/selectors/applicationSelector";
import { HomeResInfo } from "util/homeResUtils";

const CreateSpan = styled.span`
  margin: 0 8px;
  cursor: pointer;
  color: ${LightActiveTextColor};

  &:hover {
    color: ${ActiveTextColor};
  }
`;

interface SelectedState {
  currentUser: User;
  isCreating: boolean;
}


interface IProps {
  type: AppTypeEnum;
  onSuccess?: (app: ApplicationDetail) => void;
}

