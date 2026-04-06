import { FaHome, FaBuilding, FaKey, FaChartLine, FaUsers, FaShieldAlt } from 'react-icons/fa';

export default function Features() {
  const features = [
    {
      icon: <FaHome className='text-4xl text-blue-600' />,
      title: 'Wide Selection',
      description: 'Browse through thousands of properties across various locations and find your perfect match.'
    },
    {
      icon: <FaBuilding className='text-4xl text-green-600' />,
      title: 'Verified Listings',
      description: 'All our properties are verified to ensure authenticity and save you from fraud.'
    },
    {
      icon: <FaKey className='text-4xl text-purple-600' />,
      title: 'Easy Transactions',
      description: 'Streamlined buying and renting process with secure payment options and legal support.'
    },
    {
      icon: <FaChartLine className='text-4xl text-orange-600' />,
      title: 'Best Prices',
      description: 'Competitive pricing and regular offers to ensure you get the best value for your money.'
    },
    {
      icon: <FaUsers className='text-4xl text-red-600' />,
      title: 'Expert Support',
      description: 'Our team of real estate experts is available 24/7 to help you with your queries.'
    },
    {
      icon: <FaShieldAlt className='text-4xl text-indigo-600' />,
      title: 'Secure & Safe',
      description: 'Your data and transactions are protected with industry-leading security measures.'
    }
  ];

  return (
    <div className='py-16 bg-gray-50'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-slate-800 mb-4'>Why Choose MERN Estate?</h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            We provide comprehensive real estate solutions with cutting-edge technology and personalized service to make your property journey seamless.
          </p>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <div key={index} className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
              <div className='flex justify-center mb-4'>
                {feature.icon}
              </div>
              <h3 className='text-xl font-semibold text-slate-800 mb-3 text-center'>
                {feature.title}
              </h3>
              <p className='text-gray-600 text-center'>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
