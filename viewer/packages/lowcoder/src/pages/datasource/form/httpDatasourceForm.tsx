import {
  ValueFromOption,
} from "lowcoder-design";

export const AuthTypeOptions = [
  { label: "None", value: "NO_AUTH" },
  { label: "Basic", value: "BASIC_AUTH" },
  { label: "Digest", value: "DIGEST_AUTH" },
  { label: "OAuth 2.0 (Inherit from login)", value: "OAUTH2_INHERIT_FROM_LOGIN" },
  // { label: "OAuth 2.0", value: "oAuth2" },
] as const;

const OAuthGrantTypeOptions = [
  { label: "Authorization Code", value: "authorization_code" },
  { label: "Client Credentials", value: "client_credentials" },
] as const;

export type AuthType = ValueFromOption<typeof AuthTypeOptions>;
export type HttpOAuthGrantType = ValueFromOption<typeof OAuthGrantTypeOptions>;