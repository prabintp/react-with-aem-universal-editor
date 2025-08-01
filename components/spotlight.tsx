import React from 'react';

export interface SpotlightProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt?: string;
  cfPath: string; // Content Fragment path for AEM UE
}

const Spotlight: React.FC<SpotlightProps> = ({
  title,
  description,
  imageUrl,
  cfPath,
}) => {
  return (
    <div
      className="relative w-full h-[500px] flex items-center justify-center text-white overflow-hidden mb-12"
      style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      data-aue-type="Content With Image"
      data-aue-resource={`urn:aemconnection:${cfPath}/jcr:content/data/master`}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-black/50" aria-hidden="true" />

      {/* Foreground content */}
      <div className="container ms-auto absolute bottom-0 left-0 z-10 max-w-2xl p-10">
        <h2
          data-aue-prop="title" data-aue-type="text"
          className="text-4xl font-medium mb-4"
        >
          {title}
        </h2>
        <p
          className="text-lg md:text-xl text-gray-100"
          data-aue-prop="description1" 
          data-aue-type="text"
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default Spotlight;