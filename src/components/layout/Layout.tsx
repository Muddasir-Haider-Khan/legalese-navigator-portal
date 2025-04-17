
import { ReactNode, memo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ChatWidget from "../chat/ChatWidget";

interface LayoutProps {
  children: ReactNode;
  fullWidth?: boolean; // Add option for full-width layouts
}

const Layout = memo(({ children, fullWidth = false }: LayoutProps) => {
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  
  // Check if the current route is the dashboard
  const isDashboard = location.pathname.includes("/dashboard");

  useEffect(() => {
    setMounted(true);
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className={`flex flex-col min-h-screen w-full bg-clean-white transition-colors duration-500 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
      {!isDashboard && <Header />}
      <main className={`flex-grow w-full transition-all duration-300 text-deep-blue ${fullWidth ? '' : 'container-custom mx-auto px-4 sm:px-6 lg:px-8'}`}>
        {children}
      </main>
      <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <Footer />
      </div>
      
      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
});

Layout.displayName = 'Layout';

export default Layout;
