import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/context/ModalContext";
import QueryProvider from "@/components/providers/query-provider";
import connect from "@/lib/db";
import { ConvexClientProvider } from "@/components/providers/convexProvider";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Code Snippets",
  description: "Created by Aliev Davlatebk",
};
const bootstrap = async () => {
  await connect()
}

bootstrap()


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClientProvider>

      <html lang="en">
        <head>
          <link
            rel="icon"
            href="../public/vercel.png"
            type="image/png"
            sizes="32x32"
          />
        </head>
        <body className={raleway.className}>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              storageKey="code-theme"
              disableTransitionOnChange>
              <div className="inset-0 w-full h-full absolute">
                <BackgroundBeams />
              </div>
              <ModalProvider>{children}</ModalProvider>
              <Toaster
                position="top-left"
                className="dark:bg-slate-700 dark:text-white bg-white text-slate-800"
              />
            </ThemeProvider>
          </QueryProvider>
        </body>
      </html>
    </ConvexClientProvider>
  );
}
