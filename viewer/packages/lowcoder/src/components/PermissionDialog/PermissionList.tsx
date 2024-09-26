import { ApplicationPermissionType, ApplicationRoleType } from "constants/applicationConstants";
export interface PermissionItem {
  permissionId: string;
  type: ApplicationPermissionType;
  id: string;
  avatar?: string;
  role: ApplicationRoleType;
  name: string;
}