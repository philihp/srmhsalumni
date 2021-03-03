import auth0 from '../../lib/auth0'

export default async function login(req, res) {
  try {
    await auth0.handleLogin(req, res, {
      authorizationParams: {
        screen_hint: 'signup', // this prompts the signup screen
      },
    })
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}
