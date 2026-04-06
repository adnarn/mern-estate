import { Link } from 'react-router-dom';
import { FaArrowRight, FaSearch, FaHome, FaKey } from 'react-icons/fa';

export default function CallToAction() {
  return (
    <div className='py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white'>
      <div className='max-w-4xl mx-auto px-4 text-center'>
        <h2 className='text-4xl font-bold mb-6'>
          Ready to Find Your Dream Home?
        </h2>
        <p className='text-xl mb-8 text-blue-100'>
          Join thousands of satisfied customers who found their perfect property through MERN Estate. 
          Whether you're buying, renting, or selling, we're here to help.
        </p>
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
          <div className='bg-white/10 backdrop-blur-sm p-6 rounded-lg'>
            <FaSearch className='text-3xl mb-3 mx-auto' />
            <h3 className='font-semibold mb-2'>Search Properties</h3>
            <p className='text-sm text-blue-100'>Browse our extensive database of verified properties</p>
          </div>
          
          <div className='bg-white/10 backdrop-blur-sm p-6 rounded-lg'>
            <FaHome className='text-3xl mb-3 mx-auto' />
            <h3 className='font-semibold mb-2'>List Your Property</h3>
            <p className='text-sm text-blue-100'>Reach thousands of potential buyers and renters</p>
          </div>
          
          <div className='bg-white/10 backdrop-blur-sm p-6 rounded-lg'>
            <FaKey className='text-3xl mb-3 mx-auto' />
            <h3 className='font-semibold mb-2'>Get Expert Help</h3>
            <p className='text-sm text-blue-100'>Our agents are ready to assist you 24/7</p>
          </div>
        </div>
        
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Link
            to='/search'
            className='bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center'
          >
            Start Searching
            <FaArrowRight className='ml-2' />
          </Link>
          <Link
            to='/create-listing'
            className='border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center'
          >
            List Property
            <FaArrowRight className='ml-2' />
          </Link>
        </div>
      </div>
    </div>
  );
}
