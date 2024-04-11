import { getServerSession } from "next-auth"
import { authOptions } from "./auth"

export const getUserSession = async () => {
  const session = await getServerSession(authOptions)
  return session?.user
}
