import auth0 from '../../lib/auth0'

export default async function me(req, res) {
  try {
    await auth0(req).handleProfile(req, res)
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}
