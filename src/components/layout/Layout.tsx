
import { ReactNode, memo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ChatWidget from "../chat/ChatWidget";

interface LayoutProps {
  children: ReactNode;
}

const Layout = memo(({ children }: LayoutProps) => {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Check if the current route is the dashboard
  const isDashboard = location.pathname.includes("/dashboard");

  useEffect(() => {
    setMounted(true);
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add scroll listener to detect when page is scrolled
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`flex flex-col min-h-screen w-full bg-white dark:bg-rocket-gray-900 transition-colors duration-500 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
      {!isDashboard && (
        <div className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? 
            'bg-white/95 dark:bg-rocket-gray-900/95 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-rocket-gray-800' 
            : 'bg-transparent'
        }`}>
          <Header />
        </div>
      )}
      <main className="flex-grow w-full transition-all duration-300 text-rocket-gray-900 dark:text-white">
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
