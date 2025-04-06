
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggleMinimal } from "@/components/theme/ThemeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-rocket-gray-100 shadow-sm dark:bg-rocket-gray-900 dark:border-rocket-gray-800 transition-colors duration-300">
      <div className="container-custom py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-rocket-blue-500 flex items-center justify-center text-white font-bold">
              RL
            </div>
            <span className="text-xl font-bold text-rocket-blue dark:text-white">Rocket Lawyer</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-rocket-blue-500 font-medium hover:text-rocket-blue-600 transition-colors dark:text-rocket-blue-300 dark:hover:text-rocket-blue-200">
            Home
          </Link>
          <Link to="/documents" className="text-rocket-gray-500 font-medium hover:text-rocket-blue-500 transition-colors dark:text-rocket-gray-300 dark:hover:text-rocket-blue-300">
            Make Documents
          </Link>
          <Link to="/advice" className="text-rocket-gray-500 font-medium hover:text-rocket-blue-500 transition-colors dark:text-rocket-gray-300 dark:hover:text-rocket-blue-300">
            Legal Advice
          </Link>
          <Link to="/articles" className="text-rocket-gray-500 font-medium hover:text-rocket-blue-500 transition-colors dark:text-rocket-gray-300 dark:hover:text-rocket-blue-300">
            Articles
          </Link>
          <Link to="/contact" className="text-rocket-gray-500 font-medium hover:text-rocket-blue-500 transition-colors dark:text-rocket-gray-300 dark:hover:text-rocket-blue-300">
            Contact Us
          </Link>
        </nav>

        {/* Auth Buttons & Theme Toggle */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggleMinimal />
          <Link to="/login">
            <Button variant="outline" className="bg-transparent border-rocket-blue text-rocket-blue hover:bg-rocket-blue-50 dark:border-rocket-blue-300 dark:text-rocket-blue-300 dark:hover:bg-rocket-gray-800">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-rocket-blue hover:bg-rocket-blue-600 dark:bg-rocket-blue-500 dark:hover:bg-rocket-blue-600">Sign Up</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggleMinimal />
          <button className="text-rocket-blue-500 dark:text-rocket-blue-300" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-rocket-gray-100 shadow-md animate-fade-in dark:bg-rocket-gray-900 dark:border-rocket-gray-800">
          <nav className="container-custom py-4 flex flex-col space-y-4">
            <Link to="/" className="text-rocket-blue-500 font-medium hover:text-rocket-blue-600 transition-colors dark:text-rocket-blue-300 dark:hover:text-rocket-blue-200" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/documents" className="text-rocket-gray-500 font-medium hover:text-rocket-blue-500 transition-colors dark:text-rocket-gray-300 dark:hover:text-rocket-blue-300" onClick={toggleMenu}>
              Make Documents
            </Link>
            <Link to="/advice" className="text-rocket-gray-500 font-medium hover:text-rocket-blue-500 transition-colors dark:text-rocket-gray-300 dark:hover:text-rocket-blue-300" onClick={toggleMenu}>
              Legal Advice
            </Link>
            <Link to="/articles" className="text-rocket-gray-500 font-medium hover:text-rocket-blue-500 transition-colors dark:text-rocket-gray-300 dark:hover:text-rocket-blue-300" onClick={toggleMenu}>
              Articles
            </Link>
            <Link to="/contact" className="text-rocket-gray-500 font-medium hover:text-rocket-blue-500 transition-colors dark:text-rocket-gray-300 dark:hover:text-rocket-blue-300" onClick={toggleMenu}>
              Contact Us
            </Link>
            <div className="flex flex-col space-y-2 pt-2 border-t border-rocket-gray-100 dark:border-rocket-gray-800">
              <Link to="/login" onClick={toggleMenu}>
                <Button variant="outline" className="w-full bg-transparent border-rocket-blue text-rocket-blue hover:bg-rocket-blue-50 dark:border-rocket-blue-300 dark:text-rocket-blue-300 dark:hover:bg-rocket-gray-800">
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={toggleMenu}>
                <Button className="w-full bg-rocket-blue hover:bg-rocket-blue-600 dark:bg-rocket-blue-500 dark:hover:bg-rocket-blue-600">Sign Up</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
