import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className='bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50'>
      <div className='flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
        <Link to='/' className='flex items-center'>
          <h1 className='font-bold text-lg sm:text-2xl flex flex-wrap'>
            <span className='text-blue-600'>MERN</span>
            <span className='text-slate-700'>Estate</span>
          </h1>
        </Link>
        
        <form
          onSubmit={handleSubmit}
          className='bg-gray-50 border border-gray-300 rounded-full px-4 py-2 flex items-center min-w-0 sm:min-w-[300px] focus-within:border-blue-500 transition-colors'
        >
          <input
            type='text'
            placeholder='Search properties...'
            className='bg-transparent focus:outline-none w-full text-gray-700 placeholder-gray-500'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type='submit'
            className='ml-2 text-gray-500 hover:text-blue-600 transition-colors'
          >
            <FaSearch className='h-4 w-4' />
          </button>
        </form>
        
        <ul className='flex items-center gap-6'>
          <Link to='/'>
            <li className='hidden sm:inline text-slate-700 hover:text-blue-600 font-medium transition-colors'>
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline text-slate-700 hover:text-blue-600 font-medium transition-colors'>
              About
            </li>
          </Link>
          <Link to='/search'>
            <li className='hidden sm:inline text-slate-700 hover:text-blue-600 font-medium transition-colors'>
              Search
            </li>
          </Link>
          {currentUser && (
            <Link to='/bookings'>
              <li className='hidden sm:inline text-slate-700 hover:text-blue-600 font-medium transition-colors'>
                Bookings
              </li>
            </Link>
          )}
          {currentUser && (
            <Link to='/listings'>
              <li className='hidden sm:inline text-slate-700 hover:text-blue-600 font-medium transition-colors'>
                My Listings
              </li>
            </Link>
          )}
          <Link to='/profile'>
            {currentUser ? (
              <div className='relative group'>
                <img
                  className='rounded-full h-8 w-8 object-cover border-2 border-gray-300 group-hover:border-blue-500 transition-colors'
                  src={currentUser?.avatar || 'https://via.placeholder.com/32'}
                  alt='profile'
                />
                <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></div>
              </div>
            ) : (
              <div className='bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium'>
                Sign in
              </div>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
