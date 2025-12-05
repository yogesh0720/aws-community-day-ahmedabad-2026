import { useState } from 'react';
// import { Menu, X, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../data/images/ACD2026.ahm.main (1)-Photoroom.png';


export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'Who We Are' },
    { href: '/speakers', label: 'Speakers' },
    { href: '/sponsors', label: 'Sponsors' },
    { href: '/tickets', label: 'Tickets' },
    { href: '/venue', label: 'Venue' },
    { href: '/volunteers', label: 'Volunteer' },
    { href: '/faq', label: 'FAQ' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
          {/* <Calendar className="w-6 h-6 text-orange-600" /> */}
               <img src={logo} alt="community day" className="h-80 w-90 py-4 mt-2 object-contain" />
              {/* <span>ACD Ahmedabad 2026</span> */}
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/tickets"
              className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded hover:bg-orange-700 transition-colors"
            >
              Get Tickets
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {/* {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />} */}
          </button>
        </div>

        {isOpen && (
          <nav className="md:hidden pb-4 border-t border-gray-200">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/tickets"
              className="block mx-3 mt-3 px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded hover:bg-orange-700 transition-colors text-center"
              onClick={() => setIsOpen(false)}
            >
              Get Tickets
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
