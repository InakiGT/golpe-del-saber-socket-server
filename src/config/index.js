import dotenv from 'dotenv'

dotenv.config()

const config = {
  path: process.env.PATH,
  port: process.env.PORT ?? 3000,
  allowedOrigins: JSON.parse(process.env.ALLOWED_ORIGINS ?? "[]"),
}

export default config
