import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('images', file);
      
      fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // URL is already full from backend
            resolve(data.imageUrls[0]);
          } else {
            reject(new Error(data.message));
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className='p-6 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold text-center mb-8 text-gray-900'>
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} className='space-y-8 bg-white p-8 rounded-lg shadow-lg border border-gray-200'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Left Column */}
          <div className='space-y-6'>
            <div>
              <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-2'>
                Property Name *
              </label>
              <input
                type='text'
                id='name'
                maxLength='62'
                minLength='10'
                required
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500'
                placeholder='Enter property name'
                onChange={handleChange}
                value={formData.name}
              />
            </div>
            
            <div>
              <label htmlFor='description' className='block text-sm font-medium text-gray-700 mb-2'>
                Description *
              </label>
              <textarea
                id='description'
                required
                rows={6}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500'
                placeholder='Describe your property...'
                onChange={handleChange}
                value={formData.description}
              />
            </div>
            
            <div>
              <label htmlFor='address' className='block text-sm font-medium text-gray-700 mb-2'>
                Address *
              </label>
              <input
                type='text'
                id='address'
                required
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500'
                placeholder='Enter property address'
                onChange={handleChange}
                value={formData.address}
              />
            </div>
            
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-3'>
                Property Type *
              </label>
              <div className='flex gap-6'>
                <div className='flex items-center'>
                  <input
                    type='radio'
                    id='sale'
                    className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300'
                    onChange={handleChange}
                    checked={formData.type === 'sale'}
                  />
                  <label htmlFor='sale' className='ml-2 text-sm font-medium text-gray-700'>
                    For Sale
                  </label>
                </div>
                <div className='flex items-center'>
                  <input
                    type='radio'
                    id='rent'
                    className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300'
                    onChange={handleChange}
                    checked={formData.type === 'rent'}
                  />
                  <label htmlFor='rent' className='ml-2 text-sm font-medium text-gray-700'>
                    For Rent
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className='space-y-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-3'>
                Property Features
              </label>
              <div className='space-y-4'>
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    id='parking'
                    className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                    onChange={handleChange}
                    checked={formData.parking}
                  />
                  <label htmlFor='parking' className='ml-2 text-sm font-medium text-gray-700'>
                    Parking spot available
                  </label>
                </div>
                
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    id='furnished'
                    className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                    onChange={handleChange}
                    checked={formData.furnished}
                  />
                  <label htmlFor='furnished' className='ml-2 text-sm font-medium text-gray-700'>
                    Furnished
                  </label>
                </div>
                
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    id='offer'
                    className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                    onChange={handleChange}
                    checked={formData.offer}
                  />
                  <label htmlFor='offer' className='ml-2 text-sm font-medium text-gray-700'>
                    Special offer
                  </label>
                </div>
              </div>
            </div>
            
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label htmlFor='bedrooms' className='block text-sm font-medium text-gray-700 mb-2'>
                  Bedrooms *
                </label>
                <input
                  type='number'
                  id='bedrooms'
                  min='1'
                  max='10'
                  required
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900'
                  onChange={handleChange}
                  value={formData.bedrooms}
                />
              </div>
              
              <div>
                <label htmlFor='bathrooms' className='block text-sm font-medium text-gray-700 mb-2'>
                  Bathrooms *
                </label>
                <input
                  type='number'
                  id='bathrooms'
                  min='1'
                  max='10'
                  required
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900'
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
              </div>
            </div>
            
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label htmlFor='regularPrice' className='block text-sm font-medium text-gray-700 mb-2'>
                  Regular Price *
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <span className='text-gray-500 sm:text-sm'>$</span>
                  </div>
                  <input
                    type='number'
                    id='regularPrice'
                    min='50'
                    max='10000000'
                    required
                    className='w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900'
                    onChange={handleChange}
                    value={formData.regularPrice}
                  />
                </div>
              </div>
              
              {formData.offer && (
                <div>
                  <label htmlFor='discountPrice' className='block text-sm font-medium text-gray-700 mb-2'>
                    Discounted Price *
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <span className='text-gray-500 sm:text-sm'>$</span>
                    </div>
                    <input
                      type='number'
                      id='discountPrice'
                      min='0'
                      max='10000000'
                      required
                      className='w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900'
                      onChange={handleChange}
                      value={formData.discountPrice}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <div className='space-y-4'>
            <p className='font-semibold text-gray-900'>
              Images
              <span className='font-normal text-gray-600 ml-2'>
                The first image will be the cover (max 6)
              </span>
            </p>
            <span className='font-normal text-green-600 ml-2 block text-xs'>
              Using server-side upload (5MB max per image)
            </span>
            
            <div className='flex gap-4'>
              <input
                onChange={(e) => setFiles(e.target.files)}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900'
                type='file'
                id='images'
                accept='image/*'
                multiple
              />
              <button
                type='button'
                disabled={uploading}
                onClick={handleImageSubmit}
                className='flex-1 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {uploading ? 'Uploading...' : 'Upload Images'}
              </button>
            </div>
            
            {imageUploadError && (
              <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg'>
                {imageUploadError}
              </div>
            )}
            
            {formData.imageUrls.length > 0 && (
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-4'>
                {formData.imageUrls.map((url, index) => (
                  <div key={url} className='relative group'>
                    <img
                      src={url}
                      alt={`listing image ${index + 1}`}
                      className='w-full h-32 object-cover rounded-lg group-hover:opacity-90 transition-opacity'
                    />
                    <button
                      type='button'
                      onClick={() => handleRemoveImage(index)}
                      className='absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
                    >
                      <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <button
            type='submit'
            disabled={loading || uploading}
            className='w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? 'Creating...' : 'Create Listing'}
          </button>
          
          {error && (
            <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mt-4'>
              {error}
            </div>
          )}
        </div>
      </form>
    </main>
  );
}
