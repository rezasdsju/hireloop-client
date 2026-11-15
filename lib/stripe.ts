import 'server-only'

import Stripe from 'stripe'

let stripeClient: Stripe | null = null

/**
 * Creates the Stripe client on first use instead of at module load.
 *
 * This keeps `next build` and unrelated routes working when the secret key is
 * only available at runtime.
 */
export const getStripe = () => {
    const secretKey = process.env.STRIPE_SECRET_KEY

    if (!secretKey) {
        throw new Error('STRIPE_SECRET_KEY is not configured')
    }

    stripeClient ??= new Stripe(secretKey)
    return stripeClient
}
