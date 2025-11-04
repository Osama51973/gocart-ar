import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LOCALES = ['en','ar']
const DEFAULT_LOCALE = 'en'
const PUBLIC_FILE = /\.(.*)$/

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  const { pathname } = url

  // ignore assets, api, next internals
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || PUBLIC_FILE.test(pathname)) {
    return
  }

  const segs = pathname.split('/').filter(Boolean)
  // already localized -> no redirect
  if (segs[0] && LOCALES.includes(segs[0])) return

  // optionally use cookie to remember user's choice
  const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value
  const locale = cookieLocale && LOCALES.includes(cookieLocale) ? cookieLocale : DEFAULT_LOCALE

  // redirect to /{locale}{pathname}
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next|api|static).*)']
}