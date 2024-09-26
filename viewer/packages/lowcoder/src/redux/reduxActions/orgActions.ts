import { GroupUser, OrgUser } from "constants/orgConstants";
import { ReduxActionTypes } from "constants/reduxActionConstants";

export type OrgUsersPayload = {
  members: OrgUser[];
  visitorRole: string;
};

export type GroupUsersPayload = {
  members: GroupUser[];
  visitorRole: string;
};

export type UpdateGroupActionPayload = {
  groupId: string;
  updates: Record<string, string>;
  orgId: string;
};

export const fetchGroupsAction = (orgId: string) => ({
  type: ReduxActionTypes.FETCH_ORG_GROUPS,
  payload: {
    orgId,
  },
});

export type UpdateUserOrgRolePayload = {
  role: string;
  userId: string;
  orgId: string;
};

export type UpdateUserGroupRolePayload = {
  role: string;
  userId: string;
  groupId: string;
};

export type FetchUsersActionPayload = {
  groupId: string;
};

export type RemoveGroupUserPayload = {
  groupId: string;
  userId: string;
};

export type AddGroupUserPayload = {
  role: string;
  groupId: string;
  userId: string;
};

export type DeleteOrgUserPayload = {
  orgId: string;
  userId: string;
};

export type UpdateOrgPayload = {
  id: string;
  orgName?: string;
  logoUrl?: string;
};

export const updateOrgSuccess = (payload: UpdateOrgPayload) => {
  return {
    type: ReduxActionTypes.UPDATE_ORG_SUCCESS,
    payload: payload,
  };
};


// till now
export type OrgAPIUsagePayload = {
  apiUsage: number,
};
export const fetchAPIUsageAction = (
  orgId: string,
) => ({
  type: ReduxActionTypes.FETCH_ORG_API_USAGE,
  payload: {
    orgId,
  },
});

export const fetchAPIUsageActionSuccess = (payload: OrgAPIUsagePayload) => {
  return {
    type: ReduxActionTypes.FETCH_ORG_API_USAGE_SUCCESS,
    payload: payload,
  };
};

// last month
export type OrgLastMonthAPIUsagePayload = {
  lastMonthApiUsage: number,
};

export const fetchLastMonthAPIUsageActionSuccess = (payload: OrgLastMonthAPIUsagePayload) => {
  return {
    type: ReduxActionTypes.FETCH_ORG_LAST_MONTH_API_USAGE_SUCCESS,
    payload: payload,
  };
};