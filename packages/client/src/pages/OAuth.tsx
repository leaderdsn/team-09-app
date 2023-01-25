import { useEffect } from 'react'
import AuthController from '@/controllers/AuthController'

const OAuth = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    const code = params.get('code')

    AuthController.signinOAuthEnd(code)
  })

  return (
    <>
    </>
  )
}

export default OAuth
