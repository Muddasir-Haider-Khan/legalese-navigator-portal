
import { useState, useEffect, memo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggleMinimal } from "@/components/theme/ThemeToggle";
import { cn } from "@/lib/utils";

// Memoize NavLink components to prevent unnecessary re-renders
const NavLink = memo(({ 
  to, 
  children, 
  isActive, 
  scrolled 
}: { 
  to: string; 
  children: React.ReactNode; 
  isActive: boolean;
  scrolled: boolean;
}) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "font-medium transition-colors relative group",
        isActive 
          ? "text-rocket-blue-500 dark:text-rocket-blue-300" 
          : scrolled || to !== "/" 
            ? "text-rocket-gray-600 hover:text-rocket-blue-500 dark:text-rocket-gray-300 dark:hover:text-rocket-blue-300" 
            : "text-rocket-blue-700 hover:text-rocket-blue-500 dark:text-white/90 dark:hover:text-white"
      )}
    >
      {children}
      <span className={cn(
        "absolute bottom-[-4px] left-0 w-full h-0.5 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
        isActive 
          ? "bg-rocket-blue-500 dark:bg-rocket-blue-300 scale-x-100" 
          : "bg-rocket-blue-500 dark:bg-rocket-blue-300"
      )}></span>
    </Link>
  );
});

NavLink.displayName = 'NavLink';

// Memoize MobileNavLink for mobile menu
const MobileNavLink = memo(({ 
  to, 
  children, 
  isActive, 
  onClick 
}: { 
  to: string; 
  children: React.ReactNode; 
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "font-medium transition-colors",
        isActive 
          ? "text-rocket-blue-500 font-semibold dark:text-rocket-blue-300" 
          : "text-rocket-gray-600 hover:text-rocket-blue-500 dark:text-rocket-gray-400 dark:hover:text-rocket-blue-300"
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
});

MobileNavLink.displayName = 'MobileNavLink';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Memoize scroll handler to prevent unnecessary re-renders
  const handleScroll = useCallback(() => {
    if (window.scrollY > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const isActive = useCallback((path: string) => {
    return location.pathname === path;
  }, [location.pathname]);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500",
        scrolled 
          ? "bg-white/95 backdrop-blur-md border-b border-rocket-gray-100 shadow-sm dark:bg-rocket-gray-900/90 dark:border-rocket-gray-800" 
          : "bg-white/80 backdrop-blur-sm dark:bg-transparent"
      )}
    >
      <div className="container-custom py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-rocket-blue-500 flex items-center justify-center text-white font-bold shadow-md transition-transform hover:scale-105 duration-300">
              RL
            </div>
            <span className={cn(
              "text-xl font-bold transition-colors",
              scrolled
                ? "text-rocket-blue-500 dark:text-white" 
                : "text-rocket-blue-700 dark:text-white"
            )}>
              Rocket Lawyer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" isActive={isActive("/")} scrolled={scrolled}>
            Home
          </NavLink>
          <NavLink to="/documents" isActive={isActive("/documents")} scrolled={scrolled}>
            Make Documents
          </NavLink>
          <NavLink to="/ask-a-lawyer" isActive={isActive("/ask-a-lawyer")} scrolled={scrolled}>
            Ask a Lawyer
          </NavLink>
          <NavLink to="/pricing" isActive={isActive("/pricing")} scrolled={scrolled}>
            Pricing
          </NavLink>
          <NavLink to="/advice" isActive={isActive("/advice")} scrolled={scrolled}>
            Legal Advice
          </NavLink>
          <NavLink to="/articles" isActive={isActive("/articles")} scrolled={scrolled}>
            Articles
          </NavLink>
          <NavLink to="/contact" isActive={isActive("/contact")} scrolled={scrolled}>
            Contact Us
          </NavLink>
        </nav>

        {/* Auth Buttons & Theme Toggle */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggleMinimal />
          <Link to="/login">
            <Button variant="outline" 
              className={cn(
                "bg-transparent border-rocket-blue hover:bg-rocket-blue-50 dark:border-rocket-blue-300 dark:hover:bg-rocket-gray-800 transition-all",
                !scrolled && location.pathname === "/" 
                  ? "border-rocket-blue-500 text-rocket-blue-700 hover:bg-rocket-blue-50/50 dark:border-white dark:text-white dark:hover:bg-white/10" 
                  : "text-rocket-blue-600 border-rocket-blue-500 dark:text-rocket-blue-300"
              )}
            >
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-rocket-blue hover:bg-rocket-blue-600 dark:bg-rocket-blue-500 dark:hover:bg-rocket-blue-600 transition-all">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggleMinimal />
          <button 
            className={cn(
              "transition-colors",
              scrolled || location.pathname !== "/" 
                ? "text-rocket-blue-500 dark:text-rocket-blue-300" 
                : "text-rocket-blue-700 dark:text-white"
            )} 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-rocket-gray-100 shadow-md animate-fade-in dark:bg-rocket-gray-900/95 dark:border-rocket-gray-800">
          <nav className="container-custom py-4 flex flex-col space-y-4">
            <MobileNavLink to="/" isActive={isActive("/")} onClick={toggleMenu}>
              Home
            </MobileNavLink>
            <MobileNavLink to="/documents" isActive={isActive("/documents")} onClick={toggleMenu}>
              Make Documents
            </MobileNavLink>
            <MobileNavLink to="/ask-a-lawyer" isActive={isActive("/ask-a-lawyer")} onClick={toggleMenu}>
              Ask a Lawyer
            </MobileNavLink>
            <MobileNavLink to="/pricing" isActive={isActive("/pricing")} onClick={toggleMenu}>
              Pricing
            </MobileNavLink>
            <MobileNavLink to="/advice" isActive={isActive("/advice")} onClick={toggleMenu}>
              Legal Advice
            </MobileNavLink>
            <MobileNavLink to="/articles" isActive={isActive("/articles")} onClick={toggleMenu}>
              Articles
            </MobileNavLink>
            <MobileNavLink to="/contact" isActive={isActive("/contact")} onClick={toggleMenu}>
              Contact Us
            </MobileNavLink>
            <div className="flex flex-col space-y-2 pt-4 border-t border-rocket-gray-100 dark:border-rocket-gray-800">
              <Link to="/login" onClick={toggleMenu}>
                <Button variant="outline" className="w-full bg-transparent border-rocket-blue-500 text-rocket-blue-600 hover:bg-rocket-blue-50 dark:border-rocket-blue-300 dark:text-rocket-blue-300 dark:hover:bg-rocket-gray-800">
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={toggleMenu}>
                <Button className="w-full bg-rocket-blue hover:bg-rocket-blue-600 dark:bg-rocket-blue-500 dark:hover:bg-rocket-blue-600">
                  Sign Up
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default memo(Header);
