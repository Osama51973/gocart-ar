'use client'
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClerkProviderClient from '@/components/ClerkProviderClient';

export default function PublicLayout({ children }) {

    return (
        <ClerkProviderClient>
            <Banner />
            <Navbar />
            {children}
            <Footer />
        </ClerkProviderClient>
    );
}
