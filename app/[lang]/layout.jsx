// /app/[lang]/layout.js

import { getDirection } from '../../i18nConfig'; // Import your helper
import ClientProvider from '@/i18n/ClientProvider'; // Import the new provider

export default function RootLayout({ children, params }) {
  const { lang } = params;
  const dir = getDirection(lang); // Use the helper from i18nConfig

  return (
    // 1. Set the language and direction on the <html> tag
    <html lang={lang} dir={dir}>
      <body>
        {/* 2. Wrap children with the ClientProvider */}
        <ClientProvider lng={lang}>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}