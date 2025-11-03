// /app/[lang]/page.js

import { getT } from '@/i18n/i18n-server';
import LanguageSwitcher from '@/components/LanguageSwitcher'; // 👈 Import the switcher

export default async function HomePage({ params }) {
  const { lang } = params;
  const t = await getT(lang, 'common');

  return (
    <main style={{ padding: '20px', textAlign: lang === 'ar' ? 'right' : 'left' }}>
      {/* RENDER THE SWITCHER */}
      <LanguageSwitcher /> 
      
      <h1>{t('welcome_message')}</h1>
      <p>Current Locale: {lang}</p>
      
      {/* Example of a translated paragraph using a key */}
      <p>{t('language_switcher')}: {t('language_switcher_description') || 'Change the language via the button above.'}</p>
    </main>
  );
}