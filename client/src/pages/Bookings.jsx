import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Bookings() {
  const { currentUser } = useSelector((state) => state.user);
  const [userBookings, setUserBookings] = useState([]);
  const [ownerBookings, setOwnerBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('user'); // 'user' or 'owner'

  useEffect(() => {
    if (currentUser) {
      fetchBookings();
    }
  }, [currentUser]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Get user's bookings
      const userRes = await fetch('/api/booking/user');
      let userData = [];
      if (userRes.ok) {
        const userJson = await userRes.json();
        userData = Array.isArray(userJson) ? userJson : [];
      } else if (userRes.status !== 401) {
        // Don't throw error for 401 (unauthorized) as it's expected when not logged in
        throw new Error('Failed to fetch user bookings');
      }
      
      // Get owner bookings
      const ownerRes = await fetch('/api/booking/owner');
      let ownerData = [];
      if (ownerRes.ok) {
        const ownerJson = await ownerRes.json();
        ownerData = Array.isArray(ownerJson) ? ownerJson : [];
      } else if (ownerRes.status !== 401) {
        // Don't throw error for 401 (unauthorized) as it's expected when not logged in
        throw new Error('Failed to fetch owner bookings');
      }
      
      setUserBookings(userData);
      setOwnerBookings(ownerData);
    } catch (error) {
      console.error('Fetch bookings error:', error);
      setError('Failed to fetch bookings');
      setUserBookings([]);
      setOwnerBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBookingStatus = async (bookingId, status) => {
    try {
      const res = await fetch(`/api/booking/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      
      if (data.success === false) {
        return;
      }

      // Refresh bookings
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      const res = await fetch(`/api/booking/${bookingId}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      
      if (data.success === false) {
        return;
      }

      // Refresh bookings
      fetchBookings();
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h2>
          <p className="text-gray-600 mb-6">You need to be signed in to view your bookings.</p>
          <Link
            to="/sign-in"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600 mt-2">Manage your booking requests and property inquiries</p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('user')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'user'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Your Bookings ({userBookings.length})
            </button>
            <button
              onClick={() => setActiveTab('owner')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'owner'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Booking Requests ({ownerBookings.length})
            </button>
          </nav>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading bookings...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* User's Bookings Tab */}
            {activeTab === 'user' && (
              <div>
                {userBookings.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg shadow">
                    <div className="text-gray-400 mb-4">
                      <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                    <p className="text-gray-600 mb-4">Start by booking properties you're interested in.</p>
                    <Link
                      to="/search"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
                    >
                      Browse Properties
                    </Link>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {userBookings.map((booking) => (
                      <div key={booking._id} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex gap-6">
                          <Link to={`/listing/${booking.listingId._id}`}>
                            <img
                              src={booking.listingId.imageUrls[0]}
                              alt={booking.listingId.name}
                              className="h-24 w-24 object-cover rounded-lg"
                            />
                          </Link>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <Link
                                  to={`/listing/${booking.listingId._id}`}
                                  className="text-lg font-semibold text-gray-900 hover:text-blue-600"
                                >
                                  {booking.listingId.name}
                                </Link>
                                <p className="text-gray-600">{booking.listingId.address}</p>
                              </div>
                              <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                booking.status === 'approved' ? 'bg-green-100 text-green-800' :
                                booking.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {booking.status}
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-sm text-gray-500">
                                  Booked on {new Date(booking.createdAt).toLocaleDateString()}
                                </p>
                                {booking.message && (
                                  <p className="text-sm text-gray-600 mt-1">
                                    Message: {booking.message}
                                  </p>
                                )}
                              </div>
                              <button
                                onClick={() => handleCancelBooking(booking._id)}
                                className="text-gray-600 hover:text-red-600 font-medium text-sm"
                              >
                                Cancel Booking
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Owner's Booking Requests Tab */}
            {activeTab === 'owner' && (
              <div>
                {ownerBookings.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg shadow">
                    <div className="text-gray-400 mb-4">
                      <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No booking requests</h3>
                    <p className="text-gray-600">You don't have any booking requests for your properties yet.</p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {ownerBookings.map((booking) => (
                      <div key={booking._id} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex gap-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <img
                                src={booking.userId.avatar}
                                alt={booking.userId.username}
                                className="h-10 w-10 rounded-full"
                              />
                              <div>
                                <p className="font-semibold text-gray-900">{booking.userId.username}</p>
                                <p className="text-sm text-gray-600">{booking.userId.email}</p>
                              </div>
                            </div>
                            <div className="mb-3">
                              <Link
                                to={`/listing/${booking.listingId._id}`}
                                className="text-lg font-semibold text-gray-900 hover:text-blue-600"
                              >
                                {booking.listingId.name}
                              </Link>
                              <p className="text-gray-600">{booking.listingId.address}</p>
                            </div>
                            {booking.message && (
                              <div className="bg-gray-50 p-3 rounded-lg mb-3">
                                <p className="text-sm font-medium text-gray-700 mb-1">Message:</p>
                                <p className="text-sm text-gray-600">{booking.message}</p>
                              </div>
                            )}
                            <div className="flex justify-between items-center">
                              <p className="text-sm text-gray-500">
                                Requested on {new Date(booking.createdAt).toLocaleDateString()}
                              </p>
                              <div className="flex gap-2">
                                {booking.status === 'pending' && (
                                  <>
                                    <button
                                      onClick={() => handleUpdateBookingStatus(booking._id, 'approved')}
                                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-medium text-sm"
                                    >
                                      Approve
                                    </button>
                                    <button
                                      onClick={() => handleUpdateBookingStatus(booking._id, 'rejected')}
                                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-medium text-sm"
                                    >
                                      Reject
                                    </button>
                                  </>
                                )}
                                <button
                                  onClick={() => handleCancelBooking(booking._id)}
                                  className="text-gray-600 hover:text-red-600 font-medium text-sm"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
