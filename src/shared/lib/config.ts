import { z } from 'zod'

/**
 * ✅ DX Best practice (Type safe)
 *
 * Validate env variables with zod
 */
const envVariables = z.object({
  VITE_API_ENDPOINT: z.string().url(),
  VITE_API_DELAY: z
    .string()
    .regex(/^\d+$/, { message: 'Must be a positive number' })
    .optional(),
  VITE_API_USER_EMAIL: z.string().min(1).email(),
  VITE_API_USER_PASSWORD: z.string().min(6),
  VITE_JWT_SECRET: z.string().min(1),
})

// envVariables.parse(import.meta.env)

declare global {
  interface ImportMetaEnv extends z.infer<typeof envVariables> {}
}

export const config = {
  API_ENDPOINT: 'https://monopoly-back.onrender.com/api',
  // API_ENDPOINT: 'http://localhost:4444/api',
  BASE_WS_URL:  'wss://monopoly-back.onrender.com/api',
  // BASE_WS_URL:  'ws://localhost:4444/api',
  SELECTION_URL: 'ws-session',
  // API_DELAY: Number(import.meta.env.VITE_API_DELAY) || 100,
} as const