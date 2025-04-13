import { useState, useEffect, memo, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userInitial, setUserInitial] = useState("");
  
  const location = useLocation();
  const navigate = useNavigate();

  const handleScroll = useCallback(() => {
    if (window.scrollY > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsAuthenticated(true);
        const email = data.session.user.email || "";
        setUserName(email.split('@')[0] || "User");
        setUserInitial((email.charAt(0) || "U").toUpperCase());
      } else {
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setIsAuthenticated(true);
          const email = session.user.email || "";
          setUserName(email.split('@')[0] || "User");
          setUserInitial((email.charAt(0) || "U").toUpperCase());
        } else {
          setIsAuthenticated(false);
        }
      }
    );
    
    return () => subscription.unsubscribe();
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

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Successfully logged out");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out");
    }
  };

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
        <Link to="/" className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-rocket-blue-500 flex items-center justify-center text-white font-bold shadow-md transition-transform hover:scale-105 duration-300">
              LG
            </div>
            <span className={cn(
              "text-xl font-bold transition-colors",
              scrolled
                ? "text-rocket-blue-500 dark:text-white" 
                : "text-rocket-blue-700 dark:text-white"
            )}>
              Legal Gram
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" isActive={isActive("/")} scrolled={scrolled}>
            Home
          </NavLink>
          <NavLink to="/documents" isActive={isActive("/documents")} scrolled={scrolled}>
            Make Documents
          </NavLink>
          <NavLink to="/pricing" isActive={isActive("/pricing")} scrolled={scrolled}>
            Pricing
          </NavLink>
          <NavLink to="/articles" isActive={isActive("/articles")} scrolled={scrolled}>
            Articles
          </NavLink>
          <NavLink to="/contact" isActive={isActive("/contact")} scrolled={scrolled}>
            Contact Us
          </NavLink>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="rounded-full w-10 h-10 p-0 bg-rocket-gray-100 border-rocket-gray-200 hover:bg-rocket-gray-200 dark:bg-rocket-gray-800 dark:border-rocket-gray-700"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-rocket-blue-500 text-white">
                      {userInitial}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 mt-2 bg-white dark:bg-rocket-gray-800 border border-rocket-gray-200 dark:border-rocket-gray-700"
              >
                <div className="px-4 py-3 border-b border-rocket-gray-200 dark:border-rocket-gray-700">
                  <p className="text-sm font-medium text-rocket-gray-900 dark:text-white">
                    {userName}
                  </p>
                </div>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/user-dashboard" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
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
            </>
          )}
        </div>

        <div className="md:hidden flex items-center">
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

      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-rocket-gray-100 shadow-md animate-fade-in dark:bg-rocket-gray-900/95 dark:border-rocket-gray-800">
          <nav className="container-custom py-4 flex flex-col space-y-4">
            <MobileNavLink to="/" isActive={isActive("/")} onClick={toggleMenu}>
              Home
            </MobileNavLink>
            <MobileNavLink to="/documents" isActive={isActive("/documents")} onClick={toggleMenu}>
              Make Documents
            </MobileNavLink>
            <MobileNavLink to="/pricing" isActive={isActive("/pricing")} onClick={toggleMenu}>
              Pricing
            </MobileNavLink>
            <MobileNavLink to="/articles" isActive={isActive("/articles")} onClick={toggleMenu}>
              Articles
            </MobileNavLink>
            <MobileNavLink to="/contact" isActive={isActive("/contact")} onClick={toggleMenu}>
              Contact Us
            </MobileNavLink>
            <div className="flex flex-col space-y-2 pt-4 border-t border-rocket-gray-100 dark:border-rocket-gray-800">
              {isAuthenticated ? (
                <>
                  <Link to="/user-dashboard" onClick={toggleMenu} className="flex items-center space-x-2 text-rocket-blue-600 dark:text-rocket-blue-300">
                    <User size={18} />
                    <span>Dashboard</span>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-900/20"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} className="mr-2" />
                    Log out
                  </Button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default memo(Header);
