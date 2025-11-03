'use client'
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClerkProviderClient from '@/components/ClerkProviderClient';
import StoreProvider from '../StoreProvider';

export default function PublicLayout({ children }) {

    return (
        <ClerkProviderClient>
            <StoreProvider>
                <div className="container">
                    <Banner />
                    <Navbar />
                </div>
                {children}
                <Footer />
            </StoreProvider>
        </ClerkProviderClient>
    );
}
