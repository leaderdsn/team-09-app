import API, {AuthAPI, SigninData, SignupData} from '../api/AuthAPI';

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data);

      await this.fetchUser();
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async signinOAuthBegin() {
    try {
      const { service_id } = await this.api.getOAuthServiceId();

      location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=http://localhost:3000/`;
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async signinOAuthEnd(code: string) {
    try {
      await this.api.signinOAuth({code, redirect_uri: 'http://localhost:3000/'});

      await this.fetchUser();
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async fetchUser() {
    await this.api.read();
  }

  async logout() {
    try {
      await this.api.logout();
    } catch (e: unknown) {
      console.error(e);
    }
  }
}

export default new AuthController();
