import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
  return (
    <div className='bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden rounded-lg w-full sm:w-[330px] border border-gray-200 hover:border-blue-300'>
      <Link to={`/listing/${listing._id}`}>
        <div className='relative'>
          <img
            src={
              listing.imageUrls[0] ||
              'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
            }
            alt='listing cover'
            className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-transform duration-500'
          />
          {listing.offer && (
            <div className='absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-md text-xs font-semibold'>
              OFF
            </div>
          )}
        </div>
        <div className='p-4 flex flex-col gap-3 w-full'>
          <div className='flex justify-between items-start gap-2'>
            <p className='text-lg font-bold text-slate-800 truncate flex-1'>
              {listing.name}
            </p>
            <div className='bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-semibold'>
              {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
            </div>
          </div>
          
          <div className='flex items-center gap-2 text-gray-600'>
            <MdLocationOn className='h-4 w-4 text-green-600 flex-shrink-0' />
            <p className='text-sm truncate'>
              {listing.address}
            </p>
          </div>
          
          <p className='text-gray-700 text-sm line-clamp-2 leading-relaxed'>
            {listing.description}
          </p>
          
          <div className='flex justify-between items-center pt-2 border-t border-gray-100'>
            <div className='flex gap-3'>
              <div className='flex items-center gap-1 text-gray-700'>
                <span className='text-xs font-medium'>Beds:</span>
                <span className='text-sm font-semibold'>{listing.bedrooms}</span>
              </div>
              <div className='flex items-center gap-1 text-gray-700'>
                <span className='text-xs font-medium'>Baths:</span>
                <span className='text-sm font-semibold'>{listing.bathrooms}</span>
              </div>
            </div>
            <div className='text-right'>
              <p className='text-xl font-bold text-slate-900'>
                $
                {listing.offer
                  ? listing.discountPrice.toLocaleString('en-US')
                  : listing.regularPrice.toLocaleString('en-US')}
                {listing.type === 'rent' && (
                  <span className='text-sm font-normal text-gray-600'>/mo</span>
                )}
              </p>
              {listing.offer && (
                <p className='text-xs text-green-600 font-semibold line-through'>
                  ${listing.regularPrice.toLocaleString('en-US')}/mo
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
