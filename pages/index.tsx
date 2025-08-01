import ImageWithCTA from "@/components/image-with-cta";
import Header from '@/components/header';
import Footer from '@/components/footer';

import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaGithub,
  FaYoutube,
} from "react-icons/fa6";

const footerSections = [
  {
    title: "Hospitality",
    links: [
      { label: "Offices", href: "#" },
      { label: "Retails", href: "#" },
      { label: "Hotels", href: "#" },
      { label: "Residence", href: "#" }
    ],
  },
  {
    title: "Diriyah",
    links: [
      { label: "News", href: "#" },
      { label: "Media", href: "#" },
      { label: "Events", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Jobs", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of service", href: "#" },
      { label: "Privacy policy", href: "#" },
      { label: "License", href: "#" },
    ],
  },
];

const socialIcons = [
  { icon: FaFacebookF, href: "#" },
  { icon: FaInstagram, href: "#" },
  { icon: FaXTwitter, href: "#" },
  { icon: FaGithub, href: "#" },
  { icon: FaYoutube, href: "#" },
];


interface HomeProps {
  readonly content: {
    title?: string;
    _path?: string
    descrpition?: { plaintext: string };
    componentFragmentReference?: any[];
  } | null;
}

export default function Home({ content }: HomeProps) {

const { title, descrpition, componentFragmentReference } = content || {};
  return (
    <div>
       <Header />
    <div
      className={`items-center justify-items-center mx-auto`}
    >
      <main className=" w-full flex flex-col gap-[32px] row-start-2 items-center sm:items-start" 
      data-aue-type="page"
      data-aue-resource={`urn:aemconnection:${content?._path}/jcr:content/data/master`}

      >
    
      {componentFragmentReference && componentFragmentReference.map((component, index) => (
        <ImageWithCTA
          key={component.id || index}
          title={component.title}
          description1={component.description1?.plaintext ?? ''}
          imageUrl={component.componentImage?.image?._publishUrl ?? ''}
          imageAlt={component.componentImage?.imageAltText ?? ''}
          variation={index === 0 ? "background" : index % 2 === 0 ? 'left' : 'right'}
          cfPath={component._path}
        />
      ))}


<div className="container mx-auto flex flex-col items-center gap-3.5 justify-center pb-12" data-aue-type="page"
      data-aue-resource={`urn:aemconnection:${content?._path}/jcr:content/data/master`}>
<h1
        data-aue-prop="title"
        data-aue-type="text"  
        data-cf-field="title"
        className="text-4xl font-bold text-gray-900"

        >{title}</h1>
      <p className="text-2xl" data-aue-prop="descrpition" data-aue-type="text" data-aue-label="description"> 
        {descrpition?.plaintext}
      </p>
        

</div>
   
       
      </main>
     
     
     
    </div>
    <Footer
      logo={<span className="text-indigo-600 text-3xl font-bold">〰</span>}
      sections={footerSections}
      socialLinks={socialIcons}
      copyright="© 2024 Diriyah, Inc. All rights reserved."
    />
    </div>
  );
}

export async function getServerSideProps() {

  const res = await fetch(`${process.env.AEM_HOST}${process.env.AEM_GRAPHQL_HOME_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(process.env.AEM_AUTH && { Authorization: process.env.AEM_AUTH }), // Include Authorization only if defined
    }
  });

  const json = await res.json();
  if (!res.ok) {
    console.error("Error fetching data from AEM:", json);
    return {
      notFound: true,
    };
  }

  const content = json?.data?.diriyahPageContentFragmentModelByPath?.item || null;

  return {
    props: { content },
  };
}
