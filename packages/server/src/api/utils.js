const cookieStorage = require('../storage/cookie')

const SERVER_URI = 'https://ya-praktikum.tech/api/v2'

function parseCookie(c) {
  const div1 = c.indexOf('=')
  const div2 = c.indexOf(';')
  const name = c.slice(0, div1)
  const value = c.slice(div1 + 1, div2)
  return { name, value }
}

function request(req, res, method, endpoint) {
  const userData = req.body
  const body = JSON.stringify(userData)
  const url = SERVER_URI + endpoint

  let options = {
    method,
    credentials: 'include',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    }
  }
  if (body !== '{}') {
    options.body = body
  }
  if (req.cookies.authCookie && req.cookies.uuid) {
    options.headers.Cookie = `authCookie=${req.cookies.authCookie}; uuid=${req.cookies.uuid}`
  }

  fetch(url, options)
    .then((response) => {
      //console.log('response: ', response)
      const cookies = response.headers.get('set-cookie')
      if (cookies) {
        let cookiePack = {}
        cookies.split('SameSite=None, ').forEach((c) => {
          const cookie = parseCookie(c)
          cookiePack[cookie.name] = cookie.value
          res.cookie(cookie.name, cookie.value)
        })
        if (cookiePack.uuid && cookiePack.authCookie) {
          cookieStorage[cookiePack.uuid] = cookiePack.authCookie
        } else {
          cookieStorage[req.cookies.uuid] = ''
        }
      }
      response.text().then((data) => res.send(data))
    })
    .catch((error) => {
      console.error('Error:', error)
      res.status(500).send('error')
    })
}

module.exports = { request }
