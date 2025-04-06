
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-rocket-blue-500 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center text-rocket-blue-500 font-bold">
                RL
              </div>
              <span className="text-xl font-bold text-white">Rocket Lawyer</span>
            </div>
            <p className="text-rocket-gray-200">
              We provide affordable, accessible legal services for individuals and businesses.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-semibold text-lg mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/documents" className="text-rocket-gray-200 hover:text-white transition-colors">
                  Create Documents
                </Link>
              </li>
              <li>
                <Link to="/advice" className="text-rocket-gray-200 hover:text-white transition-colors">
                  Get Legal Advice
                </Link>
              </li>
              <li>
                <Link to="/articles" className="text-rocket-gray-200 hover:text-white transition-colors">
                  Legal Articles
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-rocket-gray-200 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5 className="font-semibold text-lg mb-4">Legal</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-rocket-gray-200 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-rocket-gray-200 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-rocket-gray-200 hover:text-white transition-colors">
                  Legal Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-semibold text-lg mb-4">Contact</h5>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <MapPin size={18} />
                <span className="text-rocket-gray-200">123 Legal Ave, Suite 400</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} />
                <span className="text-rocket-gray-200">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} />
                <a href="mailto:info@rocketlawyer.com" className="text-rocket-gray-200 hover:text-white transition-colors">
                  info@rocketlawyer.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-rocket-blue-400 text-center text-rocket-gray-200">
          <p>&copy; {new Date().getFullYear()} Rocket Lawyer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
