import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Listings() {
  const { currentUser } = useSelector((state) => state.user);
  const [userListings, setUserListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    if (currentUser) {
      fetchUserListings();
    }
  }, [currentUser]);

  const fetchUserListings = async () => {
    try {
      setLoading(true);
      setError('');
      setDeleteError('');
      
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch listings');
      }
      const data = await res.json();
      
      if (data.success === false) {
        setError('Failed to fetch listings');
        return;
      }

      setUserListings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Fetch listings error:', error);
      setError('Failed to fetch listings');
      setUserListings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleListingDelete = async (listingId) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) {
      return;
    }

    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      
      if (data.success === false) {
        setDeleteError(data.message);
        return;
      }

      // Refresh listings
      fetchUserListings();
      setDeleteError('');
    } catch (error) {
      setDeleteError('Failed to delete listing');
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h2>
          <p className="text-gray-600 mb-6">You need to be signed in to view your listings.</p>
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
          <h1 className="text-3xl font-bold text-gray-900">My Listings</h1>
          <p className="text-gray-600 mt-2">Manage your property listings</p>
        </div>

        {/* Actions */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <Link
            to="/create-listing"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium text-center"
          >
            Create New Listing
          </Link>
          <button
            onClick={fetchUserListings}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 font-medium"
          >
            Refresh Listings
          </button>
        </div>

        {/* Error Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {deleteError && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {deleteError}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading listings...</p>
          </div>
        )}

        {/* Listings Grid */}
        {!loading && !error && (
          <>
            {userListings.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No listings yet</h3>
                <p className="text-gray-600 mb-4">Start by creating your first property listing.</p>
                <Link
                  to="/create-listing"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
                >
                  Create Listing
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userListings.map((listing) => (
                  <div key={listing._id} className="relative">
                    <ListingItem listing={listing} />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Link
                        to={`/update-listing/${listing._id}`}
                        className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 shadow-lg"
                        title="Edit Listing"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleListingDelete(listing._id)}
                        className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 shadow-lg"
                        title="Delete Listing"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Stats */}
        {!loading && !error && userListings.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Listing Statistics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{userListings.length}</p>
                <p className="text-sm text-gray-600">Total Listings</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {userListings.filter(l => l.offer).length}
                </p>
                <p className="text-sm text-gray-600">On Offer</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {userListings.filter(l => l.type === 'rent').length}
                </p>
                <p className="text-sm text-gray-600">For Rent</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
