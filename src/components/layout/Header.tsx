
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
    
    return () => subscription.unsubscribe();
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

  return (
    <header className="bg-primary w-full z-50 sticky top-0">
      <div className="container-custom py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/bbae67ec-7fdd-49d8-adfd-ca2a1c8a05a1.png" 
              alt="Legalgram Logo" 
              className="w-10 h-10 rounded-full shadow-md transition-transform hover:scale-105 duration-300"
            />
            <span className="text-xl font-bold text-clean-white">
              Legalgram
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" isActive={isActive("/")}>
            Home
          </NavLink>
          <NavLink to="/documents" isActive={isActive("/documents")}>
            Make Documents
          </NavLink>
          <NavLink to="/pricing" isActive={isActive("/pricing")}>
            Pricing
          </NavLink>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
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
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" 
                  className="border-clean-white text-clean-white hover:bg-clean-white hover:text-primary font-medium transition-all"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-clean-white text-primary hover:bg-clean-white/80 transition-all font-medium">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button 
            className="text-clean-white" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-primary border-t border-clean-white/20 shadow-md animate-fade-in">
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
        </div>
      )}
    </header>
  );
};

export default memo(Header);
