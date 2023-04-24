import { Cookies } from "react-cookie"
import { Cookie, CookieSetOptions } from "universal-cookie"

const cookies = new Cookies()

export const getCookie = (name: string) => {
  try {
    return cookies.get(name)
  } catch (err) {
    console.error(err)
  }
}

export const setCookie = (
  name: string,
  value: Cookie,
  options?: CookieSetOptions
) => {
  try {
    cookies.set(name, value, { ...options })
  } catch (err) {
    console.error(err)
  }
}

export const removeCookie = (name: string, options?: CookieSetOptions) => {
  try {
    cookies.remove(name, { ...options })
  } catch (err) {
    console.error(err)
  }
}
