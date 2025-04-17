
import { useState, useEffect, memo, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, ChevronDown, MapPin, FileText, Briefcase, Scale, Shield } from "lucide-react";
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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
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

  // Services megamenu data
  const serviceCategories = [
    {
      title: "Business Formation",
      icon: Briefcase,
      items: ["LLC Formation", "Corporation", "Nonprofit", "Partnership"]
    },
    {
      title: "Intellectual Property",
      icon: Shield,
      items: ["Trademark", "Copyright", "Patent", "Trade Secret"]
    },
    {
      title: "Contracts",
      icon: FileText,
      items: ["NDA", "Service Agreement", "Employment Contracts", "Licensing"]
    },
    {
      title: "Legal Advice",
      icon: Scale,
      items: ["Business Strategy", "Compliance", "Dispute Resolution", "Legal Research"]
    }
  ];

  // Location data
  const popularLocations = [
    "New York", "California", "Texas", "Florida", "Illinois", "Pennsylvania"
  ];

  return (
    <header className="bg-primary w-full z-50 sticky top-0 shadow-md">
      <div className="container-custom py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-clean-white flex items-center justify-center text-primary font-bold shadow-md transition-transform hover:scale-105 duration-300">
              <span className="text-lg">LG</span>
            </div>
            <span className="text-xl font-bold text-clean-white">
              Legalgram
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-clean-white hover:bg-white/10 focus:bg-white/10 data-[state=open]:bg-white/10">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white dark:bg-rocket-blue-900 border border-rocket-gray-200 dark:border-rocket-blue-800">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 w-[600px] lg:w-[800px]">
                    {serviceCategories.map((category, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <category.icon className="h-5 w-5 text-[#F18F01]" />
                          <h3 className="text-black dark:text-white font-medium">{category.title}</h3>
                        </div>
                        <ul className="space-y-1">
                          {category.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <Link
                                to={`/services/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                className="block text-sm text-rocket-gray-700 dark:text-rocket-gray-300 hover:text-[#F18F01] dark:hover:text-[#F18F01]"
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link
                          to={`/services/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-xs text-[#F18F01] hover:underline flex items-center"
                        >
                          View All <ChevronDown className="h-3 w-3 ml-1 rotate-[-90deg]" />
                        </Link>
                      </div>
                    ))}
                  </div>
                  <div className="bg-rocket-gray-50 dark:bg-rocket-blue-950 p-2 text-center border-t border-rocket-gray-200 dark:border-rocket-blue-800">
                    <Link
                      to="/services"
                      className="text-sm text-[#F18F01] hover:underline flex items-center justify-center"
                    >
                      Browse all services <ChevronDown className="h-3 w-3 ml-1 rotate-[-90deg]" />
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-clean-white hover:bg-white/10 focus:bg-white/10 data-[state=open]:bg-white/10">
                  Locations
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white dark:bg-rocket-blue-900 border border-rocket-gray-200 dark:border-rocket-blue-800">
                  <div className="p-4 w-[400px]">
                    <h3 className="font-medium text-black dark:text-white mb-2">Popular Locations</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {popularLocations.map((location, index) => (
                        <Link
                          key={index}
                          to={`/locations/${location.toLowerCase()}`}
                          className="flex items-center text-sm text-rocket-gray-700 dark:text-rocket-gray-300 hover:text-[#F18F01] dark:hover:text-[#F18F01]"
                        >
                          <MapPin className="h-3 w-3 mr-1" /> {location}
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 pt-2 border-t border-rocket-gray-200 dark:border-rocket-blue-800">
                      <Link
                        to="/locations"
                        className="text-sm text-[#F18F01] hover:underline flex items-center"
                      >
                        View all locations <ChevronDown className="h-3 w-3 ml-1 rotate-[-90deg]" />
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavLink to="/attorneys" isActive={isActive("/attorneys")}>
                  Attorneys
                </NavLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavLink to="/pricing" isActive={isActive("/pricing")}>
                  Pricing
                </NavLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavLink to="/contact" isActive={isActive("/contact")}>
                  Contact
                </NavLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Right side buttons/user menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/post-job">
            <Button variant="orange" size="sm" className="font-medium">
              Post a Job
            </Button>
          </Link>
          
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

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center">
          <button 
            className="text-clean-white" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-primary border-t border-clean-white/20 shadow-md animate-fade-in">
          <nav className="container-custom py-4 flex flex-col space-y-4">
            <MobileNavLink to="/" isActive={isActive("/")} onClick={toggleMenu}>
              Home
            </MobileNavLink>
            <div className="border-t border-clean-white/10 pt-2">
              <p className="text-white/60 text-sm mb-2">Services</p>
              <div className="grid grid-cols-2 gap-2">
                {serviceCategories.map((category, index) => (
                  <MobileNavLink 
                    key={index}
                    to={`/services/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                    isActive={false}
                    onClick={toggleMenu}
                  >
                    <div className="flex items-center">
                      <category.icon className="h-4 w-4 mr-1 text-[#F18F01]" /> {category.title}
                    </div>
                  </MobileNavLink>
                ))}
              </div>
              <MobileNavLink to="/services" isActive={isActive("/services")} onClick={toggleMenu}>
                <span className="text-[#F18F01] text-sm">View all services →</span>
              </MobileNavLink>
            </div>
            
            <div className="border-t border-clean-white/10 pt-2">
              <p className="text-white/60 text-sm mb-2">Popular Locations</p>
              <div className="grid grid-cols-2 gap-2">
                {popularLocations.slice(0, 4).map((location, index) => (
                  <MobileNavLink 
                    key={index}
                    to={`/locations/${location.toLowerCase()}`}
                    isActive={false}
                    onClick={toggleMenu}
                  >
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-[#F18F01]" /> {location}
                    </div>
                  </MobileNavLink>
                ))}
              </div>
              <MobileNavLink to="/locations" isActive={isActive("/locations")} onClick={toggleMenu}>
                <span className="text-[#F18F01] text-sm">View all locations →</span>
              </MobileNavLink>
            </div>
            
            <MobileNavLink to="/attorneys" isActive={isActive("/attorneys")} onClick={toggleMenu}>
              Attorneys
            </MobileNavLink>
            
            <MobileNavLink to="/pricing" isActive={isActive("/pricing")} onClick={toggleMenu}>
              Pricing
            </MobileNavLink>
            
            <MobileNavLink to="/contact" isActive={isActive("/contact")} onClick={toggleMenu}>
              Contact
            </MobileNavLink>
            
            <div className="flex flex-col space-y-2 pt-4 border-t border-clean-white/20">
              <Link to="/post-job" onClick={toggleMenu} className="w-full">
                <Button variant="orange" className="w-full">
                  Post a Job
                </Button>
              </Link>
              
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
