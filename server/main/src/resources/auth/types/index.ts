export type JwtPayload = {
  login: string;
  sub: number;
};

export type Tokens = {
  access_token: string;
  refresh_token: string;
};
export type JwtPayloadWithRt = JwtPayload & {
  refresh_token: Tokens['refresh_token'];
};
export type RefreshResponse = {
  access_token: Tokens['access_token'];
};
