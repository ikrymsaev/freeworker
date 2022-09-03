export type JwtPayload = {
  email: string;
  sub: number;
};

export type JwtPayloadWithRt = JwtPayload & { refresh_token: string };

export type Tokens = {
  access_token: string;
  refresh_token: string;
};
