import React from 'react';

const Header: React.FC = () => {
  const navigation = [
    { name: 'Home', href: '#' },
    { name: 'Masterplan', href: '#' },
    { name: 'Hospitality', href: '#' },
    { name: 'Contact Us', href: '#' },
  ]


  return (
    <header className=" bg-[#F8F2EB] border-b border-gray-200">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Diriyah Company</span>
              <img
                alt="Diriyah company"
                src="./logo.png"
                className="h-16 w-auto"
              />
            </a>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm/6 font-semibold text-gray-900">
              Invest With Us <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
       
      </header>
  );
};

export default Header;
