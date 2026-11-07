import { Geist, Geist_Mono } from "next/font/google"
import type { Metadata } from "next"


import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import Navbar from "@/components/shared/navbar/Navbar";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})
export const metadata: Metadata = {
  title: "HireLoop - Job Portal",
  description:
    "Search jobs, post openings and hire talent. Recruiters submit job posts and admins review and approve all listings.",
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body>
        <ThemeProvider>
          <Navbar></Navbar>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
