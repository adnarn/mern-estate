import { FaChartLine, FaHome, FaDollarSign, FaUsers, FaBuilding, FaClock } from 'react-icons/fa';

export default function Stats() {
  const stats = [
    {
      icon: <FaHome className='text-3xl text-blue-600' />,
      number: '10,000+',
      label: 'Properties Listed'
    },
    {
      icon: <FaUsers className='text-3xl text-green-600' />,
      number: '50,000+',
      label: 'Happy Customers'
    },
    {
      icon: <FaBuilding className='text-3xl text-purple-600' />,
      number: '500+',
      label: 'Expert Agents'
    },
    {
      icon: <FaDollarSign className='text-3xl text-orange-600' />,
      number: '$2B+',
      label: 'Property Value'
    },
    {
      icon: <FaChartLine className='text-3xl text-red-600' />,
      number: '98%',
      label: 'Success Rate'
    },
    {
      icon: <FaClock className='text-3xl text-indigo-600' />,
      number: '24/7',
      label: 'Support Available'
    }
  ];

  return (
    <div className='py-16 bg-slate-800 text-white'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold mb-4'>Our Achievements</h2>
          <p className='text-gray-300 max-w-2xl mx-auto'>
            Numbers that speak for themselves. We're proud of our contribution to the real estate industry.
          </p>
        </div>
        
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8'>
          {stats.map((stat, index) => (
            <div key={index} className='text-center'>
              <div className='flex justify-center mb-4'>
                {stat.icon}
              </div>
              <div className='text-3xl font-bold mb-2'>
                {stat.number}
              </div>
              <div className='text-sm text-gray-300'>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
