export interface AuthInterface {
  email: string;

  password: string;

  accessToken?: string;

  refreshToken?: string;

  profile?: any;
}
