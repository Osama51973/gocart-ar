// /components/LanguageSwitcher.js
'use client'; // 👈 Must be a Client Component

import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from '@/i18n/i18n-client'; // Import your custom hook

export default function LanguageSwitcher() {
  const { i18n } = useTranslation('common');
  const router = useRouter();
  const pathname = usePathname();
  
  // Determine the next language to switch to
  const currentLang = i18n.language;
  const targetLang = currentLang === 'en' ? 'ar' : 'en';

  const switchLanguage = () => {
    // 1. Construct the new path by replacing the current locale segment
    const newPath = pathname.replace(`/${currentLang}`, `/${targetLang}`);
    
    // 2. Navigate to the new path, triggering the Next.js locale routing
    router.push(newPath);
  };

  return (
    <button onClick={switchLanguage} style={{ margin: '10px', padding: '10px' }}>
      🌐 Switch to {targetLang.toUpperCase()}
    </button>
  );
}