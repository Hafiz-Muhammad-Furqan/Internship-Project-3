import { Link } from 'react-router-dom'
import { 
  NewspaperIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

function Footer() {
  return (
    <footer className="bg-white shadow-md dark:bg-gray-800 mt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <NewspaperIcon className="h-8 w-8 text-primary" />
              <h3 className="text-lg font-bold">NewsHub</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Your trusted source for the latest news and updates.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary transition-colors flex items-center space-x-2">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors flex items-center space-x-2">
                  <span>About</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors flex items-center space-x-2">
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <EnvelopeIcon className="h-5 w-5" />
                <span>contact@newshub.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <PhoneIcon className="h-5 w-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <MapPinIcon className="h-5 w-5" />
                <span>123 News Street, NY 10001</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} NewsHub. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer