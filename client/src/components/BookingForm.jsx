import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function BookingForm({ listingId, onBookingSuccess }) {
  const { currentUser } = useSelector((state) => state.user);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      setError('Please sign in to make a booking');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listingId,
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
      } else {
        setSuccess('Booking request sent successfully!');
        setMessage('');
        if (onBookingSuccess) {
          onBookingSuccess();
        }
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Contact Property Owner</h3>
      
      {!currentUser && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-md mb-4">
          <div className="flex">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0v1a8 8 0 0116 0v9a2 2 0 01-2 2H6a2 2 0 01-2-2v-9a8 8 0 00-8 8v-1a8 8 0 0116 0z" clipRule="evenodd" />
            </svg>
            <p className="text-sm font-medium">
              Please <a href="/sign-in" className="font-semibold underline hover:text-yellow-900">sign in</a> to make a booking
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="booking-message" className="block text-sm font-medium text-gray-700 mb-2">
            Message (optional)
          </label>
          <textarea
            id="booking-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message to the property owner..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 resize-none"
            rows="4"
            maxLength="500"
            disabled={!currentUser || loading}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500">
              {message.length}/500 characters
            </span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setMessage('')}
            className="px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 font-medium"
            disabled={!currentUser || loading}
          >
            Clear
          </button>
          
          <button
            type="submit"
            disabled={!currentUser || loading}
            className="flex-1 px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8 0V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0112 20c5.514 0 10-4.486 10-10V5a2 2 0 00-2-2H4a2 2 0 00-2 2v12a8 8 0 0016 0z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              'Send Booking Request'
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-600 p-4 rounded-md">
          <div className="flex">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-8V4a8 8 0 00-8 8v10zM8.707 9.293a1 1 0 00-1.414 1.414L8.586 7.707l3 3a1 1 0 001.414 1.414l-3-3z" clipRule="evenodd" />
            </svg>
            <p className="text-sm font-medium">{error}</p>
          </div>
        </div>
      )}
      
      {success && (
        <div className="mt-4 bg-green-50 border border-green-200 text-green-600 p-4 rounded-md">
          <div className="flex">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-8v-3.172L16.172 4H14a2 2 0 00-2-2V2a2 2 0 00-2-2H5a2 2 0 00-2 2v12a8 8 0 0016 0zm-3.172-1L14 12l3.172-3.172z" clipRule="evenodd" />
            </svg>
            <p className="text-sm font-medium">{success}</p>
          </div>
        </div>
      )}
    </div>
  );
}
