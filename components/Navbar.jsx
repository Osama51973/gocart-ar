"use client"
import { PackageIcon, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useUser,useClerk,UserButton } from "@clerk/nextjs";

const Navbar = () => {
    const {user}=useUser()
    const {openSignIn}=useClerk()
    const router = useRouter();
    const pathname = usePathname() || '/';
    const segments = pathname.split('/');
    const currentLang = segments[1] && ['en','ar'].includes(segments[1]) ? segments[1] : 'en';

    const withLang = (path) => `/${currentLang}${path.startsWith('/') ? path : `/${path}`}`;
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(v => !v);

    const [search, setSearch] = useState('')
    const cartCount = useSelector(state => state.cart.total)

    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`${withLang('/shop')}?search=${encodeURIComponent(search)}`)
    }

    return (
        <nav className="site-nav">
            <div className="nav-inner container">
                <Link href={withLang('/')} className="brand">
                    <span className="brand-go">go</span>cart<span className="brand-dot">.</span>
                    <span className="brand-pill">plus</span>
                </Link>

                <div className="nav-links" aria-hidden={!menuOpen}>
                    <Link href={withLang('/')}>Home</Link>
                    <Link href={withLang('/shop')}>Shop</Link>
                    <Link href={withLang('/about')}>About</Link>
                    <Link href={withLang('/contact')}>Contact</Link>
                </div>

                <div className="nav-actions">
                    <form onSubmit={handleSearch} className="search-form">
                        <Search size={18} />
                        <input type="text" placeholder="Search products" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </form>

                    <Link href={withLang('/cart')} className="cart-link">
                        <ShoppingCart size={18} />
                        <span className="cart-count">{cartCount}</span>
                    </Link>

                    { !user ? (
                        <button onClick={openSignIn} className="btn btn-primary">Login</button>
                    ) : (
                        <UserButton>
                            <UserButton.MenuItems>
                                <UserButton.Action labelIcon={<PackageIcon size={16}/>} label="My Orders" onClick={()=>router.push(withLang('/orders'))}/>
                            </UserButton.MenuItems>
                        </UserButton>
                    ) }
                </div>
                {/* Mobile menu toggle */}
                <button aria-label="Toggle menu" className="mobile-toggle" onClick={toggleMenu}>
                    {menuOpen ? '✕' : '☰'}
                </button>
            </div>
            <hr />
        </nav>
    )
}

export default Navbar