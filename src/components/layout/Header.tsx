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
import { motion } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const NavLink = memo(({ 
  to, 
  children, 
  isActive
}: { 
  to: string; 
  children: React.ReactNode; 
  isActive: boolean;
}) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "font-medium transition-colors relative group",
        isActive 
          ? "text-clean-white font-semibold" 
          : "text-clean-white/90 hover:text-clean-white"
      )}
    >
      {children}
      <span className={cn(
        "absolute bottom-[-4px] left-0 w-full h-0.5 bg-clean-white transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
        isActive ? "scale-x-100" : ""
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
          ? "text-clean-white font-semibold" 
          : "text-clean-white/90 hover:text-clean-white"
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userInitial, setUserInitial] = useState("");
  const [scrolled, setScrolled] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

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

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      subscription.unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

  const navBarVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const navItemVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const logoVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.header 
      className={cn(
        "bg-primary w-full z-50 sticky top-0 transition-all duration-300",
        scrolled && "shadow-md"
      )}
      initial="initial"
      animate="animate"
      variants={navBarVariants}
    >
      <div className="container-custom py-4 flex items-center justify-between">
        <motion.div variants={logoVariants}>
          <Link to="/" className="flex items-center">
            <div className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/a17fd11f-8e26-4052-9951-f94d83efbea4.png" 
                alt="Legalgram Logo" 
                className="w-10 h-10 rounded-full shadow-md transition-transform hover:scale-105 duration-300"
              />
              <span className="text-xl font-bold text-clean-white">
                Legalgram
              </span>
            </div>
          </Link>
        </motion.div>

        <NavigationMenu className="hidden md:flex max-w-none">
          <NavigationMenuList className="gap-8">
            <motion.div variants={navItemVariants}>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={cn(
                    "font-medium transition-colors relative group",
                    isActive("/") 
                      ? "text-clean-white font-semibold" 
                      : "text-clean-white/90 hover:text-clean-white"
                  )}
                  asChild
                >
                  <Link to="/">
                    Home
                    <span className={cn(
                      "absolute bottom-[-4px] left-0 w-full h-0.5 bg-clean-white transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                      isActive("/") ? "scale-x-100" : ""
                    )}></span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </motion.div>
            
            <motion.div variants={navItemVariants}>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={cn(
                    "font-medium transition-colors relative group",
                    isActive("/documents") 
                      ? "text-clean-white font-semibold" 
                      : "text-clean-white/90 hover:text-clean-white"
                  )}
                  asChild
                >
                  <Link to="/documents">
                    Make Documents
                    <span className={cn(
                      "absolute bottom-[-4px] left-0 w-full h-0.5 bg-clean-white transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                      isActive("/documents") ? "scale-x-100" : ""
                    )}></span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </motion.div>
            
            <motion.div variants={navItemVariants}>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={cn(
                    "font-medium transition-colors relative group",
                    isActive("/pricing") 
                      ? "text-clean-white font-semibold" 
                      : "text-clean-white/90 hover:text-clean-white"
                  )}
                  asChild
                >
                  <Link to="/pricing">
                    Pricing
                    <span className={cn(
                      "absolute bottom-[-4px] left-0 w-full h-0.5 bg-clean-white transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                      isActive("/pricing") ? "scale-x-100" : ""
                    )}></span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </motion.div>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <motion.div variants={navItemVariants}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="rounded-full w-10 h-10 p-0 bg-clean-white border-clean-white hover:bg-clean-white/80"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary text-clean-white">
                        {userInitial}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-56 mt-2 bg-clean-white border border-primary/20"
                >
                  <div className="px-4 py-3 border-b border-primary/20">
                    <p className="text-sm font-medium text-deep-blue">
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
                    className="cursor-pointer text-red-500 hover:text-red-600"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          ) : (
            <>
              <motion.div variants={navItemVariants}>
                <Link to="/login">
                  <Button variant="outline" 
                    className="border-clean-white text-clean-white hover:bg-clean-white hover:text-primary font-medium transition-all"
                  >
                    Sign In
                  </Button>
                </Link>
              </motion.div>
              <motion.div variants={navItemVariants}>
                <Link to="/signup">
                  <Button className="bg-clean-white text-primary hover:bg-clean-white/80 transition-all font-medium">
                    Sign Up
                  </Button>
                </Link>
              </motion.div>
            </>
          )}
        </div>

        <motion.div variants={navItemVariants} className="md:hidden flex items-center">
          <button 
            className="text-clean-white" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </motion.div>
      </div>

      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-primary border-t border-clean-white/20 shadow-md"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
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
            <div className="flex flex-col space-y-2 pt-4 border-t border-clean-white/20">
              {isAuthenticated ? (
                <>
                  <Link to="/user-dashboard" onClick={toggleMenu} className="flex items-center space-x-2 text-clean-white">
                    <User size={18} />
                    <span>Dashboard</span>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-red-300 border-red-400/30 hover:bg-red-400/10 hover:text-red-100"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} className="mr-2" />
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={toggleMenu}>
                    <Button variant="outline" className="w-full border-clean-white text-clean-white hover:bg-clean-white hover:text-primary">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={toggleMenu}>
                    <Button className="w-full bg-clean-white text-primary hover:bg-clean-white/80">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default memo(Header);
