import { getUserSession } from "@lib/services/auth"
import { SignInButton, SignOutButton } from "./auth-button"
import { ToggleTheme } from "./toggle-theme"

export const Header = async () => {
  const session = await getUserSession()
  return (
    <header className="flex items-center justify-between gap-4 border-b p-2">
      <h3 className="font-bold text-foreground">RPC Todo</h3>
      <div className="flex items-center gap-4">
        <ToggleTheme />
        {session ? <SignOutButton /> : <SignInButton />}
      </div>
    </header>
  )
}
