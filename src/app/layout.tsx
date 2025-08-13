import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';
import { ThemeToggle } from '@/components/ThemeToggle';
import { FavoritesCounter } from '@/components/FavoritesCounter';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rick & Morty Character Explorer",
  description: "Explore characters from the Rick and Morty universe with search, filters, and favorites.",
  keywords: ["Rick and Morty", "characters", "API", "React", "Next.js"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('rick-morty-theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const shouldBeDark = theme ? theme === 'dark' : prefersDark;
                  
                  const html = document.documentElement;
                  
                  if (shouldBeDark) {
                    html.classList.add('dark');
                    html.style.colorScheme = 'dark';
                    html.setAttribute('data-theme', 'dark');
                  } else {
                    html.classList.remove('dark');
                    html.style.colorScheme = 'light';
                    html.setAttribute('data-theme', 'light');
                  }
                } catch (e) {
                  console.warn('Theme initialization failed:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} h-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased transition-colors duration-300`}>
        <Providers>
          <div className="min-h-full">
            <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Rick & Morty Character Explorer
                  </h1>
                  <div className="flex items-center gap-4">
                    <FavoritesCounter />
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
