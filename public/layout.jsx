// layout.jsx is a Server Component, but it can import a Client Component

import ReduxProvider from '@/app/providers/ReduxProvider'; 

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {/* Everything inside ReduxProvider can now use useSelector, including Navbar */}
        <ReduxProvider>
          {children} 
        </ReduxProvider>
      </body>
    </html>
  );
}