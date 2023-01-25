import API, { AuthAPI, SigninData, SignupData } from '../api/AuthAPI'

const REDIRECT_URI = 'http://siberia-agario-19.ya-praktikum.tech:3000/oauth'
const HOME_PAGE_URI = 'http://siberia-agario-19.ya-praktikum.tech:3000'

export class AuthController {
  private readonly api: AuthAPI

  constructor() {
    this.api = API
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data)

      await this.fetchUser()
    } catch (e: unknown) {
      console.error(e)
    }
  }

  async signinOAuthBegin() {
    try {
      const { service_id } = await this.api.getOAuthServiceId()

      location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${REDIRECT_URI}`
    } catch (e: unknown) {
      console.error(e)
    }
  }

  async signinOAuthEnd(code: string | null) {
    try {
      if (code) {
        await this.api.signinOAuth({ code, redirect_uri: REDIRECT_URI })

        await this.fetchUser()
      }
    } catch (e: unknown) {
      console.error(e)
    }
    location.href = HOME_PAGE_URI
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data)

      await this.fetchUser()
    } catch (e: unknown) {
      console.error(e)
    }
  }

  async fetchUser() {
    await this.api.read()
  }

  async logout() {
    try {
      await this.api.logout()
    } catch (e: unknown) {
      console.error(e)
    }
  }
}

export default new AuthController()
