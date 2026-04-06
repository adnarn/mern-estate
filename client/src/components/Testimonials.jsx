import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Home Buyer',
      content: 'MERN Estate made finding my dream home so easy! The platform is user-friendly and the agents were incredibly helpful throughout the entire process.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Property Investor',
      content: 'I\'ve been using MERN Estate for my investment properties for over a year. The verified listings and detailed information save me so much time.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Landlord',
      content: 'Listing my rental property was seamless. I found great tenants within days, and the platform handles everything professionally.',
      rating: 5
    },
    {
      name: 'David Thompson',
      role: 'First-time Renter',
      content: 'As a first-time renter, I was nervous about the process. The team at MERN Estate guided me through everything and found me the perfect apartment.',
      rating: 5
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, i) => (
      <span key={i} className='text-yellow-400'>★</span>
    ));
  };

  return (
    <div className='py-16 bg-white'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-slate-800 mb-4'>What Our Clients Say</h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Don't just take our word for it. Hear from our satisfied customers who found their perfect properties through MERN Estate.
          </p>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {testimonials.map((testimonial, index) => (
            <div key={index} className='bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
              <div className='flex items-center mb-4'>
                <div className='w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4'>
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className='font-semibold text-slate-800'>{testimonial.name}</h4>
                  <p className='text-sm text-gray-600'>{testimonial.role}</p>
                </div>
              </div>
              
              <div className='mb-3'>
                {renderStars(testimonial.rating)}
              </div>
              
              <div className='relative'>
                <FaQuoteLeft className='text-gray-300 absolute top-0 left-0' />
                <p className='text-gray-700 italic pl-6 pr-6'>
                  {testimonial.content}
                </p>
                <FaQuoteRight className='text-gray-300 absolute bottom-0 right-0' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
