// /src/i18n/ClientProvider.js
'use client'; // 👈 Must be a Client Component

import { I18nextProvider } from 'react-i18next';
import i18next from './i18n-client'; // Imports the initialized client-side instance

// This provider is used in the main layout
export default function ClientProvider({ children, lng }) {
  // Set the language context based on the current route parameter
  i18next.changeLanguage(lng);
  
  return (
    <I18nextProvider i18n={i18next}>
      {children}
    </I18nextProvider>
  );
}