import { app } from "@/backend/server"
import { handle } from "hono/vercel"

export const runtime = "edge"
// Hono
export const GET = handle(app)
export const POST = handle(app)
export const DELETE = handle(app)
export const PUT = handle(app)
export const PATCH = handle(app)
