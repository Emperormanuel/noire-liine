import './globals.css';
import { DM_Sans } from 'next/font/google';
import { CartProvider } from '@/lib/cart';
import { SITE } from '@/lib/site';
import Header from '@/components/Header';

const font = DM_Sans({ subsets: ['latin'], variable: '--font' });

export const metadata = { title: `${SITE.name} | Nigerian Fashion`, description: SITE.tagline };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={font.variable}>
      <body>
        <CartProvider>
          <div className="shell">
            <Header />
            <main>{children}</main>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
