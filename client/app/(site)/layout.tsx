import './globals.css';
import type { Metadata } from 'next';
import Providers from '../components/Providers';

export const metadata: Metadata = {
  title: 'Strike',
  description: 'Get things done',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
