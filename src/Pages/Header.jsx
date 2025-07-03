import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  FaBars, 
  FaTimes, 
  FaUserAlt, 
  FaTicketAlt,
  FaTrain,
  FaMapMarkedAlt,
  FaIdCard
} from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-blue-600 py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <FaTrain className={`h-8 w-8 ${scrolled ? 'text-blue-600' : 'text-white'} group-hover:text-yellow-300 transition-colors`} />
            <span className={`ml-3 text-xl font-bold ${scrolled ? 'text-blue-600' : 'text-white'} group-hover:text-yellow-300 transition-colors`}>
              MetroSheba
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex items-center font-medium ${isActive ? 'text-yellow-400' : scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-yellow-300'} transition-colors`
              }
            >
              <FaTrain className="mr-1" /> Home
            </NavLink>
            <NavLink 
              to="/routes" 
              className={({ isActive }) => 
                `flex items-center font-medium ${isActive ? 'text-yellow-400' : scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-yellow-300'} transition-colors`
              }
            >
              <FaMapMarkedAlt className="mr-1" /> Routes
            </NavLink>
            <NavLink 
              to="/smart-card" 
              className={({ isActive }) => 
                `flex items-center font-medium ${isActive ? 'text-yellow-400' : scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-yellow-300'} transition-colors`
              }
            >
              <FaIdCard className="mr-1" /> Smart Card
            </NavLink>
            <NavLink 
              to="/fares" 
              className={({ isActive }) => 
                `flex items-center font-medium ${isActive ? 'text-yellow-400' : scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-yellow-300'} transition-colors`
              }
            >
              <MdPayment className="mr-1 text-lg" /> Fares
            </NavLink>
            
            <div className="flex items-center space-x-4 ml-6">
              <Link 
                to="/login" 
                className={`flex items-center space-x-1 ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-yellow-300'} transition-colors`}
              >
                <FaUserAlt className="h-4 w-4" />
                <span>Login</span>
              </Link>
              <Link 
                to="/book" 
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-2 px-4 rounded-lg flex items-center transition-colors"
              >
                <FaTicketAlt className="mr-2" />
                Book Now
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FaTimes className={`h-6 w-6 ${scrolled ? 'text-gray-700' : 'text-white'}`} />
            ) : (
              <FaBars className={`h-6 w-6 ${scrolled ? 'text-gray-700' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu-container md:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg animate-slideDown">
            <div className="px-4 pt-2 pb-6 space-y-4">
              <NavLink 
                to="/" 
                className="flex items-center py-2 font-medium text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaTrain className="mr-2" /> Home
              </NavLink>
              <NavLink 
                to="/routes" 
                className="flex items-center py-2 font-medium text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaMapMarkedAlt className="mr-2" /> Routes
              </NavLink>
              <NavLink 
                to="/smart-card" 
                className="flex items-center py-2 font-medium text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaIdCard className="mr-2" /> Smart Card
              </NavLink>
              <NavLink 
                to="/fares" 
                className="flex items-center py-2 font-medium text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <MdPayment className="mr-2" /> Fares
              </NavLink>
              <div className="pt-4 border-t border-gray-200">
                <Link 
                  to="/login" 
                  className="flex items-center space-x-2 py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaUserAlt className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link 
                  to="/book" 
                  className="mt-3 flex justify-center items-center w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaTicketAlt className="mr-2" />
                  Book Ticket
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}