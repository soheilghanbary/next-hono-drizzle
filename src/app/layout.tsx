import "@styles/globals.css"

import { QueryProvider } from "@components/providers/query-provider"
import { ThemeProvider } from "@components/providers/theme-provider"
import { siteConfig } from "@config/site"
import { Toaster } from "@ui/sonner"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { type PropsWithChildren } from "react"

const font = Inter({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin-ext"],
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={font.className} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="theme-color" href="#14B8A6" />
      </head>
      <body>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            enableColorScheme
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
