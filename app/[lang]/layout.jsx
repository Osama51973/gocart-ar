// /app/[lang]/layout.js

import { getDirection } from '../../i18nConfig';
import ClientProvider from '@/i18n/ClientProvider';
import Header from '@/components/Header'; // 👈 Import Header
import ClerkProviderClient from '@/components/ClerkProviderClient';

export default function RootLayout({ children, params }) {
  const { lang } = params;
  const dir = getDirection(lang);

  return (
    <html lang={lang} dir={dir}>
      <body>
        {/* Wrap the app with a client-side ClerkProvider so client components
            that call useUser/useClerk (like Navbar) have the required context. */}
        <ClerkProviderClient>
          <ClientProvider lng={lang}>
            {/* 💥 NEW: Render the Header component, passing the current language */}
            <Header lang={lang} /> 
            {children}
          </ClientProvider>
        </ClerkProviderClient>
      </body>
    </html>
  );
}