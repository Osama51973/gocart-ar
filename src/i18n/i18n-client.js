// /src/i18n/i18n-client.js
'use client'; // 👈 Must be a Client Component

import i18next from 'i18next';
import { initReactI18next, useTranslation as useTranslationOriginal } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { i18nConfig } from '../../i18nConfig';

const runsOnServerSide = typeof window === 'undefined';

// We initialize i18next only once on the client side
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend((language, namespace) => 
      import(`../../public/locales/${language}/${namespace}.json`)
    )
  )
  .init({
    ...i18nConfig,
    // Defer detection and setting language to Next.js routing
    lng: runsOnServerSide ? undefined : i18nConfig.defaultLocale,
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
      lookupPath: 'lng', // Look up language from URL path first
    }
  });

// Custom hook wrapper to simplify imports and pass namespace
export function useTranslation(ns, options) {
  // Use the original hook from react-i18next
  return useTranslationOriginal(ns, options);
}