import HTTPTransport from '../utils/HTTPTransport';

export interface SigninData {
  login: string;
  password: string;
}

export interface OauthSigninData {
  code: string;
  redirect_uri: string;
}

export interface GetServiceIdResponse {
  service_id: string
}

export interface SignupData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface User extends Record<string, any> {
  id: number;
  first_name: string;
  second_name: string;
  display_name?: string;
  login: string;
  email: string;
  password?: string;
  phone: string;
  avatar: string;
}

export class AuthAPI {
  protected http: HTTPTransport;
  protected httpOAuth: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport('/auth');
    this.httpOAuth = new HTTPTransport('/oauth');
  }

  signin(data: SigninData) {
    return this.http.post('/signin', data);
  }

  getOAuthServiceId(): Promise<GetServiceIdResponse> {
    return this.httpOAuth.get('/yandex/service-id?redirect_uri=localhost');
  }

  signinOAuth(data: OauthSigninData) {
    return this.httpOAuth.post('/yandex', data);
  }

  signup(data: SignupData) {
    return this.http.post('/signup', data);
  }

  read(): Promise<User> {
    return this.http.get('/user');
  }

  logout() {
    return this.http.post('/logout');
  }
}

export default new AuthAPI();
