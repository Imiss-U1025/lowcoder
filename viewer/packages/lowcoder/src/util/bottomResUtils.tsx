import styled from "styled-components";
import { ResourceType } from "@lowcoder-ee/constants/queryConstants";
/* import {
  ClickHouseIcon,
  DataResponderIcon,
  DeleteApiIcon,
  EsIcon,
  FileFolderIcon,
  GetApiIcon,
  GoogleSheetsIcon,
  GraphqlIcon,
  HeadApiIcon,
  JSIcon,
  MariaDBIcon,
  MongoIcon,
  MSSQLIcon,
  MysqlIcon,
  LowcoderQueryIcon,
  OptionsApiIcon,
  OracleIcon,
  PatchApiIcon,
  PostApiIcon,
  PostgresIcon,
  PutApiIcon,
  QueryLibraryIcon,
  RedisIcon,
  RestApiIcon,
  SMTPIcon,
  SnowflakeIcon,
  TempStateIcon,
  TraceApiIcon,
  TransformerIcon,
} from "lowcoder-design"; */
import { BottomResTypeEnum } from "types/bottomRes";
import { HttpMethod } from "api/api";

/* const QueryLibrary = styled(QueryLibraryIcon)`
  g g g {
    stroke: #222222;
  }
`; */

export const IconWrapper = styled.div<{ $isRestApi?: boolean }>`
  display: flex;
  width: ${(props) => (props.$isRestApi ? "26px" : "16px")};
  height: ${(props) => (props.$isRestApi ? "13px" : "16px")};
  border-radius: 2px;
  flex-shrink: 0;
  margin-right: 4px;
  align-items: center;
`;

export type BottomResType =
  | ResourceType
  | BottomResTypeEnum.TempState
  | BottomResTypeEnum.Transformer
  | BottomResTypeEnum.Folder
  | BottomResTypeEnum.DateResponder;

/* const HttpMethodIcon = {
  DELETE: <DeleteApiIcon />,
  GET: <GetApiIcon />,
  PATCH: <PatchApiIcon />,
  POST: <PostApiIcon />,
  PUT: <PutApiIcon />,
  HEAD: <HeadApiIcon />,
  OPTIONS: <OptionsApiIcon />,
  TRACE: <TraceApiIcon />,
}; */

export const getBottomResIcon = (
  type: BottomResType,
  size?: "middle" | "large",
  defaultIconUrl?: string,
  httpMethod?: HttpMethod
) => {
  /* const getIcon = () => {
    switch (type) {
      case BottomResTypeEnum.TempState:
        return <TempStateIcon />;
      case BottomResTypeEnum.Transformer:
        return <TransformerIcon />;
      case BottomResTypeEnum.DateResponder:
        return <DataResponderIcon />;
      case BottomResTypeEnum.Folder:
        return <FileFolderIcon />;
      case "mysql":
        return <MysqlIcon />;
      case "mongodb":
        return <MongoIcon />;
      case "restApi":
        return httpMethod ? HttpMethodIcon[httpMethod] : <RestApiIcon />;
      case "postgres":
        return <PostgresIcon />;
      case "js":
        return <JSIcon />;
      case "redis":
        return <RedisIcon />;
      case "es":
        return <EsIcon />;
      case "mssql":
        return <MSSQLIcon />;
      case "smtp":
        return <SMTPIcon />;
      case "oracle":
        return <OracleIcon />;
      case "clickHouse":
        return <ClickHouseIcon />;
      case "libraryQuery":
        return <QueryLibrary />;
      case "googleSheets":
        return <GoogleSheetsIcon />;
      case "graphql":
        return <GraphqlIcon />;
      case "lowcoderApi":
        return <LowcoderQueryIcon />;
      case "snowflake":
        return <SnowflakeIcon />;
      case "mariadb":
        return <MariaDBIcon />;
      default:
        if (defaultIconUrl) {
          return getBottomResIconInnerByUrl(type, defaultIconUrl);
        }
        return <RestApiIcon />;
    }
  }; */

  return <IconWrapper></IconWrapper>;
};
