import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className='bg-slate-800 text-white'>
      <div className='max-w-6xl mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Company Info */}
          <div className='col-span-1 md:col-span-2'>
            <h2 className='text-2xl font-bold mb-4'>MERN Estate</h2>
            <p className='text-gray-300 mb-4'>
              Your trusted partner in finding the perfect property. We offer a wide range of real estate services to help you buy, rent, or sell your dream home.
            </p>
            <div className='flex space-x-4 mb-4'>
              <a href='https://facebook.com' target='_blank' rel='noopener noreferrer' className='text-gray-300 hover:text-white transition-colors'>
                <FaFacebook size={24} />
              </a>
              <a href='https://twitter.com' target='_blank' rel='noopener noreferrer' className='text-gray-300 hover:text-white transition-colors'>
                <FaTwitter size={24} />
              </a>
              <a href='https://instagram.com' target='_blank' rel='noopener noreferrer' className='text-gray-300 hover:text-white transition-colors'>
                <FaInstagram size={24} />
              </a>
              <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer' className='text-gray-300 hover:text-white transition-colors'>
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link to='/' className='text-gray-300 hover:text-white transition-colors'>Home</Link>
              </li>
              <li>
                <Link to='/about' className='text-gray-300 hover:text-white transition-colors'>About Us</Link>
              </li>
              <li>
                <Link to='/search' className='text-gray-300 hover:text-white transition-colors'>Search Properties</Link>
              </li>
              <li>
                <Link to='/create-listing' className='text-gray-300 hover:text-white transition-colors'>List Property</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Contact Us</h3>
            <div className='space-y-2'>
              <div className='flex items-center space-x-2'>
                <FaPhone className='text-gray-300' />
                <span className='text-gray-300'>+1 234 567 8900</span>
              </div>
              <div className='flex items-center space-x-2'>
                <FaEnvelope className='text-gray-300' />
                <span className='text-gray-300'>info@mernestate.com</span>
              </div>
              <div className='flex items-center space-x-2'>
                <FaMapMarkerAlt className='text-gray-300' />
                <span className='text-gray-300'>123 Main St, City, State 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className='border-t border-gray-700 mt-8 pt-8 text-center'>
          <p className='text-gray-300'>
            © {new Date().getFullYear()} MERN Estate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
