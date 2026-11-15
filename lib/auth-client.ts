import { createAuthClient } from "better-auth/react"
// The admin client plugin is disabled because user roles are managed by the HireLoop API.
// import { adminClient, inferAdditionalFields } from "better-auth/client/plugins"
import { inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "./auth"

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [
        inferAdditionalFields<typeof auth>(),
        // adminClient()
    ],
})
