import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import { DashBoardLayout } from '@/components/organisms/dashboard';
import { AppProvider } from '@/containers/appProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Device',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <AppProvider>
            <DashBoardLayout>{children}</DashBoardLayout>
          </AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
