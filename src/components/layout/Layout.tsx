
import { ReactNode, memo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = memo(({ children }: LayoutProps) => {
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  
  // Check if the current route is the dashboard
  const isDashboard = location.pathname === "/dashboard";

  useEffect(() => {
    setMounted(true);
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className={`flex flex-col min-h-screen w-full overflow-hidden bg-white dark:bg-rocket-gray-900 transition-colors duration-500 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
      {!isDashboard && (
        <div className="w-full bg-gradient-to-b from-white to-transparent dark:from-rocket-gray-900 dark:to-transparent transition-all duration-500">
          <Header />
        </div>
      )}
      <main className="flex-grow w-full transition-all duration-300 text-rocket-gray-900 dark:text-white">
        {children}
      </main>
      <div className="animate-fade-in" style={{ animationDelay: '1.2s' }}>
        <Footer />
      </div>
    </div>
  );
});

Layout.displayName = 'Layout';

export default Layout;
