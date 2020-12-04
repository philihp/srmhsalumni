import Stripe from 'stripe'

/*
Due to PCI compliance requirements, the Stripe.js library has to be loaded from
Stripe's servers. This creates a challenge when working with server-side
rendered apps, as the window object is not available on the server. To
help you manage this, Stripe provides a loading wrapper that allows you to
import Stripe.js as an ES module
*/

const apiVersion = '2020-08-27'
export default new Stripe(process.env.STRIPE_PRIVATE, { apiVersion })
