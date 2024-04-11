import { buttonVariants } from "@ui/button"
import { type Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "404 . Page is Not Found!",
  description: "404 . Page is Not Found!",
}

export default function NotFoundPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className={"text-center text-lg font-medium"}>
          404 . Page is Not Found!
        </h1>
        <Link href={"/"} className={buttonVariants({ variant: "secondary" })}>
          Back to /
        </Link>
      </div>
    </div>
  )
}
