import React from "react";
import { IconType } from "react-icons";

export interface FooterLinkSection {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterProps {
  logo?: React.ReactNode;
  sections: FooterLinkSection[];
  copyright: string;
  socialLinks?: { icon: IconType; href: string }[];
}

const Footer: React.FC<FooterProps> = ({
  sections,
  socialLinks = [],
  copyright,
}) => {
  return (
    <footer className="bg-[#F8F2EB] border-t text-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between space-y-10 md:space-y-0">
          <div> <img
                alt="Diriyah company"
                src="./logo.png"
                className="h-16 w-auto"
              /></div>

          {/* Sections */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {sections.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-sm font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2 text-sm">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="hover:text-indigo-600 transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t pt-6 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-500">
          <p>{copyright}</p>
          {socialLinks.length > 0 && (
            <div className="flex space-x-6 mt-4 md:mt-0 text-gray-600">
              {socialLinks.map(({ icon: Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;