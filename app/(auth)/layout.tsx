import Navbar from "@/components/shared/navbar/Navbar"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar></Navbar>
      <main className="relative isolate flex min-h-[calc(100svh-5rem)] items-center justify-center overflow-hidden px-4 py-12">
        {/* Decorative background, same treatment as the hero */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="starfield absolute inset-0 hidden dark:block" />
          <div className="absolute top-1/2 left-1/2 h-80 w-160 -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-indigo-600/15 blur-[120px]" />
        </div>

        <div className="w-full max-w-md">{children}</div>
      </main>
    </>
  )
}
